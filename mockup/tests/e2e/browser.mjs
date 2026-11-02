import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";
// Fleet images may cache a newer Chromium revision than the package lock.
export function browserOptions() {
  if (existsSync(chromium.executablePath())) return { headless: true };
  const cache =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    path.join(homedir(), ".cache/ms-playwright");
  const revision = readdirSync(cache)
    .filter((name) => name.startsWith("chromium_headless_shell-"))
    .sort()
    .at(-1);
  if (!revision) throw new Error(`No Chromium browser in ${cache}`);
  return {
    headless: true,
    executablePath: path.join(
      cache,
      revision,
      "chrome-headless-shell-linux64/chrome-headless-shell",
    ),
  };
}
