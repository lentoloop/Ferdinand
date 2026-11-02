<script lang="ts">
  let {
    error,
    onretry,
  }: {
    error?: { status: number; unconfirmed: boolean; message: string };
    onretry: () => void;
  } = $props();
</script>

<article
  class="paper state-card imp-state"
  data-component="ImportState"
  data-pending-design="Mia"
  data-variant={error ? "error" : "nothing"}
  role={error ? "alert" : "status"}
>
  {#if error}<h2 class="state-title">
      {error.unconfirmed
        ? "匯入結果未確認。"
        : error.status === 401
          ? "請先登入 Ferdinand。"
          : "無法完成這次匯入。"}
    </h2>
    <p class="state-body">
      {error.unconfirmed
        ? "沒有收到結果，部分卡片可能已寫入。重試是安全的，不會重複建立。"
        : error.message}
    </p>
    <button class="primary" onclick={onretry}
      >{error.status === 401 ? "登入" : "重試"}</button
    >{:else}<h2 class="state-title">Yoin 沒有送來任何卡片。</h2>
    <h3 class="imp-steps-h">從 Yoin 送卡片過來</h3>
    <ol class="imp-steps">
      <li>在 Yoin 暫存勾選卡片。</li>
      <li>按「送到 Ferdinand」。</li>
      <li>這裡會出現預覽，確認後才匯入。</li>
    </ol>
    <p class="imp-steps-note">一次可以送 1 到 100 張。請切換回 Yoin。</p>{/if}
</article>

<style>
  .imp-state {
    margin-top: 20px;
  }
  .imp-state .state-title {
    font-size: 20px;
    line-height: 32px;
  }
  /* contract v1: where a Yoin link used to be, a plain instruction in ink (FD "explain how to fix it"; no link exists) */
  .imp-state[data-variant="error"] .state-title {
    color: var(--ink);
  }
  /* empty (fixes before wu): a quiet, useful sheet. No numeral: there is no result to count (gc one event; FD "an empty
   screen is an invitation to act"). 520px measure, left on the content column like every other state (P "avoid
   inconsistent spacing rhythm"). The steps are a real sequence, so they are numbered (FD "numbering only when the
   content is a sequence"); the numbers are mono secondary text, never in a shape. */
  .imp-state[data-variant="nothing"] {
    max-width: 520px;
  }
  .imp-steps-h {
    margin-top: 24px;
    font: 500 16px/26px var(--font-ui);
  }
  .imp-steps {
    margin-top: 8px;
    padding: 0;
    list-style: none;
    counter-reset: imp-step;
  }
  .imp-steps li {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    padding: 6px 0;
    font-size: 16px;
    line-height: 26px;
    color: var(--ink-2);
    counter-increment: imp-step;
  }
  .imp-steps li::before {
    content: counter(imp-step);
    font: 400 14px/26px var(--font-mono);
    color: var(--secondary);
  }
  .imp-steps-note {
    margin-top: 8px;
    font-size: 14px;
    line-height: 22px;
    color: var(--secondary);
  }
  @media (min-width: 1000px) {
    .imp-state {
      margin-top: 32px;
    }
    .imp-state .state-title {
      font-size: 24px;
      line-height: 40px;
    }
  }
  @media (max-width: 999.98px) {
  }
</style>
