"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TrendGraph from "./TrendGraph";

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

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function parseMMDDYYYY(s: string): Date | null {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const d = new Date(+m[3], +m[1] - 1, +m[2]);
  return isFinite(d.getTime()) ? d : null;
}

function DateInput({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}) {
  const hasContent = active || value.length > 0;
  return (
    <div
      className="relative h-[44px] w-[140px] shrink-0 cursor-pointer select-none"
      onClick={onClick}
      style={{
        background: "white",
        border: `1px solid ${active ? "#000" : "rgba(0,0,0,0.08)"}`,
        borderRadius: 6,
      }}
    >
      <span
        className="absolute left-[14px] pointer-events-none transition-all duration-150"
        style={{
          fontFamily: PP, fontWeight: 400, color: "rgba(12,10,8,0.6)",
          ...(hasContent
            ? { top: "6px",  fontSize: "10px", lineHeight: "14px", letterSpacing: "0.24px" }
            : { top: "14px", fontSize: "12px", lineHeight: "16px" }),
        }}
      >
        {label}
      </span>
      {hasContent && (
        <span
          className="absolute left-[14px] pointer-events-none"
          style={{ fontFamily: PP, fontWeight: 400, top: "22px", fontSize: "12px", lineHeight: "16px", color: "#0c0a08" }}
        >
          {value || "MM/DD/YYYY"}
        </span>
      )}
    </div>
  );
}

