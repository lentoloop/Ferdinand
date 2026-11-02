<script lang="ts">
  import { clean } from "./fields";
  let { html }: { html: string } = $props();
</script>

{#if html}<section class="example" data-component="AnswerExample">
    <h2>例句</h2>
    <div lang="en">{@html clean(html)}</div>
  </section>{/if}

<style>
  .example {
    grid-area: ex;
    margin-top: 20px;
  }
  h2 {
    font: 400 14px/22px var(--font-ui);
    color: var(--secondary);
    margin-bottom: 4px;
  }
  .example div {
    font: 400 var(--t-gloss)/var(--l-gloss) var(--font-book);
  }
</style>
