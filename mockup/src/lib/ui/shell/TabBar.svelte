<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav class="tabbar" data-component="TabBar" aria-label="主要導覽">
  <a href="/" aria-current={$page.url.pathname === "/" ? "page" : undefined}
    >今日</a
  ><a
    href="/browse"
    aria-current={$page.url.pathname === "/browse" ? "page" : undefined}>瀏覽</a
  ><a
    href="/notes/new"
    aria-current={$page.url.pathname === "/notes/new" ? "page" : undefined}
    >新增</a
  ><a
    href="/stats"
    aria-current={$page.url.pathname === "/stats" ? "page" : undefined}>統計</a
  >
</nav>

<style>
  .tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: calc(56px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    background: var(--page);
    border-top: 1px solid var(--hairline);
  }
  /* 24px page-colour fade above the TabBar, so lists run out softly instead of a hard cut (not over the SaveBand) */
  .tabbar::before {
    content: "";
    position: absolute;
    top: -25px;
    height: 24px;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, var(--page));
    pointer-events: none;
  }
  .tabbar a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    font-size: 14px;
    line-height: 22px;
    color: var(--ink);
    text-decoration: none;
    position: relative;
  }
  .tabbar a[aria-current="page"] {
    color: var(--accent);
    font-weight: 500;
  }
  .tabbar a[aria-current="page"]::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 24%;
    right: 24%;
    height: 2px;
    background: var(--accent);
  }
  .tabbar a:hover {
    text-decoration: underline;
  }
  @media (min-width: 1000px) {
    .tabbar {
      display: none;
    }
  }
</style>
