<script lang="ts">
  import { postMedia } from "$lib/api";
  import { imageSource } from "../review/fields";
  import TippedPrint from "../review/TippedPrint.svelte";
  let { html = $bindable("") }: { html?: string } = $props();
  let input: HTMLInputElement;
  let armed = $state(false),
    busy = $state(false),
    error = $state("");
  let src = $derived(imageSource(html));
  async function upload() {
    const file = input.files?.[0];
    if (!file) return;
    busy = true;
    error = "";
    try {
      const result = await postMedia(file);
      html = `<img src="${result.filename.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}">`;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    } finally {
      busy = false;
      input.value = "";
    }
  }
</script>

<div data-component="ImageField">
  <input
    class="vh"
    type="file"
    accept="image/png,image/jpeg,image/webp,image/gif"
    bind:this={input}
    onchange={upload}
    aria-label="上傳圖片"
  />
  <div class="image-field" class:no-image={!src}>
    {#if src}<div class="thumb">
        <TippedPrint {src} alt="筆記插圖" variant="thumb" />
      </div>{/if}
    <div>
      <p class="file">
        {src ? decodeURIComponent(src.split("/").at(-1) ?? "") : ""}
      </p>
      <div class="btns">
        <button
          class="textbtn"
          type="button"
          disabled={busy}
          onclick={() => input.click()}>{src ? "更換圖片" : "加入圖片"}</button
        >{#if src}<button
            class="textbtn remove"
            type="button"
            data-armed={armed || undefined}
            onblur={() => (armed = false)}
            onclick={() => {
              if (armed) {
                html = "";
                armed = false;
              } else armed = true;
            }}>{armed ? "確定移除" : "× 移除圖片"}</button
          >{/if}
      </div>
      <p role="status" class="field-help">
        {busy ? "正在上傳圖片…" : armed ? "再按一次會移除這張圖片。" : error}
      </p>
    </div>
  </div>
</div>

<style>
  .image-field {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }
  .image-field.no-image {
    grid-template-columns: 1fr;
  }
  .thumb :global(.print) {
    grid-area: auto;
    width: 100%;
    margin: 4px 0;
  }
  .file {
    font: 14px/22px var(--font-mono);
    color: var(--secondary);
    overflow-wrap: anywhere;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-left: -12px;
  }
  .textbtn {
    min-width: 44px;
    min-height: 44px;
    padding: 0 12px;
    color: var(--accent);
  }
  .textbtn:hover {
    background: var(--tint);
  }
  .remove {
    color: var(--again);
    border-left: 1px solid var(--hairline);
  }
  .remove[data-armed] {
    color: var(--danger);
  }
  .field-help {
    font-size: 14px;
    color: var(--secondary);
  }
</style>
