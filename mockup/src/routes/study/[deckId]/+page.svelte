<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import {
    fetchDecks,
    fetchQueue,
    fetchNote,
    fetchNotetype,
    fetchForecast,
    postAnswer,
    type ApiCardSummary,
    type AnswerRating,
  } from "$lib/api";
  import { flattenLeafDecks } from "$lib/decks";
  import { formatMMSS } from "$lib/study";
  import CardFace from "$lib/components/CardFace.svelte";
  import ReviewHeader from "$lib/ui/review/ReviewHeader.svelte";
  import IndexCard from "$lib/ui/review/IndexCard.svelte";
  import ReviewDock from "$lib/ui/review/ReviewDock.svelte";
  import ReviewState from "$lib/ui/review/ReviewState.svelte";
  let card = $state<ApiCardSummary | null>(null),
    fields = $state<string[]>([]),
    names = $state<string[]>([]),
    deckName = $state(""),
    total = $state(0),
    done = $state(0),
    loading = $state(true),
    error = $state(""),
    answer = $state(false),
    sending = $state(false),
    started = $state(Date.now()),
    now = $state(Date.now()),
    nextDays = $state<number[]>([]);
  let deckId = $derived(Number($page.params.deckId));
  async function prepare(c: ApiCardSummary | null) {
    if (c) {
      const [n, t] = await Promise.all([
        fetchNote(c.note_id),
        fetchNotetype(c.notetype_id),
      ]);
      fields = n.fields;
      names = t.fields;
    } else {
      fields = [];
      names = [];
    }
    card = c;
    started = Date.now();
    answer = false;
  }
  async function load() {
    loading = true;
    error = "";
    try {
      const [d, q, f] = await Promise.all([
        fetchDecks(),
        fetchQueue(deckId, 1),
        fetchForecast(4),
      ]);
      deckName =
        flattenLeafDecks(d.decks).find((d) => d.id === deckId)?.name ?? "";
      total = q.new + q.learning + q.review;
      nextDays = f.history.slice(1, 4).map((x) => x.reviews);
      await prepare(q.cards[0] ?? null);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      loading = false;
    }
  }
  async function rate(rating: AnswerRating) {
    if (!card || sending) return;
    sending = true;
    error = "";
    try {
      const q = await postAnswer({
        card_id: card.id,
        deck_id: deckId,
        rating,
        milliseconds_taken: Date.now() - started,
      });
      done++;
      await prepare(q.cards[0] ?? null);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      sending = false;
    }
  }
  function keydown(e: KeyboardEvent) {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest("input,textarea,[contenteditable],dialog")
    )
      return;
    if (e.code === "Space" && !answer && card) {
      e.preventDefault();
      answer = true;
    } else if (answer) {
      const r: Record<string, AnswerRating> = {
        "1": "again",
        "2": "hard",
        "3": "good",
        "4": "easy",
      };
      if (r[e.key]) void rate(r[e.key]);
    }
  }
  onMount(() => {
    void load();
    const timer = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(timer);
  });
</script>

<svelte:head><title>複習 · Ferdinand</title></svelte:head><svelte:window
  onkeydown={keydown}
/>
<div class="review">
  <ReviewHeader {deckName} {done} {total} timer={formatMMSS(now - started)} />
  <div class="review-body" class:answer>
    {#if loading}<ReviewState variant="loading" />{:else if error}<ReviewState
        variant="error"
        detail={error}
        onretry={load}
      />{:else if !card}<ReviewState
        variant="empty"
        {nextDays}
      />{:else}<IndexCard
        side={answer ? "answer" : "front"}
        notetype={card.notetype_name}
        ><CardFace
          html={answer ? card.back_html : card.front_html}
          css={card.notetype_css}
          {fields}
          {names}
          side={answer ? "answer" : "front"}
          cardId={card.id}
          tags={card.tags}
          notetype={card.notetype_name}
        /></IndexCard
      ><ReviewDock
        side={answer ? "answer" : "front"}
        onreveal={() => (answer = true)}
        onrate={rate}
        disabled={sending}
      />{/if}
  </div>
</div>

<style>
  .review {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  .review-body {
    padding-top: 16px;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1000px) {
    .review {
      max-width: 760px;
    }
    .review-body.answer {
      justify-content: center;
      padding-bottom: 32px;
    }
  }
</style>
