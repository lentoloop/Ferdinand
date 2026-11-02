<script lang="ts">
  import ResultList from "./ResultList.svelte";
  import type { ApiCardSummary } from "$lib/api";
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

<div data-component="ResultTable">
  <div class="head"><span>卡片</span><span>牌組</span><span>狀態</span></div>
  <ResultList {rows} {selected} {onselect} />
</div>

<style>
  .head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 90px 56px;
    gap: 12px;
    margin: 0 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--rule-soft);
    font-size: 14px;
    color: var(--secondary);
  }
</style>
