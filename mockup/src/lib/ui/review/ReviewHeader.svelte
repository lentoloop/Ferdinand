<script lang="ts">
  let {
    deckName,
    done,
    total,
    timer,
  }: { deckName: string; done: number; total: number; timer: string } =
    $props();
</script>

<header class="review-header" data-component="ReviewHeader">
  <div class="rh-row">
    <a class="rh-exit" href="/">離開</a>
    <p class="rh-deck" title={deckName.split("::").join(" / ")}>
      {deckName.split("::").at(-1)}
    </p>
    <span
      class="rh-progress mono"
      role="progressbar"
      aria-label="今日進度"
      aria-valuemin="0"
      aria-valuemax={total}
      aria-valuenow={done}>{done} / {total}</span
    ><span class="rh-timer mono">{timer}</span>
  </div>
  <div class="rh-bar">
    <span style:width={`${total ? (done / total) * 100 : 0}%`}></span>
  </div>
</header>

<style>
  .review-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--page);
  }
  .rh-row {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 12px;
    height: 56px;
  }
  .rh-exit {
    display: flex;
    align-items: center;
    min-height: 44px;
  }
  .rh-deck {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .rh-progress,
  .rh-timer {
    font-size: 14px;
    white-space: nowrap;
  }
  .rh-timer {
    color: var(--secondary);
  }
  .rh-bar {
    height: 2px;
    background: var(--hairline);
  }
  .rh-bar span {
    display: block;
    height: 2px;
    background: var(--accent);
  }
  @media (min-width: 1000px) {
    .rh-row {
      height: 72px;
      gap: 24px;
    }
  }
</style>
