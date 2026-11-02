# Ferdinand `POST /api/import/yoin` — import contract (final 2026-11-02)

Source of truth: `/workspace/repos/ferdinand/.worktrees/yn3-fields/anki_server/src/routes/yoin_import.rs` (structs `ImportRequest`, `Item`, `ItemResult`, `ImportResponse`). Status: implemented and covered by server/client tests.

## Request
`{ "items": [StagedChunk, ...1..100], "dry_run": true|false }`, same-origin session, logged-in user.
Each item: `id, origin, lang ("en"|"ja"), chunk, sentence, reading (ja only), phonetic?, pos?, meaning_zh, meaning_target, example, source{platform ("youtube"|"netflix"|"hbomax"|"lrclib"), source_id, source_title, episode?, start_sec?, jump_url? (HTTPS, platform host only)}, created_at`, optional `status/exported_at/remote_id` (ignored).

phonetic and pos may be omitted, null, or empty strings on the server; Yoin emits omitted or string values. Each is limited to 500 UTF-8 bytes, HTML-escaped, and stored separately. Nonempty values must contain non-whitespace text. Text rejects control characters except newline/tab. Neither field enters the Yoin identity hash. dry_run defaults to false. Unknown item/request/source fields are rejected.

Other UTF-8 byte limits: chunk/reading/source_title 500; sentence/meaning_zh/meaning_target/example 2000; source_id/episode 256; created_at/exported_at/remote_id 64; jump_url 2048. Required text must be nonblank. id is 64 lowercase SHA-256 hex characters; origin is yoin. start_sec must be finite and nonnegative.

## Response (dry_run and real import share one shape)
```json
{
  "dry_run": true,
  "results": [
    { "index": 0, "status": "would_create",    "deck": "Yoin::English" },
    { "index": 1, "status": "duplicate",       "deck": "Yoin::日本語", "note_id": "1730512345678" },
    { "index": 2, "status": "would_duplicate", "deck": "Yoin::English", "first_index": 0 },
    { "index": 3, "status": "error",           "error": "invalid source or unapproved HTTPS link" }
  ],
  "decks": [
    { "name": "Yoin::English", "exists": false, "would_create": true },
    { "name": "Yoin::日本語", "exists": true, "would_create": false }
  ]
}
```
- `index`: position in the request `items` array. The response does NOT echo card text; the preview page already holds the items (from the handoff) and joins by `index`.
- `status` values:
  - dry run: `would_create` (new card), `would_duplicate` (same Yoin id appears twice in this batch; only the first is created), `duplicate` (already in Ferdinand), `error`.
  - real import: `created`, `duplicate`, `error`.
- `deck`: `Yoin::English` (lang en) or `Yoin::日本語` (lang ja); auto-created on first real import. Absent when the item failed validation; present for filtered-deck and note-creation errors.
- `note_id`: string, present for `duplicate` and `created`.
- `first_index` (optional): zero-based index of the first `would_create` with the same GUID in dry-run, or the earlier successfully `created` item in this real request. Omitted for pre-existing duplicates, errors, and first occurrences. Invalid or failed items do not occupy this position. Existing statuses are unchanged.
- `decks` (optional top-level array): one entry per target sub-deck touched by valid items, in first-seen order; excludes the parent `Yoin` and invalid items. Each entry has `name` and `exists` (whether it existed when the request started). Dry-run includes `would_create`, true only when absent and at least one `would_create` item targets it, and omits `created`. Real import includes `created`, true only if this request created the deck, and omits `would_create`. A deck can be created even if all its notes subsequently fail. A duplicate alone does not create a missing target deck.
- `error`: short fixed English reason, one of: `invalid item shape`, `id must be a lowercase SHA-256 hex string`, `invalid origin or language`, `cannot import into a filtered deck`, `missing, oversized, or invalid text field`, `invalid source or unapproved HTTPS link`, `unable to create note`. UI should map these to friendly zh text.
- Whole-batch failures are HTTP errors, not per-item: 403 bad/missing Origin, 400 `invalid JSON request`, 400 `items must contain 1 to 100 entries`, 400 `Concept-Deep notetype required`, 401 `not logged in`; 400 `Concept-Deep missing field: <name>`. HTTP error JSON is `{status: number, message: string}`. Bad/missing Origin message: `same-origin Origin header required`. Unexpected collection/storage failures return 500 `internal server error`; collection-open retry failures may return 503 with Retry-After. Content-Type must be application/json; extractor errors map to 400 `invalid JSON request`. HTTPS Origin must exactly match Host; HTTP is allowed only for localhost/127.0.0.1/[::1].

## Card the import creates (notetype Concept-Deep)
Front = chunk / sentence / reading (lines); Back = meaning_zh, blank line, meaning_target; Phonetic = phonetic (or empty); PartOfSpeech = pos (or empty); Example = example; Source = platform, source_id, title, episode, start time ("N s"), capture time, link 「來源」. Tags `origin::yoin`, `lang::en|ja`. Re-sending never overwrites an existing card.

The idempotent Concept-Deep upgrade appends missing Phonetic/PartOfSpeech fields. Existing fields, templates, note contents and card scheduling are preserved. Templates do not reference either new field. dry_run does not create notes or decks. Same-id imports preserve existing edits and scheduling; a deleted note can be recreated. Approved jump hosts: youtube.com/www.youtube.com/m.youtube.com/youtu.be and netflix.com/www.netflix.com, HTTPS only, no credentials or non-443 port. HBO Max/LRCLIB do not accept jump_url.

Import is per-item, not atomic. A timeout or HTTP 500 may occur after partial writes. Retrying the same items with the same IDs is safe: existing GUIDs return duplicate without overwriting edits or scheduling, and remaining items can be created. Retry responses need not match the original response. Deleted notes can be recreated.
