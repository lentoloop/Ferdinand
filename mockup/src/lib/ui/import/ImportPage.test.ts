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
    "done-partial",
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
  it("keeps the checked deck counts while importing",()=>{
    const {container}=mount('importing');
    expect(container.querySelector('.imp-decks .skel')).toBeNull();
    expect(container.querySelector('.imp-decks')?.textContent).toContain('14');
  });
  it("disables the confirm while importing", () => {
    mount("importing");
    expect(
      screen.getByRole("button", { name: "匯入中…" }).hasAttribute("disabled"),
    ).toBe(true);
  });
  it("uses generic deck copy when decks are absent", () => {
    const { container } = mount("preview");
    expect(container.querySelector(".imp-deck-tag")?.textContent).toContain("若尚未建立會自動建立");
  });
  it("uses generic repeat wording without first_index", () => {
    mount("preview", {dry_run: true, results: batch.results.map(({first_index, ...r}) => r)});
    expect(screen.getByText("這批裡重複")).toBeTruthy();
  });
  it("shows only the failed card during a partial retry", () => {
    const {container} = render(ImportPage, {view: "importing", items: batch.items.slice(0, 2), response: {dry_run: false, results: [{index: 0, status: "created"}, {index: 1, status: "error", error: "unable to create note"}]}, onconfirm: vi.fn(), onfirst: vi.fn(), onretry: vi.fn()});
    expect(container.querySelectorAll('[data-component="ImportRow"]')).toHaveLength(1);
    expect(container.querySelector('.imp-figure')?.textContent).toContain("1");
  });
  it("renders a failed note creation retry without resending successful rows", async () => {
    const onretry = vi.fn();
    render(ImportPage, {view: "done-partial", items: batch.items.slice(0, 2), response: {dry_run: false, results: [{index: 0, status: "created"}, {index: 1, status: "error", error: "unable to create note"}]}, onconfirm: vi.fn(), onfirst: vi.fn(), onretry});
    expect(screen.getByText(/其他張已匯入；沒寫入的 1 張/)).toBeTruthy();
    await fireEvent.click(screen.getByRole("button", {name: "重試 1 張"}));
    expect(onretry).toHaveBeenCalledOnce();
  });
  it("renders returned repeat position", () => {
    mount("preview", {dry_run: true, results: batch.results});
    expect(screen.getByText("和第 2 張相同")).toBeTruthy();
  });
  it("renders optional deck metadata", () => {
    mount("preview", {
      dry_run: true,
      results: batch.results,
      decks: [{ name: "Yoin::English", exists: false, would_create: true }],
    });
    expect(screen.getByText("會自動建立")).toBeTruthy();
  });
  it("uses the specific error field only when returned", () => {
    mount("preview", {dry_run: true, results: batch.results.map(r => r.status === "error" ? {...r, error_code: "text_missing", error_field: "meaning_zh"} : r)});
    expect(screen.getByText("中文意思是空的。")).toBeTruthy();
  });
  it("states no writes for a confirmed pre-write rejection", () => {
    render(ImportPage, {view: "server-error", items: batch.items, response: {dry_run: true, results: []}, error: {status: 401, unconfirmed: false, message: "登入已過期。"}, onconfirm: vi.fn(), onfirst: vi.fn(), onretry: vi.fn()});
    expect(screen.getByRole("alert").textContent).toContain("沒有寫入任何卡片");
    expect(screen.queryByText("尚未確認匯入結果")).toBeNull();
  });
  it("shows a full reading without ruby", () => {
    const {container} = mount("preview");
    expect(container.querySelector("ruby")).toBeNull();
    expect(container.querySelector(".imp-reading")?.textContent?.trim()).toBeTruthy();
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
    expect(screen.getByRole("alert").textContent).toContain("這一批可能已經寫入一部分卡片");
    expect(screen.getByRole("alert").textContent).toContain("「重試」很安全");
    expect(screen.getByRole("alert").textContent).not.toContain("沒有寫入任何卡片");
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
  it("uses only the returned first_index", () => {
    const items = [batch.items[0], batch.items[0]];
    expect(firstIndex(items, { index: 1, status: "would_duplicate" })).toBeUndefined();
    expect(
      firstIndex(items, { index: 1, status: "duplicate", first_index: 0 }),
    ).toBe(0);
  });
});
