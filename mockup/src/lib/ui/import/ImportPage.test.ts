import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import ImportPage from "./ImportPage.svelte";
import { importFixtures, overLimit } from "./fixtures";
import {
  HandoffReceiver,
  firstIndex,
  isResponse,
  type View,
  type ImportResponse,
} from "./model";

const batch = importFixtures.preview;
function mount(view: View, response?: ImportResponse) {
  const fixture =
    view === "all-new"
      ? importFixtures.allNew
      : view === "errors"
        ? importFixtures.errors
        : batch;
  const results: ImportResponse["results"] = fixture.results.map((r) => ({
    ...r,
    status:
      view === "done"
        ? r.status === "would_create"
          ? "created"
          : r.status === "would_duplicate"
            ? "duplicate"
            : r.status
        : r.status,
  }));
  response ??= { dry_run: view !== "done", results };
  const onconfirm = vi.fn();
  const props = {
    view,
    items: view === "over-limit" ? overLimit : fixture.items,
    response,
    onconfirm,
    onfirst: vi.fn(),
    onretry: vi.fn(),
  };
  return { ...render(ImportPage, props), onconfirm };
}
describe("approved import states", () => {
  for (const view of [
    "preview",
    "all-new",
    "errors",
    "over-limit",
    "loading",
    "importing",
    "done",
    "server-error",
    "empty",
  ] satisfies View[]) {
    it(`renders ${view}`, () => {
      const { container } = mount(view);
      expect(container.querySelector(`[data-state="${view}"]`)).not.toBeNull();
      expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
        view === "empty" ? "從 Yoin 匯入" : "匯入預覽",
      );
    });
  }
  it("shows every new item without a skipped group", () => {
    const { container } = mount("all-new");
    expect(
      container.querySelectorAll('[data-component="ImportRow"]').length,
    ).toBe(12);
    expect(screen.queryByText("不會匯入")).toBeNull();
  });
  it("shows the over-limit cut without confirming", async () => {
    const { container, onconfirm } = mount("over-limit");
    expect(
      container.querySelectorAll('[data-component="ImportRow"]').length,
    ).toBe(4);
    expect(screen.getByRole("separator").textContent).toContain("37");
    await fireEvent.click(
      screen.getByRole("button", { name: "檢查前 100 張" }),
    );
    expect(onconfirm).not.toHaveBeenCalled();
  });
  it("expands the actual created results after completion", async () => {
    const { container } = mount("done");
    const button = screen.getByRole("button", { name: /已匯入的 20 張/ });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    await fireEvent.click(button);
    expect(container.querySelectorAll('[data-status="created"]').length).toBe(
      20,
    );
  });
  it("confirms only by explicit action", async () => {
    const { onconfirm } = mount("preview");
    expect(onconfirm).not.toHaveBeenCalled();
    await fireEvent.click(screen.getByRole("button", { name: "匯入 20 張" }));
    expect(onconfirm).toHaveBeenCalledOnce();
  });
  it("disables the confirm while importing", () => {
    mount("importing");
    expect(
      screen.getByRole("button", { name: "匯入中…" }).hasAttribute("disabled"),
    ).toBe(true);
  });
  it("hides deck existence badges when decks are absent", () => {
    const { container } = mount("preview");
    expect(container.querySelector(".imp-deck-tag")).toBeNull();
  });
  it("renders optional deck metadata", () => {
    mount("preview", {
      dry_run: true,
      results: batch.results,
      decks: [{ name: "Yoin::English", exists: false, would_create: true }],
    });
    expect(screen.getByText("會自動建立")).toBeTruthy();
  });
  it("explains uncertain writes and safe retry", () => {
    render(ImportPage, {
      view: "server-error",
      items: batch.items,
      response: { dry_run: false, results: [] },
      error: { status: 503, unconfirmed: true, message: "" },
      onconfirm: vi.fn(),
      onfirst: vi.fn(),
      onretry: vi.fn(),
    });
    expect(screen.getByRole("alert").textContent).toContain(
      "部分卡片可能已寫入。重試是安全的",
    );
  });
});
describe("handoff boundary", () => {
  const opener = window;
  const origin = "http://localhost:5173";
  const data = {
    type: "yoin:items",
    v: 1,
    nonce: "a".repeat(32),
    items: batch.items,
  };
  const event = (overrides: MessageEventInit = {}) =>
    new MessageEvent("message", { origin, source: opener, data, ...overrides });
  it("accepts only once", () => {
    const receiver = new HandoffReceiver([origin], opener);
    expect(receiver.accept(event())?.items).toEqual(batch.items);
    expect(receiver.accept(event())).toBeUndefined();
  });
  for (const change of [
    { origin: "https://other.invalid" },
    { source: null },
    { data: { ...data, nonce: "bad" } },
    { data: { ...data, v: 2 } },
    { data: { ...data, items: [{}] } },
  ]) {
    it(`ignores invalid envelope ${JSON.stringify(change)}`, () =>
      expect(
        new HandoffReceiver([origin], opener).accept(event(change)),
      ).toBeUndefined());
  }
  it("rejects an empty allowlist", () =>
    expect(new HandoffReceiver([], opener).accept(event())).toBeUndefined());
  it("joins by response index and rejects duplicate indices", () => {
    expect(
      isResponse(
        {
          dry_run: true,
          results: [
            { index: 0, status: "would_create" },
            { index: 0, status: "error" },
          ],
        },
        2,
      ),
    ).toBe(false);
  });
  it("computes repeats by id and honors first_index", () => {
    const items = [batch.items[0], batch.items[0]];
    expect(firstIndex(items, { index: 1, status: "would_duplicate" })).toBe(0);
    expect(
      firstIndex(items, { index: 1, status: "duplicate", first_index: 0 }),
    ).toBe(0);
  });
});
