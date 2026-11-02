<script lang="ts">
  import { trend, smoothPath } from "./chart";
  let {
    values,
    dates,
    label,
    smooth = true,
    compact = false,
  }: {
    values: number[];
    dates: string[];
    label: string;
    smooth?: boolean;
    compact?: boolean;
  } = $props();
  let width = $state(600),
    active = $state(0);
  let height = $derived(Math.round(width * (compact ? 96 / 480 : 160 / 600)));
  let plotted = $derived(smooth ? trend(values) : values);
  let max = $derived(Math.max(1, ...values));
  let points = $derived(
    plotted.map((v, i): [number, number] => [
      6 + (i * (width - 12)) / Math.max(1, values.length - 1),
      height - 4 - (v / max) * (height - 12),
    ]),
  );
  let path = $derived(smoothPath(points));
</script>

<div
  class="chart"
  class:compact
  data-component="PrintedLine"
  bind:clientWidth={width}
>
  <svg
    viewBox={`0 -16 ${width} ${height + 17}`}
    role="img"
    aria-label={smooth ? `${label}，曲線為 5 天平滑` : label}
  >
    {#if points.length && !compact}<path
        class="area"
        d={`${path} L${points.at(-1)?.[0]},${height} L6,${height} Z`}
      />{/if}
    {#each compact ? [] : [50, 100].filter((t) => t <= max) as tick}<line
        class="grid"
        x1="0"
        x2={width}
        y1={height - 4 - (tick / max) * (height - 12)}
        y2={height - 4 - (tick / max) * (height - 12)}
      /><text
        class="grid-label"
        x={width - 8}
        y={height - 8 - (tick / max) * (height - 12)}
        text-anchor="end">{tick}</text
      >{/each}
    <line
      class="baseline"
      x1="0"
      x2={width}
      y1={height + 0.5}
      y2={height + 0.5}
    /><path class="line" d={path} />
    {#each points as p, i}{#if compact}<circle
          class="dot"
          cx={p[0]}
          cy={p[1]}
          r="2.5"
        />{:else}<rect
          role="presentation"
          class="hit"
          x={p[0] - width / values.length / 2}
          y="-16"
          width={width / values.length}
          height={height + 16}
          onpointerenter={() => (active = i)}
        />{/if}{/each}
    {#if points.length && !compact}<line
        class="today-tick"
        x1={points[0][0]}
        x2={points[0][0]}
        y1={points[0][1]}
        y2={height}
      /><circle class="today" cx={points[0][0]} cy={points[0][1]} r="4" />{/if}
  </svg>
  <div class="axis">
    {#if compact}{#each dates as date}<span>{date}</span>{/each}{:else}<span
        >{dates[0]}</span
      ><span>{dates[Math.floor(dates.length / 2)]}</span><span
        >{dates.at(-1)}</span
      >{/if}
  </div>
  {#if !compact}<p class="readout" role="status">
      {active === 0 ? "今天 " : ""}{dates[active] ?? ""}：{values[active] ?? 0} 張
    </p>{/if}
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
    min-width: 0;
  }
  svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .line {
    fill: none;
    stroke: var(--chart-line);
    stroke-width: 1.25;
    vector-effect: non-scaling-stroke;
  }
  .area {
    fill: var(--accent);
    opacity: 0.06;
  }
  .today {
    fill: var(--accent);
  }
  .grid {
    stroke: var(--hairline);
    stroke-width: 1;
  }
  .grid-label {
    font: 14px var(--font-ui);
    fill: var(--secondary);
    stroke: var(--page);
    stroke-width: 3px;
    paint-order: stroke;
  }
  .baseline {
    stroke: var(--ink);
    stroke-width: 1;
  }
  .hit {
    fill: transparent;
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
  .dot {
    fill: var(--ink);
  }
  .today-tick {
    stroke: var(--accent);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }
  .compact .line {
    stroke: var(--ink);
  }
</style>
