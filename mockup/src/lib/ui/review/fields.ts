import DOMPurify from "dompurify";
import { mediaBase } from "$lib/api";
import { transformAnkiHtml } from "$lib/card/transformAnkiHtml";
export function clean(html: string): string {
  return typeof window === "undefined"
    ? ""
    : DOMPurify.sanitize(transformAnkiHtml(html), {
        FORBID_TAGS: ["iframe", "object", "embed"],
        ALLOW_DATA_ATTR: false,
        FORBID_ATTR: ["style"],
      });
}
export function plain(html: string): string {
  if (typeof document === "undefined") return "";
  const d = new DOMParser().parseFromString(clean(html), "text/html").body;
  return d.textContent ?? "";
}
export function imageSource(html: string): string {
  if (typeof document === "undefined") return "";
  const d = new DOMParser().parseFromString(clean(html), "text/html").body;
  const src = d.querySelector("img")?.getAttribute("src") ?? "";
  return src
    ? /^(https?:|\/)/i.test(src)
      ? src
      : mediaBase() + encodeURIComponent(src)
    : "";
}
