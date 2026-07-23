"use client";
import { useState, useEffect } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const CATEGORIES = [
  { name: "Strappy Sandals",   shade: "#002D9F", subs: ["Platform Sandals", "Ankle Strap", "Toe Thong", "Gladiator"] },
  { name: "Tote Bags",         shade: "#002D9F", subs: ["Canvas Totes", "Leather Totes", "Mini Totes", "Oversized"] },
  { name: "Fashion Sneakers",  shade: "#002D9F", subs: ["Low Top", "High Top", "Platform", "Slip On"] },
  { name: "Cashmere Sweaters", shade: "#002D9F", subs: ["Crewneck", "V-Neck", "Turtleneck", "Cardigan"] },
  { name: "Linen Dresses",     shade: "#002D9F", subs: ["Maxi Dresses", "Midi Dresses", "Mini Dresses", "Wrap Dresses"] },
];

const PRODUCTS = [
  { rank: 1, views: "480 views", name: "Multipocket Tote Bag", price: "$1,000" },
  { rank: 2, views: "480 views", name: "Multipocket Tote Bag", price: "$1,000" },
  { rank: 3, views: "480 views", name: "Multipocket Tote Bag", price: "$1,000" },
];

function ProductCard({ rank, views, name, price }: typeof PRODUCTS[number]) {
  return (
    <div className="flex flex-col h-[438px] items-start justify-center shrink-0 w-[288px]">
      <div className="flex flex-col gap-[12px] items-start w-full">
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]" />
        <div className="flex flex-col gap-[6px] items-start overflow-hidden w-full">
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="flex gap-[4px] items-center w-full">
              <p className="leading-none text-[#002d9f] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>#{rank}</p>
              <p className="leading-none text-[#002d9f] text-[14px]" style={{ fontFamily: PP, fontWeight: 500 }}>·</p>
              <p className="leading-none text-[#002d9f] text-[14px] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{views}</p>
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
  const [active, setActive]             = useState("Strappy Sandals");
  const [activeSub, setActiveSub]       = useState<string | null>(null);
  const [cardsVisible, setCardsVisible] = useState(true);

  function handleCategory(name: string) {
    if (name === active) return;
    setActive(name);
    setActiveSub(null);
  }

  useEffect(() => {
    setCardsVisible(false);
    const t = setTimeout(() => setCardsVisible(true), 250);
    return () => clearTimeout(t);
  }, [active, activeSub]);

  const activeCat = CATEGORIES.find(c => c.name === active)!;

  const SUB_START = 220;  // ms — subcategory stagger start
  const SUB_STEP  = 70;   // ms — per-pill stagger

  return (
    <>

      <div className="flex flex-wrap gap-[16px] items-start w-full">

          {/* Left panel */}
          <div className="flex flex-col gap-[16px] items-start shrink-0 w-[288px] h-[439px]">

            {/* Static header */}
            <div className="flex flex-col gap-[4px] items-start text-[14px] w-full shrink-0">
              <p className="leading-none text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 500 }}>
                Your Top Categories
              </p>
              <p className="leading-[20px] text-[#666] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 400 }}>
                And their top products by impressions
              </p>
            </div>

            {/* Scrollable pills */}
            <div className="flex flex-col gap-[8px] items-start w-full overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {CATEGORIES.map((cat) => {
                const isActive = active === cat.name;

                return (
                  <div key={cat.name} className="flex flex-col items-start shrink-0">

                    {/* Category pill */}
                    <button
                      onClick={() => handleCategory(cat.name)}
                      className={`cursor-pointer outline-none flex gap-[8px] h-[44px] items-center justify-center px-[19px] rounded-[999px] shrink-0 border transition-colors${!isActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                      style={{
                        background:  isActive ? cat.shade : undefined,
                        borderColor: isActive ? cat.shade : "#e3e3e3",
                        transition:  "background 0.25s ease, border-color 0.25s ease",
                      }}
                    >
                      <span
                        className="text-[14px] whitespace-nowrap leading-none"
                        style={{ fontFamily: PP, fontWeight: 500, color: isActive ? "#fff" : "#000" }}
                      >
                        {cat.name}
                      </span>
                      {isActive && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="/assets/caret-right.svg" alt="" aria-hidden className="size-[16px] block shrink-0 brightness-0 invert" />
                      )}
                    </button>

                    {/* Subcategory pills — height expands with container, pills stagger in after pill lands */}
                    <div
                      className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      style={{ transitionDuration: "350ms" }}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-[8px] items-start pt-[8px]">
                          {cat.subs.map((sub, subIdx) => {
                            const isSubActive = activeSub === sub;
                            return (
                              <button
                                key={sub}
                                onClick={() => setActiveSub(isSubActive ? null : sub)}
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
                                  {sub}
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

          {/* Product cards — staggered float-in */}
          <div className="flex gap-[16px] items-start">
            {PRODUCTS.map((p, i) => (
              <div
                key={i}
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  transitionDelay: cardsVisible ? `${i * 80}ms` : "0ms",
                }}
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>

        </div>
    </>
  );
}
