export interface ImportItem {
  id: string;
  origin: string;
  lang: string;
  chunk: string;
  sentence: string;
  reading?: string;
  meaning_zh: string;
  meaning_target: string;
  example: string;
  created_at: string;
  source: {
    platform: string;
    source_id: string;
    source_title: string;
    episode?: string;
    start_sec?: number;
    jump_url?: string;
  };
}
export type ResultStatus =
  | "would_create"
  | "created"
  | "duplicate"
  | "would_duplicate"
  | "error"
  | "pending"
  | "batch"
  | "held"
  | "unknown"
  | "unsent";
export interface ItemResult {
  index: number;
  status: ResultStatus;
  deck?: string;
  note_id?: string;
  error?: string;
  first_index?: number;
  error_code?: string;
  error_field?: string;
}
export interface ImportResponse {
  dry_run: boolean;
  results: ItemResult[];
  decks?: {
    name: string;
    exists: boolean;
    would_create?: boolean;
    created?: boolean;
  }[];
}
export type View =
  | "empty"
  | "loading"
  | "preview"
  | "all-new"
  | "errors"
  | "over-limit"
  | "importing"
  | "done-partial"
  | "done"
  | "server-error";
export const views: View[] = [
  "empty",
  "loading",
  "preview",
  "all-new",
  "errors",
  "over-limit",
  "importing",
  "done",
  "done-partial",
  "server-error",
];
export function isView(value: string | null): value is View {
  return views.some((view) => view === value);
}
export function status(key: ResultStatus) {
  return {
    would_create: { shape: "new", word: "新增" },
    created: { shape: "done", word: "已匯入" },
    duplicate: { shape: "have", word: "已有" },
    would_duplicate: { shape: "repeat", word: "重複" },
    error: { shape: "error", word: "錯誤" },
    pending: { shape: "pending", word: "檢查中" },
    batch: { shape: "batch", word: "這一批" },
    unknown: { shape: "unsent", word: "結果未確認" },
    unsent: { shape: "unsent", word: "未匯入" },
    held: { shape: "held", word: "留在 Yoin" },
  }[key];
}
export function errorText(error?: string) {
  switch (error) {
    case "invalid item shape":
    case "id must be a lowercase SHA-256 hex string":
    case "invalid origin or language":
      return "卡片資料格式不對";
    case "missing, oversized, or invalid text field":
      return "缺少文字，或文字太長";
    case "invalid source or unapproved HTTPS link":
      return "來源或連結無法使用";
    case "cannot import into a filtered deck":
      return "無法匯入篩選牌組";
    case "unable to create note":
      return "無法建立卡片";
    default:
      return "無法匯入這張卡片";
  }
}
export function firstIndex(
  items: ImportItem[],
  result: ItemResult,
): number | undefined {
  return result.first_index;
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
export function isItem(value: unknown): value is ImportItem {
  if (!record(value) || !record(value.source)) return false;
  const source = value.source;
  return (
    [
      "id",
      "origin",
      "lang",
      "chunk",
      "sentence",
      "meaning_zh",
      "meaning_target",
      "example",
      "created_at",
    ].every((key) => typeof value[key] === "string") &&
    ["platform", "source_id", "source_title"].every(
      (key) => typeof source[key] === "string",
    ) &&
    (value.reading === undefined || typeof value.reading === "string") &&
    ["episode", "jump_url"].every(
      (key) => source[key] === undefined || typeof source[key] === "string",
    ) &&
    (source.start_sec === undefined ||
      (typeof source.start_sec === "number" &&
        Number.isFinite(source.start_sec)))
  );
}
export function isResponse(
  value: unknown,
  count: number,
): value is ImportResponse {
  if (
    !record(value) ||
    typeof value.dry_run !== "boolean" ||
    !Array.isArray(value.results) ||
    value.results.length !== count
  )
    return false;
  const seen = new Set<number>();
  return (
    value.results.every((r) => {
      if (
        !record(r) ||
        typeof r.index !== "number" ||
        !Number.isInteger(r.index) ||
        r.index < 0 ||
        r.index >= count ||
        seen.has(r.index) ||
        ![
          "would_create",
          "created",
          "duplicate",
          "would_duplicate",
          "error",
        ].includes(String(r.status))
      )
        return false;
      seen.add(r.index);
      return (
        ["deck", "note_id", "error", "error_code", "error_field"].every(
          (key) => r[key] === undefined || typeof r[key] === "string",
        ) &&
        (r.first_index === undefined ||
          (typeof r.first_index === "number" &&
            Number.isInteger(r.first_index) &&
            r.first_index >= 0 &&
            r.first_index < r.index))
      );
    }) &&
    (value.decks === undefined ||
      (Array.isArray(value.decks) &&
        value.decks.every(
          (d) =>
            record(d) &&
            typeof d.name === "string" &&
            typeof d.exists === "boolean" &&
            ["created", "would_create"].every(
              (key) => d[key] === undefined || typeof d[key] === "boolean",
            ),
        )))
  );
}
export class HandoffReceiver {
  private seen = new Set<string>();
  constructor(
    private origins: string[],
    private opener: Window | null,
  ) {}
  accept(
    event: MessageEvent,
  ): { nonce: string; items: ImportItem[]; origin: string } | undefined {
    const data: unknown = event.data;
    if (
      !this.opener ||
      event.source !== this.opener ||
      !this.origins.includes(event.origin) ||
      !record(data) ||
      data.type !== "yoin:items" ||
      data.v !== 1 ||
      typeof data.nonce !== "string" ||
      !/^[a-f0-9]{32}$/i.test(data.nonce) ||
      this.seen.has(data.nonce.toLowerCase()) ||
      !Array.isArray(data.items) ||
      !data.items.every(isItem)
    )
      return;
    this.seen.add(data.nonce.toLowerCase());
    return { nonce: data.nonce, items: data.items, origin: event.origin };
  }
}

export function batchErrorText(status: number, message: string): string {
  if (status === 401) return "登入已過期。登入後會回到這一頁。";
  if (status === 403) return "這個匯入要求被擋下了。請切換回 Yoin，再送一次。";
  if (message === "items must contain 1 to 100 entries")
    return "這一批的張數不對。一次要送 1 到 100 張。請切換回 Yoin 重新勾選，再送一次。";
  if (message.startsWith("Concept-Deep"))
    return "Ferdinand 裡的 Concept-Deep 筆記類型不完整。請到設定檢查筆記類型後再試一次。";
  if (status === 400)
    return "Yoin 送來的資料讀不出來。整批資料格式不對，請切換回 Yoin，再送一次。";
  return "匯入要求無法完成。請稍後重試。";
}
export function errorAction(error?: string): string {
  if (error === "unable to create note")
    return "其他張已匯入；這張可以再試一次。";
  if (error === "missing, oversized, or invalid text field")
    return "切換回 Yoin 補上或縮短文字，再重送。";
  if (error === "invalid source or unapproved HTTPS link")
    return "切換回 Yoin 檢查來源連結，再重送。";
  return "切換回 Yoin 修正這張，再重送。";
}

export function fieldError(result: ItemResult): {reason: string; action: string} | undefined {
  const labels: Record<string, string> = {chunk: "語塊", sentence: "例句", example: "例句", reading: "讀音", meaning_zh: "中文意思", meaning_target: "原文解釋", "source.jump_url": "來源連結", "source.source_title": "來源名稱"};
  const field = result.error_field && labels[result.error_field];
  if (result.error_code === "unapproved_url") return {reason: "來源連結不是允許的 HTTPS 連結", action: "切換回 Yoin 換掉或拿掉這個連結，再重送。"};
  if (!field) return;
  switch (result.error_code) {
    case "text_missing": return {reason: `${field}是空的`, action: `切換回 Yoin 補上${field}，再重送。`};
    case "text_too_long": return {reason: `${field}太長`, action: `切換回 Yoin 縮短${field}，再重送。`};
    case "text_invalid": return {reason: `${field}的格式不對`, action: `切換回 Yoin 修正${field}，再重送。`};
  }
}
