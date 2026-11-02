import {browserOptions} from './browser.mjs';
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
const temporary = await mkdtemp(path.join(tmpdir(), "yn3-import-"));
const children = [];
let browser;
const opener = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(
    '<button id="open">Open Ferdinand</button><script>window.received=[];window.addEventListener("message",e=>{if(e.origin!==window.destination||e.source!==window.target)return;received.push(e.data);if(e.data.type==="ferdinand:ready")target.postMessage(window.batch,window.destination)});document.querySelector("button").onclick=()=>{window.target=window.open(window.destination+"/import?handoff=1","ferdinand-import")};</script>',
  );
});
await new Promise((resolve) => opener.listen(0, "127.0.0.1", resolve));
const address = opener.address();
assert(address && typeof address === "object");
const openerOrigin = `http://127.0.0.1:${address.port}`;
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
    [path.join(root,"node_modules/vite/bin/vite.js"),"dev","--host","127.0.0.1","--port",String(uiPort)],
    {
      PUBLIC_API_ALLOWED_BASES: "",
      PUBLIC_YOIN_ORIGINS: openerOrigin,
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
  const fixture = {
    id: createHash("sha256").update("yn3-test-one").digest("hex"),
    origin: "yoin",
    lang: "en",
    chunk: "run out of",
    sentence: "We ran out of coffee.",
    meaning_zh: "用完",
    meaning_target: "use all of something",
    example: "We ran out of tea.",
    source: {
      platform: "youtube",
      source_id: "demo-source",
      source_title: "Demo source",
      start_sec: 12,
    },
    created_at: "2026-11-02T10:00:00Z",
  };
  const batch = {
    type: "yoin:items",
    v: 1,
    nonce: randomBytes(16).toString("hex"),
    items: [
      fixture,
      { ...fixture },
      {
        ...fixture,
        id: createHash("sha256").update("yn3-invalid").digest("hex"),
        meaning_zh: "",
      },
    ],
  };
  const page = await context.newPage();
  await page.goto(openerOrigin);
  await page.evaluate(
    ({ destination, batch }) => {
      window.destination = destination;
      window.batch = batch;
    },
    { destination: uiOrigin, batch },
  );
  const popupPromise = context.waitForEvent("page");
  await page.locator("#open").click();
  const popup = await popupPromise;
  try {
    await popup.waitForSelector('[data-state="preview"]', { timeout: 15000 });
  } catch (error) {
    console.error(
      "Popup diagnostic:",
      popup.url(),
      await popup.locator("body").innerText(),
      await page.evaluate(() => window.received),
    );
    throw error;
  }
  let cards = await (
    await context.request.get(
      `${uiOrigin}/api/cards?search=tag%3Aorigin%3A%3Ayoin`,
    )
  ).json();
  assert.equal(cards.total, 0, "dry-run creates no notes");
  const decksBefore = await (
    await context.request.get(`${uiOrigin}/api/decks`)
  ).json();
  assert(
    !JSON.stringify(decksBefore).includes("Yoin::English"),
    "dry-run creates no deck",
  );
  await popup.getByRole("button", { name: "匯入 1 張", exact: true }).click();
  await popup.waitForSelector('[data-state="done"]');
  await page.waitForFunction(() =>
    window.received.some((message) => message.type === "ferdinand:result"),
  );
  const result = await page.evaluate(() =>
    window.received.find((message) => message.type === "ferdinand:result"),
  );
  assert.equal(result.nonce, batch.nonce);
  assert.deepEqual(
    result.response.results.map((r) => r.status),
    ["created", "duplicate", "error"],
  );
  cards = await (
    await context.request.get(
      `${uiOrigin}/api/cards?search=tag%3Aorigin%3A%3Ayoin`,
    )
  ).json();
  assert.equal(cards.total, 1, "one note exists after confirm");
  const note = await (
    await context.request.get(
      `${uiOrigin}/api/notes/${result.response.results[0].note_id}`,
    )
  ).json();
  assert(
    JSON.stringify(note).includes("run out of"),
    "saved note contains the handed-off chunk",
  );
  // Replay cannot start a second request or change the completed view.
  const imports = [];
  popup.on("request", (r) => {
    if (r.url().includes("/api/import/yoin")) imports.push(r.url());
  });
  await page.evaluate(() =>
    window.target.postMessage(window.batch, window.destination),
  );
  await popup.waitForTimeout(100);
  assert.equal(imports.length, 0, "replayed nonce ignored");
  await popup.close();
  const overflow = {
    ...batch,
    nonce: randomBytes(16).toString("hex"),
    items: Array.from({ length: 137 }, () => fixture),
  };
  await page.evaluate((batch) => {
    window.batch = batch;
  }, overflow);
  const nextPopup = context.waitForEvent("page");
  const sent = [];
  const track = (request) => {
    if (request.url().includes("/api/import/yoin"))
      sent.push(request.postDataJSON());
  };
  context.on("request", track);
  await page.locator("#open").click();
  const over = await nextPopup;
  await over.waitForSelector('[data-state="over-limit"]');
  assert.equal(sent.length, 0, "over-limit makes no API request");
  await over.getByRole("button", { name: "檢查前 100 張" }).click();
  await over.waitForSelector('[data-state="preview"]');
  assert.equal(sent.length, 1);
  assert.equal(sent[0].items.length, 100, "the cut sends exactly 100");
  assert.equal(sent[0].dry_run, true);
  assert(
    await over.getByRole("button", { name: "匯入 0 張" }).isDisabled(),
    "no new items cannot be confirmed",
  );
  await over.getByRole('link',{name:'瀏覽',exact:true}).first().click();
  await page.waitForFunction(nonce=>window.received.some(message=>message.type==='ferdinand:cancel' && message.nonce===nonce),overflow.nonce);
  await over.close();
  context.off("request", track);
  const uncertain = {
    ...batch,
    nonce: randomBytes(16).toString("hex"),
    items: [
      {
        ...fixture,
        id: createHash("sha256").update("yn3-uncertain").digest("hex"),
      },
    ],
  };
  await page.evaluate((batch) => {
    window.batch = batch;
  }, uncertain);
  const uncertainPopup = context.waitForEvent("page");
  await page.locator("#open").click();
  const retry = await uncertainPopup;
  await retry.waitForSelector('[data-state="all-new"]');
  await retry.route("**/api/import/yoin", async (route) => {
    if (route.request().postDataJSON().dry_run) {
      await route.continue();
      return;
    }
    await route.fetch();
    await route.fulfill({
      status: 503,
      json: { status: 503, message: "internal server error" },
    });
  });
  await retry.getByRole("button", { name: "匯入 1 張", exact: true }).click();
  await retry.waitForSelector('[data-state="server-error"]');
  assert(
    (await retry.getByRole("alert").innerText()).includes(
      "部分卡片可能已寫入。重試是安全的",
    ),
  );
  await page.waitForFunction(
    (nonce) =>
      window.received.some(
        (message) =>
          message.type === "ferdinand:error" &&
          message.nonce === nonce &&
          message.unconfirmed === true,
      ),
    uncertain.nonce,
  );
  await retry.getByRole("button", { name: "重試" }).click();
  await retry.waitForSelector('[data-state="preview"]');
  assert(
    await retry.getByRole("button", { name: "匯入 0 張" }).isDisabled(),
    "retry discovers the prior write as a duplicate",
  );
  cards = await (
    await context.request.get(
      `${uiOrigin}/api/cards?search=tag%3Aorigin%3A%3Ayoin`,
    )
  ).json();
  assert.equal(cards.total, 2, "uncertain retry creates no extra note");
  await context.close();
  console.log(
    "PASS: 12 scenarios, including navigation cancellation, over-limit, exact first-100 cut, and safe retry after a committed write with a 503 response",
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
      if(child.exitCode === null) child.kill("SIGKILL");
    }
  }
  opener.closeAllConnections();
  await new Promise((resolve) => opener.close(resolve));
  await rm(temporary, { recursive: true, force: true });
}
