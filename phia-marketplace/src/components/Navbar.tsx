import Image from "next/image";
import Link from "next/link";
import CategoryNav from "./CategoryNav";
import MobileMenu from "./MobileMenu";

const topNavLinks = ["Brands", "Editorials", "Shop", "Contact"];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 flex flex-col items-start w-full bg-white"
      style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
    >
      {/* Top header row */}
      <div className="border-b border-[#e3e3e3] flex items-center justify-center px-4 py-3 md:pl-6 md:pr-5 w-full shrink-0">
        <div className="flex items-center w-full max-w-[1398px]">
          {/* Logo */}
          <div className="flex flex-1 flex-col items-start">
            <Link href="/" className="relative flex flex-col overflow-clip shrink-0 w-[55px] h-[30px]">
              <Image
                src="/phia-logo.svg"
                alt="phia"
                fill
                className="object-contain object-left"
                preload
              />
            </Link>
          </div>

          {/* Center nav — no room for it below md, where it moves into the menu */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-[26px]">
            {topNavLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="flex items-center text-[12px] font-medium text-black leading-none whitespace-nowrap hover:opacity-60 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA section */}
          <div className="flex items-center gap-1 md:flex-1 md:justify-end">
            {/* Below md only one CTA fits, so the two collapse into this: the app,
                on the filled pill the Chrome button carries at desktop. */}
            <button className="md:hidden flex items-center justify-center gap-2 h-11 px-[18px] rounded-full bg-[#002d9f] cursor-pointer">
              <img src="/icon-apple-white.svg" alt="" className="shrink-0 w-[13.027px] h-[16px]" />
              <span
                className="flex items-center gap-1 text-[12px] leading-4 text-white tracking-[0.24px] whitespace-nowrap"
                style={{ fontFeatureSettings: '"ss02" 1' }}
              >
                <span className="font-medium">iOS App</span>
                <span aria-hidden className="font-medium opacity-10">
                  |
                </span>
                <span className="font-medium opacity-50">Free</span>
              </span>
            </button>

            {/* iOS App */}
            <button className="hidden md:flex items-center justify-center gap-2 h-11 px-[18px] py-[14px] rounded-full">
              <img
                src="/icon-apple.svg"
                alt=""
                className="shrink-0 w-[13.027px] h-[16px]"
              />
              <span className="text-[12px] font-medium text-black tracking-[0.24px]" style={{ fontFeatureSettings: '"ss02" 1' }}>
                iOS App
              </span>
            </button>

            {/* Add to Chrome */}
            <button className="hidden md:flex items-center gap-2 h-11 px-[18px] rounded-full bg-[#002d9f]">
              <div className="shrink-0 size-[15.258px] rounded-full bg-white/70 flex items-center justify-center">
                <img
                  src="/icon-chrome.svg"
                  alt=""
                  className="block size-[13.871px]"
                />
              </div>
              <span className="text-[12px] font-medium text-white tracking-[-0.214px] whitespace-nowrap">
                Add to Chrome
              </span>
            </button>

            <MobileMenu links={topNavLinks} />
          </div>
        </div>
      </div>

      {/* Masthead / category row + its hover subcategory panels */}
      <CategoryNav />
    </header>
  );
}
