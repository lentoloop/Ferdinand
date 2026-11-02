<script lang="ts">
  import "./tokens.css";
  import "./base.css";
  import "./list.css";
  import "./page.css";
  import AppShell from "../shell/AppShell.svelte";
  import ImportHeader from "./ImportHeader.svelte";
  import ImportSummary from "./ImportSummary.svelte";
  import ImportList from "./ImportList.svelte";
  import ImportDock from "./ImportDock.svelte";
  import ImportState from "./ImportState.svelte";
  import type { ImportItem, ImportResponse, View } from "./model";
  let {
    view,
    items,
    response,
    error,
    onconfirm,
    onfirst,
    onretry,
    onlogout = () => {},
    user = "demo",
    dueCount,
    reviewDeck,
  }: {
    view: View;
    items: ImportItem[];
    response: ImportResponse;
    error?: { status: number; unconfirmed: boolean; message: string };
    onconfirm: () => void;
    onfirst: () => void;
    onretry: () => void;
    onlogout?: () => void;
    user?: string;
    dueCount?: number;
    reviewDeck?: { id: number; name: string };
  } = $props();
  let newRows = $derived(
    response.results.filter(
      (r) => r.status === (view === "done" ? "created" : "would_create"),
    ),
  );
  let skipped = $derived(
    response.results
      .filter((r) => !["would_create", "created"].includes(r.status))
      .toSorted(
        (a, b) =>
          (a.status === "error" ? 0 : a.status === "duplicate" ? 1 : 2) -
          (b.status === "error" ? 0 : b.status === "duplicate" ? 1 : 2),
      ),
  );
  let busy = $derived(view === "loading" || view === "importing");
  let skippedWords = $derived(
    [
      skipped.some((r) => r.status === "duplicate") ? "已有" : "",
      skipped.some((r) => r.status === "would_duplicate") ? "重複" : "",
      skipped.some((r) => r.status === "error") ? "錯誤" : "",
    ]
      .filter(Boolean)
      .join("、"),
  );
  let expanded = $state(false);
</script>

<AppShell state={view} {user} {dueCount} {onlogout}>
  <ImportHeader
    title={view === "empty" ? "從 Yoin 匯入" : "匯入預覽"}
    lede={view === "empty" || view === "server-error"
      ? ""
      : view === "done"
        ? "這一批已經寫入 Ferdinand。"
        : view === "importing"
          ? "正在把卡片寫入 Ferdinand。"
          : view === "errors"
            ? "有幾張卡片資料有問題。其餘的卡片可以先匯入。"
            : view === "over-limit"
              ? `Yoin 一次送來 ${items.length} 張，超過單次上限。還沒有檢查，也還沒有寫入任何卡片。`
              : "先看看哪些卡片會加進 Ferdinand。按下匯入之前，什麼都不會寫入。"}
  />
  {#if view === "empty" || view === "server-error"}<ImportState
      {error}
      {onretry}
    />
  {:else}
    <ImportSummary {reviewDeck} {response} total={items.length} {view} />
    <div class="paper imp-ledger" data-component="ImportList" aria-busy={busy}>
      {#if view === "over-limit"}
        <ImportList
          title="這一批到第"
          {items}
          indexed
          cutTotal={items.length}
          results={[
            { index: 98, status: "batch" },
            { index: 99, status: "batch" },
            { index: 100, status: "held" },
            { index: 101, status: "held" },
          ]}
        />
      {:else if view === "loading"}<ImportList
          title="這一批"
          {items}
          results={items.map((_, index) => ({ index, status: "pending" }))}
        />
      {:else if view === "importing"}<ImportList
          title="匯入中"
          {items}
          results={newRows}
        />{#if skipped.length}<ImportList
            title="不會匯入"
            {items}
            results={skipped}
          />{/if}
      {:else if view === "done"}
        {#if skipped.length}<ImportList
            title="沒有匯入"
            {items}
            results={skipped}
          />{/if}
        <button
          class="disclose"
          aria-expanded={expanded}
          onclick={() => (expanded = !expanded)}
          >已匯入的 {newRows.length} 張
          <span>{expanded ? "收合" : "展開"}</span></button
        >
        {#if expanded}<ImportList
            title="已匯入"
            {items}
            results={newRows}
          />{/if}
      {:else}
        {#if skipped.length}<ImportList
            title={skipped.every((r) => r.status === "error")
              ? "有錯誤，不會匯入"
              : "不會匯入"}
            {items}
            results={skipped}
            note={skipped.every((r) => r.status === "error")
              ? "切換回 Yoin 修正這幾張，再重送。"
              : skipped.some((r) => r.status === "error")
                ? "錯誤的卡片：切換回 Yoin 修正，再重送。已有和重複的卡片不用處理。"
                : "這些卡片不用處理。"}
          />{/if}
        <ImportList
          title="會匯入"
          {items}
          results={newRows}
          uniform={!skipped.length}
        />
      {/if}
    </div>
    {#if view !== "done"}<ImportDock
        hint={view === "importing"
          ? "請先別關閉這一頁。"
          : view === "loading"
            ? "正在檢查，完成後才能匯入。"
            : view === "over-limit"
              ? "按下後先檢查，確認之前不會寫入。"
              : skipped.length
                ? skipped.every((r) => r.status === "error")
                  ? `錯誤的 ${skipped.length} 張不會匯入，其餘 ${newRows.length} 張可以先匯入。`
                  : `${skippedWords}的 ${skipped.length} 張不會匯入。`
                : "按下後才會寫入 Ferdinand。"}
        label={view === "loading"
          ? "檢查中…"
          : view === "importing"
            ? "匯入中…"
            : view === "over-limit"
              ? "檢查前 100 張"
              : `匯入 ${newRows.length} 張`}
        disabled={busy || (view !== "over-limit" && !newRows.length)}
        {busy}
        onconfirm={view === "over-limit" ? onfirst : onconfirm}
      />{/if}
  {/if}
  <p class="vh" role="status" aria-live="polite">
    {view === "done"
      ? `匯入完成：${newRows.length} 張已加入 Ferdinand。`
      : view === "preview" || view === "all-new" || view === "errors"
        ? `檢查完成：${newRows.length} 張會匯入。`
        : busy
          ? "處理中，請稍候。"
          : ""}
  </p>
</AppShell>

<style>
  .disclose {
    display: flex;
    justify-content: space-between;
    min-height: 64px;
    width: 100%;
    border-top: 1px solid var(--hairline);
    margin-top: 24px;
    font: 500 16px/26px var(--font-ui);
  }
  .disclose span {
    font-weight: 400;
    color: var(--secondary);
  }

  .imp-ledger {
    margin-top: 24px;
    padding: 8px 16px 12px;
  }
  @media (min-width: 1000px) {
    .imp-ledger {
      margin-top: 32px;
      padding: 8px 24px 16px;
    }
  }
</style>
