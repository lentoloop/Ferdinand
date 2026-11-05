# YN3-UI-FD delivery

Built `/import` with all nine states, reusable r3 shell components, logo B, paper assets, and local-first WOFF2 fonts. Existing home, review, browse, and stats styles remain unchanged.

The authenticated receiver checks the opener, configured origin, version, and single-use nonce. It previews before confirmation, cuts oversized batches only after an explicit choice, returns the API response unchanged, and reports uncertain writes honestly. Retry previews again and preserves idempotency. Optional `first_index` and `decks` work with the current backend fallback.

Code commits:

- `ddeedde4f`: import page, secure handoff, components, assets, component tests, and dependency lock repair.
- `99238412e`: isolated-server e2e, screenshot tools, and visual corrections.
- `a6094886c`: retain checked deck counts during import and test that behavior.
- `6a83ba07a`: notify the opener when Svelte navigation leaves the preview and verify cancellation.

Final verification commands and results:

| Working directory | Command | Result |
|---|---|---|
| `mockup/` | `npm run check` | PASS, 0 errors and 0 warnings |
| `mockup/` | `npm test -- --maxWorkers=2` | PASS, 18 files and 306 tests, 0 failures |
| `mockup/` | `npm run build` | PASS |
| Repository root | `export PATH=$HOME/.cargo/bin:$PATH; cargo +stable test -p anki_server -j 2` | PASS, 387 tests, 0 failures |
| `mockup/` | `node tests/e2e/yn3_import.mjs` | PASS, 12 scenarios |
| `mockup/` | `node tests/e2e/yn3_visual.mjs` | PASS, 14 full-page captures |
| `mockup/` | `python3 tests/e2e/yn3_compare.py` | PASS, 14 comparisons |
| Repository root | `git diff --check` | PASS |
| Repository root | `gitleaks git --log-opts="694388197..HEAD" --no-banner .` | PASS, 0 leaks |

The e2e starts a temporary server and demo account. It proves that dry-run creates no notes or decks, confirmation persists a note, the opener receives exact per-item results, nonce replay is ignored, internal navigation sends cancellation, oversized batches make no request, and the cut contains exactly 100 items. It also commits a note while simulating a 503 response, then proves that retry discovers the duplicate without another write.

Screenshots and comparisons are in `/workspace/repos/ferdinand/.worktrees/yn3-ui/mockup/tests/e2e/artifacts/yn3-ui/`: `import--<state>--{390,1440}.png` and `compare--<state>--{390,1440}.png`. The sandbox cannot write to the requested `/workspace/eng/shots/yn3-ui/`. These artifacts remain local and are not committed.

Contract-v1 follow-up:

- The previously held server-error, empty, repeat, deck, and completion elements are implemented and verified in `YN3-REV-FD-report.md`.
- CJK WOFF2 subsets cover interface and fixture characters. Other glyphs use the platform font fallback.
- Production needs `PUBLIC_YOIN_ORIGINS` configured with exact allowed Yoin origins. The default is empty. Development additionally allows `http://localhost:5173`.

Setup notes: the initial `npm ci --ignore-scripts` failed because the existing lockfile lacked platform entries. The committed lock repair adds those entries and Node types. Local verification uses an ignored `.env` containing only `PUBLIC_API_ALLOWED_BASES=`. The Rust checkout lacked protobuf build files and translation subdirectories. Verification copied the existing generated `protoc` and `descriptors.bin` into this worktree's ignored `out/` directory and created `ftl/core-repo/core` and `ftl/qt-repo/desktop`. No backend source changed.

All task servers were stopped. Nothing was pushed and no PR was opened.
