"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { useOverlay } from "@/lib/overlay";

// Below md the header has room for the logo, one CTA and this — so the links
// that sit across the top of the desktop header, and the Chrome CTA beside them,
// move in here. The categories stay in the masthead row, which scrolls.
export default function MobileMenu({ links }: { links: string[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  // Focus lands on the drawer itself rather than on the button that closes it: a
  // browser draws its focus ring on a control focused from script, and a Tab
  // from the drawer reaches that button first anyway.
  useOverlay({ open, onDismiss: close, focusRef: panelRef });

  // At md these links are back across the header, so the drawer has to let go —
  // otherwise a resize leaves the page scroll locked behind a panel that is no
  // longer covering anything.
  useEffect(() => {
    const header = window.matchMedia("(min-width: 48rem)");
    const sync = () => {
      if (header.matches) setOpen(false);
    };
    sync();
    header.addEventListener("change", sync);
    return () => header.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Menu"
        className="md:hidden flex flex-col items-center justify-center gap-[5px] shrink-0 w-[44px] h-[40px] cursor-pointer"
      >
        {[0, 1, 2].map((bar) => (
          <span key={bar} aria-hidden className="block w-[24px] h-[2px] rounded-[1px] bg-black" />
        ))}
      </button>

      {open && (
        <div onClick={close} className="sheet-scrim md:hidden fixed inset-0 z-[60] bg-black/40" />
      )}

      {/* A drawer off the right edge, mounted only while it is up — there is
          nothing to tab into behind the closed state. */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal
          aria-label="Menu"
          tabIndex={-1}
          className="nav-drawer outline-none md:hidden fixed inset-y-0 right-0 z-[70] flex flex-col w-[300px] max-w-[85vw] bg-white"
        >
          {/* Same header as the filter sheet, so the page's two panels open the
              same way. */}
          <div className="flex items-center justify-between shrink-0 h-[52px] px-5 border-b border-[#e3e3e3]">
            <span className="text-[14px] font-medium text-[#1a1a1a]">Menu</span>
            <button
              onClick={close}
              aria-label="Close menu"
              className="flex items-center justify-center size-[32px] -mr-2 text-[#666] hover:text-[#1a1a1a] transition-colors cursor-pointer"
            >
              <X size={14} weight="bold" />
            </button>
          </div>

          <nav className="flex-1 min-h-0 overflow-y-auto px-5 py-2">
            <ul>
              {links.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    onClick={close}
                    className="flex items-center h-[44px] text-[14px] font-medium text-[#1a1a1a]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 px-5 py-3 border-t border-[#e3e3e3] pb-[calc(12px_+_env(safe-area-inset-bottom))]">
            <button className="flex items-center justify-center gap-2 w-full h-[44px] rounded-full bg-[#002d9f] cursor-pointer">
              <span className="shrink-0 size-[15.258px] rounded-full bg-white/70 flex items-center justify-center">
                <img src="/icon-chrome.svg" alt="" className="block size-[13.871px]" />
              </span>
              <span className="text-[12px] font-medium text-white tracking-[-0.214px] whitespace-nowrap">
                Add to Chrome
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
