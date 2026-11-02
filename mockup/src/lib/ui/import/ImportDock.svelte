<script lang="ts">
  import { onMount } from "svelte";
  let {
    hint,
    label,
    disabled = false,
    busy = false,
    onconfirm,
  }: {
    hint: string;
    label: string;
    disabled?: boolean;
    busy?: boolean;
    onconfirm: () => void;
  } = $props();
  let dock: HTMLElement;
  onMount(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty(
        "--imp-dock-h",
        `${dock.offsetHeight}px`,
      ),
    );
    observer.observe(dock);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--imp-dock-h");
    };
  });
</script>

<section
  class="imp-dock"
  data-component="ImportDock"
  aria-label="匯入"
  bind:this={dock}
>
  <p class="hint" id="dock-hint">{hint}</p>
  <button
    class="primary"
    aria-describedby="dock-hint"
    aria-busy={busy}
    {disabled}
    onclick={onconfirm}>{label}</button
  >
</section>

<style>
  /* <1000: full-bleed page band pinned on top of the TabBar, so dock + TabBar read as one ruled stack; primary 56px
   (--reveal-h). Fixes before wu: the dock is fixed (out of flow) and the main column clears it with --imp-clear, so
   no row ends under it. The inline padding keeps its content on the 640px column. */
  .imp-dock {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(var(--imp-tab-h) + env(safe-area-inset-bottom));
    z-index: 5;
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 12px max(20px, calc((100% - 640px) / 2 + 20px));
    background: var(--page);
    border-top: 1px solid var(--control-edge);
  }
  .imp-dock .hint {
    color: var(--ink-2);
  }
  .imp-dock .primary {
    min-height: var(--reveal-h);
  }
  @media (min-width: 1000px) {
    /* ≥1000: the band spans exactly the main column's content box (SideNav 224 + centred 1016 column with 48px padding).
     contract v1: the 返回 Yoin column is gone (no URL back to Yoin), so the band is hint + confirm. */
    .imp-dock {
      --imp-gutter: max(48px, calc((100% - 1240px) / 2 + 48px));
      left: calc(224px + var(--imp-gutter));
      right: var(--imp-gutter);
      bottom: 0;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      column-gap: 24px;
      padding: 16px 0 20px;
    }
    .imp-dock .hint {
      font-size: 16px;
      line-height: 26px;
    }
    .imp-dock .primary {
      width: auto;
      min-width: 240px;
    }
  }
</style>
