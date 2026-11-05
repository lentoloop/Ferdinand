<script lang="ts">
  let { firstIndex }: { firstIndex?: number } = $props();
</script>

<span
  >{firstIndex === undefined
    ? "這批裡重複"
    : `和第 ${firstIndex + 1} 張相同`}</span
>

<style>
</style>
