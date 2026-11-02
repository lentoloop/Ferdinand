<script lang="ts">
  import type { ApiCardSummary } from "$lib/api";
  import { plain } from "../review/fields";
  let {
    rows,
    selected,
    onselect,
  }: {
    rows: ApiCardSummary[];
    selected?: number;
    onselect: (card: ApiCardSummary) => void;
  } = $props();
</script>

<div class="paper results" data-component="ResultList">
  {#each rows as row (row.id)}<button
      class="result-row"
      aria-pressed={row.id === selected}
      onclick={() => onselect(row)}
      ><span class="r-main"
        ><span class="r-term">{plain(row.front_html)}</span><span
          class="r-gloss">{plain(row.back_html)}</span
        ></span
      ><span class="r-deck">{row.deck_name.split("::").at(-1)}</span><span
        class="r-state"
        >{{
          new: "新卡",
          learning: "學習中",
          review: "複習",
          suspended: "已暫停",
        }[row.state]}</span
      ></button
    >{/each}
</div>

<style>
  .results {
    padding: 4px 16px 12px;
  }
  .result-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    width: 100%;
    min-height: 72px;
    padding: 10px 0;
    border-bottom: 1px solid var(--hairline);
    text-align: left;
  }
  .result-row[aria-pressed="true"] {
    box-shadow: inset 3px 0 var(--accent);
  }
  .result-row[aria-pressed="true"] .r-main {
    padding-left: 12px;
  }
  .r-main {
    min-width: 0;
  }
  .r-term {
    display: block;
    font: 18px/30px var(--font-book);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .r-gloss {
    display: block;
    font: 14px/22px var(--font-ui);
    color: var(--secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .r-deck {
    display: none;
  }
  .r-state {
    font-size: 14px;
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .result-row {
      grid-template-columns: minmax(0, 1fr) 90px 56px;
      min-height: 64px;
    }
    .r-deck {
      display: block;
      font-size: 14px;
      color: var(--secondary);
    }
  }
</style>
