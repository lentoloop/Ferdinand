import { beforeEach, afterEach, expect, test, vi } from "vitest";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/svelte";
vi.mock("$lib/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("$lib/api")>()),
  fetchCards: vi.fn(),
  fetchDecks: vi.fn(),
  fetchNote: vi.fn(),
  fetchNotetype: vi.fn(),
  fetchQueue: vi.fn(),
  fetchForecast: vi.fn(),
  fetchStatsRecent: vi.fn(),
  postAnswer: vi.fn(),
  patchNote: vi.fn(),
}));
import {
  fetchCards,
  fetchDecks,
  fetchNote,
  fetchNotetype,
  fetchQueue,
  fetchForecast,
  fetchStatsRecent,
  postAnswer,
  patchNote,
} from "$lib/api";
import { card, note, notetype, deck } from "$lib/ui/test-fixtures";
beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(fetchCards).mockResolvedValue({ total: 1, cards: [card] });
  vi.mocked(fetchDecks).mockResolvedValue({ decks: [deck] });
  vi.mocked(fetchNote).mockResolvedValue(note);
  vi.mocked(fetchNotetype).mockResolvedValue(notetype);
  vi.mocked(fetchForecast).mockResolvedValue({
    days: 4,
    history: [0, 1, 2, 3].map((offset) => ({ offset, reviews: offset })),
  });
  vi.mocked(fetchQueue).mockResolvedValue({
    new: 1,
    learning: 0,
    review: 0,
    cards: [card],
  });
  vi.mocked(fetchStatsRecent).mockResolvedValue({
    days: 3,
    history: [
      { date: "2026-11-01", reviews: 0 },
      { date: "2026-11-02", reviews: 3 },
      { date: "2026-11-03", reviews: 1 },
    ],
  });
  vi.mocked(patchNote).mockImplementation(async (id, patch) => ({
    note_id: id,
    fields: patch.fields ?? note.fields,
    tags: [],
    modified: 0,
  }));
});
afterEach(cleanup);
import Page from "./+page.svelte";
test("browse opens note, renders HTML, saves changed fields, and returns clean", async () => {
  render(Page);
  await waitFor(() =>
    expect(document.querySelector("[data-component=CardSheet]")).toBeTruthy(),
  );
  await fireEvent.click(screen.getByRole("tab", { name: "編輯" }));
  const field = screen.getByRole("textbox", { name: "例句" });
  expect(field.querySelector("b")?.textContent).toBe("Allocate");
  field.innerHTML = "<b>Changed</b> time.";
  await fireEvent.input(field);
  expect(
    document.querySelector("[data-component=SaveBand] [role=status]")
      ?.textContent,
  ).toContain("1 處修改");
  await fireEvent.click(screen.getByRole("button", { name: "儲存變更" }));
  await waitFor(() =>
    expect(patchNote).toHaveBeenCalledWith(12, {
      fields: expect.arrayContaining(["<b>Changed</b> time."]),
    }),
  );
  await waitFor(() =>
    expect(
      document.querySelector("[data-component=SaveBand] [role=status]")
        ?.textContent,
    ).toBe("已儲存"),
  );
  expect(
    screen.getByRole("button", { name: "沒有修改" }).hasAttribute("disabled"),
  ).toBe(true);
});
test("search sends real query", async () => {
  render(Page);
  await waitFor(() => expect(fetchCards).toHaveBeenCalledOnce());
  await fireEvent.input(screen.getByRole("searchbox"), {
    target: { value: "deck:Demo" },
  });
  await fireEvent.submit(screen.getByRole("searchbox").closest("form")!);
  expect(fetchCards).toHaveBeenLastCalledWith("deck:Demo", 50, 0);
});
test("empty state", async () => {
  vi.mocked(fetchCards).mockResolvedValue({ total: 0, cards: [] });
  render(Page);
  await waitFor(() =>
    expect(screen.getByText("沒有符合的卡片。")).toBeTruthy(),
  );
});
test("error does not replace real collection with demo data", async () => {
  vi.mocked(fetchCards).mockRejectedValue(new Error("unavailable"));
  render(Page);
  await waitFor(() =>
    expect(screen.getByRole("alert").textContent).toContain("unavailable"),
  );
  expect(document.querySelector("[data-component=ResultList]")).toBeNull();
});
test("loading state", () => {
  vi.mocked(fetchCards).mockReturnValue(new Promise(() => {}));
  render(Page);
  expect(screen.getByText("正在搜尋卡片…")).toBeTruthy();
});

test('failed save preserves the draft and allows retry',async()=>{
vi.mocked(patchNote).mockRejectedValueOnce(new Error('save unavailable'));
render(Page);await waitFor(()=>expect(document.querySelector('[data-component=CardSheet]')).toBeTruthy());await fireEvent.click(screen.getByRole('tab',{name:'編輯'}));const field=screen.getByRole('textbox',{name:'例句'});field.innerHTML='Unsaved draft';await fireEvent.input(field);await fireEvent.click(screen.getByRole('button',{name:'儲存變更'}));await waitFor(()=>expect(screen.getByText('save unavailable')).toBeTruthy());expect(field.innerHTML).toBe('Unsaved draft');await fireEvent.click(screen.getByRole('button',{name:'儲存變更'}));await waitFor(()=>expect(screen.getByText('已儲存')).toBeTruthy());expect(patchNote).toHaveBeenCalledTimes(2);
});
