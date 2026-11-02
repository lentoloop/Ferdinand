<script lang="ts">
  import { clean } from "./fields";
  let {
    id,
    label,
    html,
    open = false,
  }: { id: string; label: string; html: string; open?: boolean } = $props();
</script>

<div class="disc" data-component="Disclosure">
  <h2>
    <button
      class="disc-btn"
      aria-expanded={open}
      aria-controls={id}
      onclick={() => (open = !open)}
      ><span>{label}</span><span>{open ? "收合" : "展開"}</span></button
    >
  </h2>
  <div class="disc-body" {id} hidden={!open}>{@html clean(html)}</div>
</div>

<style>
  .disc {
    border-top: 1px solid var(--hairline);
  }
  .disc-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 52px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
  }
  .disc-btn span:last-child {
    font-size: 14px;
    color: var(--ink-3);
  }
  .disc-body {
    padding-bottom: 20px;
    font: 400 16px/28px var(--font-book);
  }
</style>
