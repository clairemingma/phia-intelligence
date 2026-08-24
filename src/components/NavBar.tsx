"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Performance", href: "/" },
  { label: "Placements", href: "/placements" },
  { label: "Promote", href: "/promote" },
];

const montreal = { fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif" };

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 drop-shadow-[0px_2px_4px_rgba(0,5,20,0.04),0px_1px_1.5px_rgba(0,5,20,0.06)]">
      <div className="bg-white border-b border-[#e3e3e3] flex h-[69px] items-center justify-center pl-[24px] pr-[20px] py-[12px]">
        <div className="flex flex-1 items-center min-w-0">

          {/* Logo */}
          <div className="flex flex-1 min-w-0">
            <Link href="/" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/phia-logo.svg"
                alt="phia"
                width={55}
                height={30}
                className="shrink-0 w-[55px] h-[29.95px]"
              />
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex flex-1 items-center justify-center gap-[26px] min-w-0">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-[14px] whitespace-nowrap hover:opacity-60 transition-opacity ${
                  pathname === href ? "text-black" : "text-[#666666]"
                }`}
                style={{ ...montreal, fontWeight: 500 }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-1 items-center justify-end min-w-0">
            <button
              className="bg-[#eeeeee] flex size-[32px] shrink-0 items-center justify-center p-[6px] rounded-full text-[14px] leading-[16px] tracking-[0.28px] text-[#545454] hover:bg-[#e3e3e3] transition-colors"
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
