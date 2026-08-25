"use client";
import { useState } from "react";
import { CATEGORIES, type Product } from "@/lib/frameCatalog";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";


function ProductCard({ rank, metric, name, price, image }: Product & { rank: number }) {
  return (
    <div className="flex flex-col items-start shrink-0 w-full lg:w-[288px] h-auto lg:h-[438px] justify-center">
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

const NO_SCROLLBAR = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

function CategoryPill({
  name, shade, active, onClick,
}: { name: string; shade: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer outline-none flex h-[44px] items-center justify-center px-[19px] rounded-[999px] shrink-0 border transition-colors${!active ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
      style={{
        background:  active ? shade : undefined,
        borderColor: active ? shade : "#e3e3e3",
        transition:  "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <span className="text-[14px] whitespace-nowrap leading-none" style={{ fontFamily: PP, fontWeight: 500, color: active ? "#fff" : "#000" }}>
        {name}
      </span>
    </button>
  );
}

function SubPill({
  name, shade, active, onClick, style,
}: { name: string; shade: string; active: boolean; onClick: () => void; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer outline-none active:opacity-100 flex h-[36px] items-center justify-center px-[15px] rounded-[999px] shrink-0 border${!active ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
      style={{
        ...(active ? { background: "#e5eaf5", borderColor: "#e5eaf5" } : { borderColor: "#e3e3e3" }),
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      <span
        className="text-[12px] whitespace-nowrap leading-none"
        style={{ fontFamily: PP, fontWeight: 500, color: active ? shade : "#666", transition: "color 0.25s ease" }}
      >
        {name}
      </span>
    </button>
  );
}

export default function TopCategoriesSection() {
  // Seeded from the data, so renaming a category cannot orphan the default.
  const [active, setActive]                   = useState(CATEGORIES[0].name);
  const [activeSub, setActiveSub]             = useState<string | null>(null);

  function handleCategory(name: string) {
    if (name === active) return;
    setActive(name);
    setActiveSub(null);
  }

  const activeCat   = CATEGORIES.find(c => c.name === active)!;
  // A chosen subcategory narrows the three cards; otherwise the category's own top three.
  const shownProducts =
    activeCat.subs.find((s) => s.name === activeSub)?.products ?? activeCat.products;

  const SUB_START        = 220;
  const SUB_STEP         = 70;

  return (
    <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[16px] items-start w-full">

      {/* Left panel */}
      <div className="flex flex-col gap-[16px] items-start shrink-0 w-full lg:w-[288px] h-auto lg:h-[439px]">

        {/* Static header */}
        <div className="flex flex-col gap-[4px] items-start text-[14px] w-full shrink-0">
          <p className="leading-none text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 500 }}>
            Your Top Categories
          </p>
          <p className="leading-[20px] text-[#666] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 400 }}>
            And their top products by impressions
          </p>
        </div>

        {/* On a phone: every category on one scrolling line, the active one's
            subcategories on another beneath it. */}
        <div className="flex flex-col gap-[8px] w-full lg:hidden">
          <div className={`flex gap-[8px] items-center overflow-x-auto ${NO_SCROLLBAR}`}>
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.name}
                name={cat.name}
                shade={cat.shade}
                active={active === cat.name}
                onClick={() => handleCategory(cat.name)}
              />
            ))}
          </div>
          <div className={`flex gap-[8px] items-center overflow-x-auto ${NO_SCROLLBAR}`}>
            {activeCat.subs.map((sub) => (
              <SubPill
                key={sub.name}
                name={sub.name}
                shade={activeCat.shade}
                active={activeSub === sub.name}
                onClick={() => setActiveSub(activeSub === sub.name ? null : sub.name)}
              />
            ))}
          </div>
        </div>

        {/* From lg: a vertical list, each category expanding its own subcategories. */}
        <div className={`hidden lg:flex flex-col gap-[8px] items-start w-full overflow-y-auto flex-1 ${NO_SCROLLBAR}`}>
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.name;
            return (
              <div key={cat.name} className="flex flex-col items-start shrink-0">
                <CategoryPill
                  name={cat.name}
                  shade={cat.shade}
                  active={isActive}
                  onClick={() => handleCategory(cat.name)}
                />

                <div
                  className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  style={{ transitionDuration: "350ms" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-[8px] items-start pt-[8px]">
                      {cat.subs.map((sub, subIdx) => (
                        <SubPill
                          key={sub.name}
                          name={sub.name}
                          shade={activeCat.shade}
                          active={activeSub === sub.name}
                          onClick={() => setActiveSub(activeSub === sub.name ? null : sub.name)}
                          style={{
                            opacity: isActive ? 1 : 0,
                            transition: [
                              `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${isActive ? SUB_START + subIdx * SUB_STEP : 0}ms`,
                              "background 0.25s ease 0ms",
                              "border-color 0.25s ease 0ms",
                            ].join(", "),
                          }}
                        />
                      ))}
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
        <div className="grid grid-cols-2 lg:flex gap-[16px] items-start">
          {shownProducts.map((p, i) => (
            <div
              key={i}
              // At lg the row is a flex track, where items keep their content
              // width unless told otherwise — hence flex-1 and min-w-0.
              className="w-full lg:flex-1 lg:min-w-0"
            >
              <ProductCard rank={i + 1} {...p} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
