<script lang="ts">
  let {
    src,
    alt = "",
    onclose,
  }: { src?: string; alt?: string; onclose: () => void } = $props();
  let dialog: HTMLDialogElement;
  $effect(() => {
    if (src) dialog?.showModal();
    else dialog?.close();
  });
</script>

<dialog
  bind:this={dialog}
  class="zoom"
  data-component="PrintDialog"
  aria-label="插圖"
  {onclose}
>
  <img {src} {alt} />
  <form method="dialog"><button class="textlink">關閉</button></form>
</dialog>

<style>
  .zoom {
    border: 0;
    padding: 16px;
    background: var(--sheet);
    color: var(--ink);
    max-width: calc(100vw - 32px);
  }
  img {
    max-width: min(800px, 80vw);
    height: auto;
  }
  .zoom::backdrop {
    background: var(--scrim);
  }
</style>
