<script lang="ts">
  import Brand from "../shell/Brand.svelte";
  let { dateLong }: { dateLong: string } = $props();
</script>

<header class="cover-head" data-component="CoverHeader">
  <div class="brand-row"><Brand size={32} /></div>
  <a class="settings" href="/settings">設定</a>
  <h1 class="today-h">今日</h1>
  <p class="today-date">{dateLong}</p>
  <p class="lede">今天要回來看的字，都在這裡。</p>
</header>

<style>
  .cover-head {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding-top: 12px;
  }
  .brand-row,
  .settings {
    display: flex;
    align-items: center;
    min-height: 44px;
  }
  .settings {
    color: var(--ink-3);
  }
  .today-h {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .today-date {
    display: none;
  }
  .lede {
    grid-column: 1/-1;
    font-size: 14px;
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .cover-head {
      display: block;
      padding-top: 56px;
    }
    .brand-row,
    .settings {
      display: none;
    }
    .today-h {
      position: static;
      clip: auto;
      width: auto;
      height: auto;
      font: 400 var(--t-h2)/var(--l-h2) var(--font-book);
    }
    .today-date {
      display: block;
      color: var(--secondary);
    }
    .lede {
      font-size: 16px;
    }
  }
</style>
