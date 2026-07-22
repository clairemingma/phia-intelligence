"use client";
import { useState } from "react";
import TrendGraph from "./TrendGraph";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const TIME_FILTERS = ["7D", "30D", "90D", "180D", "YTD", "All Time", "Custom Range"];

const METRICS = [
  { label: "Product Views",       value: "48,390",  change: "22%", positive: true  },
  { label: "Click Through Rate",  value: "3.8%",    change: "11%", positive: false },
  { label: "Total Sales",         value: "$84,210", change: null },
  { label: "Total Transactions",  value: "1,247",   change: null },
  { label: "Average Order Value", value: "$67",     change: null },
];

export default function MetricsSection() {
  const [activeFilter, setActiveFilter] = useState("7D");
  const [activeMetric, setActiveMetric] = useState(0);

  return (
    <div className="flex flex-col gap-[16px] items-start justify-center px-[120px] py-[64px] w-full">

      <div className="flex items-start">
        {TIME_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="cursor-pointer flex gap-[8px] h-[44px] items-center justify-center px-[18px] rounded-[6px] shrink-0 transition-colors outline-none border"
            style={{ borderColor: activeFilter === f ? "#e3e3e3" : "transparent" }}
          >
            <span className="text-[12px] leading-none whitespace-nowrap transition-colors" style={{ fontFamily: PP, fontWeight: 500, color: activeFilter === f ? "#000" : "#999" }}>{f}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-[16px] items-start w-full">
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            onClick={() => setActiveMetric(i)}
            className={`cursor-pointer flex-[1_0_0] min-w-px h-[151px] border rounded-[6px] relative transition-colors ${
              i === activeMetric
                ? "border-[#e3e3e3]"
                : "border-transparent"
            }`}
          >
            <div className="flex flex-col gap-[12px] items-center p-[17px] size-full">
              <p className="text-[#666] text-[16px] leading-[20px] text-center whitespace-nowrap w-full" style={{ fontFamily: PP, fontWeight: 500 }}>{m.label}</p>
              <p className="text-[#1a1a1a] text-[48px] leading-[1.1] text-center whitespace-nowrap w-full" style={{ fontFamily: PP, fontWeight: 400 }}>{m.value}</p>
              {m.change != null && (
                <div className="flex items-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.positive ? "/assets/caret-up.svg" : "/assets/caret-down.svg"} alt="" aria-hidden className="shrink-0 size-[16px]" />
                  <span className="text-[16px] leading-[20px] text-center whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500, color: m.positive ? "#14774f" : "#e11445" }}>{m.change}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TrendGraph
        metricLabel={METRICS[activeMetric].label}
        timeFilter={activeFilter}
      />

    </div>
  );
}
