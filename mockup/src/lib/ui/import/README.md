# Yoin import preview

`/import?handoff=1` receives a batch from the authenticated window's opener. Configure `PUBLIC_YOIN_ORIGINS` as a comma-separated list of exact origins. Production defaults to an empty allowlist. Development also allows `http://localhost:5173`.

The receiver checks the opener, origin, protocol version and a single-use 128-bit hexadecimal nonce. It holds the batch in memory. Requests use the Ferdinand origin and its session cookie; credentials never enter a handoff message. Over-limit batches make no request until the user chooses the first 100 items. Confirmation sends the same selected batch again with `dry_run: false`. The opener receives per-item results; after a partial retry, results retain the original batch indices and prior successful rows.

A timeout, network failure, malformed success response or HTTP 5xx leaves writes unconfirmed. Retry runs a fresh preview. No error path claims that an uncertain batch created nothing. Closing the page during import reports an unconfirmed failure; closing before import sends cancellation.

The ten development states are available with `?state=preview|all-new|errors|over-limit|loading|importing|done|done-partial|server-error|empty` after login. These fixtures are excluded from production. Optional `decks` and `first_index` metadata is never inferred. Without these fields, the UI uses the approved generic copy. Partial retries send only failed note-creation rows and retain prior results.

R3 variables and shared material primitives are global CSS scoped to `.r3-import`, so existing routes retain their styles. Component layout rules stay in their Svelte owners. Fonts use local installations first and bundled WOFF2 fallbacks; font licenses ship alongside the assets.

## Verification

From `mockup/`:

```sh
npm run check
npm test -- --maxWorkers=2
npm run build
node tests/e2e/yn3_import.mjs
```

The e2e needs `../target/debug/anki_server`, produced by `cargo +stable test -p anki_server -j 2` from the repository root. It starts isolated servers on free ports, creates a temporary demo account with a generated password, tests the opener flow and persisted notes, then removes its data and stops its servers. `ANKI_SERVER_BIN` can select another binary.

For visual captures, start `npm run dev` on port 5174, then run:

```sh
node tests/e2e/yn3_visual.mjs
python3 tests/e2e/yn3_compare.py
```

The comparison script needs Pillow and the approved references under `/workspace/design/ferdinand/import/shots/`. `YN3_SHOTS` overrides the default `tests/e2e/artifacts/yn3-ui/`. Captures include all ten states and preview with optional v2 fields, at 390 and 1440 pixels.
