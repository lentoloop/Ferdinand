<script lang="ts">
  import CardTerm from "./CardTerm.svelte";
  import AnswerTop from "./AnswerTop.svelte";
  import AnswerHead from "./AnswerHead.svelte";
  import AnswerExample from "./AnswerExample.svelte";
  import AnswerSections from "./AnswerSections.svelte";
  import SourceCredit from "./SourceCredit.svelte";
  import TippedPrint from "./TippedPrint.svelte";
  import { clean, imageSource, plain } from "./fields";
  let {
    fields,
    names,
    side,
    cardId,
    tags = [],
    notetype,
    frontHtml,
  }: {
    fields: string[];
    names: string[];
    side: "front" | "answer";
    cardId: number;
    tags?: string[];
    notetype: string;
    frontHtml: string;
  } = $props();
  let f = $derived(
    Object.fromEntries(names.map((name, i) => [name, fields[i] ?? ""])),
  );
  let src = $derived(imageSource(f.Image ?? ""));
  let yoin = $derived(tags.includes("origin::yoin"));
  let back = $derived(/^(\([^)]*\))\s*([\s\S]*)$/.exec(f.Back ?? ""));
  let pos = $derived(back?.[1] ?? f.PartOfSpeech ?? f.POS ?? "");
  let gloss = $derived(back?.[2] ?? f.Back ?? "");
  let pronunciation = $derived(f.Phonetic ?? f.Pronunciation ?? "");
  let sections = $derived([
    { id: "why", label: "為什麼", html: src ? (f.Why ?? "") : "" },
    { id: "contrast", label: "易混字", html: f.Contrast ?? "" },
    { id: "mnemonic", label: "記憶法", html: f.Mnemonic ?? "" },
  ]);
  let meanings = $derived(
    (f.Back ?? "").split(/<br\s*\/?\s*>\s*<br\s*\/?\s*>/i),
  );
  let cloze = $derived(clean(frontHtml));
  let yoinParts = $derived((f.Front ?? "").split(/<br\s*\/?\s*>/i));
</script>

{#if side === "front"}<div class="front-body">
    {#if notetype === "Cloze-Deep"}<p class="label">填空</p>
      <div class="cloze-text">{@html cloze}</div>{:else if yoin}<div
        class="yoin-front"
        lang={tags.includes("lang::ja") ? "ja" : "en"}
      >
        {#if yoinParts[2]}<p class="reading">
            {@html clean(yoinParts[2])}
          </p>{/if}<CardTerm
          html={yoinParts[0] ?? ""}
          lang={tags.includes("lang::ja") ? "ja" : "en"}
        />
        <p class="sentence">{@html clean(yoinParts[1] ?? "")}</p>
      </div>{:else}<CardTerm html={f.Front ?? ""} />{#if pronunciation || pos}<p
          class="front-pron"
        >
          <span>{plain(pronunciation)}</span><span
            >{plain(pos).replace(/[()]/g, "")}</span
          >
        </p>{/if}{/if}
  </div>
  <div class="card-foot">
    <SourceCredit text={f.Source ?? ""} variant={yoin ? "yoin" : "toeic"} />
    <p class="card-tags">
      {tags
        .filter((t) => !(f.Source ?? "").includes(t))
        .map((t) => "#" + t)
        .join("　")}
    </p>
  </div>
{:else if notetype === "Cloze-Deep"}<div class="cloze-text">
    {@html clean(
      (f.Text ?? "").replace(
        /\{\{c\d+::(.*?)(?:::[^}]*?)?\}\}/g,
        '<span class="cloze-fill">$1</span>',
      ),
    )}
  </div>
  {#if f.Why}<section class="open-section">
      <h2>為什麼</h2>
      {@html clean(f.Why)}
    </section>{/if}<AnswerExample html={f.Example ?? ""} /><SourceCredit
    text={f.Source ?? ""}
  />
{:else if yoin}<div
    class="yoin-front"
    lang={tags.includes("lang::ja") ? "ja" : "en"}
  >
    {#if yoinParts[2]}<p class="reading">
        {@html clean(yoinParts[2])}
      </p>{/if}<CardTerm
      html={yoinParts[0] ?? ""}
      lang={tags.includes("lang::ja") ? "ja" : "en"}
    />
    <p class="sentence">{@html clean(yoinParts[1] ?? "")}</p>
  </div>
  <SourceCredit text={f.Source ?? ""} variant="yoin" />
  <hr />
  <section class="open-section">
    <h2>中文意思</h2>
    {@html clean(meanings[0] ?? "")}
  </section>
  {#if meanings[1]}<section class="open-section">
      <h2>{tags.includes("lang::ja") ? "日文解釋" : "英文解釋"}</h2>
      <div lang={tags.includes("lang::ja") ? "ja" : "en"}>
        {@html clean(meanings.slice(1).join("<br><br>"))}
      </div>
    </section>{/if}
  {#if f.Example}<section class="open-section">
      <h2>再看一句</h2>
      <div lang={tags.includes("lang::ja") ? "ja" : "en"}>
        {@html clean(f.Example)}
      </div>
    </section>{/if}
{:else}<AnswerTop hasImage={!!src}
    ><CardTerm html={f.Front ?? ""} /><AnswerHead
      {pos}
      {gloss}
      why={src ? "" : (f.Why ?? "")}
    />{#if src}<TippedPrint
        {src}
        alt={`${plain(f.Front ?? "")} 的插圖`}
      />{/if}<AnswerExample html={f.Example ?? ""} /></AnswerTop
  ><AnswerSections {sections} {cardId} /><SourceCredit
    text={f.Source ?? ""}
  />{/if}

<style>
  .front-pron {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    color: var(--secondary);
    font-size: 16px;
  }
  .card-tags {
    font: 14px/22px var(--font-mono);
    color: var(--secondary);
    overflow-wrap: anywhere;
  }
  .card-foot :global(.credit) {
    margin-top: 0;
  }
  .cloze-text {
    font: 400 var(--t-sentence)/var(--l-sentence) var(--font-book);
  }
  .cloze-text :global(.cloze) {
    color: var(--secondary);
    border-bottom: 1px solid var(--ink);
  }
  .cloze-text :global(.cloze-fill) {
    color: var(--accent);
    text-decoration: underline;
  }
  .yoin-front {
    font: 400 var(--t-sentence)/var(--l-sentence) var(--font-book);
  }
  .yoin-front :global(b:first-child) {
    font: 700 var(--t-term)/var(--l-term) var(--font-book);
  }
  .yoin-front :global(.reading) {
    font: 14px/22px var(--font-ui);
    color: var(--secondary);
  }
  .open-section {
    font: 400 18px/30px var(--font-book);
    margin-top: 24px;
  }
  .open-section h2 {
    font: 14px/22px var(--font-ui);
    color: var(--secondary);
  }
  hr {
    border: 0;
    border-top: 1px solid var(--rule);
    margin-top: 24px;
  }
</style>
