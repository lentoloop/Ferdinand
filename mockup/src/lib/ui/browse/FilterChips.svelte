<script lang="ts">
  let {
    filter = $bindable(""),
    onchange,
    deck = $bindable(""),
    notetype = $bindable(""),
    tag = $bindable(""),
    decks = [],
    notetypes = [],
    tags = [],
  }: {
    filter?: string;
    onchange: () => void;
    deck?: string;
    notetype?: string;
    tag?: string;
    decks?: string[];
    notetypes?: string[];
    tags?: string[];
  } = $props();
  const filters = [
    ["", "全部"],
    ["is:due", "到期"],
    ["is:new", "新卡"],
    ["is:suspended", "已暫停"],
  ];
</script>

<div
  class="chips"
  data-component="FilterChips"
  role="toolbar"
  aria-label="篩選"
>
  <label class="select-chip"
    ><span class="vh">牌組</span><select
      aria-label="牌組"
      bind:value={deck}
      {onchange}
      ><option value="">牌組：全部</option>{#each decks as name}<option
          value={name}>牌組：{name.split("::").at(-1)}</option
        >{/each}</select
    ></label
  >
  <label class="select-chip"
    ><span class="vh">筆記類型</span><select
      aria-label="筆記類型"
      bind:value={notetype}
      {onchange}
      ><option value="">筆記類型：全部</option>{#each notetypes as name}<option
          value={name}>筆記類型：{name}</option
        >{/each}</select
    ></label
  >
  <label class="select-chip"
    ><span class="vh">標籤</span><select
      aria-label="標籤"
      bind:value={tag}
      {onchange}
      ><option value="">標籤：全部</option>{#each tags as name}<option
          value={name}>標籤：{name}</option
        >{/each}</select
    ></label
  >

  {#each filters as [value, label]}<button
      class="chip"
      aria-pressed={filter === value}
      onclick={() => {
        filter = value;
        onchange();
      }}>{label}</button
    >{/each}
</div>

<style>
  .chips {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    overflow-x: auto;
    border-bottom: 1px solid var(--hairline);
  }
  .select-chip {
    flex: none;
    min-width: 0;
  }
  select {
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    min-height: 44px;
    max-width: 220px;
    color: var(--secondary);
    font: 15px/22px var(--font-ui);
    cursor: pointer;
  }
  .chip {
    min-height: 44px;
    padding: 0 2px;
    font-size: 15px;
    color: var(--secondary);
    white-space: nowrap;
  }
  .chip[aria-pressed="true"] {
    color: var(--accent);
    font-weight: 500;
    border-bottom: 2px solid var(--accent);
  }
</style>
