<script lang="ts">
  import { onMount } from "svelte";
  import {
    fetchCards,
    fetchDecks,
    fetchNotetypes,
    fetchTags,
    fetchNote,
    fetchNotetype,
    type ApiCardSummary,
    type ApiNoteSummary,
    type ApiNotetypeDetail,
  } from "$lib/api";
  import { flattenLeafDecks } from "$lib/decks";
  import SearchBar from "$lib/ui/browse/SearchBar.svelte";
  import ExportButton from "$lib/ui/browse/ExportButton.svelte";
  import FilterChips from "$lib/ui/browse/FilterChips.svelte";
  import ResultTable from "$lib/ui/browse/ResultTable.svelte";
  import ResultList from "$lib/ui/browse/ResultList.svelte";
  import CardSheet from "$lib/ui/browse/CardSheet.svelte";
  import BrowseState from "$lib/ui/browse/BrowseState.svelte";
  let query = $state(""),
    filter = $state(""),
    rows = $state<ApiCardSummary[]>([]),
    total = $state(0),
    loading = $state(true),
    error = $state(""),
    selected = $state<ApiCardSummary | null>(null),
    note = $state<ApiNoteSummary | null>(null),
    notetype = $state<ApiNotetypeDetail | null>(null),
    tab = $state("preview"),
    open = $state(false),
    detailLoading = $state(false),
    offset = $state(0);
  let deckFilter = $state(""),
    typeFilter = $state(""),
    tagFilter = $state("");
  let deckNames = $state<string[]>([]),
    typeNames = $state<string[]>([]),
    tagNames = $state<string[]>([]);
  const quote = (s: string) =>
    `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  let generation = 0,
    selection = 0;
  let search = $derived(
    [
      query,
      filter,
      deckFilter ? `deck:${quote(deckFilter)}` : "",
      typeFilter ? `note:${quote(typeFilter)}` : "",
      tagFilter ? `tag:${quote(tagFilter)}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  onMount(() => {
    void load();
    void fetchDecks()
      .then((d) => (deckNames = flattenLeafDecks(d.decks).map((d) => d.name)))
      .catch(() => {});
    void fetchNotetypes()
      .then((t) => (typeNames = t.notetypes.map((t) => t.name)))
      .catch(() => {});
    void fetchTags()
      .then((t) => (tagNames = t.tags))
      .catch(() => {});
  });
  async function load(reset = true) {
    if (reset) offset = 0;
    const request = ++generation;
    loading = true;
    error = "";
    try {
      const response = await fetchCards(search, 50, offset);
      if (request !== generation) return;
      rows = response.cards;
      total = response.total;
      selected = null;
      note = null;
      open = false;
      if (rows[0]) void select(rows[0], false);
    } catch (e) {
      if (request === generation)
        error = e instanceof Error ? e.message : String(e);
    } finally {
      if (request === generation) loading = false;
    }
  }
  async function select(card: ApiCardSummary, show = true) {
    const request = ++selection;
    selected = card;
    open = show;
    detailLoading = true;
    error = "";
    try {
      const [n, t] = await Promise.all([
        fetchNote(card.note_id),
        fetchNotetype(card.notetype_id),
      ]);
      if (request !== selection) return;
      note = n;
      notetype = t;
    } catch (e) {
      if (request === selection)
        error = e instanceof Error ? e.message : String(e);
    } finally {
      if (request === selection) detailLoading = false;
    }
  }
  async function saved(fields: string[]) {
    if (note) note = { ...note, fields };
    try {
      const response = await fetchCards(search, 50, offset);
      rows = response.cards;
      selected = rows.find((c) => c.id === selected?.id) ?? selected;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }
</script>

<svelte:head><title>瀏覽 · Ferdinand</title></svelte:head>
<div class="browse" class:open data-dirty={undefined}>
  <div class="list-head">
    <h1>瀏覽</h1>
    <div class="toolbar">
      <SearchBar bind:query onsearch={() => void load()} /><ExportButton
        query={search}
        count={total}
      />
    </div>
    <FilterChips
      bind:filter
      bind:deck={deckFilter}
      bind:notetype={typeFilter}
      bind:tag={tagFilter}
      decks={deckNames}
      notetypes={typeNames}
      tags={tagNames}
      onchange={() => void load()}
    />
    <p class="result-count">{total} 張卡片</p>
  </div>
  {#if loading}<BrowseState variant="loading" />{:else if error}<BrowseState
      variant="error"
      detail={error}
      onretry={() => void load()}
    />{:else if !rows.length}<BrowseState
      variant="empty"
      query={search}
    />{:else}<div class="panes">
      <div class="results-pane">
        <div class="desktop">
          <ResultTable {rows} selected={selected?.id} onselect={select} />
        </div>
        <div class="mobile">
          <ResultList {rows} selected={selected?.id} onselect={select} />
        </div>
        {#if total > 50}<div class="pagination">
            <button
              class="textlink"
              disabled={!offset}
              onclick={() => {
                offset = Math.max(0, offset - 50);
                void load(false);
              }}>上一頁</button
            ><span>{offset + 1}–{Math.min(offset + 50, total)} / {total}</span
            ><button
              class="textlink"
              disabled={offset + 50 >= total}
              onclick={() => {
                offset += 50;
                void load(false);
              }}>下一頁</button
            >
          </div>{/if}
      </div>
      <div class="sheet">
        {#if detailLoading}<p role="status">
            正在載入筆記…
          </p>{:else if selected && note && notetype}<CardSheet
            card={selected}
            {note}
            {notetype}
            bind:tab
            onclose={() => (open = false)}
            onsaved={saved}
          />{/if}
      </div>
    </div>{/if}
</div>

<style>
  h1 {
    font: 400 var(--t-h2)/var(--l-h2) var(--font-book);
    padding-top: 16px;
  }
  .toolbar {
    display: grid;
    gap: 12px;
    margin-top: 16px;
  }
  .result-count {
    font-size: 14px;
    color: var(--secondary);
    margin-top: 12px;
  }
  .panes {
    display: grid;
    gap: 24px;
    margin-top: 8px;
  }
  .sheet,
  .desktop {
    display: none;
  }
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  @media (max-width: 999px) {
    .open .list-head,
    .open .results-pane {
      display: none;
    }
    .open .sheet {
      display: block;
    }
  }
  @media (min-width: 1000px) {
    h1 {
      padding-top: 40px;
    }
    .toolbar {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 16px;
      margin-top: 24px;
    }
    .panes {
      grid-template-columns: minmax(0, 1fr) 440px;
      gap: 32px;
      align-items: start;
    }
    .sheet,
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
  :global(html:has(.browse [data-dirty="true"])) {
    --bar-h: 77px;
    scroll-padding-bottom: calc(
      var(--bar-h) + env(safe-area-inset-bottom) + 16px
    );
  }
  :global(.app:has(.browse) .main) {
    max-width: 1168px;
  }
  @media (max-width: 999px) {
    :global(html:has(.browse [data-dirty="true"])) {
      --bar-h: 61px;
    }
    :global(.app:has(.browse [data-dirty="true"]) .tabbar) {
      display: none;
    }
  }
</style>
