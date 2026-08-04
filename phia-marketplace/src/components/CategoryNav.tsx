"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { categoryHref, categoryMenus } from "@/lib/data";

// Moving from a category label down into its panel crosses the row's 1px border.
// A short grace period keeps the menu open across that gap instead of flickering
// shut, and also forgives a cursor that clips a neighbouring label in passing.
const CLOSE_DELAY = 120;

export default function CategoryNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  function cancelClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), CLOSE_DELAY);
  }

  function close() {
    cancelClose();
    setOpenLabel(null);
  }

  // A pending timer must not outlive the component.
  useEffect(() => cancelClose, []);

  // Escape closes an open menu, wherever focus currently sits.
  useEffect(() => {
    if (!openLabel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openLabel]);

  const openMenu = categoryMenus.find((c) => c.label === openLabel);

  return (
    <div className="relative w-full" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
      {/* Masthead / category row */}
      <div className="bg-white border-b border-[#e3e3e3] flex items-center justify-center pl-6 pr-5 py-4 w-full shrink-0">
        <div className="flex flex-1 items-center justify-center gap-[26px]">
          {categoryMenus.map(({ label }) => {
            const open = openLabel === label;
            return (
              <Link
                key={label}
                href={categoryHref(label)}
                aria-haspopup="true"
                aria-expanded={open}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenLabel(label);
                }}
                onFocus={() => setOpenLabel(label)}
                className={`relative flex items-center text-[12px] font-medium leading-none whitespace-nowrap text-black transition-opacity ${
                  open ? "opacity-100" : "hover:opacity-60"
                }`}
              >
                {label}
                {/* Active rule sits on the row's bottom border, tying the label
                    to the panel hanging below it. */}
                {open && <span className="absolute -bottom-4 left-0 right-0 h-px bg-[#1a1a1a]" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subcategory panel — hover-driven, so pointer devices only. */}
      {openMenu && (
        <div
          className="menu-panel hidden md:block absolute top-full left-0 w-full bg-white border-b border-[#e3e3e3] px-6 md:px-10 lg:px-[60px] py-8"
          style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
        >
          {/* One track per subcategory column, so a five-column panel fills the
              row instead of orphaning its last column onto a second line. */}
          <div
            className={`mx-auto w-full max-w-[1398px] grid grid-cols-2 gap-x-4 gap-y-8 ${
              openMenu.columns.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
          >
            {openMenu.columns.map((column) => (
              <div key={column.heading} className="min-w-0">
                <p className="text-[12px] font-medium text-[#1a1a1a] mb-3">{column.heading}</p>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={categoryHref(openMenu.label, item)}
                        onClick={close}
                        className="block py-[5px] text-[14px] font-normal leading-[20px] text-[#666] hover:text-[#1a1a1a] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
