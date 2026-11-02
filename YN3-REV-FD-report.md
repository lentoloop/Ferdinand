# YN3-REV-FD result

Implemented the approved contract-v1 import screens on `yn3/import-ui`. No push or PR.

- Merged `yn3/fields` without conflicts: backend `first_index` and `decks[]`, including its tests.
- Removed design-hold markers. Added uncertain-result copy, safe retry guidance, retained-card rows, the empty-state hint, partial completion, and failed-row-only retry. Successful results remain visible and retain their original indices after retry.
- Optional fields drive detailed repeat/deck copy automatically. Missing fields use generic copy without guessing. Optional error details are supported when returned.
- Readings occupy one full line below the word. Loading/importing retain an indeterminate progress line.
- Completion counts use actual write results. Same-batch duplicates with `first_index` show `重複略過`; generic duplicates show `已有`.

Commits:

- `84434baf6`: merge `yn3/fields` (includes backend commit `8b7d8d9dc`).
- `5d697c3de`: contract-v1 UI, optional fields, tests, and capture scripts.
- `e2eca7762`: keep retrying cards out of the skipped list; add a regression check.

Final verification commands (repository root unless stated):

- `npm --prefix mockup run check`: PASS, 0 errors, 0 warnings.
- `npm --prefix mockup run test -- --maxWorkers=2`: PASS, 18 files, 314 tests, 0 failures.
- `npm --prefix mockup run build`: PASS, static site built.
- `PATH=/home/box/.cargo/bin:$PATH PROTOC=/tmp/yn3-protoc/bin/protoc cargo +stable test -p anki_server -j 2`: PASS, 389 tests (183 library, 188 binary, 1 integration, 17 import), 0 failures; 0 doc tests. Existing compiler warnings remain.
- From `mockup`: `node tests/e2e/yn3_import.mjs`: PASS, 16 scenarios. Real isolated anki_server covers dry-run with no notes/decks created, v2 fields rendered, persisted writes, opener results, nonce replay, navigation cancellation, over-limit and first-100 selection, and safe retry after a committed write with a simulated 503. A stripped-field response proves generic deck/repeat copy. Mocked partial results prove that retry sends only the failed ID and keeps prior successes.
- From `mockup`: `YN3_SHOTS=tests/e2e/artifacts/yn3-rev-fd node tests/e2e/yn3_visual.mjs`: PASS, 22 captures.
- From `mockup`: `YN3_SHOTS=tests/e2e/artifacts/yn3-rev-fd python3 tests/e2e/yn3_compare.py`: PASS, 22 side-by-side comparisons.
- `git diff --check`: PASS.
- `gitleaks git --log-opts="694388197..HEAD" --no-banner .`: PASS, 0 leaks.

Initial e2e attempts failed while waiting for completion: the reactive result could not be cloned by `postMessage`. Sending `$state.snapshot(response)` fixed the failure. Another run missed the initial ready message while build/dev tooling overlapped; verification was rerun without that overlap.

Screenshots remain local, outside Git:

`/workspace/repos/ferdinand/.worktrees/yn3-ui/mockup/tests/e2e/artifacts/yn3-rev-fd/`

For each of `preview`, `all-new`, `errors`, `over-limit`, `loading`, `importing`, `done`, `done-partial`, `server-error`, `empty`, and `preview-v2`, both widths exist:

- `import--<state>--390.png`, `import--<state>--1440.png`
- `compare--<state>--390.png`, `compare--<state>--1440.png` (Mia on the left, implementation on the right)

The requested `/workspace/eng/shots/yn3-rev-fd/` could not be created: `Read-only file system`. The files above are the complete substitute set.

Visible differences from Mia's `shots/`:

- All desktop states: the fixture account is neutral `demo`; the existing shell renders logout as a blue underlined action. Shared shell files were not changed.
- All list states at both widths: readings appear below the word as explicitly requested, while Mia's shots show them inline. Japanese rows become taller and later rows move down. Source credits truncate at different characters, especially at 1440. Some counts use UI text where the mockup uses mono spans, changing spacing.
- `preview` and `preview-v2`: those row-height changes move the new-card group and extend the full-page image. The existing fixed dock can cover a different row. Detailed v2 copy and badges are present.
- `all-new`: reading lines move later cards down and increase page height.
- `errors`: Japanese rows change height; source/error lines wrap at different points. Generic errors remain generic without optional error fields.
- `over-limit`: reading lines shift the cut marker and following rows down; the fixed dock therefore covers different content.
- `loading`: the reduced-motion capture shows a dotted indeterminate line instead of the animated segment visible in Mia's shot. Skeleton widths and pending-row spacing differ slightly.
- `importing`: the same progress-line difference and reading-driven row shifts apply.
- `done`: result rows are taller; the disclosure uses the import component's spacing rather than the shared mockup disclosure's lower rule and padding. Link wrapping and summary height differ slightly.
- `done-partial`: retry and review links follow the approved grouping; Japanese failed rows are taller. Disclosure padding/lower rule and summary/action spacing still differ slightly.
- `server-error`: retained rows are taller. Mono emphasis on the retained count and some paragraph spacing differ; the safety meaning and unknown-result status match.
- `empty`: the final hint starts with an 8px paragraph margin rather than the mockup's 16px instruction margin, making the sheet slightly shorter.

Known API gap: the merged backend supplies `first_index` and `decks[]`, but does not supply `error_code`/`error_field`. Real responses therefore keep generic error reasons. The development preview-v2 fixture demonstrates field-specific copy without inventing fields in production.

Files outside the import route/components:

- Import-only tests/tooling: `mockup/tests/e2e/yn3_import.mjs`, `yn3_visual.mjs`, `yn3_compare.py`.
- Reports: `YN3-UI-FD-report.md`, this report.
- Required merge: `anki_server/src/routes/yoin_import.rs`, `anki_server/tests/yoin_import.rs`, `anki_server/tests/fixtures/ferdinand-preview.json`, `YN3-FIELDS2-report.md`, `yn3-api-contract.updated.md`.
- No shared tokens, shell, fonts, layout, package files, or unrelated routes changed in this revision.

All task servers were stopped. The e2e removes its temporary account/data and stops both servers; the visual Vite session was stopped separately.
