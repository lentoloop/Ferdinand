<script lang="ts">
  import PrintDialog from "./PrintDialog.svelte";
  let {
    src,
    alt,
    variant = "card",
  }: { src: string; alt: string; variant?: "card" | "thumb" } = $props();
  let zoom = $state(false);
</script>

<figure class="print" data-component="TippedPrint" data-variant={variant}>
  <button
    type="button"
    aria-label={`放大插圖：${alt}`}
    onclick={() => (zoom = true)}
    ><img {src} {alt} width="800" height="600" /></button
  >
</figure>
<PrintDialog
  src={zoom ? src : undefined}
  {alt}
  onclose={() => (zoom = false)}
/>

<style>
  .print {
    grid-area: print;
    position: relative;
    justify-self: end;
    width: min(220px, 74%);
    margin: 20px 4px 0 0;
    transform: rotate(-1.5deg);
    isolation: isolate;
  }
  .print::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--slip);
    transform: translate(3px, 3px);
    z-index: -1;
  }
  .print::after {
    content: "";
    position: absolute;
    top: -9px;
    left: 50%;
    width: 64px;
    height: 18px;
    margin-left: -32px;
    background: var(--slip);
    opacity: 0.88;
    transform: rotate(4deg);
    pointer-events: none;
  }
  button {
    display: block;
    padding: 4px;
    background: var(--sheet);
    width: 100%;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
    object-fit: cover;
  }
  .print[data-variant="thumb"] {
    width: 100%;
    margin: 8px 0;
  }
  @media (min-width: 1000px) {
    .print {
      width: 240px;
    }
  }
</style>
