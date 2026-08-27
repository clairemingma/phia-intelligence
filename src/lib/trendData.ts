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

export const X_LABELS: Record<string, string[]> = {
  "7D":           ["Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15", "Jul 16", "Jul 17", "Jul 18", "Jul 19", "Jul 20", "Jul 21", "Jul 22"],
  "30D":          ["Jun 22", "Jun 25", "Jun 27", "Jun 30", "Jul 3", "Jul 6", "Jul 8", "Jul 11", "Jul 14", "Jul 17", "Jul 19", "Jul 22"],
  "90D":          ["Apr 23", "May 1", "May 9", "May 18", "May 26", "Jun 3", "Jun 11", "Jun 19", "Jun 28", "Jul 6", "Jul 14", "Jul 22"],
  "180D":         ["Jan 23", "Feb 8", "Feb 24", "Mar 13", "Mar 29", "Apr 14", "May 1", "May 17", "Jun 2", "Jun 19", "Jul 5", "Jul 22"],
  "YTD":          ["Jan 1", "Jan 19", "Feb 6", "Feb 25", "Mar 15", "Apr 3", "Apr 21", "May 10", "May 28", "Jun 16", "Jul 4", "Jul 22"],
  "All Time":     ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
};

export function buildData(metric: MetricKey, timeFilter: string) {
  const labels = X_LABELS[timeFilter] ?? X_LABELS["All Time"];
  const n      = labels.length;
  const seed   = METRIC_KEYS.indexOf(metric);
  // Every window is twelve points, so without a phase of its own each
  // timeframe drew the same line under different labels.
  const windowPhase = Math.max(0, Object.keys(X_LABELS).indexOf(timeFilter)) * 1.9;
  const { positive } = CHANGES[metric];
  const current = CURRENT_VALUES[metric];
  const { pct } = CHANGES[metric];
  const start = positive ? current / (1 + pct) : current * (1 + pct);

  const raw = Array.from({ length: n }, (_, i) => {
    const t = i / Math.max(n - 1, 1);
    const trend = positive ? t * 0.55 : (1 - t) * 0.55;
    const wave  =
      Math.sin(seed * 2.1 + windowPhase + i * 1.4) * 0.22 +
      Math.cos(seed * 3.7 + windowPhase + i * 2.8) * 0.13;
    return Math.max(0.03, Math.min(0.97, 0.22 + trend + wave));
  });

  const rMin  = Math.min(...raw);
  const rMax  = Math.max(...raw);
  const range = rMax - rMin || 1;

  return labels.map((label, i) => {
    const normalized = ((raw[i] - rMin) / range) * 88 + 8;
    const realApprox = start + (current - start) * ((raw[i] - rMin) / range);
    return { label, value: +normalized.toFixed(1), real: +realApprox.toFixed(2) };
  });
}
