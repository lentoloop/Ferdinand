<script lang="ts">
  import ImportRow from "./ImportRow.svelte";
  import type { ImportItem, ItemResult } from "./model";
  let {
    title,
    results,
    items,
    note = "",
    uniform = false,
    indexed = false,
    cutTotal,
  }: {
    title: string;
    results: ItemResult[];
    items: ImportItem[];
    note?: string;
    uniform?: boolean;
    indexed?: boolean;
    cutTotal?: number;
  } = $props();
</script>

<section class="imp-group">
  <div class="imp-group-h">
    <h2>
      {title}<span class="mono">{cutTotal ? 100 : results.length}</span><span
        class="unit">張</span
      >{#if uniform}<span class="imp-group-aside">全部新增</span>{/if}
    </h2>
  </div>
  {#if note}<p class="imp-group-note">{note}</p>{/if}
  <ul
    class="imp-rows"
    data-variant={indexed ? "indexed" : uniform ? "uniform" : undefined}
  >
    <li class="imp-head" aria-hidden="true">
      <span>語塊</span><span>來源</span>{#if !uniform}<span>{cutTotal ? "去向" : "結果"}</span>{/if}
    </li>
    {#each results as result}{#if cutTotal && result.index === 100}<li
          class="imp-cut"
          role="separator"
          aria-label={`以下 ${cutTotal - 100} 張留在 Yoin`}
        >
          以下 {cutTotal - 100} 張留在 Yoin
        </li>{/if}{#if items[result.index]}<ImportRow
          item={items[result.index]}
          {result}
          {items}
          {uniform}
          index={indexed ? result.index + 1 : undefined}
        />{/if}{/each}
  </ul>
</section>

<style>
  .imp-group + :global(.imp-group) {
    margin-top: 24px;
  }
  .imp-group-h {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0 16px;
    min-height: 48px;
  }
  .imp-group-h h2 {
    font: 500 16px/26px var(--font-ui);
  }
  .imp-group-h h2 .mono {
    font-weight: 400;
    margin-left: 8px;
  }
  .imp-group-h h2 .unit {
    font-weight: 400;
    font-size: 14px;
    color: var(--secondary);
    margin-left: 4px;
  }
  .imp-group-note {
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
    padding-bottom: 8px;
  }
  .imp-rows {
    border-top: 1px solid var(--rule-soft);
  }
  .imp-head {
    display: none;
  }
  .imp-cut {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding-top: 6px;
    border-top: 1px solid var(--accent);
    border-bottom: 1px solid var(--hairline);
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    color: var(--accent);
  }
  .imp-group-aside {
    margin-left: 12px;
    font-weight: 400;
    font-size: 14px;
    color: var(--ink-2);
  }
  @media (min-width: 1000px) {
    .imp-rows {
      border-top: 0;
    }
    .imp-head {
      grid-template-columns: minmax(0, 1fr) 248px 120px;
      column-gap: 24px;
    }
    .imp-head {
      display: grid;
      align-items: center;
      min-height: 44px;
      border-bottom: 1px solid var(--rule-soft);
      font-size: 14px;
      line-height: 22px;
      color: var(--secondary);
    }
    :global(.imp-rows[data-variant="indexed"]) .imp-head {
      padding-left: 64px;
    }
    :global(.imp-rows[data-variant="indexed"]) .imp-head {
      grid-template-columns: 40px minmax(0, 1fr) 248px 120px;
    }
    :global(.imp-rows[data-variant="indexed"]) .imp-head {
      grid-template-columns: minmax(0, 1fr) 248px 120px;
    }
    :global(.imp-rows[data-variant="uniform"]) .imp-head {
      grid-template-columns: minmax(0, 1fr) 248px;
    }
    .imp-cut {
      padding-left: 64px;
    }
  }
</style>
