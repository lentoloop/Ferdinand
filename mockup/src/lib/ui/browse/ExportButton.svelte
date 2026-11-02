<script lang="ts">
  import { capabilities, exportApkg } from "./client";
  let { query, count }: { query: string; count: number } = $props();
  let busy = $state(false),
    status = $state("");
  async function download() {
    busy = true;
    status = `正在匯出 ${count} 張…`;
    try {
      const blob = await exportApkg(query);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ferdinand-${new Date().toLocaleDateString("sv-SE")}.apkg`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status = `已匯出 ${link.download}`;
    } catch (e) {
      status = `匯出失敗：${e instanceof Error ? e.message : String(e)}`;
    } finally {
      busy = false;
    }
  }
</script>

<div class="export" data-component="ExportButton">
  <button
    class="secondary"
    disabled={!capabilities.exportApkg || !count || busy}
    aria-busy={busy}
    onclick={download}
    title="尚未提供匯出功能">匯出 .apkg</button
  >
  <p class="hint" role="status">
    {status || (count ? "" : "沒有可匯出的卡片。")}
  </p>
</div>

<style>
  .export {
    display: grid;
    gap: 4px;
  }
  .secondary {
    width: 100%;
    color: var(--ink-3);
    border-color: var(--control-edge);
    cursor: not-allowed;
  }
  @media (min-width: 1000px) {
    .export {
      justify-items: end;
    }
  }
</style>
