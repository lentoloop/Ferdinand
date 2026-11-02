<script lang="ts">
  import { plain } from "../review/fields";
  import DetailTabs from "./DetailTabs.svelte";
  import CardPreview from "./CardPreview.svelte";
  import NoteEditor from "./NoteEditor.svelte";
  import type {
    ApiCardSummary,
    ApiNoteSummary,
    ApiNotetypeDetail,
  } from "$lib/api";
  let {
    card,
    note,
    notetype,
    tab = $bindable("preview"),
    onclose,
    onsaved,
  }: {
    card: ApiCardSummary;
    note: ApiNoteSummary;
    notetype: ApiNotetypeDetail;
    tab?: string;
    onclose: () => void;
    onsaved: (fields: string[]) => void;
  } = $props();
</script>

<section class="detail-pane" data-component="CardSheet">
  <header class="sheet-top">
    <button class="back" aria-label="返回列表" onclick={onclose}>‹ 列表</button>
    <p class="sheet-word">{plain(note.fields[0] ?? "")}</p>
  </header>
  <DetailTabs bind:tab />{#if tab === "edit"}<NoteEditor
      {note}
      {notetype}
      {onsaved}
    />{:else}<CardPreview {card} {note} {notetype} />{/if}
</section>

<style>
  .detail-pane {
    min-width: 0;
  }
  .sheet-top {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-bottom: 12px;
  }
  .back {
    min-width: 88px;
    min-height: 44px;
    padding: 0 12px;
    margin-left: -12px;
    text-align: left;
  }
  .back:hover {
    background: var(--tint);
  }
  .sheet-word {
    font: 20px/28px var(--font-book);
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 1000px) {
    .sheet-top {
      display: none;
    }
  }
</style>
