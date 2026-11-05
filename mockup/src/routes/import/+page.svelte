<script lang="ts">
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { env } from "$env/dynamic/public";
  import { goto } from "$app/navigation";
  import { fetchDecks, type ApiDeckSummary } from "$lib/api";
  import { auth } from "$lib/auth.svelte";
  import ImportPage from "$lib/ui/import/ImportPage.svelte";
  import {
    HandoffReceiver,
    batchErrorText,
    isResponse,
    isView,
    type ImportItem,
    type ImportResponse,
    type View,
  } from "$lib/ui/import/model";

  let reviewDeck = $state<{ id: number; name: string }>();
  let view = $state<View>("empty");
  let items = $state<ImportItem[]>([]);
  let response = $state<ImportResponse>({ dry_run: true, results: [] });
  let error = $state<{
    status: number;
    unconfirmed: boolean;
    message: string;
  }>();
  let dueCount = $state<number>();
  let handoff: { nonce: string; origin: string } | undefined;
  let active = false;
  let disposed = false;
  let controller: AbortController | undefined;
  const origins = (env.PUBLIC_YOIN_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (dev) origins.push("http://localhost:5173");
  function notify(payload: object) {
    if (handoff && window.opener)
      window.opener.postMessage(
        { ...payload, v: 1, nonce: handoff.nonce },
        handoff.origin,
      );
  }
  async function run(dryRun: boolean, retryOnly = false) {
    if (active || !items.length || items.length > 100) return;
    const indices = retryOnly ? response.results.filter(r => r.status === "error" && r.error === "unable to create note").map(r => r.index) : items.map((_, index) => index);
    const requestItems = indices.map(index => items[index]);
    if (!requestItems.length) return;
    active = true;
    error = undefined;
    view = dryRun ? "loading" : "importing";
    if (dryRun)
      response = {
        dry_run: true,
        results: items.map((item, index) => ({
          index,
          status: "pending",
          deck: item.lang === "ja" ? "Yoin::日本語" : "Yoin::English",
        })),
      };
    controller = new AbortController();
    const timeout = setTimeout(() => controller?.abort(), 30000);
    let status = 0;
    let unconfirmed = !dryRun;
    try {
      const result = await fetch("/api/import/yoin", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: requestItems, dry_run: dryRun }),
        signal: controller.signal,
      });
      status = result.status;
      const body: unknown = await result.json();
      if (!result.ok) {
        const message =
          typeof body === "object" &&
          body !== null &&
          "message" in body &&
          typeof body.message === "string"
            ? body.message
            : "匯入要求無法完成。";
        if ([400, 401, 403].includes(status) || (status === 503 && message.startsWith("collection not ready:"))) unconfirmed = false;
        throw new Error(batchErrorText(status, message));
      }
      if (!isResponse(body, requestItems.length) || body.dry_run !== dryRun)
        throw new Error("伺服器回傳的結果格式不對。");
      if (disposed) return;
      response = retryOnly ? {
        ...body,
        decks: response.decks ? response.decks.map(previous => {
          const current = body.decks?.find(deck => deck.name === previous.name);
          return current ? {...current, exists: previous.exists, created: previous.created || current.created} : previous;
        }) : body.decks,
        results: response.results.map(previous => {
          const localIndex = indices.indexOf(previous.index);
          const result = body.results.find(r => r.index === localIndex);
          return result ? { ...result, index: previous.index, first_index: result.first_index === undefined ? undefined : indices[result.first_index] } : previous;
        }),
      } : body;
      if (dryRun)
        view = body.results.every((r) => r.status === "would_create")
          ? "all-new"
          : body.results.some((r) => r.status === "error") &&
              !body.results.some(
                (r) =>
                  r.status === "duplicate" || r.status === "would_duplicate",
              )
            ? "errors"
            : "preview";
      else {
        view = response.results.some(r => r.error === "unable to create note") ? "done-partial" : "done";
        notify({ type: "ferdinand:result", response: $state.snapshot(response) });
        const target = body.results.find((r) => r.status === "created")?.deck;
        if (target)
          void fetchDecks()
            .then(({ decks }) => {
              function find(
                list: ApiDeckSummary[],
              ): ApiDeckSummary | undefined {
                for (const deck of list) {
                  if (deck.name === target) return deck;
                  const child = find(deck.children);
                  if (child) return child;
                }
              }
              const deck = find(decks);
              if (!disposed && deck)
                reviewDeck = { id: deck.id, name: deck.name };
            })
            .catch(() => {});
      }
    } catch (cause) {
      if (disposed) return;
      error = {
        status,
        unconfirmed,
        message: cause instanceof Error ? cause.message : "匯入要求無法完成。",
      };
      view = "server-error";
      notify({
        type: "ferdinand:error",
        status,
        unconfirmed: error.unconfirmed,
      });
    } finally {
      clearTimeout(timeout);
      active = false;
    }
  }
  let cancelled = false;
  function cancel() {
    if (cancelled || view === "done" || view === "done-partial" || !handoff) return;
    cancelled = true;
    notify(
      view === "importing"
        ? { type: "ferdinand:error", status: 0, unconfirmed: true }
        : { type: "ferdinand:cancel" },
    );
  }
  onMount(() => {
    disposed = false;
    const receiver = new HandoffReceiver(origins, window.opener);
    const receive = (event: MessageEvent) => {
      if (active || handoff || auth.status !== "authed") return;
      const accepted = receiver.accept(event);
      if (!accepted) {
        if (dev) console.debug("[import] ignored handoff message");
        return;
      }
      handoff = accepted;
      items = accepted.items;
      if (items.length > 100) {
        response = {
          dry_run: true,
          results: items.slice(0, 100).map((item, index) => ({
            index,
            status: "pending",
            deck: item.lang === "ja" ? "Yoin::日本語" : "Yoin::English",
          })),
        };
        view = "over-limit";
      } else if (items.length) void run(true);
    };
    window.addEventListener("message", receive);
    window.addEventListener("pagehide", cancel);
    let stop = false;
    void (async () => {
      await auth.bootstrap();
      if (stop || auth.status !== "authed") return;
      if (dev) {
        const state = new URLSearchParams(location.search).get("state");
        if (isView(state)) {
          const { importFixtures, overLimit } =
            await import("$lib/ui/import/fixtures.js");
          const batch =
            (state === "all-new" || state === "done-partial")
              ? importFixtures.allNew
              : state === "errors"
                ? importFixtures.errors
                : importFixtures.preview;
          items =
            state === "empty"
              ? []
              : state === "over-limit"
                ? overLimit
                : batch.items;
          // Design fixtures are static development data, parsed through the response boundary.
          const fixture: unknown = {
            dry_run: state !== "done" && state !== "done-partial",
            decks: new URLSearchParams(location.search).get("fields") === "v2" ? batch.decks : undefined,
            results: batch.results.map((r, index) => ({
              ...r,
              first_index: new URLSearchParams(location.search).get("fields") === "v2" ? r.first_index : undefined,
              error_code: new URLSearchParams(location.search).get("fields") === "v2" ? r.error_code : undefined,
              error_field: new URLSearchParams(location.search).get("fields") === "v2" ? r.error_field : undefined,
              error: state === "done-partial" && (index === 4 || index === 8) ? "unable to create note" : r.error,
              status:
                state === "done-partial" && (index === 4 || index === 8) ? "error" : (state === "done" || state === "done-partial")
                  ? r.status === "would_create"
                    ? "created"
                    : r.status === "would_duplicate"
                      ? "duplicate"
                      : r.status
                  : r.status,
            })),
          };
          if (isResponse(fixture, batch.items.length)) response = fixture;
          view = state;
          dueCount = 105;
          if (state === "done" || state === "done-partial") reviewDeck = { id: 1, name: "Yoin::English" };
          if (state === "server-error")
            error = { status: 0, unconfirmed: true, message: "" };
          return;
        }
      }
      if (window.opener)
        for (const origin of origins)
          window.opener.postMessage({ type: "ferdinand:ready", v: 1 }, origin);
    })();
    return () => {
      cancel();
      stop = true;
      disposed = true;
      controller?.abort();
      window.removeEventListener("message", receive);
      window.removeEventListener("pagehide", cancel);
    };
  });
  function retry() {
    if (view === "done-partial") { void run(false, true); return; }
    if (error?.status === 401) {
      void goto("/login?next=" + encodeURIComponent("/import?handoff=1"));
      return;
    }
    void run(true);
  }
</script>

<svelte:head
  ><title>Ferdinand：匯入預覽</title><link
    rel="icon"
    type="image/svg+xml"
    href="/logo/mark-b-16.svg"
  /></svelte:head
>
<ImportPage
  {dueCount}
  {reviewDeck}
  {view}
  {items}
  {response}
  {error}
  user={auth.user?.username || "demo"}
  onconfirm={() => void run(false)}
  onfirst={() => {
    items = items.slice(0, 100);
    void run(true);
  }}
  onretry={retry}
  onlogout={() => void auth.logout()}
/>
