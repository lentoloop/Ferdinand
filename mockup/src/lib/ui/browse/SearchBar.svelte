<script lang="ts">
  let {
    query = $bindable(""),
    onsearch,
  }: { query?: string; onsearch: () => void } = $props();
</script>

<form
  class="search"
  data-component="SearchBar"
  onsubmit={(e) => {
    e.preventDefault();
    onsearch();
  }}
>
  <input
    type="search"
    bind:value={query}
    aria-label="搜尋卡片"
    placeholder="搜尋卡片"
  />
</form>

<style>
  .search {
    display: flex;
    min-width: 0;
  }
  input {
    width: 100%;
    min-height: 48px;
    padding: 12px 16px 11px;
    border: 1px solid var(--field-edge);
    border-bottom: 2px solid var(--control-edge);
    border-radius: var(--r-action);
    background: var(--field);
    font: 16px/24px var(--font-mono);
  }
  input:focus {
    border-bottom-color: var(--accent);
  }
</style>
