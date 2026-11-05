<script lang="ts">
  import DeckBadge from "./DeckBadge.svelte";
  import type { ImportResponse } from "./model";
  let {
    response,
    pending = false,
    later = false,
  }: {
    response: ImportResponse;
    pending?: boolean;
    later?: boolean;
  } = $props();
  let names = $derived([
    ...new Set(response.results.flatMap((r) => (r.deck ? [r.deck] : []))),
  ]);
</script>

<section class="imp-decks" data-component="DeckPlan">
  <h2 class="label">{response.dry_run ? "會放進這些牌組" : "用到的牌組"}</h2>
  <ul>
    {#each names as name}{@const info = response.decks?.find(
        (d) => d.name === name,
      )}
      <li>
        <span class="imp-deck-name">{name}</span><span class="imp-deck-n"
          >{#if later}{:else if pending}<span class="skel"></span>{:else}<b
              class="mono"
              >{response.results.filter(
                (r) =>
                  r.deck === name &&
                  ["would_create", "created"].includes(r.status),
              ).length}</b
            > 張{/if}</span
        >{#if pending}<span class="skel imp-deck-skeleton" aria-hidden="true"></span>{:else}<DeckBadge {info} {later} done={!response.dry_run} />{/if}
      </li>{/each}
  </ul>
</section>

<style>
  .imp-deck-skeleton { width: 136px; }
  .imp-decks ul {
    margin-top: 4px;
  }
  .imp-decks li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 16px;
    align-items: baseline;
    padding: 10px 0;
    border-bottom: 1px solid var(--hairline);
  }
  .imp-decks li:last-child {
    border-bottom: 0;
  }
  .imp-deck-name {
    font: 400 18px/30px var(--font-book);
    overflow-wrap: anywhere;
    min-width: 0;
  }
  .imp-deck-n {
    font-size: 14px;
    line-height: 22px;
    color: var(--ink-2);
    text-align: right;
  }
  .imp-deck-n b {
    font-size: 16px;
    font-weight: 400;
    color: var(--ink);
    margin-right: 2px;
  }
  /* over-limit: the deck names are known from each item's lang; the count and 已存在/自動建立 wait for the check */
  @media (min-width: 1000px) {
    .imp-decks li {
      grid-template-columns: minmax(0, 1fr) 88px 168px;
      padding: 12px 0;
    }
    .imp-deck-name {
      font-size: 20px;
      line-height: 32px;
    }
  }
</style>
