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
test("stats use real counts and withhold unavailable retention", async () => {
  render(Page);
  await waitFor(() =>
    expect(
      document.querySelector("[data-component=ForecastChart]"),
    ).toBeTruthy(),
  );
  expect(screen.getByText("今天 0 張，之後每天約 2 張；曲線為 5 天平滑。")).toBeTruthy();
  expect(
    document.querySelector("[data-component=StreakLine] .figure")?.textContent,
  ).toContain("2");
  expect(document.querySelector("[data-component=DeckRetention]")).toBeNull();
  expect(screen.getByText("—")).toBeTruthy();
});
test("stats error", async () => {
  vi.mocked(fetchStatsRecent).mockRejectedValue(new Error("stats unavailable"));
  render(Page);
  await waitFor(() =>
    expect(screen.getByRole("alert").textContent).toContain(
      "stats unavailable",
    ),
  );
});
