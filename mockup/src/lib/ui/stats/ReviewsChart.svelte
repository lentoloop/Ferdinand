<script lang="ts">
  import { onMount } from "svelte";
  import PrintedBars from "./PrintedBars.svelte";
  let { values, dates }: { values: number[]; dates: string[] } = $props();
  let phone = $state(false);
  onMount(() => {
    phone = window.innerWidth < 1000;
  });
  let shown = $derived(phone ? values.slice(-14) : values);
  let labels = $derived(phone ? dates.slice(-14) : dates);
</script>

<svelte:window onresize={() => (phone = window.innerWidth < 1000)} />
<section class="stat-plain" data-component="ReviewsChart">
  <h2>最近 {shown.length} 天複習量</h2>
  <p class="caption">
    每天平均 {Math.round(
      shown.reduce((a, b) => a + b, 0) / Math.max(1, shown.length),
    )} 張
  </p>
  <PrintedBars
    values={shown}
    dates={labels}
    nowIndex={shown.length - 1}
    label={`最近 ${shown.length} 天每天複習張數`}
  />
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
