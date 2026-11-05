<script lang="ts">
  import type { ImportResponse } from "./model";
  let { response }: { response: ImportResponse } = $props();
  let retry = $derived(response.results.filter(r => r.error === "unable to create note").length);
  let fix = $derived(response.results.filter(r => r.status === "error" && r.error !== "unable to create note").length);
</script>
{#if retry}<span>其他張已匯入；沒寫入的 {retry} 張可以再試一次。重試很安全：已寫入的卡片會顯示為「已有」，不會重複建立。</span>{/if}
{#if fix}<span>錯誤的 {fix} 張沒有寫入，還留在 Yoin，修正後可以再送。</span>{:else if !retry}<span>這一批都處理好了。</span>{/if}
