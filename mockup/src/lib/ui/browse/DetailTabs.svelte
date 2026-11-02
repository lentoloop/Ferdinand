<script lang="ts">
  let { tab = $bindable("preview") }: { tab?: string } = $props();
</script>

<div
  class="tabs"
  data-component="DetailTabs"
  role="tablist"
  aria-label="卡片內容"
>
  {#each [["preview", "預覽"], ["edit", "編輯"]] as [key, label]}<button
      role="tab"
      aria-selected={tab === key}
      onclick={() => (tab = key)}>{label}</button
    >{/each}
</div>

<style>
  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--hairline);
    margin-bottom: 8px;
  }
  button {
    min-height: 44px;
    font-size: 16px;
    color: var(--secondary);
  }
  button[aria-selected="true"] {
    color: var(--accent);
    font-weight: 500;
    border-bottom: 2px solid var(--accent);
  }
</style>
