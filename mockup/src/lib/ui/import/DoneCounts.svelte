<script lang="ts">
  import type { ImportResponse } from "./model";
  let { response }: { response: ImportResponse } = $props();
</script>

<span data-pending-design="Mia"
  >已匯入 {response.results.filter((r) => r.status === "created").length} 張。已有
  {response.results.filter((r) => r.status === "duplicate").length} 張。錯誤 {response.results.filter(
    (r) => r.status === "error",
  ).length} 張。</span
>
