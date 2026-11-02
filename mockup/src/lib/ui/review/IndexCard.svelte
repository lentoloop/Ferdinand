<script lang="ts">
  import Paper from "../paper/Paper.svelte";
  import type { Snippet } from "svelte";
  let {
    side,
    notetype,
    children,
  }: { side: "front" | "answer"; notetype: string; children: Snippet } =
    $props();
</script>

<Paper
  class="index-card"
  data-component="IndexCard"
  data-side={side}
  data-notetype={notetype}
>
  {@render children()}
</Paper>

<style>
  :global(.index-card) {
    padding: 24px 24px 28px;
    margin-bottom: 12px;
  }
  :global(.index-card[data-side="front"]) {
    flex: 1 0 auto;
    margin-bottom: 8px;
    min-height: 360px;
    padding-bottom: 24px;
    display: grid;
    grid-template-rows: minmax(0, 46fr) auto minmax(0, 54fr) auto;
  }
  :global(.index-card) :global(.front-body) {
    grid-row: 2;
    min-width: 0;
  }
  :global(.index-card) :global(.card-foot) {
    grid-row: 4;
    padding-top: 24px;
  }
  @media (min-width: 1000px) {
    :global(.index-card) {
      padding: 48px 48px 36px;
    }
    :global(.index-card[data-side="answer"]) {
      margin-bottom: 32px;
    }
  }
</style>
