<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  let {
    kind = "primary",
    href,
    disabled = false,
    children,
    ...rest
  }: HTMLButtonAttributes & {
    kind?: "primary" | "secondary" | "text";
    href?: string;
    children: Snippet;
  } = $props();
  let className = $derived(kind === "text" ? "textlink" : kind);
</script>

{#if href}<a
    class={className}
    href={disabled ? undefined : href}
    aria-disabled={disabled || undefined}>{@render children()}</a
  >{:else}<button class={className} {disabled} {...rest}
    >{@render children()}</button
  >{/if}
