<script lang="ts">
  import { onMount } from "svelte";
  let { onchange }: { onchange: () => void } = $props();
  let states = $state<Record<string, boolean>>({}),
    selected = $state(false);
  const tools = [
    ["bold", "粗體"],
    ["italic", "斜體"],
    ["underline", "底線"],
    ["removeFormat", "清除格式"],
    ["createLink", "連結"],
  ];
  function sync() {
    states = Object.fromEntries(
      tools.slice(0, 3).map(([cmd]) => [cmd, document.queryCommandState(cmd)]),
    );
    selected = !!window.getSelection()?.toString();
  }
  onMount(() => {
    document.addEventListener("selectionchange", sync);
    sync();
    return () => document.removeEventListener("selectionchange", sync);
  });
  function run(cmd: string) {
    if (cmd === "createLink") {
      const url = window.prompt("連結網址");
      if (url && /^https?:\/\//i.test(url))
        document.execCommand(cmd, false, url);
    } else document.execCommand(cmd);
    sync();
    onchange();
  }
</script>

<div
  class="rich-toolbar"
  data-component="FormatBar"
  role="toolbar"
  aria-label="文字格式"
>
  {#each tools as [cmd, label], i}<button
      class="tool"
      type="button"
      aria-pressed={i < 3 ? !!states[cmd] : undefined}
      disabled={cmd === "createLink" && !selected}
      onmousedown={(e) => e.preventDefault()}
      onclick={() => run(cmd)}>{label}</button
    >{/each}
</div>

<style>
  .rich-toolbar {
    display: flex;
    gap: 2px;
    margin: 4px 0;
    padding: 0 2px;
    border-bottom: 1px solid var(--hairline);
    overflow-x: auto;
  }
  .tool {
    flex: none;
    min-width: 44px;
    min-height: 44px;
    padding: 0 10px;
    font: 400 15px/22px var(--font-ui);
    color: var(--ink);
    white-space: nowrap;
  }
  .tool:hover {
    background: var(--tint);
  }
  .tool[aria-pressed="true"] {
    background: var(--press);
    font-weight: 500;
    box-shadow: inset 0 -2px var(--ink);
  }
  .tool:disabled {
    color: var(--secondary);
    cursor: not-allowed;
  }
</style>
