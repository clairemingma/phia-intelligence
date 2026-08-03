"use client";

import { useState } from "react";
import TopCategoriesSection from "@/components/TopCategoriesSection";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

const SORT_FILTERS = ["Impressions", "Top Selling"] as const;
type SortFilter = typeof SORT_FILTERS[number];

const PRODUCTS = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  name: "Multipocket Tote Bag",
  price: "$1,000",
  views: "480 views",
}));

function ProductCard({ name, price, views, rank }: typeof PRODUCTS[number]) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image placeholder */}
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]" />

        {/* Info */}
        <div className="flex flex-col gap-[8px] items-start w-full">
          <p
            className="text-[14px] leading-none truncate whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500, color: "#002d9f" }}
          >
            #{rank} · {views}
          </p>
          <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
            <p
              className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {name}
            </p>
            <p
              className="leading-[20px] text-[#666] truncate w-full"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {price}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TrendingProductsSection() {
  const [activeSort, setActiveSort] = useState<SortFilter>("Impressions");
  const [visible, setVisible] = useState(true);

  function handleSort(f: SortFilter) {
    if (f === activeSort) return;
    setVisible(false);
    setTimeout(() => { setActiveSort(f); setVisible(true); }, 150);
  }

  return (
    <div className="flex flex-col gap-[48px] items-start justify-center px-6 lg:px-16 xl:px-[120px] py-[64px] w-full">

      {/* Section title + sort buttons */}
      <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
        <div className="w-full h-px bg-[#1a1a1a]" />
        <div className="flex items-start justify-between w-full">
          <h2
            className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
            style={{ fontFamily: GT, fontWeight: 300 }}
          >
            Trending Products
          </h2>
          <div className="flex gap-[8px] items-start shrink-0">
            {SORT_FILTERS.map((f) => {
              const isActive = activeSort === f;
              return (
                <button
                  key={f}
                  onClick={() => handleSort(f)}
                  className={`cursor-pointer flex h-[44px] items-center justify-center px-[18px] rounded-[6px] shrink-0 outline-none transition-colors bg-white${!isActive ? " hover:bg-[rgba(0,0,0,0.04)]" : ""}`}
                  style={{
                    border: isActive ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
                  }}
                >
                  <span
                    className="text-[12px] leading-none whitespace-nowrap"
                    style={{ fontFamily: PP, fontWeight: 500, color: isActive ? "#1a1a1a" : "#666" }}
                  >
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products grid — 5 per row, wraps with 48px row gap */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[16px] gap-y-[48px] w-full">
        {PRODUCTS.map((p, i) => (
          <div
            key={p.rank}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: visible
                ? "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"
                : "opacity 0.12s ease, transform 0.12s ease",
              transitionDelay: visible ? `${i * 35}ms` : "0ms",
            }}
          >
            <ProductCard {...p} />
          </div>
        ))}
      </div>

      {/* Top Categories */}
      <div className="pt-[48px] w-full">
        <TopCategoriesSection />
      </div>

    </div>
  );
}
