"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

export const sortOptions = [
  "New Arrivals",
  "Trending",
  "Price Low to High",
  "Price High to Low",
] as const;

export type SortOption = (typeof sortOptions)[number];

export default function ResultsBar({ count }: { count: number | null }) {
  // New Arrivals is the landing order: what shoppers see before touching a filter.
  const [sort, setSort] = useState<SortOption>("New Arrivals");
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
    <div className="flex items-center justify-end gap-2.5 pb-4">
      {/* Result count — only once there is a count to show. Reads as one phrase
          with the sort beside it, so a dot divides them. */}
      {count !== null && (
        <>
          <p className="text-[14px] font-normal leading-[20px] text-[#666]">
            {count.toLocaleString("en-US")} {count === 1 ? "result" : "results"}
          </p>
          <span aria-hidden className="text-[#666] leading-none">
            ·
          </span>
        </>
      )}

      {/* Sort */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="group flex items-center gap-1.5 text-[14px] font-normal leading-[20px] text-[#666] cursor-pointer rounded-[4px] transition-colors hover:text-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002d9f]/25"
        >
          <span className="whitespace-nowrap">{sort}</span>
          <CaretDown
            size={12}
            weight="regular"
            className={`shrink-0 text-[#666] group-hover:text-[#1a1a1a] transition-[transform,color] duration-200 ${
              open ? "rotate-180" : ""
            } motion-reduce:transition-none`}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="menu-panel absolute right-0 top-[calc(100%_+_6px)] z-40 w-[190px] bg-white border border-[#e3e3e3] rounded-[6px] py-1.5"
            style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
          >
            {sortOptions.map((option) => {
              const selected = option === sort;
              return (
                <button
                  key={option}
                  // With the check gone, aria-checked carries the current sort
                  // for anyone who can't see the heavier weight.
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => {
                    setSort(option);
                    setOpen(false);
                  }}
                  // Same 5px row padding as a filter row in the left column, so
                  // the two lists share one vertical rhythm. Weight alone marks
                  // the current sort.
                  className={`flex items-center w-full px-3.5 py-[5px] text-left text-[14px] leading-[20px] cursor-pointer transition-colors ${
                    selected
                      ? "font-medium text-[#1a1a1a]"
                      : "font-normal text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  <span className="whitespace-nowrap">{option}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
