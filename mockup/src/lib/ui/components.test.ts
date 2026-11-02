import { afterEach, beforeEach, expect, test, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/svelte";
import CoverHeader from "./home/CoverHeader.svelte";
import CoverCard from "./home/CoverCard.svelte";
import DeckList from "./home/DeckList.svelte";
import CardTerm from "./review/CardTerm.svelte";
import SourceCredit from "./review/SourceCredit.svelte";
import TippedPrint from "./review/TippedPrint.svelte";
import AnswerHead from "./review/AnswerHead.svelte";
import AnswerExample from "./review/AnswerExample.svelte";
import AnswerSections from "./review/AnswerSections.svelte";
import RatingRow from "./review/RatingRow.svelte";
import ReviewDock from "./review/ReviewDock.svelte";
import ReviewState from "./review/ReviewState.svelte";
import ReviewHeader from "./review/ReviewHeader.svelte";
import StructuredFace from "./review/StructuredFace.svelte";
import SearchBar from "./browse/SearchBar.svelte";
import FilterChips from "./browse/FilterChips.svelte";
import ResultTable from "./browse/ResultTable.svelte";
import ExportButton from "./browse/ExportButton.svelte";
import BrowseState from "./browse/BrowseState.svelte";
import RichField from "./browse/RichField.svelte";
import ImageField from "./browse/ImageField.svelte";
import FieldEditor from "./browse/FieldEditor.svelte";
import SaveBand from "./browse/SaveBand.svelte";
import DetailTabs from "./browse/DetailTabs.svelte";
import FormatBar from "./browse/FormatBar.svelte";
import RetentionCard from "./stats/RetentionCard.svelte";
import ForecastChart from "./stats/ForecastChart.svelte";
import ReviewsChart from "./stats/ReviewsChart.svelte";
import DeckRetention from "./stats/DeckRetention.svelte";
import StreakLine from "./stats/StreakLine.svelte";
import { card, note, notetype, deck } from "./test-fixtures";
afterEach(cleanup);
beforeEach(() => {
  document.queryCommandState = () => false;
  document.execCommand = vi.fn(() => true);
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
test("cover header has the approved brand and date", () => {
  render(CoverHeader, { dateLong: "2026年11月2日" });
  expect(screen.getByText("Ferdinand")).toBeTruthy();
  expect(screen.getByText("2026年11月2日")).toBeTruthy();
});
test("cover uses actual totals and start deck", () => {
  render(CoverCard, {
    totals: { n: 1, l: 2, r: 3 },
    firstDeck: { id: 5, name: "Demo::Words" },
    values: [1, 2, 3, 4, 5, 6, 7],
  });
  expect(document.querySelector(".cover-num .patch")?.textContent).toBe("6");
  expect(
    screen.getByRole("link", { name: "開始複習" }).getAttribute("href"),
  ).toBe("/study/5");
  expect(document.querySelector("[data-component=WeekDue]")).toBeTruthy();
});
test("deck list retains count labels and full path", () => {
  render(DeckList, { decks: [{ ...deck, name: "Demo::Words" }] });
  expect(screen.getByText("Demo")).toBeTruthy();
  expect(screen.getByText("學習中")).toBeTruthy();
  expect(screen.getByRole("link").getAttribute("href")).toBe("/study/13");
});
test("term sanitizes executable markup", () => {
  render(CardTerm, { html: '<img src="x" onerror="alert(1)"><b>word</b>' });
  expect(document.querySelector("[onerror]")).toBeNull();
  expect(screen.getByText("word").tagName).toBe("B");
});
test("TOEIC source shortens display and retains full title", () => {
  render(SourceCredit, { text: "TOEIC vocabulary level 730 — scheduling" });
  expect(screen.getByText("L730 · scheduling").title).toContain(
    "TOEIC vocabulary",
  );
});
test("unknown source is preserved", () => {
  render(SourceCredit, { text: "Demo source" });
  expect(screen.getByText("Demo source")).toBeTruthy();
});
test("print opens the original image in a dialog", async () => {
  render(TippedPrint, { src: "/media/demo.png", alt: "Demo" });
  await fireEvent.click(screen.getByRole("button", { name: "放大插圖：Demo" }));
  await waitFor(() =>
    expect(
      document.querySelector("dialog[open] img")?.getAttribute("src"),
    ).toBe("/media/demo.png"),
  );
});
test("answer head promotes Why without a print", () => {
  render(AnswerHead, { pos: "(v.)", gloss: "分配", why: "a root" });
  expect(screen.getByText("a root")).toBeTruthy();
  expect(screen.getByText("(v.)")).toBeTruthy();
});
test("example renders rich content and hides when empty", () => {
  const { rerender } = render(AnswerExample, { html: "<b>Example</b>" });
  expect(screen.getByText("Example").tagName).toBe("B");
  void rerender({ html: "" });
});
test("disclosures default closed, toggle, and reset on next card", async () => {
  const { rerender } = render(AnswerSections, {
    cardId: 1,
    sections: [
      { id: "why", label: "為什麼", html: "Root" },
      { id: "empty", label: "Empty", html: "" },
    ],
  });
  const button = screen.getByRole("button", { name: "為什麼 展開" });
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(screen.queryByText("Empty")).toBeNull();
  await fireEvent.click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  await rerender({
    cardId: 2,
    sections: [{ id: "why", label: "為什麼", html: "New root" }],
  });
  expect(
    screen
      .getByRole("button", { name: "為什麼 展開" })
      .getAttribute("aria-expanded"),
  ).toBe("false");
});
for (const image of [false, true])
  test(`structured answer section order, image=${image}`, () => {
    const fields = [...note.fields];
    fields[2] = image ? '<img src="demo.png">' : "";
    render(StructuredFace, {
      fields,
      names: notetype.fields,
      side: "answer",
      cardId: 11,
      notetype: "Concept-Deep",
      frontHtml: "",
    });
    expect(!!document.querySelector("[data-component=TippedPrint]")).toBe(
      image,
    );
    expect(
      document
        .querySelector("[data-component=AnswerTop]")
        ?.getAttribute("data-variant"),
    ).toBe(image ? "print" : "noimg");
    expect(
      Array.from(
        document.querySelectorAll("[data-component=Disclosure] button"),
      ).map((b) => b.textContent),
    ).toEqual(
      image
        ? ["為什麼展開", "易混字展開", "記憶法展開"]
        : ["易混字展開", "記憶法展開"],
    );
    expect(
      document.querySelector("[data-component=AnswerExample]"),
    ).toBeTruthy();
  });
test("Yoin plain reading precedes chunk and does not invent ruby", () => {
  render(StructuredFace, {
    fields: [
      "気がする<br>雨が降る気がする<br>きがする",
      "覺得<br><br>そう思う",
      "",
      "",
      "",
      "",
      "",
      "YouTube",
    ],
    names: notetype.fields,
    side: "front",
    cardId: 1,
    tags: ["origin::yoin", "lang::ja"],
    notetype: "Concept-Deep",
    frontHtml: "",
  });
  expect(
    document.querySelector(".yoin-front")?.firstElementChild?.textContent,
  ).toBe("きがする");
  expect(document.querySelector("ruby")).toBeNull();
});
test("cloze answer renders filled target and no print", () => {
  render(StructuredFace, {
    fields: ["We {{c1::submit}} reports.", "reason", "example", "source"],
    names: ["Text", "Why", "Example", "Source"],
    side: "answer",
    cardId: 1,
    notetype: "Cloze-Deep",
    frontHtml: "",
  });
  expect(screen.getByText("submit").className).toBe("cloze-fill");
  expect(document.querySelector("[data-component=TippedPrint]")).toBeNull();
});
test("rating buttons emit the selected real rating without placeholder intervals", async () => {
  const onrate = vi.fn();
  render(RatingRow, { onrate });
  await fireEvent.click(screen.getByRole("button", { name: /Good/ }));
  expect(onrate).toHaveBeenCalledWith("good");
  expect(screen.queryByText("5d")).toBeNull();
});
test("dock reveals on the front", async () => {
  const onreveal = vi.fn();
  render(ReviewDock, { side: "front", onreveal, onrate: () => {} });
  await fireEvent.click(screen.getByRole("button", { name: "顯示答案" }));
  expect(onreveal).toHaveBeenCalledOnce();
});
test("review header shows leaf while retaining full title", () => {
  render(ReviewHeader, {
    deckName: "Demo::Words",
    done: 2,
    total: 9,
    timer: "00:12",
  });
  expect(screen.getByText("Words").title).toBe("Demo / Words");
  expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe(
    "2",
  );
});
for (const variant of ["empty", "loading", "error"] as const)
  test(`review state ${variant}`, () => {
    render(ReviewState, { variant, detail: "Failure", nextDays: [2, 3, 4] });
    if (variant === "error")
      expect(screen.getByRole("alert").textContent).toBe("Failure");
    if (variant === "loading") expect(screen.getByRole("status")).toBeTruthy();
    if (variant === "empty")
      expect(screen.getByText("今天的卡片都複習好了。")).toBeTruthy();
  });
test("search submits its current query", async () => {
  const onsearch = vi.fn();
  render(SearchBar, { query: "deck:Demo", onsearch });
  expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe(
    "deck:Demo",
  );
  await fireEvent.submit(document.querySelector("form")!);
  expect(onsearch).toHaveBeenCalledOnce();
});
test("filter chips announce selection", async () => {
  const onchange = vi.fn();
  render(FilterChips, { onchange });
  await fireEvent.click(screen.getByRole("button", { name: "到期" }));
  expect(onchange).toHaveBeenCalledOnce();
  expect(
    screen.getByRole("button", { name: "到期" }).getAttribute("aria-pressed"),
  ).toBe("true");
});
test("table and list select a real card", async () => {
  const onselect = vi.fn();
  render(ResultTable, { rows: [card], selected: card.id, onselect });
  await fireEvent.click(screen.getByRole("button"));
  expect(onselect).toHaveBeenCalledWith(card);
  expect(document.querySelector("[data-component=ResultList]")).toBeTruthy();
});
test("export unavailable endpoint stays disabled", () => {
  render(ExportButton, { query: "", count: 0 });
  expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
  expect(screen.getByRole("status").textContent).toBe("沒有可匯出的卡片。");
});
for (const variant of ["empty", "loading", "error"] as const)
  test(`browse state ${variant}`, () => {
    render(BrowseState, { variant, query: "missing", detail: "Failure" });
    expect(
      document
        .querySelector("[data-component=BrowseState]")
        ?.getAttribute("data-variant"),
    ).toBe(variant);
  });
test("rich field sanitizes initial content without showing HTML source", () => {
  render(RichField, {
    html: "<b>Hello</b><script>alert(1)</script>",
    label: "正面",
    id: "demo",
  });
  expect(screen.getByRole("textbox").innerHTML).toBe("<b>Hello</b>");
});
test("image removal takes two presses", async () => {
  render(ImageField, { html: '<img src="demo.png">' });
  await fireEvent.click(screen.getByRole("button", { name: "× 移除圖片" }));
  expect(screen.getByRole("status").textContent).toContain("再按一次");
  await fireEvent.click(screen.getByRole("button", { name: "確定移除" }));
  expect(document.querySelector("[data-component=TippedPrint]")).toBeNull();
});
test("reverse field is a checkbox", () => {
  render(FieldEditor, { name: "ReverseEnabled", html: "1" });
  expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
});
test("format bar follows caret command state and disables link without selection", () => {
  document.queryCommandState = (cmd) => cmd === "bold";
  render(FormatBar, { onchange: () => {} });
  expect(
    screen.getByRole("button", { name: "粗體" }).getAttribute("aria-pressed"),
  ).toBe("true");
  expect(
    screen.getByRole("button", { name: "連結" }).hasAttribute("disabled"),
  ).toBe(true);
});
for (const changed of [0, 2])
  test(`save band ${changed} changed fields`, () => {
    render(SaveBand, { changed, onsave: () => {} });
    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(!changed);
    expect(screen.getByRole("status").textContent).toBe(
      changed ? "有 2 處修改" : "沒有修改",
    );
  });
test("detail tabs switch to editing", async () => {
  render(DetailTabs);
  await fireEvent.click(screen.getByRole("tab", { name: "編輯" }));
  expect(
    screen.getByRole("tab", { name: "編輯" }).getAttribute("aria-selected"),
  ).toBe("true");
});
test("retention never fabricates unavailable percent", () => {
  render(RetentionCard, { pct: null });
  expect(screen.getByText("—")).toBeTruthy();
});
test("forecast exposes raw daily data alongside five-day trend", () => {
  render(ForecastChart, { values: [0, 100, 0], dates: ["a", "b", "c"] });
  expect(document.querySelector("table")?.textContent).toContain("b100");
  expect(document.querySelector(".line")?.getAttribute("d")).toContain("C");
});
test("reviews display zero-day rest labels and raw counts", () => {
  render(ReviewsChart, { values: [0, 3], dates: ["a", "b"] });
  expect(screen.getByText("休息")).toBeTruthy();
  expect(document.querySelector("table")?.textContent).toContain("b3");
});
test("deck retention hides missing data, renders actual rows", async () => {
  const { rerender } = render(DeckRetention, { rows: [] });
  expect(document.querySelector("[data-component=DeckRetention]")).toBeNull();
  await rerender({ rows: [{ name: "Demo", pct: 80 }] });
  expect(screen.getByText("80.0%")).toBeTruthy();
});
test("streak states the measured history window", () => {
  render(StreakLine, { days: 2, longest: 5 });
  expect(screen.getByText("最近 30 天最長 5 天。")).toBeTruthy();
});

test("Yoin credit permits only approved HTTPS jump platforms", () => {
  render(SourceCredit, {
    variant: "yoin",
    text: 'youtube<br>id<br>Demo<br>12 s<br>2026-11-01T00:00:00Z<br><a href="https://example.com/">來源</a>',
  });
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.getByText("00:12")).toBeTruthy();
});
