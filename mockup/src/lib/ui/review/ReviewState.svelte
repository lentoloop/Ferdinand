<script lang="ts">
  import DoneTick from "./DoneTick.svelte";
  let {
    variant,
    detail = "",
    nextDays = [],
    onretry = () => {},
  }: {
    variant: "empty" | "loading" | "error";
    detail?: string;
    nextDays?: number[];
    onretry?: () => void;
  } = $props();
</script>

<article
  class="paper state-card"
  data-component="ReviewState"
  data-variant={variant}
  aria-busy={variant === "loading"}
>
  {#if variant === "empty"}<DoneTick />
    <h1>今天的卡片都複習好了。</h1>
    <div class="actions">
      <a class="primary" href="/">回到牌組</a><a class="textlink" href="/browse"
        >瀏覽卡片</a
      >
    </div>
    <ol>
      {#each nextDays as count, i}<li>
          <span>{["明天", "後天", "大後天"][i]}</span><span class="mono"
            >{count} 張</span
          >
        </li>{/each}
    </ol>{:else if variant === "loading"}<p role="status">
      正在載入下一張卡片…
    </p>{:else}<h1>無法載入下一張卡片。</h1>
    <p role="alert">{detail}</p>
    <div class="actions">
      <button class="primary" onclick={onretry}>重試</button><a
        class="textlink"
        href="/">回到牌組</a
      >
    </div>{/if}
</article>

<style>
  .state-card {
    padding: 32px 24px;
  }
  .state-card h1 {
    font: 400 24px/40px var(--font-book);
  }
  .actions {
    margin-top: 24px;
    display: grid;
    gap: 8px;
  }
  ol {
    margin-top: 32px;
  }
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--hairline);
    padding: 12px 0;
  }
  @media (min-width: 1000px) {
    .state-card {
      width: min(520px, 100%);
      margin: 96px auto 0;
      padding: 40px 48px;
      text-align: center;
    }
  }
</style>
