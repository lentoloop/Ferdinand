<script lang="ts">
  import type { ApiDeckSummary } from "$lib/api";
  let { deck }: { deck: ApiDeckSummary } = $props();
</script>

<a class="deck-row" data-component="DeckRow" href={`/study/${deck.id}`}
  ><div>
    <p class="deck-name">{deck.name.split("::").at(-1)}</p>
    <p class="deck-path">{deck.name.split("::").slice(0, -1).join(" / ")}</p>
  </div>
  <div class="deck-counts">
    <span>新 <b>{deck.new_count}</b></span><span
      >學習中 <b>{deck.learn_count}</b></span
    ><span>複習 <b>{deck.review_count}</b></span>
  </div>
  <span class="deck-go">複習</span></a
>

<style>
  .deck-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0 12px;
    align-items: center;
    min-height: 88px;
    padding: 12px 0;
    border-bottom: 1px solid var(--hairline);
    color: var(--ink);
  }
  .deck-row:last-child {
    border: 0;
  }
  .deck-name {
    font: 400 18px/30px var(--font-book);
    overflow-wrap: anywhere;
  }
  .deck-path {
    font-size: 14px;
    color: var(--secondary);
  }
  .deck-counts {
    display: flex;
    flex-wrap: wrap;
    gap: 0 16px;
    font-size: 14px;
    color: var(--secondary);
  }
  b {
    font: 400 15px var(--font-mono);
    color: var(--ink);
  }
  .deck-go {
    grid-row: 1 / span 2;
    grid-column: 2;
    color: var(--ink-3);
    min-height: 44px;
    display: flex;
    align-items: center;
    text-decoration: underline;
  }
  @media (min-width: 1000px) {
    .deck-row {
      grid-template-columns: minmax(0, 1fr) auto 64px;
      gap: 24px;
      min-height: 76px;
    }
    .deck-counts {
      display: grid;
      grid-template-columns: 56px 88px 72px;
      text-align: right;
    }
    .deck-go {
      grid-row: auto;
      grid-column: auto;
      justify-content: end;
    }
    .deck-name {
      font-size: 20px;
    }
  }
</style>
