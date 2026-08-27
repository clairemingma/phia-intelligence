"use client";

import { useEffect, useRef, useState } from "react";
import {
  MONTH_NAMES,
  WEEKDAY_INITIALS,
  formatMMDDYYYY,
  maskMMDDYYYY,
  monthGrid,
  parseMMDDYYYY,
  sameDay,
  startOfDay,
} from "@/lib/dates";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * A date, typed or picked. The field takes MM/DD/YYYY straight from the
 * keyboard — laying the slashes in as it goes — and opens a month on focus to
 * click through for anyone who would rather not count days.
 *
 * Held as the displayed string rather than a Date, so a half-typed date is a
 * legitimate state instead of something the field has to reject mid-keystroke.
 */
export default function DateField({
  id,
  label,
  value,
  onChange,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  /** Earliest selectable date, as MM/DD/YYYY — an end cannot precede a start. */
  min?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = parseMMDDYYYY(value);
  const minDate = min ? parseMMDDYYYY(min) : null;
  const floating = focused || open || value.length > 0;

  // Which month the calendar is showing. Follows a complete date once typed,
  // and otherwise opens where the earliest selectable date is — landing on
  // today would be no help when the range starts months out.
  const [view, setView] = useState<{ year: number; month: number } | null>(null);
  const anchor = selected ?? minDate;
  const shown =
    view ?? (anchor ? { year: anchor.getFullYear(), month: anchor.getMonth() } : null);

  // A click anywhere else puts the calendar away.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function commit(date: Date) {
    onChange(formatMMDDYYYY(date));
    setOpen(false);
    setView(null);
  }

  return (
    <div ref={wrapRef} className={`relative h-[60px] w-full shrink-0 ${open ? "z-30" : ""}`}>
      <div
        className="absolute inset-0 flex h-[60px] w-full items-end rounded-[6px] bg-white pb-[8px] pl-[13px] pr-[13px] transition-colors"
        style={{ border: `1px solid ${focused || open ? "#000" : "#d2cecb"}` }}
      >
        <input
          ref={inputRef}
          id={id}
          value={value}
          inputMode="numeric"
          autoComplete="off"
          placeholder={floating ? "MM/DD/YYYY" : ""}
          onChange={(e) => onChange(maskMMDDYYYY(e.target.value))}
          // With no icon to press, arriving in the field is what opens the
          // month — otherwise there would be no way to reach it by pointer.
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="min-w-0 flex-1 bg-transparent p-0 text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08] outline-none placeholder:text-[rgba(12,10,8,0.35)]"
          style={{ fontFamily: PP, fontWeight: 400 }}
        />
      </div>

      <label
        htmlFor={id}
        className="absolute left-[14px] pointer-events-none transition-all duration-150"
        style={{
          fontFamily: PP,
          fontWeight: 400,
          color: "rgba(12,10,8,0.6)",
          ...(floating
            ? { top: "7px", fontSize: "12px", lineHeight: "18px", letterSpacing: "0.24px" }
            : { top: "16px", fontSize: "16px", lineHeight: "28px", letterSpacing: "0.16px" }),
        }}
      >
        {label}
      </label>

      {/* Rendered only once opened, which is also what keeps today's date off
          the server — it would risk disagreeing with the browser's day. */}
      {open && <Calendar shown={shown} minDate={minDate} selected={selected} onPick={commit} onView={setView} />}
    </div>
  );
}

function Calendar({
  shown,
  minDate,
  selected,
  onPick,
  onView,
}: {
  shown: { year: number; month: number } | null;
  minDate: Date | null;
  selected: Date | null;
  onPick: (d: Date) => void;
  onView: (v: { year: number; month: number }) => void;
}) {
  const today = startOfDay(new Date());
  const view = shown ?? { year: today.getFullYear(), month: today.getMonth() };
  const days = monthGrid(view.year, view.month);

  const step = (by: number) => {
    const d = new Date(view.year, view.month + by, 1);
    onView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const NAV =
    "flex size-[28px] shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-colors hover:bg-[rgba(0,0,0,0.04)]";

  return (
    <div
      className="absolute left-0 top-[calc(100%+6px)] z-30 w-[300px] rounded-[8px] border border-[#d2cecb] bg-white p-[16px] select-none"
      style={{ boxShadow: "0 8px 28px rgba(0,5,20,0.12)", fontFamily: PP }}
    >
      <div className="flex items-center gap-[4px]">
        <button type="button" onClick={() => step(-1)} aria-label="Previous month" className={NAV}>
          <img
            src="/assets/icon-caret-right-sm.svg"
            alt=""
            aria-hidden
            className="block h-[10.73px] w-[5.74px] max-w-none rotate-180"
          />
        </button>
        <span
          className="flex-1 text-center text-[14px] leading-none text-[#1a1a1a]"
          style={{ fontWeight: 500 }}
        >
          {MONTH_NAMES[view.month]} {view.year}
        </span>
        <button type="button" onClick={() => step(1)} aria-label="Next month" className={NAV}>
          <img
            src="/assets/icon-caret-right-sm.svg"
            alt=""
            aria-hidden
            className="block h-[10.73px] w-[5.74px] max-w-none"
          />
        </button>
      </div>

      <div className="mt-[12px] grid grid-cols-7 gap-y-[2px]">
        {WEEKDAY_INITIALS.map((d, i) => (
          <span
            key={i}
            className="flex h-[28px] items-center justify-center text-[11px] text-[#999]"
            style={{ fontWeight: 500 }}
          >
            {d}
          </span>
        ))}

        {days.map((day) => {
          const outside = day.getMonth() !== view.month;
          const disabled = Boolean(minDate && day < minDate);
          const isSelected = Boolean(selected && sameDay(day, selected));
          const isToday = sameDay(day, today);
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              aria-current={isToday ? "date" : undefined}
              onClick={() => onPick(day)}
              className={`flex h-[32px] items-center justify-center rounded-[4px] text-[13px] transition-colors ${
                disabled
                  ? "cursor-default text-[#d2cecb]"
                  : "cursor-pointer hover:bg-[rgba(0,0,0,0.04)]"
              } ${
                isSelected
                  ? "bg-[#002d9f] text-white hover:bg-[#002d9f]"
                  : outside
                    ? "text-[#c4c0bd]"
                    : "text-[#1a1a1a]"
              } ${isToday && !isSelected ? "shadow-[inset_0_0_0_1px_#d2cecb]" : ""}`}
              style={{ fontWeight: isSelected || isToday ? 500 : 400 }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
