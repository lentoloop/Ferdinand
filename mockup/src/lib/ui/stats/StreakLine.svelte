<script lang="ts">
  let {
    days,
    longest,
    lastBreak,
  }: { days: number; longest?: number; lastBreak?: string } = $props();
</script>

<section class="paper streak-card" data-component="StreakLine">
  <h2>連續複習</h2>
  <p class="figure">{days}<span class="unit">天</span></p>
  <p class="caption">
    {#if longest !== undefined}最近 30 天最長 {longest} 天。{/if}{#if lastBreak}上一次中斷在
      {lastBreak}。{/if}
  </p>
</section>

<style>
  .streak-card {
    padding: 24px 0;
    border-top: 1px solid var(--hairline);
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
    margin-top: 4px;
  }
  @media (max-width: 999px) {
    .streak-card::before,
    .streak-card::after {
      display: none;
    }
  }
  @media (min-width: 1000px) {
    .streak-card {
      grid-column: 2;
      grid-row: 1;
      padding: 32px;
      min-height: 234px;
      margin-bottom: 32px;
      border: 0;
    }
    .caption {
      font-size: 16px;
    }
  }
</style>
