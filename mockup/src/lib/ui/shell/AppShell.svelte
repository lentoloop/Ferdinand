<script lang="ts">
  import type { Snippet } from "svelte";
  import SideNav from "./SideNav.svelte";
  import TabBar from "./TabBar.svelte";
  let {
    children,
    state = "",
    focus = false,
    user,
    dueCount,
    onlogout = () => {},
  }: {
    children: Snippet;
    state?: string;
    focus?: boolean;
    user?: string;
    dueCount?: number;
    onlogout?: () => void;
  } = $props();
</script>

<div
  class="app"
  class:r3-import={!!state}
  class:app--import={!!state}
  class:focus
  data-state={state}
>
  {#if !focus}<SideNav {user} {dueCount} {onlogout} />{/if}
  <main class="main">{@render children()}</main>
  {#if !focus}<TabBar />{/if}
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--page);
    color: var(--ink);
    font: 400 var(--t-body)/var(--l-body) var(--font-ui);
  }
  .main {
    padding: 0 20px
      calc(var(--bar-clear) + var(--bar-h) + env(safe-area-inset-bottom));
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    min-width: 0;
  }
  .app--import .main {
    padding-bottom: var(--imp-clear);
  }
  .app.focus {
    display: block;
  }
  .focus .main {
    padding-bottom: 0;
  }
  @media (min-width: 1000px) {
    .app {
      display: grid;
      grid-template-columns: 224px minmax(0, 1fr);
    }
    .focus .main {
      max-width: none;
    }
    .main {
      max-width: 1016px;
      padding: 0 48px max(calc(var(--bar-clear) + var(--bar-h)), 64px);
    }
  }
</style>
