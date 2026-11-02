<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import AppShell from "$lib/ui/shell/AppShell.svelte";
  import { fetchDecks, setOnUnauthorized } from "$lib/api";
  import { auth } from "$lib/auth.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
  let dueCount = $state<number>();
  $effect(() => {
    if (auth.status !== "authed") return;
    void fetchDecks()
      .then((d) => {
        dueCount = d.decks.reduce(
          (sum, deck) =>
            sum + deck.new_count + deck.learn_count + deck.review_count,
          0,
        );
      })
      .catch(() => {
        dueCount = undefined;
      });
  });

  // Phase A4-β: wire the 401-redirect hook on app mount, then bootstrap
  // the auth store so we know `authed`/`anon` before the route guard
  // runs. Both happen inside `onMount` so SvelteKit's SSR pass doesn't
  // try to use $app/navigation. Bootstrap is fire-and-forget — the
  // guard's $effect re-runs once status flips off "checking", so we
  // don't need to await here.
  onMount(() => {
    setOnUnauthorized(() => auth.handleUnauthorized());
    void auth.bootstrap();
    return () => setOnUnauthorized(null);
  });

  // Phase A4-β route guard. Whenever auth resolves to "anon" and the
  // user is anywhere other than /login, bounce them to /login with the
  // attempted path in `?next=` so the post-login redirect lands them
  // back where they started. The guard sits inside `$effect` so it
  // observes both `auth.status` and the active pathname; "unknown" /
  // "checking" leave the user where they are (the layout shell stays
  // up — pages can show their own loading affordance off
  // `auth.status === "checking"` if they want).
  $effect(() => {
    if (!browser) return;
    if (auth.status !== "anon") return;
    const path = $page.url.pathname;
    if (path === "/login") return;
    const next = path + $page.url.search;
    void goto(`/login?next=${encodeURIComponent(next)}`);
  });
</script>

{#if $page.url.pathname === "/import" || $page.url.pathname === "/login"}
  {@render children?.()}
{:else}
  <AppShell
    focus={$page.url.pathname.startsWith("/study")}
    {dueCount}
    user={auth.user?.username}
    onlogout={() => void auth.logout()}>{@render children?.()}</AppShell
  >
{/if}
