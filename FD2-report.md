# FD2 r3 delivery

Branch: `fd2/r3-pages`. Base: `1ab7b22bd`. Implementation commit: `2cef69437`.

Built the approved home, review, browse, and stats routes with logo B, indigo tokens, local fonts, paper materials, responsive navigation, favicon, and a 180px app icon. Study hides navigation. The old shell components and legacy token file are removed. Login, settings, and new-note retain their layouts and use shared token aliases.

Home uses live deck counts and forecast data. Review supports Concept-Deep, Cloze-Deep, Yoin, image enlargement, pronunciation/POS, keyboard ratings, closed disclosures, and the no-image layout. Unknown note types retain the sanitized shadow renderer. Browse has API search and filters, pagination, previews, rich fields, formatting, image upload/removal, and real note saves. Stats uses live daily counts and the approved weighted five-day forecast smoothing, preserving today's exact value.

No backend source changed. Nothing was pushed and no PR was opened.

## Verification

Commands run in `mockup/` unless marked otherwise. Final results:

| Command | Result |
| --- | --- |
| `npm run check` | PASS, 0 errors, 0 warnings |
| `npm test -- --maxWorkers=2` | PASS, 19 files, 248 tests, 0 failures |
| `npm run build` | PASS |
| `node tests/e2e/fd2_pages.mjs` | PASS, login, home, review, browse save, stats |
| `node tests/e2e/yn3_import.mjs` | PASS, 12 scenarios |
| `node tests/e2e/fd2_visual.mjs` | PASS, 56 application captures and 2 reference-only logo studies |
| `FD2_SHOT_FILTER=edit-pressed node tests/e2e/fd2_visual.mjs` | PASS, final pressed-state correction |
| `python3 tests/e2e/fd2_compare.py` | PASS, 58 comparisons |
| Root: `export PATH=$HOME/.cargo/bin:$PATH; export PROTOC=/tmp/yn3-protoc/bin/protoc; cargo +stable test -p anki_server -j 2` | PASS, 387 tests, 0 failures |
| Root: `git diff --check` | PASS |
| Root: `gitleaks git --log-opts="1ab7b22bd..HEAD" --no-banner .` | PASS, 0 leaks |

The FD2 e2e starts a local server with temporary user data and a generated demo password. It logs in through the UI, proves that rating adds one persisted review, proves that browse changes the stored note field, and reads real stats. Component tests cover sanitization, image absence, section order, disclosure reset, save failure/retry, formatting state, and unavailable capabilities. Browser checks also measure the thumbnail inside a 104px box and reject horizontal overflow.

## Screenshots

Directory: `/workspace/repos/ferdinand/.worktrees/fd2/mockup/tests/e2e/artifacts/fd2/`.

All 58 `shots.json` entries have their named PNG. Viewport-only entries also have full-page companions. There are 73 captures and 58 `compare--*.png` files. Comparisons resize the reference to the capture's CSS-pixel width before placing it on the left. The two `logo--*` captures show the supplied design studies, not application routes. Artifacts remain local and ignored by Git.

## Backend gaps and visible differences

- `.apkg` export, mature-review retention, and per-deck retention are unavailable. Typed clients exist. Export stays disabled, retention shows no numeric value, and per-deck rows stay hidden. No substitute percentages are calculated from all answer buttons.
- The API does not return rating intervals, estimated study minutes, or the next card's exact due time. Those values are omitted. Browse shows real card state instead of invented due dates and intervals.
- The streak and longest-streak calculation uses the returned 30-day history. The caption qualifies this window. All-time longest streak and last-break date are omitted.
- Yoin keeps its plain reading line above the chunk. No furigana is fabricated. Deck labels follow the actual collection names.
- Actual session progress starts at zero, dates follow the current day, and error details come from real failures. These differ from the reference's fixed demonstration values.
- The editor includes pronunciation/POS fields when the note type supplies them. It preserves stored HTML, so emphasis and line wraps can differ from the mockup's rewritten editor example. The clean button says `沒有修改`, following the written r3 handoff. The pressed save button uses the approved `#1F3A57`.
- Local font fallbacks and subset coverage can cause small glyph and line-wrap differences. Pixel identity is not claimed. The r3 browse replaces the former tree, bulk-action, template, and history panels with the approved component map.

Setup used `npm ci --ignore-scripts --cache /tmp/fd2-npm-cache`. Rust verification copied only ignored generated protobuf files and created the translation directories described in the YN3 setup notes. The browser helper uses the installed Chromium revision when the lockfile's revision is absent. Test scripts stop their servers and close their browsers.
