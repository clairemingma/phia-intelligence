"use client";
import { useState } from "react";
import TrendGraph from "./TrendGraph";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const TIME_FILTERS = ["7D", "30D", "90D", "180D", "YTD", "All Time", "Custom Range"];

const METRICS = [
  { label: "Total Sales",         value: "$84,210", change: "14%", positive: true  },
  { label: "Total Transactions",  value: "1,247",   change: "9%",  positive: true  },
  { label: "Average Order Value", value: "$67",     change: "5%",  positive: true  },
  { label: "Product Views",       value: "48,390",  change: "22%", positive: true  },
  { label: "Click Through Rate",  value: "3.8%",    change: "11%", positive: false },
];

export default function MetricsSection() {
  const [activeFilter, setActiveFilter] = useState("7D");
  const [activeMetric, setActiveMetric] = useState(0);

  return (
    <div className="flex flex-col gap-[16px] items-start justify-center px-[120px] py-[48px] w-full">

      {/* Time-period filter bar */}
      <div className="flex items-start">
        {TIME_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex gap-[8px] h-[44px] items-center justify-center px-[18px] rounded-[6px] shrink-0 ${
              activeFilter === f ? "border border-[#e3e3e3] bg-white" : "bg-white"
            }`}
          >
            <span className="text-[12px] leading-none text-black whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{f}</span>
          </button>
        ))}
      </div>

      {/* Metric cards */}
      <div className="flex gap-[16px] items-start w-full">
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            onClick={() => setActiveMetric(i)}
            className={`cursor-pointer flex-[1_0_0] min-w-0 border rounded-[6px] flex flex-col gap-[12px] items-center p-[17px] transition-colors ${
              i === activeMetric
                ? "bg-[#f9f8f7] border-[rgba(0,0,0,0.12)]"
                : "bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.12)]"
            }`}
          >
            <p className="text-[#666] text-[16px] leading-[20px] text-center whitespace-nowrap w-full" style={{ fontFamily: PP, fontWeight: 500 }}>{m.label}</p>
            <p className="text-black text-[48px] leading-[1.1] text-center whitespace-nowrap w-full" style={{ fontFamily: PP, fontWeight: 400 }}>{m.value}</p>
            <div className="flex items-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.positive ? "/assets/caret-up.svg" : "/assets/caret-down.svg"} alt="" aria-hidden className="shrink-0 size-[16px]"/>
              <span className="text-[16px] leading-[20px] text-center whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500, color: m.positive ? "#14774f" : "#e11445" }}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trend graph — updates with selected metric + time filter */}
      <TrendGraph
        metricLabel={METRICS[activeMetric].label}
        timeFilter={activeFilter}
      />

    </div>
  );
}
