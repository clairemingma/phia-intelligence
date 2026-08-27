"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TrendGraph from "./TrendGraph";
/** The gap between metric cards, which the graph has to span as well. */
const GRID_GAP = 16;

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), Georgia, serif";

function CaretUp({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[16px]">
      <path d="M13.4619 10.1912C13.424 10.2826 13.36 10.3607 13.2778 10.4157C13.1956 10.4706 13.0989 10.5 13 10.5H3C2.90105 10.5001 2.80431 10.4708 2.72201 10.4159C2.63971 10.3609 2.57556 10.2828 2.53769 10.1914C2.49981 10.1 2.48991 9.99939 2.50924 9.90235C2.52856 9.8053 2.57624 9.71618 2.64625 9.64625L7.64625 4.64625C7.69269 4.59976 7.74783 4.56288 7.80853 4.53772C7.86923 4.51256 7.93429 4.49961 8 4.49961C8.06571 4.49961 8.13077 4.51256 8.19147 4.53772C8.25217 4.56288 8.30731 4.59976 8.35375 4.64625L13.3538 9.64625C13.4237 9.71621 13.4712 9.80534 13.4905 9.90235C13.5097 9.99936 13.4998 10.0999 13.4619 10.1912Z" fill={color} />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[16px]" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2.5, 5.5)">
        <path d="M10.854 0.854028L5.85403 5.85403C5.80759 5.90052 5.75245 5.9374 5.69175 5.96256C5.63105 5.98772 5.56599 6.00067 5.50028 6.00067C5.43457 6.00067 5.36951 5.98772 5.30881 5.96256C5.24811 5.9374 5.19296 5.90052 5.14653 5.85403L0.146528 0.854028C0.0527077 0.760208 0 0.63296 0 0.500278C0 0.367596 0.0527077 0.240348 0.146528 0.146528C0.240348 0.0527074 0.367596 0 0.500278 0C0.63296 0 0.760208 0.0527074 0.854028 0.146528L5.50028 4.7934L10.1465 0.146528C10.193 0.100073 10.2481 0.0632225 10.3088 0.0380812C10.3695 0.0129398 10.4346 0 10.5003 0C10.566 0 10.631 0.0129398 10.6917 0.0380812C10.7524 0.0632225 10.8076 0.100073 10.854 0.146528C10.9005 0.192983 10.9373 0.248133 10.9625 0.30883C10.9876 0.369526 11.0006 0.434581 11.0006 0.500278C11.0006 0.565975 10.9876 0.63103 10.9625 0.691726C10.9373 0.752423 10.9005 0.807573 10.854 0.854028Z" fill="#1A1A1A" />
      </g>
    </svg>
  );
}

function CaretDown({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[16px]">
      <path d="M13.3538 6.35375L8.35375 11.3538C8.30731 11.4002 8.25217 11.4371 8.19147 11.4623C8.13077 11.4874 8.06571 11.5004 8 11.5004C7.93429 11.5004 7.86923 11.4874 7.80853 11.4623C7.74783 11.4371 7.69269 11.4002 7.64625 11.3538L2.64625 6.35375C2.57624 6.28382 2.52856 6.1947 2.50924 6.09765C2.48991 6.00061 2.49981 5.90002 2.53769 5.8086C2.57556 5.71719 2.63971 5.63908 2.72201 5.58414C2.80431 5.5292 2.90105 5.49992 3 5.5H13C13.0989 5.49992 13.1957 5.5292 13.278 5.58414C13.3603 5.63908 13.4244 5.71719 13.4623 5.8086C13.5002 5.90002 13.5101 6.00061 13.4908 6.09765C13.4714 6.1947 13.4238 6.28382 13.3538 6.35375Z" fill={color} />
    </svg>
  );
}

