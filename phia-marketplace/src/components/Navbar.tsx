import Image from "next/image";
import Link from "next/link";
import CategoryNav from "./CategoryNav";

const topNavLinks = ["Brands", "Editorials", "Shop", "Contact"];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 flex flex-col items-start w-full bg-white"
      style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
    >
      {/* Top header row */}
      <div className="border-b border-[#e3e3e3] flex items-center justify-center pl-6 pr-5 py-3 w-full shrink-0">
        <div className="flex items-center w-full max-w-[1398px]">
          {/* Logo */}
          <div className="flex flex-1 flex-col items-start">
            <Link href="/" className="relative flex flex-col overflow-clip shrink-0 w-[55px] h-[30px]">
              <Image
                src="/phia-logo.svg"
                alt="phia"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Center nav */}
          <div className="flex flex-1 items-center justify-center gap-[26px]">
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
          <div className="flex flex-1 items-center justify-end gap-1">
            {/* iOS App */}
            <button className="flex items-center justify-center gap-2 h-11 px-[18px] py-[14px] rounded-full">
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
            <button className="flex items-center gap-2 h-11 px-[18px] rounded-full bg-[#002d9f]">
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
          </div>
        </div>
      </div>

      {/* Masthead / category row + its hover subcategory panels */}
      <CategoryNav />
    </header>
  );
}
