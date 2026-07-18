export type MetricKey =
  | "Total Sales"
  | "Total Transactions"
  | "Average Order Value"
  | "Product Views"
  | "Click Through Rate";

export const METRIC_KEYS = [
  "Total Sales",
  "Total Transactions",
  "Average Order Value",
  "Product Views",
  "Click Through Rate",
] as const;

export const CHANGES: Record<MetricKey, { pct: number; positive: boolean }> = {
  "Total Sales":         { pct: 0.14, positive: true  },
  "Total Transactions":  { pct: 0.09, positive: true  },
  "Average Order Value": { pct: 0.05, positive: true  },
  "Product Views":       { pct: 0.22, positive: true  },
  "Click Through Rate":  { pct: 0.11, positive: false },
};

export const CURRENT_VALUES: Record<MetricKey, number> = {
  "Total Sales":         84210,
  "Total Transactions":  1247,
  "Average Order Value": 67,
  "Product Views":       48390,
  "Click Through Rate":  3.8,
};

export const TOOLTIP_FORMAT: Record<MetricKey, (v: number) => string> = {
  "Total Sales":         (v) => `$${Math.round(v).toLocaleString()}`,
  "Total Transactions":  (v) => Math.round(v).toLocaleString(),
  "Average Order Value": (v) => `$${v.toFixed(2)}`,
  "Product Views":       (v) => Math.round(v).toLocaleString(),
  "Click Through Rate":  (v) => `${v.toFixed(2)}%`,
};

// X-axis labels per time filter
export const X_LABELS: Record<string, string[]> = {
  "7D":           ["Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15", "Jul 16"],
  "30D":          ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 16"],
  "90D":          ["Apr", "May", "Jun", "Jul"],
  "180D":         ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  "YTD":          ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  "All Time":     ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  "Custom Range": ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
};

// Generate normalized 0–100 data that tracks with the underlying metric trend.
// The tooltip formatter converts the normalised value back to a real metric value
// for display (approximate, derived from current value + change % + wave).
export function buildData(metric: MetricKey, timeFilter: string) {
  const labels = X_LABELS[timeFilter] ?? X_LABELS["All Time"];
  const n      = labels.length;
  const seed   = METRIC_KEYS.indexOf(metric);
  const { positive } = CHANGES[metric];
  const current = CURRENT_VALUES[metric];
  const { pct } = CHANGES[metric];
  const start = positive ? current / (1 + pct) : current * (1 + pct);

  // raw 0-1 values: linear trend + seeded wave
  const raw = Array.from({ length: n }, (_, i) => {
    const t = i / Math.max(n - 1, 1);
    const trend = positive ? t * 0.55 : (1 - t) * 0.55;
    const wave  =
      Math.sin(seed * 2.1 + i * 1.4) * 0.22 +
      Math.cos(seed * 3.7 + i * 2.8) * 0.13;
    return Math.max(0.03, Math.min(0.97, 0.22 + trend + wave));
  });

  const rMin  = Math.min(...raw);
  const rMax  = Math.max(...raw);
  const range = rMax - rMin || 1;

  return labels.map((label, i) => {
    const normalized = ((raw[i] - rMin) / range) * 88 + 8; // keep 8–96 for headroom
    // approximate real value by lerping between start and current with same normalization
    const realApprox = start + (current - start) * ((raw[i] - rMin) / range);
    return { label, value: +normalized.toFixed(1), real: +realApprox.toFixed(2) };
  });
}
