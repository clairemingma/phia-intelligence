"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";

export const sortOptions = [
  "Trending",
  "Price: Low to High",
  "Price: High to Low",
] as const;

export type SortOption = (typeof sortOptions)[number];

export default function ResultsBar({ count }: { count: number | null }) {
  // Trending is the landing order: what shoppers see before touching a filter.
  const [sort, setSort] = useState<SortOption>("Trending");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Dismiss on outside click or Escape, the way the rest of the page's
  // transient surfaces behave.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex items-center justify-between gap-4 pb-5">
      {/* Result count — only once there is a count to show */}
      {count === null ? (
        <span />
      ) : (
        <p className="text-[14px] font-normal leading-[20px] text-[#666]">
          <span className="font-medium text-[#1a1a1a]">{count.toLocaleString()}</span>{" "}
          {count === 1 ? "result" : "results"}
        </p>
      )}

      {/* Sort */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-2 h-[34px] pl-4 pr-3.5 rounded-full border border-[#e3e3e3] text-[12px] font-medium text-[#1a1a1a] cursor-pointer hover:border-[#1a1a1a] transition-colors"
        >
          <span className="whitespace-nowrap">{sort}</span>
          <CaretDown
            size={12}
            weight="regular"
            className={`shrink-0 text-[#999] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            } motion-reduce:transition-none`}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="menu-panel absolute right-0 top-[calc(100%_+_6px)] z-40 w-[190px] bg-white border border-[#e3e3e3] rounded-[10px] py-1.5"
            style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
          >
            {sortOptions.map((option) => {
              const selected = option === sort;
              return (
                <button
                  key={option}
                  role="menuitem"
                  onClick={() => {
                    setSort(option);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 w-full px-3.5 py-[7px] text-left text-[14px] leading-[20px] cursor-pointer transition-colors ${
                    selected
                      ? "font-medium text-[#1a1a1a]"
                      : "font-normal text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  <span className="whitespace-nowrap">{option}</span>
                  {selected && <Check size={12} weight="bold" className="shrink-0 text-[#1a1a1a]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
