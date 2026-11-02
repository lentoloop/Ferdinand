<script lang="ts">
  import Patch from "../paper/Patch.svelte";
  import WeekDue from "./WeekDue.svelte";
  let {
    totals,
    firstDeck,
    values = [],
  }: {
    totals: { n: number; l: number; r: number };
    firstDeck?: { id: number; name: string };
    values?: number[];
  } = $props();
</script>

<article class="paper cover-card" data-component="CoverCard">
  <p class="label">今日待複習</p>
  <p class="cover-num figure">
    <Patch>{totals.n + totals.l + totals.r}</Patch><span class="unit">張</span>
  </p>
  <p class="split">
    <span>新卡<b>{totals.n}</b></span><span>學習中<b>{totals.l}</b></span><span
      >複習<b>{totals.r}</b></span
    >
  </p>
  <div class="action">
    {#if firstDeck}<a class="primary" href={`/study/${firstDeck.id}`}
        >開始複習</a
      >
      <p class="hint">從 {firstDeck.name.split("::").at(-1)} 開始。</p>{:else}<a
        class="primary"
        href="/notes/new">新增筆記</a
      >{/if}
  </div>
  <WeekDue {values} />
</article>

<style>
  .cover-card {
    padding: 28px 24px 24px;
  }
  .cover-num {
    margin-top: 8px;
  }
  .split {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
    margin-top: 8px;
  }
  .split b {
    font: 400 16px var(--font-mono);
    margin-left: 6px;
  }
  .action {
    margin-top: 28px;
  }
  .hint {
    margin-top: 8px;
  }
  @media (min-width: 1000px) {
    .cover-card {
      display: grid;
      grid-template-columns: 296px minmax(0, 1fr);
      grid-template-areas: "label week" "num week" "split week" "act week";
      gap: 0 64px;
      padding: 36px 40px;
    }
    .label {
      grid-area: label;
    }
    .cover-num {
      grid-area: num;
    }
    .split {
      grid-area: split;
    }
    .action {
      grid-area: act;
    }
  }
</style>
