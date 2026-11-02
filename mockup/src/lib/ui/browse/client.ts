import { apiBase } from "$lib/api";
export const capabilities = {
  exportApkg: false,
  deckRetention: false,
  trueRetention: false,
} as const;
export async function exportApkg(query: string): Promise<Blob> {
  const response = await fetch(
    `${apiBase()}/api/export/apkg?${new URLSearchParams({ search: query, media: "1", scheduling: "1" })}`,
    { credentials: "include" },
  );
  if (!response.ok) throw new Error(await response.text());
  return response.blob();
}
export interface DeckRetentionRow {
  name: string;
  pct: number;
}
export async function fetchDeckRetention(): Promise<DeckRetentionRow[]> {
  const response = await fetch(`${apiBase()}/api/stats?by=deck`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  const value: unknown = await response.json();
  if (
    !Array.isArray(value) ||
    !value.every(
      (row) =>
        typeof row === "object" &&
        row !== null &&
        typeof row.name === "string" &&
        typeof row.pct === "number",
    )
  )
    throw new Error("Invalid deck retention response");
  return value;
}

export interface RetentionSummary {
  pct: number;
  target?: number;
  delta?: number;
}
export async function fetchTrueRetention(): Promise<RetentionSummary> {
  const response = await fetch(`${apiBase()}/api/stats`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error(await response.text());
  const value: unknown = await response.json();
  if (
    typeof value !== "object" ||
    value === null ||
    !("pct" in value) ||
    typeof value.pct !== "number" ||
    !Number.isFinite(value.pct) ||
    value.pct < 0 ||
    value.pct > 100
  )
    throw new Error("Invalid retention response");
  return { pct: value.pct };
}
