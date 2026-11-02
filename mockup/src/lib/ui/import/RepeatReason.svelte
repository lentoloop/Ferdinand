<script lang="ts">
  let { firstIndex }: { firstIndex?: number } = $props();
</script>

<span data-pending-design="Mia"
  >{firstIndex === undefined
    ? "這批裡重複"
    : `和第 ${firstIndex + 1} 張相同`}</span
>

<style>
</style>
