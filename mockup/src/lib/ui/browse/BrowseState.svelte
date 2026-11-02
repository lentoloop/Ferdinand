<script lang="ts">
  let {
    variant,
    query = "",
    detail = "",
    onretry = () => {},
  }: {
    variant: "empty" | "loading" | "error";
    query?: string;
    detail?: string;
    onretry?: () => void;
  } = $props();
</script>

<article
  class="paper state-card"
  data-component="BrowseState"
  data-variant={variant}
>
  {#if variant === "loading"}<p role="status">
      正在搜尋卡片…
    </p>{:else if variant === "empty"}<h2>沒有符合的卡片。</h2>
    <p class="query">{query}</p>{:else}<h2>無法載入卡片。</h2>
    <p role="alert">{detail}</p>
    <button class="primary" onclick={onretry}>重試</button>{/if}
</article>

<style>
  .state-card {
    padding: 32px 24px;
  }
  h2 {
    font: 400 24px/40px var(--font-book);
  }
  p {
    margin-top: 8px;
  }
  .query {
    font: 14px/22px var(--font-mono);
    color: var(--secondary);
  }
  .primary {
    margin-top: 24px;
  }
</style>
