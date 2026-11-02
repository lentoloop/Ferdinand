<script lang="ts">
  let { size = 28 } = $props();
</script>

<span class="lockup" style={`--mark-px:${size}px`} data-component="Brand"
  ><img
    class="mark"
    src={size <= 20
      ? "/logo/mark-b-16.svg"
      : size <= 40
        ? "/logo/mark-b-32.svg"
        : "/logo/mark-b.svg"}
    width={size}
    height={size}
    alt=""
  /><span class="wordmark">Ferdinand</span></span
>

<style>
  .lockup {
    display: inline-flex;
    align-items: center;
    gap: 0;
    color: var(--ink);
    line-height: 1;
  }
  .lockup .mark {
    display: block;
    flex: none;
  }
  .lockup .wordmark {
    font-family: var(--font-book);
    font-weight: 400;
    margin-left: calc(0.35em - var(--mark-px, 0px) / 5);
  }

  .wordmark {
    font-size: 24px;
  }
</style>
