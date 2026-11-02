<script lang="ts">
  import RichField from "./RichField.svelte";
  import ImageField from "./ImageField.svelte";
  let { name, html = $bindable("") }: { name: string; html?: string } =
    $props();
  const labels: Record<string, string> = {
    Front: "正面",
    Back: "背面",
    Image: "圖片",
    Why: "字源",
    Example: "例句",
    Contrast: "易混字",
    Mnemonic: "記憶法",
    Source: "出處",
    Text: "填空句",
    Chunk: "語塊",
    Sentence: "原句",
    Meaning: "中文意思",
    Phonetic: "發音",
    Pronunciation: "發音",
    PartOfSpeech: "詞性",
  };
  let label = $derived(labels[name] ?? name);
</script>

<div class="field" data-component="FieldEditor" data-field={name}>
  {#if name === "ReverseEnabled"}<label class="check" data-anki={name}
      ><input
        type="checkbox"
        checked={html === "1"}
        onchange={(e) => (html = e.currentTarget.checked ? "1" : "")}
      />同時產生反向卡（看中文想英文）</label
    >{:else}<label class="name" data-anki={name} for={`field-${name}`}
      >{label}</label
    >{#if name === "Image"}<ImageField bind:html />{:else}<RichField
        bind:html
        {label}
        id={`field-${name}`}
      />{/if}{/if}
</div>

<style>
  .field {
    margin-bottom: 16px;
    min-width: 0;
  }
  .name {
    display: block;
    font: 14px/22px var(--font-ui);
    color: var(--secondary);
  }
  .check {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
  }
  input {
    width: 20px;
    height: 20px;
    accent-color: var(--accent);
  }
  @media (max-width: 999px) {
    .field {
      margin-bottom: 8px;
    }
  }
</style>
