"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Performance", href: "/" },
  { label: "Placements", href: "/placements" },
  { label: "Promote", href: "/promote" },
];

const montreal = { fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif" };

/** The bar's own height, which a banner has to clear before the bar fills in. */
const NAV_HEIGHT = 69;

export default function NavBar({
  /**
   * Height of a full-bleed banner the bar sits over, in px. While that banner
   * is still behind the bar it goes transparent and inverts to white; once the
   * banner has scrolled past, the bar fills in. Omit on pages without one.
   */
  overlayHeight = 0,
}: {
  overlayHeight?: number;
}) {
  const pathname = usePathname();

  // Starts true whenever there is a banner: the page opens at the top of it.
  const [overlaid, setOverlaid] = useState(overlayHeight > 0);

  useEffect(() => {
    if (!overlayHeight) return;

    const sync = () => setOverlaid(window.scrollY < overlayHeight - NAV_HEIGHT);
    // A frame late, so a restored scroll position is picked up on load too.
    const first = requestAnimationFrame(sync);

    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", sync);
    };
  }, [overlayHeight]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-[filter] duration-300 ${
        overlaid
          ? ""
          : "drop-shadow-[0px_2px_4px_rgba(0,5,20,0.04),0px_1px_1.5px_rgba(0,5,20,0.06)]"
      }`}
    >
      <div
        className={`flex h-[69px] items-center justify-center border-b pl-[24px] pr-[20px] py-[12px] transition-colors duration-300 ${
          overlaid ? "bg-transparent border-transparent" : "bg-white border-[#e3e3e3]"
        }`}
      >
        <div className="flex flex-1 items-center min-w-0">

          {/* Logo */}
          <div className="flex flex-1 min-w-0">
            <Link href="/" className="shrink-0">
              {/* Black artwork, so it is inverted to sit on the photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/phia-logo.svg"
                alt="phia"
                width={55}
                height={30}
                className={`shrink-0 w-[55px] h-[29.95px] transition-[filter] duration-300 ${
                  overlaid ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex flex-1 items-center justify-center gap-[26px] min-w-0">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className="text-[14px] whitespace-nowrap hover:opacity-60 transition-[opacity,color] duration-300"
                  style={{
                    ...montreal,
                    fontWeight: 500,
                    color: overlaid
                      ? active
                        ? "#ffffff"
                        : "rgba(255,255,255,0.7)"
                      : active
                        ? "#000000"
                        : "#666666",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-1 items-center justify-end min-w-0">
            <button
              className={`flex size-[32px] shrink-0 items-center justify-center p-[6px] rounded-full text-[14px] leading-[16px] tracking-[0.28px] transition-colors duration-300 ${
                overlaid
                  ? "bg-[rgba(255,255,255,0.24)] text-white hover:bg-[rgba(255,255,255,0.36)]"
                  : "bg-[#eeeeee] text-[#545454] hover:bg-[#e3e3e3]"
              }`}
              style={{ ...montreal, fontWeight: 400, fontFeatureSettings: '"ss02" 1' }}
              aria-label="Account"
            >
              PG
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
