<script lang="ts">
  import DeckRow from "./DeckRow.svelte";
  import type { ApiDeckSummary } from "$lib/api";
  let { decks }: { decks: ApiDeckSummary[] } = $props();
</script>

<section data-component="DeckList">
  <h2>牌組</h2>
  <div class="paper ledger">
    {#each decks as deck (deck.id)}<DeckRow {deck} />{/each}
  </div>
</section>

<style>
  h2 {
    font: 500 16px/26px var(--font-ui);
    margin-bottom: 12px;
  }
  .ledger {
    padding: 4px 16px 12px;
  }
  @media (min-width: 1000px) {
    h2 {
      font-size: 18px;
    }
    .ledger {
      padding: 4px 24px 12px;
    }
  }
</style>
