"use client";
import { useState, useEffect } from "react";
import { CATEGORIES, type Product } from "@/lib/frameCatalog";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";


function ProductCard({ rank, metric, name, price, image }: Product & { rank: number }) {
  return (
    <div className="flex flex-col items-start w-full lg:shrink-0 lg:w-[288px] lg:h-[438px] lg:justify-center">
      <div className="flex flex-col gap-[12px] items-start w-full">
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" aria-hidden className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-[6px] items-start overflow-hidden w-full">
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="flex gap-[4px] items-center w-full">
              <p className="leading-none text-[#002d9f] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>#{rank}</p>
              <p className="leading-none text-[#002d9f] text-[14px]" style={{ fontFamily: PP, fontWeight: 500 }}>·</p>
              <p className="leading-none text-[#002d9f] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{metric}</p>
            </div>
            <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
              <p className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{name}</p>
              <p className="leading-[20px] text-[#666] truncate w-full" style={{ fontFamily: PP, fontWeight: 400 }}>{price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopCategoriesSection() {
  // Seeded from the data, so renaming a category cannot orphan the default.
  const [active, setActive]                   = useState(CATEGORIES[0].name);
  const [displayedActive, setDisplayedActive] = useState(CATEGORIES[0].name);
  const [activeSub, setActiveSub]             = useState<string | null>(null);
  const [subsVisible, setSubsVisible]         = useState(true);

  function handleCategory(name: string) {
    if (name === active) return;
    setActive(name);
    setActiveSub(null);
  }

  useEffect(() => {
    setSubsVisible(false);
    // swap content near end of collapse (280ms), then expand (300ms)
    const swap = setTimeout(() => setDisplayedActive(active), 280);
    const show = setTimeout(() => setSubsVisible(true), 300);
    return () => { clearTimeout(swap); clearTimeout(show); };
  }, [active]);

  const activeCat   = CATEGORIES.find(c => c.name === active)!;
  // A chosen subcategory narrows the three cards; otherwise the category's own top three.
  const shownProducts =
    activeCat.subs.find((s) => s.name === activeSub)?.products ?? activeCat.products;
  const displayedCat = CATEGORIES.find(c => c.name === displayedActive)!;

  const SUB_START        = 220;
  const SUB_STEP         = 70;
  const SUB_START_MOBILE = 30;
  const SUB_STEP_MOBILE  = 50;

  return (
    <div className="flex flex-col lg:flex-row gap-[16px] items-start w-full">

      {/* Left panel */}
      <div className="flex flex-col gap-[16px] items-start w-full lg:shrink-0 lg:w-[288px] lg:h-[439px]">

        {/* Static header */}
        <div className="flex flex-col gap-[4px] items-start text-[14px] w-full shrink-0">
          <p className="leading-none text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 500 }}>
            Your Top Categories
          </p>
          <p className="leading-[20px] text-[#666] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 400 }}>
            And their top products by impressions
          </p>
        </div>

        {/* Mobile: horizontal category row + subcategories below */}
        <div className="flex flex-col gap-[8px] w-full lg:hidden">
          <div className="flex gap-[8px] items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategory(cat.name)}
                  className={`cursor-pointer outline-none flex h-[44px] items-center justify-center px-[19px] rounded-[999px] shrink-0 border transition-colors${!isActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                  style={{
                    background:  isActive ? cat.shade : undefined,
                    borderColor: isActive ? cat.shade : "#e3e3e3",
                    transition:  "background 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <span className="text-[14px] whitespace-nowrap leading-none" style={{ fontFamily: PP, fontWeight: 500, color: isActive ? "#fff" : "#000" }}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-nowrap gap-[8px] items-center overflow-x-auto sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {displayedCat.subs.map((sub, subIdx) => {
              const isSubActive = activeSub === sub.name;
              return (
                <button
                  key={sub.name}
                  onClick={() => setActiveSub(isSubActive ? null : sub.name)}
                  className={`cursor-pointer outline-none flex h-[36px] items-center justify-center px-[15px] rounded-[999px] shrink-0 border${!isSubActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                  style={{
                    ...(isSubActive ? { background: "#e5eaf5", borderColor: "#e5eaf5" } : { borderColor: "#e3e3e3" }),
                    WebkitTapHighlightColor: "transparent",
                    opacity: subsVisible ? 1 : 0,
                    transition: [
                      `opacity 0.45s cubic-bezier(0.4,0,0.2,1) ${subsVisible ? SUB_START_MOBILE + subIdx * SUB_STEP_MOBILE : 0}ms`,
                      `background 0.25s ease 0ms`,
                      `border-color 0.25s ease 0ms`,
                    ].join(", "),
                  }}
                >
                  <span className="text-[12px] whitespace-nowrap leading-none" style={{ fontFamily: PP, fontWeight: 500, color: isSubActive ? displayedCat.shade : "#666" }}>
                    {sub.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: vertical list with expansion animation */}
        <div className="hidden lg:flex flex-col gap-[8px] items-start w-full overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.name;
            return (
              <div key={cat.name} className="flex flex-col items-start shrink-0">

                <button
                  onClick={() => handleCategory(cat.name)}
                  className={`cursor-pointer outline-none flex gap-[8px] h-[44px] items-center justify-center px-[19px] rounded-[999px] shrink-0 border transition-colors${!isActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                  style={{
                    background:  isActive ? cat.shade : undefined,
                    borderColor: isActive ? cat.shade : "#e3e3e3",
                    transition:  "background 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <span className="text-[14px] whitespace-nowrap leading-none" style={{ fontFamily: PP, fontWeight: 500, color: isActive ? "#fff" : "#000" }}>
                    {cat.name}
                  </span>
                  {isActive && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/assets/caret-right.svg" alt="" aria-hidden className="size-[16px] block shrink-0 brightness-0 invert" />
                  )}
                </button>

                <div
                  className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  style={{ transitionDuration: "350ms" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-[8px] items-start pt-[8px]">
                      {cat.subs.map((sub, subIdx) => {
                        const isSubActive = activeSub === sub.name;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => setActiveSub(isSubActive ? null : sub.name)}
                            className={`cursor-pointer outline-none active:opacity-100 flex h-[36px] items-center justify-center px-[15px] rounded-[999px] shrink-0 border${!isSubActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                            style={{
                              ...(isSubActive
                                ? { background: "#e5eaf5", borderColor: "#e5eaf5" }
                                : { borderColor: "#e3e3e3" }),
                              WebkitTapHighlightColor: "transparent",
                              opacity: isActive ? 1 : 0,
                              transition: [
                                `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${isActive ? SUB_START + subIdx * SUB_STEP : 0}ms`,
                                `background 0.25s ease 0ms`,
                                `border-color 0.25s ease 0ms`,
                              ].join(", "),
                            }}
                          >
                            <span
                              className="text-[12px] whitespace-nowrap leading-none"
                              style={{ fontFamily: PP, fontWeight: 500, color: isSubActive ? activeCat.shade : "#666", transition: "color 0.25s ease" }}
                            >
                              {sub.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Product cards */}
      <div className="w-full lg:flex-1 lg:min-w-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-[16px] items-start">
          {shownProducts.map((p, i) => (
            <div
              key={i}
              // At lg the row is a flex track, where items keep their content
              // width unless told otherwise — hence flex-1 and min-w-0.
              className={`lg:flex-1 lg:min-w-0 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <ProductCard rank={i + 1} {...p} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
