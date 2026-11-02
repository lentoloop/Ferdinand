import { chromium } from "playwright";
import { browserOptions } from "./browser.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { fixtures as F } from "./fixtures/r3.mjs";
const root = path.resolve(".");
const out = path.join(root, "tests/e2e/artifacts/fd2");
await fs.mkdir(out, { recursive: true });
const probe = createServer();
await new Promise((r) => probe.listen(0, "127.0.0.1", r));
const port = probe.address().port;
await new Promise((r) => probe.close(r));
const log = await fs.open("/tmp/fd2-visual-vite.log", "w");
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "dev",
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    cwd: root,
    env: { ...process.env, PUBLIC_API_ALLOWED_BASES: "" },
    stdio: ["ignore", log.fd, log.fd],
  },
);
await log.close();
const origin = `http://127.0.0.1:${port}`;
let browser;
const conceptFields = [
  "Front",
  "Back",
  "Image",
  "Why",
  "Example",
  "Contrast",
  "Mnemonic",
  "Source",
  "ReverseEnabled",
  "Phonetic",
  "PartOfSpeech",
];
const clozeFields = ["Text", "Why", "Example", "Source"];
const ids = Object.keys(F.cards);
const decks = F.decks.map((d, i) => ({
  id: i + 1,
  name: d.name,
  level: 1,
  new_count: d.n,
  learn_count: d.l,
  review_count: d.r,
  total_in_deck: d.total,
  filtered: false,
  collapsed: false,
  preset_id: 1,
  children: [],
}));
function data(key) {
  const c = F.cards[key],
    yoin = c.notetype === "Yoin",
    cloze = c.notetype === "Cloze-Deep";
  const names = cloze ? clozeFields : conceptFields;
  const mapped = yoin
    ? {
        Front: `${c.plain}<br>${c.sentence}<br>きがする`,
        Back: `${c.meaningZh}<br><br>${c.meaningTarget}`,
        Example: c.example,
        Source: `netflix<br>demo-source<br>${c.source.title}<br>${c.source.episode}<br>198 s<br>2026-11-01T10:00:00Z<br><a href="${c.source.jump}">來源</a>`,
      }
    : {
        ...c,
        Back: `${c.pos ?? ""} ${c.Back ?? ""}`,
        Image: c.Image ? `<img src="${c.Image.file}">` : "",
        Phonetic: c.ipa ? `/${c.ipa}/` : "",
        PartOfSpeech: c.pos ?? "",
        ReverseEnabled: c.ReverseEnabled ? "1" : "",
      };
  const index = ids.indexOf(key) + 1;
  const fields = names.map((n) => mapped[n] ?? "");
  const front = cloze
    ? `${c.before}<span class="cloze">[…]</span>${c.after}`
    : mapped.Front;
  return {
    card: {
      id: index,
      note_id: index,
      deck_id: decks[F.decks.findIndex((d) => d.id === c.deck)].id,
      deck_name: F.decks.find((d) => d.id === c.deck).name,
      template_idx: 0,
      front_html: front,
      back_html: mapped.Back ?? "",
      tags: yoin ? ["origin::yoin", "lang::ja"] : (c.tags ?? []),
      state: "review",
      ease_factor: 2500,
      flag: 0,
      notetype_id: cloze ? 2 : 1,
      notetype_name: cloze ? "Cloze-Deep" : "Concept-Deep",
      notetype_css: "",
    },
    note: {
      id: index,
      notetype_id: cloze ? 2 : 1,
      notetype_name: cloze ? "Cloze-Deep" : "Concept-Deep",
      fields,
      tags: [],
      modified: 0,
    },
    notetype: {
      id: cloze ? 2 : 1,
      name: cloze ? "Cloze-Deep" : "Concept-Deep",
      fields: names,
      templates: [],
    },
  };
}
const specs = JSON.parse(
  await fs.readFile(
    "/workspace/design/ferdinand/r3/mockups/shots.json",
    "utf8",
  ),
);
const captured = [];
const errors = [];
try {
  for (let n = 0; n < 150; n++) {
    try {
      if ((await fetch(origin)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  browser = await chromium.launch(browserOptions());
  // Export the approved vector into a 180px app icon without altering its drawing.
  {
    const icon = await browser.newPage({
      viewport: { width: 180, height: 180 },
      deviceScaleFactor: 1,
    });
    const svg = await fs.readFile(
      path.join(root, "static/logo/mark-b.svg"),
      "utf8",
    );
    await icon.setContent(
      `<style>body{margin:0;background:#FFFCF5;display:grid;place-items:center;width:180px;height:180px}svg{width:112px;height:112px}</style>${svg}`,
    );
    await icon.screenshot({ path: path.join(root, "static/app-icon.png") });
    await icon.close();
  }
  for (const spec of specs.filter(s=>!process.env.FD2_SHOT_FILTER||s.name.includes(process.env.FD2_SHOT_FILTER))) {
    console.log("Capture " + spec.name);
    const source = new URL(spec.url, "http://reference/");
    const route = source.pathname.split("/").at(-1).replace(".html", "");
    if (!["home", "review", "browse", "stats"].includes(route)) {
      const study = await browser.newPage({
        viewport: { width: spec.w, height: spec.h },
      });
      await study.goto(
        "file:///workspace/design/ferdinand/r3/logo/" +
          source.pathname.split("/").at(-1),
      );
      await study.screenshot({
        path: path.join(out, spec.name + ".png"),
        fullPage: spec.full,
      });
      await study.close();
      continue;
    }
    const state = source.searchParams.get("state") ?? "default";
    const context = await browser.newContext({
      viewport: { width: spec.w, height: spec.h },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(`${spec.name}: ${e.message}`));
    await page.clock.install({ time: new Date("2026-11-01T10:00:00+08:00") });
    const key =
      source.searchParams.get("card") ??
      { "answer-noimg": "tentative", yoin: "kigasuru", cloze: "submit" }[
        state
      ] ??
      "allocate";
    const current = data(key);
    await context.route("**/media/*", async (r) => {
      const file = r.request().url().split("/").at(-1);
      const known = {
        "allocate.jpg": "illus-allocate.jpg",
        "itinerary.jpg": "illus-itinerary.jpg",
      }[file];
      if (known)
        await r.fulfill({
          contentType: "image/jpeg",
          body: await fs.readFile(
            "/workspace/design/ferdinand/r3/assets/" + known,
          ),
        });
      else await r.abort();
    });
    await context.route("**/api/**", async (r) => {
      const u = new URL(r.request().url());
      const p = u.pathname;
      const answer = (json) => r.fulfill({ json });
      if (p === "/api/auth/me")
        return answer({ username: "demo", is_admin: false });
      if (p === "/api/decks") return answer({ decks });
      if (p === "/api/notetypes") return answer({notetypes:[data('allocate').notetype,data('submit').notetype]});
      if (p === "/api/tags") return answer({tags:['finance','office','scheduling','travel']});
      if (p === "/api/study/forecast")
        return answer({
          days: Number(u.searchParams.get("days")),
          history: F.stats.forecast
            .slice(0, Number(u.searchParams.get("days")))
            .map((reviews, offset) => ({ offset, reviews })),
        });
      if (p === "/api/stats/recent")
        return answer({
          days: 30,
          history: F.stats.reviews.map((reviews, i) => ({
            date: new Date(
              new Date("2026-10-03T12:00:00Z").getTime() + i * 86400000,
            )
              .toISOString()
              .slice(0, 10),
            reviews,
          })),
        });
      if (p === "/api/study/queue") {
        if (state === "loading") return;
        if (state === "error")
          return r.fulfill({
            status: 503,
            json: { message: "伺服器沒有回應（503）。" },
          });
        return answer({
          new: 10,
          learning: 2,
          review: 30,
          cards: state === "empty" ? [] : [current.card],
        });
      }
      if (p === "/api/cards") {
        if (state === "loading") return;
        if (state === "error")
          return r.fulfill({
            status: 503,
            json: { message: "伺服器沒有回應（503）。" },
          });
        return answer({
          total: state === "empty" ? 0 : 305,
          cards:
            state === "empty"
              ? []
              : [
                  current.card,
                  ...ids.filter((k) => k !== key).map((k) => data(k).card),
                ],
        });
      }
      if (p.startsWith("/api/notes/"))
        return answer(data(ids[Number(p.split("/").at(-1)) - 1]).note);
      if (p.startsWith("/api/notetypes/"))
        return answer(
          Number(p.split("/").at(-1)) === 2
            ? data("submit").notetype
            : current.notetype,
        );
      return r.fulfill({ status: 404, json: { message: "Not available" } });
    });
    const url =
      route === "home"
        ? "/"
        : route === "review"
          ? `/study/${current.card.deck_id}`
          : `/${route}`;
    await page.goto(origin + url);
    if (route === "home")
      await page.locator("[data-component=CoverCard]").waitFor();
    if (route === "review") {
      if (["empty", "loading", "error"].includes(state))
        await page
          .locator(`[data-component=ReviewState][data-variant=${state}]`)
          .waitFor();
      else {
        await page.getByRole("button", { name: "顯示答案" }).waitFor();
        if (
          state.startsWith("answer") ||
          source.searchParams.get("side") === "answer"
        )
          await page.getByRole("button", { name: "顯示答案" }).click();
      }
    }
    if (route === "browse") {
      if (["empty", "loading", "error"].includes(state))
        await page
          .locator(`[data-component=BrowseState][data-variant=${state}]`)
          .waitFor();
      else {
        await page
          .locator("[data-component=CardSheet]")
          .waitFor({ state: "attached" }).catch(async e=>{console.error(errors,await page.locator("body").innerText());throw e;});
        if (state === "edit") {
          if (spec.w < 1000)
            await page
              .locator(".mobile [data-component=ResultList] button")
              .first()
              .click();
          await page.getByRole("tab", { name: "編輯" }).click();
          await page.getByRole("textbox", { name: "例句" }).focus();
          if (source.searchParams.has("dirty"))
            (await page.getByRole("textbox", { name: "例句" }).press("End"),
              await page.getByRole("textbox", { name: "例句" }).press("!"));
          if (source.searchParams.has("armed"))
            await page.getByRole("button", { name: "× 移除圖片" }).click();
          if (source.searchParams.has("press")) {
            const b = page.getByRole("button", { name: "儲存變更" });
            const box = await b.boundingBox();
            await page.mouse.move(
              box.x + box.width / 2,
              box.y + box.height / 2,
            );
            await page.mouse.down();
          }
        }
      }
    }
    if (route === "stats")
      await page.locator("[data-component=ForecastChart]").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((i) =>
          i.complete
            ? Promise.resolve()
            : new Promise((r) => {
                i.onload = r;
                i.onerror = r;
              }),
        ),
      ),
    );
    const accent = source.searchParams.get("accent");
    if (accent)
      await page.evaluate(
        (a) => (document.documentElement.dataset.accent = a),
        accent,
      );
    await page.screenshot({
      path: path.join(out, spec.name + ".png"),
      fullPage: spec.full,
    });
    captured.push(spec.name);
    if (!spec.full)
      await page.screenshot({
        path: path.join(
          out,
          (spec.name.endsWith("--viewport")
            ? spec.name.replace("--viewport", "")
            : spec.name + "--full") + ".png",
        ),
        fullPage: true,
      });
    if (
      route === "browse" &&
      state === "edit" &&
      key === "allocate" &&
      spec.w === 390
    ) {
      const image = page.locator("[data-component=ImageField] figure img");
      const thumb = page.locator("[data-component=ImageField] .thumb");
      await thumb.evaluate((el) => (el.style.width = "104px"));
      const box = await image.boundingBox();
      if (box && box.height > 0.8 * box.width)
        throw new Error("TippedPrint exceeded 0.8× width");
    }
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      )
    )
      throw new Error(`Horizontal overflow: ${spec.name}`);
    await context.close();
  }
  if (errors.length) throw new Error(errors.join("\n"));
  if (!process.env.FD2_SHOT_FILTER) await fs.writeFile(
    path.join(out, "manifest.json"),
    JSON.stringify(
      {
        captured,
        referenceOnly: specs
          .filter((s) => s.name.startsWith("logo--"))
          .map((s) => s.name),
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${captured.length} screenshots, selected route captures, no horizontal overflow or browser errors`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
  await new Promise((r) => server.once("exit", r));
}
