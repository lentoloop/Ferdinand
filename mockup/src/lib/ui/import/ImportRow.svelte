<script lang="ts">
  import type { ImportItem, ItemResult } from "./model";
  import { status, errorText, errorAction, firstIndex } from "./model";
  import RepeatReason from "./RepeatReason.svelte";
  let {
    item,
    result,
    items = [],
    index,
    uniform = false,
  }: {
    item: ImportItem;
    result: ItemResult;
    items?: ImportItem[];
    index?: number;
    uniform?: boolean;
  } = $props();
  let st = $derived(status(result.status));
  let credit = $derived(
    [
      {
        youtube: "YouTube",
        netflix: "Netflix",
        hbomax: "HBO Max",
        lrclib: "LRCLIB",
      }[item.source.platform] || item.source.platform,
      item.source.source_title,
      item.source.episode,
      item.source.start_sec === undefined
        ? ""
        : `${String(Math.floor(item.source.start_sec / 60)).padStart(2, "0")}:${String(Math.floor(item.source.start_sec % 60)).padStart(2, "0")}`,
    ]
      .filter(Boolean)
      .join("｜"),
  );
</script>

<li class="imp-row" data-component="ImportRow" data-status={result.status}>
  {#if index !== undefined}<span class="imp-idx mono">{index}</span>{/if}
  <div class="imp-main">
    <p class="imp-chunk" lang={item.lang}>
      {item.chunk}{#if item.reading}<span class="imp-reading">
          {item.reading}</span
        >{/if}
    </p>
    <p class="imp-mean">
      {#if item.meaning_zh}{item.meaning_zh}{:else}<span class="imp-blank"
          >（沒有中文意思）</span
        >{/if}
    </p>
  </div>
  <p class="imp-src mono" title={credit}>{credit}</p>
  {#if !uniform}<p class="imp-st" data-st={st.shape}>
      <span class="st-mark" data-st={st.shape} aria-hidden="true"></span><span
        >{st.word}</span
      >{#if result.status === "pending"}<span class="skel" aria-hidden="true"></span>{/if}{#if result.status === "duplicate" && result.note_id && firstIndex(items, result) === undefined}<a
          class="textlink imp-st-link"
          href={`/browse?note=${encodeURIComponent(result.note_id)}`}
          >查看已有的卡片</a
        >{/if}
    </p>{/if}
  {#if result.status === "error"}<p class="imp-why">
      <span class="imp-why-zh">{errorText(result.error)}。</span>{errorAction(
        result.error,
      )}
    </p>
  {:else if result.status === "would_duplicate" || (result.status === "duplicate" && firstIndex(items, result) !== undefined)}<p
      class="imp-why"
    >
      <RepeatReason firstIndex={firstIndex(items, result)} />
    </p>
  {:else if result.status === "duplicate"}<p class="imp-why">
      Ferdinand 已有這張卡片，不會覆寫。{#if result.note_id}<a
          class="textlink imp-why-link"
          href={`/browse?note=${encodeURIComponent(result.note_id)}`}
          >查看已有的卡片</a
        >{/if}
    </p>{/if}
</li>

<style>
  .imp-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "main st" "src src" "why why";
    column-gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--hairline);
  }
  .imp-row:last-child {
    border-bottom: 0;
  }
  .imp-main {
    grid-area: main;
    min-width: 0;
  }
  .imp-chunk {
    font: 400 18px/30px var(--font-book);
    overflow-wrap: anywhere;
  }
  .imp-chunk[lang="ja"] {
    font-family: var(--font-book-ja);
  }
  .imp-reading {
    margin-left: 10px;
    font: 400 14px/22px var(--font-ui);
    color: var(--secondary);
    white-space: nowrap;
  }
  .imp-mean {
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .imp-blank {
    color: var(--secondary);
  }
  .imp-src {
    grid-area: src;
    min-width: 0;
    margin-top: 2px;
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .imp-st {
    grid-area: st;
    display: flex;
    align-items: baseline;
    gap: 8px;
    align-self: start;
    padding-top: 4px;
    font-size: 14px;
    line-height: 22px;
    white-space: nowrap;
    color: var(--ink-2);
  }
  .imp-st[data-st="new"],
  .imp-st[data-st="done"] {
    color: var(--ink);
  }
  .imp-st[data-st="error"] {
    color: var(--again);
    font-weight: 500;
  }
  .imp-why {
    grid-area: why;
    margin-top: 6px;
    font-size: 14px;
    line-height: 22px;
    color: var(--ink-2);
  }
  .imp-why-zh {
    color: var(--again);
    font-weight: 500;
  }
  .imp-why .textlink {
    font-size: 14px;
    vertical-align: middle;
    margin: -11px 0;
  }
  .imp-st-link {
    display: none;
  }
  .imp-idx {
    grid-area: idx;
    font-size: 14px;
    line-height: 30px;
    color: var(--secondary);
  }
  :global(.imp-rows[data-variant="indexed"]) .imp-row {
    grid-template-columns: 40px minmax(0, 1fr) auto;
    grid-template-areas: "idx main st" ". src src" ". why why";
  }
  .imp-row[data-status="held"] .imp-chunk,
  .imp-row[data-status="held"] .imp-st {
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .imp-row {
      grid-template-columns: minmax(0, 1fr) 248px 120px;
      column-gap: 24px;
    }
    .imp-row {
      grid-template-areas: "main src st" "why why .";
      align-items: start;
      padding: 14px 0;
    }
    .imp-src {
      margin-top: 0;
      padding-top: 4px;
    }
    .imp-st:has(.imp-st-link) {
      flex-wrap: wrap;
      row-gap: 0;
    }
    .imp-st .imp-st-link {
      display: inline-flex;
      flex-basis: 100%;
      margin: -11px 0 0;
      padding-left: 17px;
      font-size: 14px;
      font-weight: 400;
    }
    .imp-why .imp-why-link {
      display: none;
    }
    :global(.imp-rows[data-variant="indexed"]) .imp-row {
      grid-template-columns: 40px minmax(0, 1fr) 248px 120px;
    }
    :global(.imp-rows[data-variant="indexed"]) .imp-row {
      grid-template-areas: "idx main src st" ". why why .";
    }
    :global(.imp-rows[data-variant="uniform"]) .imp-row {
      grid-template-columns: minmax(0, 1fr) 248px;
    }
    :global(.imp-rows[data-variant="uniform"]) .imp-row {
      grid-template-areas: "main src";
    }
  }

  .imp-reading {
    font: 400 14px/22px var(--font-ui);
    color: var(--secondary);
  }
</style>
