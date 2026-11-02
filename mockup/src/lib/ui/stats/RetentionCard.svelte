<script lang="ts">
  let {
    pct,
    target,
    delta,
  }: { pct: number | null; target?: number; delta?: number } = $props();
</script>

<article class="paper stat-card" data-component="RetentionCard">
  <h2>真實保留率</h2>
  <p class="figure">
    {pct === null ? "—" : pct.toFixed(1)}<span class="unit">%</span>
  </p>
  {#if pct !== null}<p class="caption">
      {#if target !== undefined}目標 {target}%{/if}{#if delta !== undefined}　{delta >
        0
          ? "+"
          : ""}{delta}%{/if}
    </p>{/if}
</article>

<style>
  .stat-card {
    padding: 24px 24px 28px;
    margin-bottom: 24px;
  }
  h2 {
    font: 500 16px/26px var(--font-ui);
  }
  .figure {
    margin-top: 8px;
  }
  .caption {
    font-size: 14px;
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .stat-card {
      padding: 32px;
      min-height: 234px;
      margin-bottom: 32px;
      grid-column: 1;
      grid-row: 1;
    }
  }
</style>
