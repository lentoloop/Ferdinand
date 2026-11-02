<script lang="ts">
  let {
    changed,
    saving = false,
    saved = false,
    error = "",
    onsave,
  }: {
    changed: number;
    saving?: boolean;
    saved?: boolean;
    error?: string;
    onsave: () => void;
  } = $props();
</script>

<div
  class="editor-foot"
  data-component="SaveBand"
  data-dirty={changed > 0 || undefined}
>
  <p class="save-status" role="status">
    {error ||
      (saving
        ? "正在儲存…"
        : changed
          ? `有 ${changed} 處修改`
          : saved
            ? "已儲存"
            : "沒有修改")}
  </p>
  <button class="primary save" disabled={!changed || saving} onclick={onsave}
    >{changed ? "儲存變更" : "沒有修改"}</button
  >
</div>

<style>
  .editor-foot {
    position: relative;
    z-index: 21;
    background: var(--page);
    padding: 16px 36px 12px;
    border-top: 1px solid var(--control-edge);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: center;
    margin: 24px -36px 0;
  }
  .editor-foot[data-dirty] {
    position: sticky;
    bottom: 0;
  }
  .primary {
    width: auto;
    min-width: 136px;
  }
  .primary:not(:disabled):active {
    background: var(--accent-press);
    color: var(--on-accent);
    box-shadow:inset 0 1px 0 #25292366;
    transform:translateY(1px);
  }
  .save-status {
    font: 14px/22px var(--font-ui);
    color: var(--secondary);
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  @media (max-width: 999px) {
    .editor-foot[data-dirty] {
      padding: 8px 36px calc(8px + env(safe-area-inset-bottom));
      min-height: 61px;
    }
    .editor-foot[data-dirty] .primary {
      min-height: 44px;
      padding: 10px 18px;
    }
  }
@media(min-width:1000px){.editor-foot{margin:24px -24px 0;padding:16px 24px 12px;background:var(--sheet)}}
</style>
