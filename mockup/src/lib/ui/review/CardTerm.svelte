<script lang="ts">
  import Patch from "../paper/Patch.svelte";
  import { clean } from "./fields";
  let { html, lang }: { html: string; lang?: string } = $props();
</script>

<div data-component="CardTerm">
  <h1 class="term" {lang} tabindex="-1">
    <Patch>{@html clean(html)}</Patch>
  </h1>
</div>

<style>
  .term {
    font: 700 var(--t-term)/var(--l-term) var(--font-book);
    overflow-wrap: anywhere;
  }
  .term[lang="ja"] {
    font-family: var(--font-book-ja);
  }
</style>
