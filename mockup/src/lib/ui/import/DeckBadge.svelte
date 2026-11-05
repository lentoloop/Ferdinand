<script lang="ts">
  let {
    info,
    done = false,
    later = false,
  }: { info?: { exists: boolean; created?: boolean; would_create?: boolean }; done?: boolean; later?: boolean } =
    $props();
</script>

<span class="imp-deck-tag" data-new={info?.would_create || info?.created ? "1" : undefined}
  >{later ? "檢查後顯示張數" : !info ? (done ? "若尚未建立，已自動建立" : "若尚未建立會自動建立") : info.created
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
  .imp-deck-tag[data-new="1"] { color: var(--ink); font-weight: 500; }
  @media (min-width: 1000px) {
    .imp-deck-tag {
      grid-column: auto;
      text-align: right;
    }
  }
</style>
