<script lang="ts">
  import { onMount } from "svelte";
  import { fetchDecks, fetchForecast, type ApiDeckSummary } from "$lib/api";
  import { flattenLeafDecks } from "$lib/decks";
  import CoverHeader from "$lib/ui/home/CoverHeader.svelte";
  import CoverCard from "$lib/ui/home/CoverCard.svelte";
  import DeckList from "$lib/ui/home/DeckList.svelte";
  let decks = $state<ApiDeckSummary[]>([]),
    values = $state<number[]>([]),
    loading = $state(true),
    error = $state("");
  let totals = $derived(
    decks.reduce(
      (a, d) => ({
        n: a.n + d.new_count,
        l: a.l + d.learn_count,
        r: a.r + d.review_count,
      }),
      { n: 0, l: 0, r: 0 },
    ),
  );
  onMount(() => {
    void load();
  });
  async function load() {
    loading = true;
    error = "";
    try {
      const [d, f] = await Promise.all([fetchDecks(), fetchForecast(7)]);
      decks = flattenLeafDecks(d.decks);
      values = f.history.map((x) => x.reviews);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head><title>今日 · Ferdinand</title></svelte:head>
<CoverHeader
  dateLong={new Date().toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })}
/>
{#if error}<p role="alert">{error}</p>
  <button class="secondary" onclick={load}>重試</button>{:else if loading}<p
    role="status"
  >
    正在載入牌組…
  </p>{:else}<div class="home-grid">
    <CoverCard
      {totals}
      firstDeck={decks.find(
        (d) => d.new_count + d.learn_count + d.review_count > 0,
      ) ?? decks[0]}
      {values}
    /><DeckList {decks} />
  </div>{/if}

<style>
  .home-grid {
    display: grid;
    gap: 32px;
    margin-top: 24px;
  }
  @media (min-width: 1000px) {
    .home-grid {
      gap: 48px;
      margin-top: 32px;
    }
  }
</style>
