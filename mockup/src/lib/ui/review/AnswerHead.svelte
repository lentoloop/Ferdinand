<script lang="ts">
  import { clean } from "./fields";
  let {
    pos,
    gloss,
    why = "",
  }: { pos: string; gloss: string; why?: string } = $props();
</script>

<div class="answer-head" data-component="AnswerHead">
  <h2 class="label" tabindex="-1">中文意思</h2>
  <p class="gloss"><span class="pos">{pos}</span>{@html clean(gloss)}</p>
  {#if why}<p class="why-line" data-field="Why">{@html clean(why)}</p>{/if}
</div>

<style>
  .answer-head {
    grid-area: head;
    margin-top: 12px;
  }
  .gloss {
    font-size: var(--t-sentence);
    line-height: var(--l-sentence);
    margin-top: 2px;
  }
  .pos {
    color: var(--secondary);
    margin-right: 6px;
    font-size: var(--t-gloss);
  }
  .why-line {
    font: 400 16px/28px var(--font-book);
    margin-top: 12px;
    color: var(--ink-2);
  }
</style>
