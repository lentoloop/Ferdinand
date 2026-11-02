<script lang="ts">
  import { tick } from "svelte";
  import { clean } from "../review/fields";
  import FormatBar from "./FormatBar.svelte";
  let {
    html = $bindable(""),
    label,
    id,
    serif = true,
    lang,
  }: {
    html?: string;
    label: string;
    id: string;
    serif?: boolean;
    lang?: string;
  } = $props();
  let el: HTMLDivElement;
  let focused = $state(false);
  $effect(() => {
    const value = clean(html);
    if (el && el !== document.activeElement && el.innerHTML !== value)
      el.innerHTML = value;
  });
  function sync() {
    html = clean(el.innerHTML);
  }
  async function paste(e: ClipboardEvent) {
    e.preventDefault();
    const rich = e.clipboardData?.getData("text/html"),
      text = e.clipboardData?.getData("text/plain") ?? "";
    if (rich) document.execCommand("insertHTML", false, clean(rich));
    else document.execCommand("insertText", false, text);
    sync();
    await tick();
  }
</script>

<div
  class="rich-wrap"
  onfocusout={(e) => {
    if (!(
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ))
      focused = false;
  }}
>
  {#if focused}<FormatBar onchange={sync} />{/if}
  <div
    bind:this={el}
    class="rich"
    class:serif
    data-component="RichField"
    {id}
    {lang}
    contenteditable="true"
    role="textbox"
    aria-label={label}
    aria-multiline="true"
    onfocus={() => (focused = true)}
    oninput={sync}
    onpaste={paste}
  ></div>
</div>

<style>
  .rich {
    min-height: 44px;
    padding: 8px 0 9px;
    border-bottom: 1px solid var(--field-rule);
    font: 400 16px/28px var(--font-ui);
    overflow-wrap: anywhere;
  }
  .rich.serif {
    font-family: var(--font-book);
  }
  .rich[lang="ja"] {
    font-family: var(--font-book-ja);
  }
  .rich:focus {
    outline: 0;
    border-bottom-color: var(--accent);
    box-shadow: 0 1px var(--accent);
  }
  .rich :global(ul) {
    list-style: disc;
    padding-left: 20px;
  }
</style>
