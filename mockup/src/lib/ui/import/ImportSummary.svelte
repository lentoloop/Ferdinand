<script lang="ts">
  import type { ImportResponse } from "./model";
  import DoneCounts from "./DoneCounts.svelte";
  import DeckPlan from "./DeckPlan.svelte";
  let {
    response,
    total,
    view,
    reviewDeck,
  }: {
    response: ImportResponse;
    total: number;
    view: string;
    reviewDeck?: { id: number; name: string };
  } = $props();
  let pending = $derived(view === "loading" || view === "importing");
  let n = $derived(
    response.results.filter(
      (r) => r.status === (view === "done" ? "created" : "would_create"),
    ).length,
  );
  let skipped = $derived(total - n);
  let parts = $derived(
    [
      { shape: "new", word: "新增", n },
      {
        shape: "have",
        word: "已有",
        n: response.results.filter((r) => r.status === "duplicate").length,
      },
      {
        shape: "repeat",
        word: "重複",
        n: response.results.filter((r) => r.status === "would_duplicate")
          .length,
      },
      {
        shape: "error",
        word: "錯誤",
        n: response.results.filter((r) => r.status === "error").length,
      },
    ].filter((p) => p.n || p.shape === "new"),
  );
</script>

<article
  class="paper imp-summary"
  data-component="ImportSummary"
  data-pending={pending ? "1" : undefined}
>
  {#if pending}<div class="imp-busy" aria-hidden="true"><span></span></div>{/if}
  <div class="imp-sum-a">
    <p class="label">
      {view === "done"
        ? "匯入完成"
        : view === "importing"
          ? "正在匯入"
          : `Yoin 送來 ${total} 張`}
    </p>
    <p class="imp-figure figure">
      <span class:patch={!pending}
        >{view === "loading" ? total : view === "over-limit" ? 100 : n}</span
      ><span class="unit"
        >{view === "loading"
          ? "張，檢查中"
          : view === "importing"
            ? "張…"
            : view === "over-limit"
              ? "張先檢查"
              : view === "done"
                ? "張已加入 Ferdinand"
                : "張會匯入"}</span
      >
    </p>
    {#if !pending && view !== "over-limit" && view !== "done" && skipped}<p
        class="imp-split"
      >
        {#each parts as part}<span data-st={part.shape}
            ><span class="st-mark" data-st={part.shape}></span>{part.word}<b
              class="mono">{part.n}</b
            ></span
          >{/each}
      </p>{/if}
    <p class="imp-note">
      {#if view === "over-limit"}一次最多 100 張。先檢查前 100
        張，看完結果再決定要不要匯入。剩下的 {total - 100} 張留在 Yoin，之後再送。{:else if view === "loading"}正在檢查哪些是新卡片、哪些
        Ferdinand 已經有了。{:else if view === "importing"}寫入完成後，這裡會一次顯示結果。{:else if view === "done"}<DoneCounts
          {response}
        />{:else if skipped}{parts
          .filter((p) => p.shape !== "new")
          .map((p) => p.word)
          .join("、")}的 {skipped} 張不會匯入。Ferdinand 裡已有的卡片不會被改動。{:else}全部
        {total} 張都是新卡片，都會匯入。{/if}
    </p>
  </div>
  <div class="imp-sum-b">
    <DeckPlan
      {response}
      pending={view === "loading"}
      later={view === "over-limit"}
    />{#if view === "done"}<div class="imp-actions">
        {#if reviewDeck}<a class="primary" href={`/study/${reviewDeck.id}`}
            >開始複習 {reviewDeck.name}</a
          >{/if}
        <a class="textlink" href="/browse?q=tag%3Aorigin%3A%3Ayoin%20added%3A1"
          >查看匯入的卡片</a
        >
      </div>{/if}
  </div>
</article>

<style>
  .imp-summary {
    margin-top: 20px;
    padding: 28px 24px 24px;
  }
  .imp-figure {
    margin-top: 4px;
  }
  /* loading and importing: the count is not a result yet (P "keep interaction states explicit"; gc one event = the result),
   so it drops the patch and sits in secondary ink until the request returns */
  .imp-summary[data-pending] .imp-figure > span:first-child {
    color: var(--secondary);
  }
  /* a quiet 2px indeterminate accent line under the card's top edge; static dotted line under reduced motion */
  .imp-busy {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    overflow: hidden;
  }
  .imp-busy span {
    display: block;
    width: 100%;
    height: 2px;
    background: radial-gradient(circle, var(--accent) 0 1px, transparent 1.1px)
      0 0/4px 2px repeat-x;
  }
  @media (prefers-reduced-motion: no-preference) {
    .imp-busy span {
      width: 28%;
      background: var(--accent);
      animation: imp-busy 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes imp-busy {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(360%);
      }
    }
  }
  .imp-split {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
    margin-top: 8px;
    font-size: 16px;
    line-height: 26px;
  }
  .imp-split > span {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    white-space: nowrap;
  }
  .imp-split b {
    font-weight: 400;
  }
  .imp-split [data-st="error"] {
    color: var(--again);
  }
  .imp-note {
    margin-top: 12px;
    font-size: 14px;
    line-height: 22px;
    color: var(--ink-2);
  }
  .imp-sum-b {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--hairline);
    min-width: 0;
  }
  .imp-actions {
    margin-top: 24px;
  }
  @media (min-width: 1000px) {
    .imp-summary {
      margin-top: 32px;
      display: grid;
      grid-template-columns: 296px minmax(0, 1fr);
      column-gap: 64px;
      align-items: start;
      padding: 36px 40px;
    }
    .imp-summary .label {
      font-size: 16px;
      line-height: 26px;
    }
    .imp-note {
      font-size: 16px;
      line-height: 26px;
    }
    .imp-sum-b {
      margin-top: 0;
      padding: 0 0 0 40px;
      border-top: 0;
      border-left: 1px solid var(--hairline);
      align-self: stretch;
    }
    .imp-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 24px;
    }
    .imp-actions .primary {
      width: auto;
      min-width: 240px;
    }
  }
</style>
