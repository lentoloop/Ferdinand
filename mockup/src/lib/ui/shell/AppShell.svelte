<script lang="ts">
  import type { Snippet } from "svelte";
  import SideNav from "./SideNav.svelte";
  import TabBar from "./TabBar.svelte";
  let {
    children,
    state,
    user,
    dueCount,
    onlogout,
  }: {
    children: Snippet;
    state: string;
    user?: string;
    dueCount?: number;
    onlogout: () => void;
  } = $props();
</script>

<div class="app app--import r3-import" data-state={state}>
  <SideNav {user} {dueCount} {onlogout} />
  <main class="main">{@render children()}</main>
  <TabBar />
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--page);
    color: var(--ink);
    font: 400 var(--t-body)/var(--l-body) var(--font-ui);
  }
  .main {
    padding: 0 20px var(--imp-clear);
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    min-width: 0;
  }
  @media (min-width: 1000px) {
    .app {
      display: grid;
      grid-template-columns: 224px minmax(0, 1fr);
    }
    .main {
      max-width: 1016px;
      padding: 0 48px max(var(--imp-clear), 64px);
    }
  }
</style>
