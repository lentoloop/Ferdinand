<script lang="ts">
  import { clean } from "./fields";
  let {
    text = "",
    variant = "toeic",
  }: { text?: string; variant?: "toeic" | "yoin" } = $props();
  let short = $derived(
    text
      .replace(/^TOEIC vocabulary level (\d+) — (.+)$/, "L$1 · $2")
      .replace(/^TOEIC cloze set (\d+) — (.+)$/, "Cloze $1 · $2"),
  );
  let source = $derived.by(() => {
    if (variant !== "yoin" || typeof document === "undefined") return null;
    const d = document.createElement("div");
    d.innerHTML = clean(text);
    const parts = d.innerHTML.split(/<br\s*\/?\s*>/i).map((p) => {
      const e = document.createElement("span");
      e.innerHTML = p;
      return e.textContent ?? "";
    });
    const raw = d.querySelector("a")?.getAttribute("href");
    let jump = "";
    if (raw) {
      try {
        const url = new URL(raw);
        if (
          url.protocol === "https:" &&
          !url.username &&
          !url.password &&
          (!url.port || url.port === "443") &&
          [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "youtu.be",
            "netflix.com",
            "www.netflix.com",
          ].includes(url.hostname)
        )
          jump = raw;
      } catch {}
    }
    const seconds = parts.find((p) => /^\d+(?:\.\d+)? s$/.test(p));
    const total = seconds ? Math.floor(Number(seconds.split(" ")[0])) : null;
    return {
      platform: parts[0],
      title: parts[2],
      episode: parts[3] && !/ s$|^\d{4}-/.test(parts[3]) ? parts[3] : "",
      time:
        total === null
          ? ""
          : `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`,
      jump,
    };
  });
</script>

<div
  class="credit"
  data-component="SourceCredit"
  data-variant={variant}
  title={text}
>
  {#if source}<p>{source.platform}</p>
    <p>{source.title}{source.episode ? "｜" + source.episode : ""}</p>
    {#if source.jump}<a
        href={source.jump}
        target="_blank"
        rel="noopener noreferrer">回到原句 {source.time}</a
      >{:else if source.time}<p>{source.time}</p>{/if}{:else}{@html clean(
      short,
    )}{/if}
</div>

<style>
  .credit {
    font: 400 14px/22px var(--font-mono);
    color: var(--secondary);
    margin-top: 20px;
    overflow-wrap: anywhere;
  }
  .credit :global(a) {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }
</style>
