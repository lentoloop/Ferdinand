<script lang="ts">
  import type { AnswerRating } from "$lib/api";
  let {
    intervals = {},
    onrate,
    disabled = false,
  }: {
    intervals?: Partial<Record<AnswerRating, string>>;
    onrate: (rating: AnswerRating) => void;
    disabled?: boolean;
  } = $props();
  const ratings: { key: AnswerRating; en: string; zh: string }[] = [
    { key: "again", en: "Again", zh: "重來" },
    { key: "hard", en: "Hard", zh: "困難" },
    { key: "good", en: "Good", zh: "記得" },
    { key: "easy", en: "Easy", zh: "熟悉" },
  ];
</script>

<div class="ratings" data-component="RatingRow">
  {#each ratings as r, i}<button
      class="rating"
      {disabled}
      data-key={i + 1}
      onclick={() => onrate(r.key)}
      ><span class="key" aria-hidden="true">{i + 1}</span><strong>{r.en}</strong
      ><span>{r.zh}</span>{#if intervals[r.key]}<span class="mono"
          >{intervals[r.key]}</span
        >{/if}</button
    >{/each}
</div>

<style>
  .ratings {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }
  .rating {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--rating-h);
    min-height: 76px;
    padding: 6px 4px;
    font-size: 14px;
    line-height: 20px;
    background: var(--sheet);
    border: 1px solid var(--control-edge);
    border-radius: var(--r-action);
  }
  strong {
    font-size: 16px;
    font-weight: 500;
  }
  .rating[data-key="1"] strong,
  .rating[data-key="1"] strong + span {
    color: var(--again);
  }
  .rating:hover {
    border-color: var(--ink);
  }
  .rating:active {
    background: var(--press);
    box-shadow: inset 0 -2px var(--ink);
  }
  .key {
    display: none;
  }
  @media (min-width: 1000px) {
    .rating:hover .key {
      display: block;
      position: absolute;
      top: 6px;
      right: 8px;
      font: 14px var(--font-mono);
    }
  }
</style>
