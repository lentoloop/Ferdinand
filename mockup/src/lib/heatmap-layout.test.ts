import { expect, test } from "vitest";
import { trend, smoothPath, streaks } from "./ui/stats/chart";
test("forecast uses approved weighted five-day smoothing and preserves today", () => {
  expect(trend([0, 0, 10, 0, 0, 0, 0])).toEqual([
    0,
    40 / 11,
    4,
    2.5,
    0.625,
    0,
    0,
  ]);
});
test("smooth path handles empty and one-point series", () => {
  expect(smoothPath([])).toBe("");
  expect(smoothPath([[4, 5]])).toBe("M4,5");
});
test("smoothing uses monotone curves through every sample", () => {
  expect(
    smoothPath([
      [0, 10],
      [10, 0],
      [20, 10],
    ]),
  ).toContain("C");
  expect(
    smoothPath([
      [0, 10],
      [10, 0],
      [20, 10],
    ]),
  ).toContain("10,0");
});
test("streak ends today and longest is computed across the available window", () => {
  expect(streaks([1, 1, 1, 0, 1, 0])).toEqual({ days: 0, longest: 3 });
});
