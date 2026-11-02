export function trend(values: number[]): number[] {
  return values.map((value, i) => {
    if (i === 0) return value;
    let sum = 0,
      weight = 0;
    [1, 4, 6, 4, 1].forEach((k, j) => {
      const t = i + j - 2;
      if (t >= 1 && t < values.length) {
        sum += k * values[t];
        weight += k;
      }
    });
    return weight ? sum / weight : value;
  });
}
export function smoothPath(points: [number, number][]): string {
  const n = points.length;
  if (!n) return "";
  if (n === 1) return `M${points[0][0]},${points[0][1]}`;
  const slopes = points
    .slice(1)
    .map((p, i) => (p[1] - points[i][1]) / (p[0] - points[i][0]));
  const tangents = points.map((_, i) =>
    i === 0
      ? slopes[0]
      : i === n - 1
        ? slopes[n - 2]
        : slopes[i - 1] * slopes[i] <= 0
          ? 0
          : 2 / (1 / slopes[i - 1] + 1 / slopes[i]),
  );
  let d = `M${points[0].join(",")}`;
  for (let i = 0; i < n - 1; i++) {
    const a = points[i],
      b = points[i + 1],
      dx = (b[0] - a[0]) / 3;
    d += ` C${a[0] + dx},${a[1] + tangents[i] * dx} ${b[0] - dx},${b[1] - tangents[i + 1] * dx} ${b.join(",")}`;
  }
  return d;
}
export function streaks(values: number[]): { days: number; longest: number } {
  let days = 0,
    longest = 0;
  for (const value of values) {
    days = value > 0 ? days + 1 : 0;
    longest = Math.max(longest, days);
  }
  return { days, longest };
}
