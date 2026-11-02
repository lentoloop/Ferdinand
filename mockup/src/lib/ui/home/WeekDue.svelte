<script lang="ts">
  import PrintedLine from "../stats/PrintedLine.svelte";
  let { values }: { values: number[] } = $props();
</script>

<figure class="week" data-component="WeekDue">
  <figcaption class="label">接下來 7 天到期</figcaption>
  <PrintedLine
    {values}
    dates={values.map((_, i) =>
      i === 0
        ? "今天"
        : new Date(Date.now() + i * 86400000).toLocaleDateString("zh-TW", {
            weekday: "narrow",
          }),
    )}
    label="接下來 7 天到期"
    smooth={false}
    compact
  />
</figure>

<style>
  .week {
    display: none;
  }
  @media (min-width: 1000px) {
    .week {
      display: block;
      grid-area: week;
      align-self: end;
      min-width: 0;
      padding-left: 40px;
      border-left: 1px solid var(--hairline);
    }
  }
</style>
