import ProductCard from "./ProductCard";
import EditorialCardLarge from "./EditorialSection";

export default function ProductGrid() {
  return (
    <div>
      {/* Row 1 — 4 across at lg, matching the filter column's width exactly */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 mt-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>

      {/* Mixed section: 2×2 products (left) + editorial card (right) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 mt-16">
        {/* Left: two rows of 2 products, 64px apart, on the same column track */}
        <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>

        {/* Right: editorial card over the remaining two columns */}
        <div className="col-span-2">
          <EditorialCardLarge />
        </div>
      </div>

      {/* Shopping Stats Container */}
      <div className="mt-16 w-full border border-[#e3e3e3] rounded-[16px] flex flex-wrap items-center justify-between gap-4 px-[28px] py-[24px]">
        {/* Left: logo + text */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="border border-[#e3e3e3] relative rounded-[8.889px] shrink-0 size-[40px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8.889px]">
              <img
                alt=""
                className="absolute max-w-none"
                style={{ width: "144.72%", height: "144.72%", left: "-21.81%", top: "-22.48%" }}
                src="/phia-app-icon.png"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium text-[#1a1a1a] leading-[normal] whitespace-nowrap">
              Save every product in one place
            </p>
            <p className="text-[14px] font-normal leading-[20px] text-[#666]">
              Available on desktop &amp; mobile
            </p>
          </div>
        </div>

        {/* Right: CTA buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add to Chrome */}
          <button className="flex items-center gap-3 h-11 px-4 rounded-full bg-[#002d9f] hover:opacity-90 transition-opacity">
            <img src="/icon-chrome.svg" alt="" width={20} height={20} className="shrink-0" />
            <div className="flex items-center gap-1">
              <span
                className="text-[16px] font-medium text-white tracking-[0.16px] whitespace-nowrap leading-5"
                style={{ fontFeatureSettings: '"ss02" 1' }}
              >
                Add to Chrome
              </span>
              <span className="text-[16px] font-medium text-white opacity-20 leading-5">|</span>
              <span
                className="text-[16px] font-normal text-white tracking-[0.16px] whitespace-nowrap leading-5"
                style={{ fontFeatureSettings: '"ss02" 1' }}
              >
                It&apos;s Free
              </span>
            </div>
          </button>

          {/* iOS App */}
          <button className="flex items-center gap-2 h-11 px-[18px] rounded-full border border-[#e3e3e3] text-black hover:border-[#1a1a1a] transition-colors">
            <img src="/icon-apple.svg" alt="" width={16} height={20} className="shrink-0" />
            <span className="text-[12px] font-medium whitespace-nowrap">iOS App</span>
          </button>
        </div>
      </div>
    </div>
  );
}
