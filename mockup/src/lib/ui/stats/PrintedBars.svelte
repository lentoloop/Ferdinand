<script lang="ts">
  let {
    values,
    dates,
    nowIndex,
    label,
  }: { values: number[]; dates: string[]; nowIndex: number; label: string } =
    $props();
  let width = $state(600),
    active = $state(0);
  let slot = $derived(width / Math.max(1, values.length));
  let max = $derived(Math.max(1, ...values));
  let height = $derived(Math.round((width * 160) / 600));
  let average = $derived(
    values.reduce((a, b) => a + b, 0) / Math.max(1, values.length),
  );
</script>

<div class="chart" data-component="PrintedBars" bind:clientWidth={width}>
  <svg viewBox={`0 0 ${width} ${height + 25}`} role="img" aria-label={label}
    ><line
      class="avg"
      x1="0"
      x2={width}
      y1={height - (average / max) * (height - 12)}
      y2={height - (average / max) * (height - 12)}
    />{#each values as value, i}<rect
        role="presentation"
        class="hit"
        x={i * slot}
        y="0"
        width={slot}
        {height}
        onpointerenter={() => (active = i)}
      />{#if value}<rect
          class="bar"
          class:today={i === nowIndex}
          x={i * slot + (slot - Math.round(slot * 0.6)) / 2}
          y={height - (value / max) * (height - 12)}
          width={Math.round(slot * 0.6)}
          height={(value / max) * (height - 12)}
        />{:else}<line
          class="rest"
          x1={(i + 0.5) * slot}
          x2={(i + 0.5) * slot}
          y1={height - 15}
          y2={height}
        /><text
          class="rest-label"
          x={(i + 0.5) * slot}
          y={height + 22}
          text-anchor="middle">休息</text
        >{/if}{/each}<line
      class="baseline"
      x1="0"
      x2={width}
      y1={height + 0.5}
      y2={height + 0.5}
    /></svg
  >
  <div class="axis"><span>{dates[0]}</span><span>{dates.at(-1)}</span></div>
  <p class="readout" role="status">
    {dates[active] ?? ""}：{values[active] ?? 0} 張
  </p>
  <table class="vh">
    <caption>{label}</caption><tbody
      >{#each values as v, i}<tr><th>{dates[i]}</th><td>{v}</td></tr
        >{/each}</tbody
    >
  </table>
</div>

<style>
  .chart {
    position: relative;
    margin-top: 16px;
  }
  svg {
    width: 100%;
    height: auto;
  }
  .bar {
    fill: var(--bar-ink);
    pointer-events: none;
  }
  .bar.today {
    fill: var(--accent);
  }
  .hit {
    fill: transparent;
  }
  .hit:hover + .bar {
    fill: var(--ink);
  }
  .baseline {
    stroke: var(--ink);
    stroke-width: 1;
  }
  .avg {
    stroke: var(--control-edge);
    stroke-width: 1;
    stroke-dasharray: 4 4;
  }
  .rest {
    stroke: var(--rule);
    stroke-dasharray: 1 3;
  }
  .rest-label {
    font: 14px var(--font-ui);
    fill: var(--secondary);
  }
  .axis {
    display: flex;
    justify-content: space-between;
  }
  .axis,
  .readout {
    font: 14px/22px var(--font-mono);
    color: var(--secondary);
  }
  .readout {
    margin-top: 8px;
    color: var(--ink);
  }
  .vh {
    left: 0;
    bottom: 0;
  }
  @media (max-width: 999px) {
    .chart {
      margin-top: 8px;
    }
  }
</style>
