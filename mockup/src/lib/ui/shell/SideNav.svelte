<script lang="ts">
  import Brand from "./Brand.svelte";
  let {
    user = "demo",
    dueCount,
    onlogout,
  }: { user?: string; dueCount?: number; onlogout: () => void } = $props();
</script>

<nav class="sidenav" data-component="SideNav" aria-label="主要導覽">
  <a class="brand" href="/" aria-label="Ferdinand，回到今日"><Brand /></a>
  <ul>
    <li>
      <a href="/"
        ><span>今日</span>{#if dueCount !== undefined}<span class="count mono"
            >{dueCount}</span
          >{/if}</a
      >
    </li>
    <li><a href="/browse">瀏覽</a></li>
    <li><a href="/notes/new" aria-current="page">新增筆記</a></li>
    <li><a href="/stats">統計</a></li>
    <li><a href="/settings">設定</a></li>
  </ul>
  <div class="foot">
    <p>{user}</p>
    <button class="textlink" onclick={onlogout}>登出</button>
  </div>
</nav>

<style>
  .sidenav {
    display: none;
  }
  @media (min-width: 1000px) {
    .sidenav {
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      padding: 32px 24px 24px;
      border-right: 1px solid var(--hairline);
    }
    .sidenav .brand {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 48px;
      padding: 0 6px;
      margin: 0 0 24px -6px;
    }
    .sidenav .brand:hover {
      text-decoration: none;
    }
    .sidenav ul {
      display: grid;
      gap: 4px;
    }
    .sidenav a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 48px;
      padding: 0 12px;
      margin-left: -12px;
      color: var(--ink);
      text-decoration: none;
      font-size: 16px;
      line-height: 26px;
      position: relative;
    }
    .sidenav a:hover {
      text-decoration: underline;
    }
    .sidenav a[aria-current="page"] {
      color: var(--accent);
      font-weight: 500;
    }
    .sidenav a[aria-current="page"]::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background: var(--accent);
    }
    .sidenav .count {
      font-size: 14px;
      color: var(--secondary);
      font-weight: 400;
    }
    .sidenav .foot {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--hairline);
      font-size: 14px;
      line-height: 22px;
      color: var(--secondary);
    }
  }
</style>
