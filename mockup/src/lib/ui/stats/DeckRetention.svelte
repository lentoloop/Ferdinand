<script lang="ts">
  let { rows }: { rows: { name: string; pct: number }[] } = $props();
</script>

{#if rows.length}<section class="stat-plain" data-component="DeckRetention">
    <h2>各牌組保留率</h2>
    <ul>
      {#each rows as row}<li>
          <span>{row.name}</span><span class="track"
            ><span style:width={`${row.pct}%`}></span></span
          ><span class="mono">{row.pct.toFixed(1)}%</span>
        </li>{/each}
    </ul>
  </section>{/if}

<style>
  .stat-plain {
    grid-column: 1/-1;
    padding: 24px 0;
    border-top: 1px solid var(--hairline);
  }
  h2 {
    font: 500 16px/26px var(--font-ui);
  }
  li {
    display: grid;
    grid-template-columns: 112px 1fr 64px;
    gap: 16px;
    align-items: center;
    min-height: 44px;
  }
  .track {
    height: 8px;
    background: var(--hairline);
  }
  .track span {
    display: block;
    height: 8px;
    background: var(--bar-ink);
  }
  @media (min-width: 1000px) {
    li {
      grid-template-columns: 160px 1fr 64px;
      gap: 24px;
    }
  }
</style>
