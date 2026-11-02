<script lang="ts">
  import { untrack } from "svelte";
  import {
    patchNote,
    type ApiNoteSummary,
    type ApiNotetypeDetail,
  } from "$lib/api";
  import FieldEditor from "./FieldEditor.svelte";
  import SaveBand from "./SaveBand.svelte";
  let {
    note,
    notetype,
    onsaved = () => {},
  }: {
    note: ApiNoteSummary;
    notetype: ApiNotetypeDetail;
    onsaved?: (fields: string[]) => void;
  } = $props();
  let fields = $state<string[]>(untrack(() => [...note.fields])),
    baseline = $state<string[]>(untrack(() => [...note.fields])),
    saving = $state(false),
    saved = $state(false),
    error = $state("");
  let loadedId = untrack(() => note.id);
  $effect(() => {
    if (note.id === loadedId) return;
    loadedId = note.id;
    fields = [...note.fields];
    baseline = [...note.fields];
    saved = false;
    error = "";
  });
  let changed = $derived(fields.filter((v, i) => v !== baseline[i]).length);
  async function save() {
    if (!changed || saving) return;
    saving = true;
    error = "";
    try {
      const id = note.id;
      const submitted = [...fields];
      const result = await patchNote(id, { fields: submitted });
      if (note.id !== id) return;
      fields = fields.map((value, i) =>
        value === submitted[i] ? (result.fields[i] ?? value) : value,
      );
      baseline = [...result.fields];
      saved = true;
      onsaved(result.fields);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      saving = false;
    }
  }
</script>

<div
  class="paper editor"
  data-component="NoteEditor"
  data-dirty={changed > 0 || undefined}
>
  {#each notetype.fields as name, i}<FieldEditor
      {name}
      bind:html={fields[i]}
    />{/each}<SaveBand {changed} {saving} {saved} {error} onsave={save} />
</div>

<style>
  .editor {
    padding: 20px 16px 0;
  }
  @media (min-width: 1000px) {
    .editor {
      padding: 24px 24px 0;
    }
  }
</style>