function MonthPanel({
  year, month, startDate, endDate, today, onDateClick,
}: {
  year: number; month: number;
  startDate: Date | null; endDate: Date | null; today: Date;
  onDateClick: (d: Date) => void;
}) {
  function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const totalCells  = Math.ceil((firstDow + daysInMonth) / 7) * 7;
  const cells: { day: number; inMonth: boolean }[] = [];
  for (let i = firstDow - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, inMonth: false });
  for (let d = 1; d <= daysInMonth; d++)   cells.push({ day: d, inMonth: true });
  let nd = 1;
  while (cells.length < totalCells)        cells.push({ day: nd++, inMonth: false });

  const rangeActive = !!startDate && !!endDate && !sameDay(startDate, endDate);

  return (
    <div style={{ width: 252, fontFamily: PP }}>
      <div className="grid grid-cols-7 mb-[4px]">
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="flex items-center justify-center h-[32px] text-[12px]" style={{ color: "#999", fontWeight: 400 }}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          if (!cell.inMonth) return <div key={i} className="h-[40px]" />;
          const date       = new Date(year, month, cell.day);
          const isToday    = sameDay(date, today);
          const isStart    = !!startDate && sameDay(date, startDate);
          const isEnd      = !!endDate   && sameDay(date, endDate);
          const isFuture   = date > today && !isToday;
          const inRange    = rangeActive && date > startDate! && date < endDate!;
          const isEndpoint = isStart || isEnd;
          const showBand   = rangeActive && (inRange || isStart || isEnd);

          const col  = i % 7;
          const isFirstDay = cell.day === 1;
          const isLastDay  = cell.day === daysInMonth;
          const leftRound  = !isStart && !isEnd && (col === 0 || isFirstDay);
          const rightRound = !isStart && !isEnd && (col === 6 || isLastDay);
          const bandRadius = isStart ? "999px 0 0 999px"
                           : isEnd   ? "0 999px 999px 0"
                           : `${leftRound ? "8px" : "0"} ${rightRound ? "8px" : "0"} ${rightRound ? "8px" : "0"} ${leftRound ? "8px" : "0"}`;

          return (
            <div
              key={i}
              className="h-[40px] flex items-center justify-center"
              onClick={() => !isFuture && onDateClick(date)}
              style={{ cursor: isFuture ? "default" : "pointer" }}
            >
              <div style={{
                width: 36, height: 36, position: "relative",
                background: showBand ? "rgba(0,0,0,0.04)" : "transparent",
                borderRadius: bandRadius,
              }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: isEndpoint ? "#1a1a1a" : "transparent",
                  boxShadow: isToday && !isEndpoint ? "0 0 0 1px rgba(0,0,0,0.3)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, lineHeight: "20px",
                  fontWeight: isEndpoint || isToday ? 500 : 400,
                  color: isEndpoint ? "white" : isFuture ? "rgba(0,0,0,0.25)" : "#1a1a1a",
                }}>
                  {cell.day}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DualCalendar({
  initStart, initEnd, onConfirm, onClose,
}: {
  initStart: string; initEnd: string;
  onConfirm: (start: string, end: string) => void;
  onClose: () => void;
}) {
  const today = new Date();
  const [leftYear,  setLeftYear]  = useState(today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear());
  const [leftMonth, setLeftMonth] = useState(today.getMonth() === 0 ? 11 : today.getMonth() - 1);
  const rightMonth = (leftMonth + 1) % 12;
  const rightYear  = leftMonth === 11 ? leftYear + 1 : leftYear;

  function prevPair() {
    if (leftMonth === 0) { setLeftMonth(11); setLeftYear(y => y - 1); }
    else setLeftMonth(m => m - 1);
  }
  function nextPair() {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear(y => y + 1); }
    else setLeftMonth(m => m + 1);
  }

  const [tempStart, setTempStart] = useState(initStart);
  const [tempEnd,   setTempEnd]   = useState(initEnd);
  const startDate = parseMMDDYYYY(tempStart);
  const endDate   = parseMMDDYYYY(tempEnd);

  function fmt(d: Date) {
    return `${String(d.getMonth() + 1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`;
  }
  function handleDateClick(date: Date) {
    if (!startDate || (startDate && endDate)) { setTempStart(fmt(date)); setTempEnd(""); }
    else { if (date >= startDate) setTempEnd(fmt(date)); else { setTempStart(fmt(date)); setTempEnd(""); } }
  }

  const NAV_BTN = "w-[28px] h-[28px] flex items-center justify-center rounded-[4px] hover:bg-[rgba(0,0,0,0.04)] transition-colors shrink-0 cursor-pointer";

  return (
    <div
      className="absolute right-0 top-[calc(100%+4px)] z-[60] bg-white rounded-[8px] select-none"
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0px 1px 3px rgba(0,5,20,0.06), 0px 2px 8px -1px rgba(0,5,20,0.04)",
        padding: "25px",
        width: 603,
        fontFamily: PP,
      }}
    >
      {/* Headers */}
      <div className="flex items-center gap-[24px]">
        <div className="flex items-center flex-1 min-w-0">
          <button onClick={prevPair} className={NAV_BTN}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g transform="translate(4.5, 2.5)">
                <path d="M5.85414 10.1465C5.9006 10.193 5.93745 10.2481 5.96259 10.3088C5.98773 10.3695 6.00067 10.4346 6.00067 10.5003C6.00067 10.566 5.98773 10.631 5.96259 10.6917C5.93745 10.7524 5.9006 10.8076 5.85414 10.854C5.80769 10.9005 5.75254 10.9373 5.69184 10.9625C5.63115 10.9876 5.56609 11.0006 5.50039 11.0006C5.4347 11.0006 5.36964 10.9876 5.30895 10.9625C5.24825 10.9373 5.1931 10.9005 5.14664 10.854L0.146643 5.85403C0.100155 5.80759 0.0632757 5.75245 0.0381136 5.69175C0.0129514 5.63105 0 5.56599 0 5.50028C0 5.43457 0.0129514 5.36951 0.0381136 5.30881C0.0632757 5.24811 0.100155 5.19296 0.146643 5.14653L5.14664 0.146528C5.24046 0.0527077 5.36771 0 5.50039 0C5.63308 0 5.76032 0.0527077 5.85414 0.146528C5.94796 0.240348 6.00067 0.367596 6.00067 0.500278C6.00067 0.63296 5.94796 0.760208 5.85414 0.854028L1.20727 5.50028L5.85414 10.1465Z" fill="#1A1A1A"/>
              </g>
            </svg>
          </button>
          <span className="flex-1 text-center" style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", lineHeight: "normal" }}>
            {MONTH_NAMES[leftMonth]} {leftYear}
          </span>
        </div>
        <div style={{ width: 1 }} />
        <div className="flex items-center flex-1 min-w-0">
          <span className="flex-1 text-center" style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", lineHeight: "normal" }}>
            {MONTH_NAMES[rightMonth]} {rightYear}
          </span>
          <button onClick={nextPair} className={NAV_BTN}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g transform="translate(5.5, 2.5)">
                <path d="M5.85403 5.85403L0.854028 10.854C0.807573 10.9005 0.752423 10.9373 0.691726 10.9625C0.63103 10.9876 0.565975 11.0006 0.500278 11.0006C0.434581 11.0006 0.369526 10.9876 0.30883 10.9625C0.248133 10.9373 0.192983 10.9005 0.146528 10.854C0.100073 10.8076 0.0632225 10.7524 0.0380812 10.6917C0.0129398 10.631 0 10.566 0 10.5003C0 10.4346 0.0129398 10.3695 0.0380812 10.3088C0.0632225 10.2481 0.100073 10.193 0.146528 10.1465L4.7934 5.50028L0.146528 0.854028C0.0527074 0.760208 0 0.63296 0 0.500278C0 0.367596 0.0527074 0.240348 0.146528 0.146528C0.240348 0.0527077 0.367596 0 0.500278 0C0.63296 0 0.760208 0.0527077 0.854028 0.146528L5.85403 5.14653C5.90052 5.19296 5.9374 5.24811 5.96256 5.30881C5.98772 5.36951 6.00067 5.43457 6.00067 5.50028C6.00067 5.56599 5.98772 5.63105 5.96256 5.69175C5.9374 5.75245 5.90052 5.80759 5.85403 5.85403Z" fill="#1A1A1A"/>
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Month grids */}
      <div className="flex items-start gap-[24px] mt-[8px]">
        <MonthPanel year={leftYear}  month={leftMonth}  startDate={startDate} endDate={endDate} today={today} onDateClick={handleDateClick} />
        <div style={{ width: 1, alignSelf: "stretch", background: "rgba(0,0,0,0.08)" }} />
        <MonthPanel year={rightYear} month={rightMonth} startDate={startDate} endDate={endDate} today={today} onDateClick={handleDateClick} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-[20px] mt-[16px]">
        <button onClick={onClose}                                             className="text-[14px] cursor-pointer hover:opacity-60 transition-opacity" style={{ fontFamily: PP, fontWeight: 500, color: "#1a1a1a" }}>Cancel</button>
        <button onClick={() => { onConfirm(tempStart, tempEnd); onClose(); }} className="text-[14px] cursor-pointer hover:opacity-60 transition-opacity" style={{ fontFamily: PP, fontWeight: 500, color: "#1a1a1a" }}>Apply</button>
      </div>
    </div>
  );
}

