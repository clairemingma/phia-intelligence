"use client";

import { useState } from "react";
import TopCategoriesSection from "@/components/TopCategoriesSection";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

const SORT_FILTERS = ["Impressions", "Top Selling"] as const;
type SortFilter = typeof SORT_FILTERS[number];

const products = [
  { name: "Multipocket Tote Bag", price: "$1,000", views: "480 views" },
  { name: "Multipocket Tote Bag", price: "$1,000", views: "480 views" },
  { name: "Multipocket Tote Bag", price: "$1,000", views: "480 views" },
  { name: "Multipocket Tote Bag", price: "$1,000", views: "480 views" },
  { name: "Multipocket Tote Bag", price: "$1,000", views: "480 views" },
];

function ProductCard({ name, price, views, rank }: typeof products[number] & { rank: number }) {
  return (
    <div className="flex flex-[1_0_0] flex-col items-start justify-center min-w-0">
      <div className="flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image placeholder */}
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]" />

        {/* Info */}
        <div className="flex flex-col gap-[8px] items-start w-full">
          {/* Rank · views */}
          <p
            className="text-[14px] leading-none truncate whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500, color: "#002d9f" }}
          >
            #{rank} · {views}
          </p>
          {/* Name + price */}
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

function CardRow({ startRank }: { startRank: number }) {
  return (
    <div className="flex gap-[16px] items-start w-full shrink-0">
      {products.map((p, i) => (
        <ProductCard key={i} {...p} rank={startRank + i} />
      ))}
    </div>
  );
}

export default function TrendingProductsSection() {
  const [activeSort, setActiveSort] = useState<SortFilter>("Impressions");

  return (
    <div className="flex flex-col gap-[48px] items-start justify-center px-[120px] py-[64px] w-full">

      {/* Section title */}
      <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
        <div className="w-full h-px bg-[#1a1a1a]" />
        <h2
          className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a] whitespace-nowrap"
          style={{ fontFamily: GT, fontWeight: 300 }}
        >
          Trending Products
        </h2>
      </div>

      {/* Row 1 with sort filter tabs */}
      <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
        <div className="flex items-start">
          {SORT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveSort(f)}
              className="cursor-pointer flex h-[44px] items-center justify-center px-[18px] rounded-[6px] shrink-0 border outline-none transition-colors"
              style={{ borderColor: activeSort === f ? "#e3e3e3" : "transparent" }}
            >
              <span
                className="text-[12px] leading-none whitespace-nowrap transition-colors"
                style={{ fontFamily: PP, fontWeight: 500, color: activeSort === f ? "#000" : "#999" }}
              >
                {f}
              </span>
            </button>
          ))}
        </div>
        <CardRow startRank={1} />
      </div>

      {/* Row 2 */}
      <CardRow startRank={6} />

      {/* Top Categories */}
      <div className="pt-[48px] w-full">
        <TopCategoriesSection />
      </div>

    </div>
  );
}
