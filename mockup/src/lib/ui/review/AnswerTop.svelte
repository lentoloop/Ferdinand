<script lang="ts">
  import type { Snippet } from "svelte";
  let { hasImage, children }: { hasImage: boolean; children: Snippet } =
    $props();
</script>

<div
  class="answer-top"
  data-component="AnswerTop"
  data-variant={hasImage ? "print" : "noimg"}
>
  {@render children()}
</div>

<style>
  .answer-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "term" "head" "print" "ex";
  }
  .answer-top[data-variant="noimg"] {
    grid-template-areas: "term" "head" "ex";
  }
  .answer-top :global([data-component="CardTerm"]) {
    grid-area: term;
  }
  @media (min-width: 1000px) {
    .answer-top[data-variant="print"] {
      grid-template-columns: minmax(0, 1fr) 240px;
      gap: 0 32px;
      grid-template-areas: "term print" "head print" "ex ex";
    }
  }
</style>
