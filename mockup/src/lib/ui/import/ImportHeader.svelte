<script lang="ts">
  let {
    lede = "",
    title = "匯入預覽",
  }: {
    lede?: string;
    title?: string;
  } = $props();
</script>

<header class="imp-head-block" data-component="ImportHeader">
  <h1 class="page-h" tabindex="-1">{title}</h1>
  {#if lede}<p class="imp-lede">{lede}</p>{/if}
</header>

<style>
  .imp-head-block {
    padding-top: 4px;
  }
  /* contract v1: no URL back to Yoin exists, so the header has no 返回 Yoin link (the TabBar/SideNav stay) */
  /* round-1 redo: P scale step 32 at weight 500 (the CJK serif's medium), so the title holds next to the 18px serif rows
   without competing with the figure (48+, weight 400 on the patch) */
  .imp-head-block .page-h {
    padding-top: 4px;
    font-size: 32px;
    line-height: 44px;
    font-weight: 500;
  }
  .imp-lede {
    margin-top: 4px;
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
    max-width: 36em;
  }
  @media (min-width: 1000px) {
    .imp-head-block .page-h {
      padding-top: 40px;
    }
    .imp-lede {
      font-size: 16px;
      line-height: 26px;
    }
  }
</style>
