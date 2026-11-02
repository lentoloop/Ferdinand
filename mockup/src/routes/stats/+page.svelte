<script lang="ts">
  import {
    capabilities,
    fetchTrueRetention,
    fetchDeckRetention,
    type RetentionSummary,
    type DeckRetentionRow,
  } from "$lib/ui/browse/client";
  import { onMount } from "svelte";
  import { fetchForecast, fetchStatsRecent } from "$lib/api";
  import { streaks } from "$lib/ui/stats/chart";
  import RetentionCard from "$lib/ui/stats/RetentionCard.svelte";
  import ForecastChart from "$lib/ui/stats/ForecastChart.svelte";
  import ReviewsChart from "$lib/ui/stats/ReviewsChart.svelte";
  import DeckRetention from "$lib/ui/stats/DeckRetention.svelte";
  import StreakLine from "$lib/ui/stats/StreakLine.svelte";
  let forecast = $state<number[]>([]),
    reviews = $state<number[]>([]),
    dates = $state<string[]>([]),
    loading = $state(true),
    error = $state("");
  let retention = $state<RetentionSummary | null>(null),
    deckRetention = $state<DeckRetentionRow[]>([]);
  let streak = $derived(streaks(reviews));
  let nextDates = $derived(
    forecast.map((_, i) =>
      new Date(Date.now() + i * 86400000).toLocaleDateString("sv-SE").slice(5),
    ),
  );
  onMount(() => {
    void load();
  });
  async function load() {
    loading = true;
    error = "";
    try {
      const [f, r, ret, byDeck] = await Promise.all([
        fetchForecast(30),
        fetchStatsRecent(30),
        capabilities.trueRetention
          ? fetchTrueRetention()
          : Promise.resolve(null),
        capabilities.deckRetention ? fetchDeckRetention() : Promise.resolve([]),
      ]);
      retention = ret;
      deckRetention = byDeck;
      forecast = f.history.map((x) => x.reviews);
      reviews = r.history.map((x) => x.reviews);
      dates = r.history.map((x) => x.date.slice(5));
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head><title>統計 · Ferdinand</title></svelte:head>
<h1>統計</h1>
<p class="range">最近 30 天</p>
{#if loading}<p role="status">正在載入統計…</p>{:else if error}<p role="alert">
    {error}
  </p>
  <button class="secondary" onclick={load}>重試</button>{:else}<div
    class="stats-grid"
  >
    <RetentionCard
      pct={retention?.pct ?? null}
      target={retention?.target}
      delta={retention?.delta}
    /><ForecastChart values={forecast} dates={nextDates} /><ReviewsChart
      values={reviews}
      {dates}
    /><DeckRetention rows={deckRetention} /><StreakLine
      days={streak.days}
      longest={streak.longest}
    />
  </div>{/if}

<style>
  h1 {
    font: 400 var(--t-h2)/var(--l-h2) var(--font-book);
    padding-top: 16px;
  }
  .range {
    font: 14px/22px var(--font-mono);
    color: var(--secondary);
  }
  .stats-grid {
    display: grid;
    margin-top: 24px;
  }
  @media (min-width: 1000px) {
    h1 {
      padding-top: 40px;
    }
    .stats-grid {
      grid-template-columns: 1fr 1fr;
      gap: 0 48px;
      margin-top: 32px;
    }
  }
</style>
