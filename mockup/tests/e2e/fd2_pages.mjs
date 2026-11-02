import { browserOptions } from "./browser.mjs";
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, rm, open } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes, createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const temporary = await mkdtemp(path.join(tmpdir(), "fd2-pages-"));
const children = [];
let browser;
async function freePort() {
  const probe = createServer();
  await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const address = probe.address();
  assert(address && typeof address === "object");
  await new Promise((resolve) => probe.close(resolve));
  return address.port;
}
async function start(command, args, env, log) {
  const output = await open(path.join(temporary, log), "w");
  const child = spawn(command, args, {
    cwd: command === process.execPath ? root : path.dirname(root),
    env: { ...process.env, ...env },
    stdio: ["ignore", output.fd, output.fd],
  });
  children.push(child);
  child.on("error", (error) => {
    process.stderr.write(error.message + "\n");
  });
  await output.close();
  return child;
}
async function ready(url) {
  for (let n = 0; n < 150; n++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Server did not become ready: ${url}; logs: ${temporary}`);
}
const apiPort = await freePort(),
  uiPort = await freePort();
const apiOrigin = `http://127.0.0.1:${apiPort}`,
  uiOrigin = `http://127.0.0.1:${uiPort}`;
const password = randomBytes(24).toString("hex");
try {
  await start(
    process.env.ANKI_SERVER_BIN ||
      path.join(root, "../target/debug/anki_server"),
    [],
    {
      ANKI_SERVER_PORT: String(apiPort),
      ANKI_USERS_DIR: path.join(temporary, "users"),
      ANKI_AUTH_DB: path.join(temporary, "auth.db"),
      FERDINAND_SEED_USER: "demo",
      FERDINAND_SEED_PASSWORD: password,
    },
    "api.log",
  );
  await ready(`${apiOrigin}/api/health`);
  await start(
    process.execPath,
    [
      path.join(root, "node_modules/vite/bin/vite.js"),
      "dev",
      "--host",
      "127.0.0.1",
      "--port",
      String(uiPort),
    ],
    {
      PUBLIC_API_ALLOWED_BASES: "",
      ANKI_SERVER_URL: apiOrigin,
    },
    "vite.log",
  );
  await ready(uiOrigin);
  browser = await chromium.launch(browserOptions());
  const context = await browser.newContext();
  const login = await context.request.post(`${uiOrigin}/api/auth/login`, {
    data: { username: "demo", password },
  });
  assert.equal(login.status(), 200, "temporary demo user logs in");
  await context.request.post(`${uiOrigin}/api/auth/logout`);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${uiOrigin}/login`);
  await page.getByLabel("Username").fill("demo");
  await page.getByLabel("Password").fill(password);
  await page.locator("button[type=submit]").click();
  await page.waitForURL(uiOrigin + "/");
  const decks = await (
    await context.request.get(`${uiOrigin}/api/decks`)
  ).json();
  const types = await (
    await context.request.get(`${uiOrigin}/api/notetypes`)
  ).json();
  const type = types.notetypes.find((t) => t.name === "Concept-Deep");
  assert(type);
  const deck = decks.decks[0];
  assert(deck);
  const values = {
    Front: "allocate",
    Back: "(v.) 分配",
    Example: "We allocate time.",
    Why: "ad + locare",
    Contrast: "assign",
    Mnemonic: "locate",
    Source: "TOEIC vocabulary level 600 — finance",
    Phonetic: "/ˈæləkeɪt/",
    PartOfSpeech: "verb",
  };
  const created = await context.request.post(`${uiOrigin}/api/notes`, {
    data: {
      deck_id: deck.id,
      notetype_id: type.id,
      fields: type.fields.map((name) => values[name] ?? ""),
    },
  });
  assert.equal(created.status(), 200, await created.text());
  const note = await created.json();
  await page.reload();
  await page.getByRole("link", { name: "開始複習" }).waitFor();
  await page.getByRole("link", { name: "開始複習" }).click();
  await page.getByRole("button", { name: "顯示答案" }).click();
  assert.equal(await page.locator("[data-component=TippedPrint]").count(), 0);
  const before = await (
    await context.request.get(`${uiOrigin}/api/stats/recent?days=30`)
  ).json();
  await page.getByRole("button", { name: /Good/ }).click();
  await page
    .getByRole("button", { name: "顯示答案" })
    .or(page.getByText("今天的卡片都複習好了。"))
    .waitFor();
  const after = await (
    await context.request.get(`${uiOrigin}/api/stats/recent?days=30`)
  ).json();
  assert.equal(
    after.history.reduce((a, b) => a + b.reviews, 0),
    before.history.reduce((a, b) => a + b.reviews, 0) + 1,
    "rating persists one review",
  );
  await page.goto(`${uiOrigin}/browse`);
  await page.getByRole("tab", { name: "編輯" }).click();
  const field = page.getByRole("textbox", { name: "例句" });
  await field.fill("We allocate more time.");
  await page.getByRole("button", { name: "儲存變更" }).click();
  await page.getByText("已儲存", { exact: true }).waitFor();
  const updated = await (
    await context.request.get(`${uiOrigin}/api/notes/${note.note_id}`)
  ).json();
  assert.equal(
    updated.fields[type.fields.indexOf("Example")],
    "We allocate more time.",
    "browse save persists note HTML",
  );
  await page.goto(`${uiOrigin}/stats`);
  await page.locator("[data-component=ReviewsChart]").waitFor();
  assert.match(
    await page.locator("[data-component=ReviewsChart] table").textContent(),
    /1/,
  );
  assert.deepEqual(errors, [], "no browser runtime errors");
  await context.close();
  console.log(
    "PASS: login, real home, reveal/rate persisted review, browse save persisted note, real stats",
  );
} finally {
  await browser?.close();
  for (const child of children.reverse()) {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      await Promise.race([
        new Promise((resolve) => child.once("exit", resolve)),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
      if (child.exitCode === null) child.kill("SIGKILL");
    }
  }
  await rm(temporary, { recursive: true, force: true });
}
