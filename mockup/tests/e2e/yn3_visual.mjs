import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
const out = process.env.YN3_SHOTS || path.resolve("tests/e2e/artifacts/yn3-ui");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      reducedMotion: "reduce",
    });
    await context.route("**/api/auth/me", (r) =>
      r.fulfill({ json: { username: "demo" } }),
    );
    const page = await context.newPage();
    for (const state of [
      "preview",
      "all-new",
      "errors",
      "over-limit",
      "loading",
      "importing",
      "done",
    ]) {
      await page.goto(`http://localhost:5174/import?state=${state}`);
      await page.waitForSelector(`[data-state="${state}"]`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(out, `import--${state}--${width}.png`),
        fullPage: true,
      });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
console.log(`14 screenshots: ${out}`);
