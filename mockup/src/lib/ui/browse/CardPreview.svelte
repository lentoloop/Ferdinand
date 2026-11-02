<script lang="ts">
  import CardFace from "$lib/components/CardFace.svelte";
  import IndexCard from "../review/IndexCard.svelte";
  import type {
    ApiCardSummary,
    ApiNoteSummary,
    ApiNotetypeDetail,
  } from "$lib/api";
  let {
    card,
    note,
    notetype,
  }: {
    card: ApiCardSummary;
    note: ApiNoteSummary;
    notetype: ApiNotetypeDetail;
  } = $props();
</script>

<div data-component="CardPreview">
  <IndexCard side="answer" notetype={card.notetype_name}
    ><CardFace
      html={card.back_html}
      css={card.notetype_css}
      fields={note.fields}
      names={notetype.fields}
      side="answer"
      cardId={card.id}
      tags={card.tags}
      notetype={card.notetype_name}
    /></IndexCard
  >
</div>

<style>
  div :global(.index-card) {
    padding: 32px 32px 28px;
  }
  div :global(.term) {
    font-size: 40px;
    line-height: 56px;
  }
  div :global(.answer-top[data-variant="print"]) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "term" "head" "print" "ex";
  }
  div :global(.print) {
    width: min(200px, 74%);
  }
</style>
