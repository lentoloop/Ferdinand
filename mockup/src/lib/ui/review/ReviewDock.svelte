<script lang="ts">
  import Button from "../paper/Button.svelte";
  import RatingRow from "./RatingRow.svelte";
  import type { AnswerRating } from "$lib/api";
  let {
    side,
    onreveal,
    onrate,
    disabled = false,
  }: {
    side: "front" | "answer";
    onreveal: () => void;
    onrate: (r: AnswerRating) => void;
    disabled?: boolean;
  } = $props();
</script>

<section
  class="dock"
  class:answer={side === "answer"}
  data-component="ReviewDock"
>
  <p class="hint">
    {side === "front" ? "先想一想它的意思和用法。" : "依照剛才回想的情況評分。"}
  </p>
  {#if side === "front"}<Button onclick={onreveal}>顯示答案</Button
    >{:else}<RatingRow {onrate} {disabled} />{/if}
</section>

<style>
  .dock {
    position: sticky;
    bottom: 0;
    z-index: 5;
    margin-top: auto;
    background: var(--page);
    padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  }
  .hint {
    margin-bottom: 8px;
  }
  .dock :global(.primary) {
    min-height: 56px;
  }
  @media (min-width: 1000px) {
    .dock:not(.answer) {
      padding-left: 24px;
      padding-right: 24px;
      text-align: center;
    }
    .dock :global(.primary) {
      max-width: 360px;
      margin: auto;
    }
    .dock.answer {
      margin-top: 0;
      padding: 0 0 16px;
      display: flex;
      flex-direction: column;
    }
    .answer .hint {
      order: 2;
      margin: 8px 0 0;
    }
  }
</style>