const TIME_FILTERS = ["7D", "30D", "90D", "180D", "YTD", "All Time"];

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
  const [dropdownOpen, setDropdownOpen]   = useState(false);

  const dropdownRef     = useRef<HTMLDivElement>(null);
  const gridRef         = useRef<HTMLDivElement>(null);

  /** The height the cards settle on, which the graph is sized against below lg. */
  const [cardHeight, setCardHeight] = useState(0);
  /** Below lg the cards sit two to a row, which is the layout this applies to. */
  const [twoUp, setTwoUp] = useState(false);

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const narrow = window.matchMedia("(max-width: 1023px)");
    function equalizeHeights() {
      if (!el) return;
      el.style.gridAutoRows = "auto";
      el.style.alignItems   = "start";
      void el.offsetHeight;
      const maxH = Math.max(0, ...Array.from(el.children).map(c => (c as HTMLElement).offsetHeight));
      el.style.gridAutoRows = `${maxH}px`;
      el.style.alignItems   = "stretch";
      setCardHeight(maxH);
      setTwoUp(narrow.matches);
    }
    equalizeHeights();
    window.addEventListener("resize", equalizeHeights);
    narrow.addEventListener("change", equalizeHeights);
    return () => {
      window.removeEventListener("resize", equalizeHeights);
      narrow.removeEventListener("change", equalizeHeights);
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    function onScroll() { setDropdownOpen(false); }
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", onClickOutside); window.removeEventListener("scroll", onScroll, true); };
  }, [dropdownOpen]);

  function selectFilter(f: string) {
    setActiveFilter(f);
    setDropdownOpen(false);
  }

  return (
    <div className="flex flex-col gap-[48px] items-start lg:items-end px-6 lg:px-[120px] py-[64px] w-full">

      {/* Title row */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        {/* Separator */}
        <div className="w-full h-px bg-[#999999]" />

        <div className="flex items-center justify-between w-full">
          <p
            className="text-[#1a1a1a] text-[28px] lg:text-[36px] leading-[32px] lg:leading-[40px] tracking-[-0.56px] lg:tracking-[-0.72px] font-light whitespace-nowrap"
            style={{ fontFamily: GT }}
          >
            Performance
          </p>

          <div className="flex items-center gap-[8px]">
            {/* Dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="cursor-pointer flex gap-[8px] h-[44px] items-center justify-center px-[18px] rounded-[6px] border border-[#e3e3e3] bg-white outline-none hover:bg-[rgba(0,0,0,0.04)] transition-colors"
              >
                <span className="text-[12px] leading-none whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500, color: "#1a1a1a" }}>
                  {activeFilter}
                </span>
                <ChevronDown />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 top-[calc(100%+4px)] z-50 bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] flex flex-col overflow-hidden"
                  style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
                >
                  {TIME_FILTERS.map((f, i) => (
                    <div key={f}>
                      {i > 0 && <div className="h-px bg-[rgba(0,0,0,0.08)]" />}
                      <button
                        onClick={() => selectFilter(f)}
                        className="cursor-pointer flex gap-[8px] h-[44px] items-center justify-start px-[18px] w-full outline-none hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                      >
                        <span
                          className="text-[12px] leading-none whitespace-nowrap"
                          style={{ fontFamily: PP, fontWeight: 500, color: f === activeFilter ? "#1a1a1a" : "#666" }}
                        >
                          {f}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-5 gap-[16px] w-full">
        {METRICS.map((m, i) => {
          const isActive = i === activeMetric;
          return (
            <div
              key={m.label}
              onClick={() => setActiveMetric(i)}
              className={`cursor-pointer border rounded-[6px] relative transition-colors [container-type:inline-size] ${
                isActive
                  ? "bg-[#002D9F] border-[#002D9F]"
                  : "bg-transparent border-[rgba(0,0,0,0.08)] hover:bg-[rgba(0,0,0,0.04)]"
              }`}
            >
              <div className="flex flex-col gap-[12px] items-center p-[17px] h-full w-full">
                <p
                  className="text-[13px] leading-[18px] text-center truncate w-full"
                  style={{ fontFamily: PP, fontWeight: 500, color: isActive ? "white" : "#666" }}
                >
                  {m.label}
                </p>
                <p
                  className="leading-[1.1] text-center whitespace-nowrap w-full"
                  style={{ fontFamily: PP, fontWeight: 400, color: isActive ? "white" : "#1a1a1a", fontSize: "clamp(20px, 18cqw, 48px)" }}
                >
                  {m.value}
                </p>
                {m.change != null && (
                  <div className="flex items-center shrink-0">
                    {(() => {
                      const color = isActive
                        ? (m.positive ? "#b4e8d0" : "#f8b4c8")
                        : (m.positive ? "#14774f" : "#e11445");
                      return (
                        <>
                          {m.positive ? <CaretUp color={color} /> : <CaretDown color={color} />}
                          <span
                            className="text-[16px] leading-[20px] text-center whitespace-nowrap"
                            style={{ fontFamily: PP, fontWeight: 500, color }}
                          >
                            {m.change}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trend graph. On phones it stands as tall as two of the cards above it,
          the pair plus the gap between them, so the column reads as one block. */}
      <TrendGraph
        metricLabel={METRICS[activeMetric].label}
        timeFilter={activeFilter}
        outerHeight={twoUp && cardHeight ? cardHeight * 2 + GRID_GAP : undefined}
      />

    </div>
  );
}