function CaretDown({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[16px]">
      <path d="M13.3538 6.35375L8.35375 11.3538C8.30731 11.4002 8.25217 11.4371 8.19147 11.4623C8.13077 11.4874 8.06571 11.5004 8 11.5004C7.93429 11.5004 7.86923 11.4874 7.80853 11.4623C7.74783 11.4371 7.69269 11.4002 7.64625 11.3538L2.64625 6.35375C2.57624 6.28382 2.52856 6.1947 2.50924 6.09765C2.48991 6.00061 2.49981 5.90002 2.53769 5.8086C2.57556 5.71719 2.63971 5.63908 2.72201 5.58414C2.80431 5.5292 2.90105 5.49992 3 5.5H13C13.0989 5.49992 13.1957 5.5292 13.278 5.58414C13.3603 5.63908 13.4244 5.71719 13.4623 5.8086C13.5002 5.90002 13.5101 6.00061 13.4908 6.09765C13.4714 6.1947 13.4238 6.28382 13.3538 6.35375Z" fill={color} />
    </svg>
  );
}

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
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [calendarOpen, setCalendarOpen]   = useState(false);
  const [customStart,  setCustomStart]    = useState("");
  const [customEnd,    setCustomEnd]      = useState("");

  const dropdownRef     = useRef<HTMLDivElement>(null);
  const calendarWrapRef = useRef<HTMLDivElement>(null);
  const gridRef         = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    function equalizeHeights() {
      if (!el) return;
      el.style.gridAutoRows = "auto";
      el.style.alignItems   = "start";
      void el.offsetHeight;
      const maxH = Math.max(0, ...Array.from(el.children).map(c => (c as HTMLElement).offsetHeight));
      el.style.gridAutoRows = `${maxH}px`;
      el.style.alignItems   = "stretch";
    }
    equalizeHeights();
    window.addEventListener("resize", equalizeHeights);
    return () => window.removeEventListener("resize", equalizeHeights);
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

  useEffect(() => {
    if (!calendarOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(e.target as Node)) setCalendarOpen(false);
    }
    function onScroll() { setCalendarOpen(false); }
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", onClickOutside); window.removeEventListener("scroll", onScroll, true); };
  }, [calendarOpen]);

  function selectFilter(f: string) {
    setActiveFilter(f);
    setDropdownOpen(false);
    if (f !== "Custom Range") {
      setCalendarOpen(false);
      setCustomStart("");
      setCustomEnd("");
    }
  }

  const startDate  = parseMMDDYYYY(customStart);
  const endDate    = parseMMDDYYYY(customEnd);
  const customRange = activeFilter === "Custom Range" && startDate && endDate
    ? { start: customStart, end: customEnd }
    : undefined;

  return (
    <div className="flex flex-col gap-[48px] items-end px-6 lg:px-16 xl:px-[120px] py-[64px] w-full">

      {/* Title row */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        {/* Separator */}
        <div className="w-full h-px bg-[#999999]" />

        <div className="flex items-center justify-between w-full">
          <p
            className="text-[#1a1a1a] text-[36px] leading-[40px] tracking-[-0.72px] font-light whitespace-nowrap"
            style={{ fontFamily: GT }}
          >
            Performance
          </p>

          <div className="flex items-center gap-[8px]">
            {activeFilter === "Custom Range" && (
              <div className="relative flex items-center gap-[8px]" ref={calendarWrapRef}>
                <DateInput label="Start*" value={customStart} active={calendarOpen} onClick={() => setCalendarOpen(o => !o)} />
                <DateInput label="End*"   value={customEnd}   active={calendarOpen} onClick={() => setCalendarOpen(o => !o)} />
                {calendarOpen && (
                  <DualCalendar
                    initStart={customStart}
                    initEnd={customEnd}
                    onConfirm={(s, e) => { setCustomStart(s); setCustomEnd(e); }}
                    onClose={() => setCalendarOpen(false)}
                  />
                )}
              </div>
            )}

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
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[16px] w-full">
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

      {/* Trend graph */}
      <TrendGraph
        metricLabel={METRICS[activeMetric].label}
        timeFilter={activeFilter}
        customRange={customRange}
      />

    </div>
  );
}
