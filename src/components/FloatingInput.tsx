"use client";

import { useRef, useState, type ReactNode } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * 60px field whose label rides up into the top of the box once it has focus or
 * a value. Shared by the contact form and the promote flow.
 *
 * `prefix` is a fixed lead-in — a currency symbol, say — that appears alongside
 * the value at the same moment the label lifts, i.e. as soon as the field is
 * ready for typing. It is presentation only and never enters `value`.
 */
export default function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  prefix,
  suffix,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  /** Fixed trailing unit — a percent sign, say. Presentation only. */
  suffix?: string;
  /** Controls that belong to the field, sitting inside its box. */
  trailing?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  return (
    <div className="group relative h-[60px] w-full shrink-0">
      {/* The box carries the border so the prefix and the input can sit on one
          baseline; clicking anywhere in it still focuses the input. */}
      <div
        onMouseDown={(e) => {
          if (e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
        className="absolute inset-0 flex h-[60px] w-full items-end rounded-[6px] bg-white pb-[8px] pl-[13px] pr-[13px] transition-colors"
        style={{ border: `1px solid ${focused ? "#000" : "#d2cecb"}` }}
      >
        {prefix && floating && (
          <span
            aria-hidden
            className="shrink-0 text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            {prefix}
          </span>
        )}
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="min-w-0 flex-1 bg-transparent p-0 text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08] outline-none"
          style={{ fontFamily: PP, fontWeight: 400 }}
          placeholder=""
        />
        {suffix && floating && (
          <span
            aria-hidden
            className="shrink-0 text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            {suffix}
          </span>
        )}
        {trailing && (
          // Inside the box, so the field owns its controls rather than trailing
          // them off to one side.
          <span className="mb-[4px] ml-[10px] flex shrink-0 items-center gap-[10px]">
            {trailing}
          </span>
        )}
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
    </div>
  );
}
