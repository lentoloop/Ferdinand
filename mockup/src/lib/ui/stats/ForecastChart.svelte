<script lang="ts">
  import PrintedLine from "./PrintedLine.svelte";
  let { values, dates }: { values: number[]; dates: string[] } = $props();
</script>

<section class="stat-plain" data-component="ForecastChart">
  <h2>未來 30 天到期</h2>
  <p class="caption">
    今天 {values[0] ?? 0} 張，之後每天約 {Math.round(
      values.slice(1).reduce((a, b) => a + b, 0) /
        Math.max(1, values.length - 1),
    )} 張；曲線為 5 天平滑。
  </p>
  <PrintedLine {values} {dates} label="未來 30 天到期" />
</section>

<style>
  .stat-plain {
    padding: 24px 0;
    border-top: 1px solid var(--hairline);
    min-width: 0;
  }
  h2 {
    font: 500 16px/26px var(--font-ui);
  }
  .caption {
    font-size: 14px;
    color: var(--secondary);
  }
  @media (max-width: 999px) {
    .stat-plain {
      padding: 16px 0;
    }
  }
</style>
