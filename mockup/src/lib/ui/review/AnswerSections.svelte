<script lang="ts">
  import Disclosure from "./Disclosure.svelte";
  let {
    sections,
    cardId,
  }: {
    sections: { id: string; label: string; html: string }[];
    cardId: number;
  } = $props();
</script>

<section class="sections" data-component="AnswerSections">
  {#key cardId}{#each sections.filter( (s) => s.html.trim() ) as section}<Disclosure
        id={`section-${cardId}-${section.id}`}
        label={section.label}
        html={section.html}
      />{/each}{/key}
</section>

<style>
  .sections {
    margin-top: 24px;
  }
</style>
