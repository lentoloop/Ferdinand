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
import { setPageParams } from "../../../test/stubs/app-stores";
beforeEach(() => {
  setPageParams({ deckId: "13" });
});
test("review reveals real note fields and rates once", async () => {
  vi.mocked(postAnswer).mockResolvedValue({
    new: 0,
    learning: 0,
    review: 0,
    cards: [],
  });
  render(Page);
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "顯示答案" })).toBeTruthy(),
  );
  expect(screen.getByText("/ˈæləkeɪt/")).toBeTruthy();
  await fireEvent.click(screen.getByRole("button", { name: "顯示答案" }));
  expect(document.querySelectorAll("[aria-expanded=false]").length).toBe(2);
  await fireEvent.click(screen.getByRole("button", { name: /Good/ }));
  await waitFor(() =>
    expect(postAnswer).toHaveBeenCalledWith(
      expect.objectContaining({ card_id: 11, deck_id: 13, rating: "good" }),
    ),
  );
  await waitFor(() =>
    expect(screen.getByText("今天的卡片都複習好了。")).toBeTruthy(),
  );
});
test("queue failure surfaces error", async () => {
  vi.mocked(fetchQueue).mockRejectedValue(new Error("queue unavailable"));
  render(Page);
  await waitFor(() =>
    expect(screen.getByRole("alert").textContent).toContain(
      "queue unavailable",
    ),
  );
});
