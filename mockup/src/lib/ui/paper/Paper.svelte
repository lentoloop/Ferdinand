<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  let {
    as: tag = "article",
    variant = "event",
    children,
    class: className = "",
    ...rest
  }: HTMLAttributes<HTMLElement> & {
    as?: "article" | "section" | "div";
    variant?: "event" | "ledger";
    children: Snippet;
  } = $props();
</script>

<svelte:element
  this={tag}
  class={`paper ${className}`}
  data-material={variant}
  {...rest}>{@render children()}</svelte:element
>
