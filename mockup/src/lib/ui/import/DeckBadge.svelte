<script lang="ts">
  let {
    info,
  }: { info: { exists: boolean; created?: boolean; would_create?: boolean } } =
    $props();
</script>

<span class="imp-deck-tag" data-pending-design="Mia"
  >{info.created
    ? "本次建立"
    : info.would_create
      ? "會自動建立"
      : info.exists
        ? "已存在"
        : ""}</span
>

<style>
  .imp-deck-tag {
    grid-column: 1/-1;
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .imp-deck-tag {
      grid-column: auto;
      text-align: right;
    }
  }
</style>
