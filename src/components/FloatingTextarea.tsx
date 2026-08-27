"use client";

import { useState } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * The taller sibling of FloatingInput, for a prompt that wants a few sentences
 * rather than a line. The label rides up the same way, so the two read as one
 * family down a form.
 */
export default function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  rows = 4,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  /** Lines of room to leave — the box does not grow as it is filled. */
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  // The label sits inside the box, so the text starts below it.
  const height = 34 + rows * 24;

  return (
    <div className="relative w-full shrink-0" style={{ height }}>
      <div
        className="absolute inset-0 rounded-[6px] bg-white transition-colors"
        style={{ border: `1px solid ${focused ? "#000" : "#d2cecb"}` }}
      >
        <textarea
          id={id}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-x-0 bottom-0 top-[26px] w-full resize-none bg-transparent px-[13px] pb-[10px] text-[16px] leading-[24px] tracking-[0.16px] text-[#0c0a08] outline-none"
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
    </div>
  );
}
