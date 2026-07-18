"use client";
import { useState } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const CATEGORIES = [
  "Strappy Sandals",
  "Tote Bags",
  "Fashion Sneakers",
  "Cashmere Sweaters",
  "Linen Dresses",
  "Sneakers",
];

const PRODUCTS = [
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
  { name: "Multipocket Tote Bag", brand: "Nike", price: "$1,000", original: "$1,750", discount: "14% off" },
];

function ProductCard({ name, brand, price, original, discount }: typeof PRODUCTS[number]) {
  return (
    <div className="flex flex-col items-start justify-center shrink-0 w-[288px]">
      <div className="flex flex-col gap-[12px] items-start w-full">
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]" />
        <div className="flex flex-col gap-[6px] items-start overflow-hidden w-full">
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
              <p className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>
                {name}
              </p>
              <p className="leading-[20px] text-[#666] truncate w-full" style={{ fontFamily: PP, fontWeight: 400 }}>
                {brand}
              </p>
            </div>
            <div className="flex gap-[8px] items-center w-full">
              <div className="flex gap-[4px] items-center whitespace-nowrap">
                <p className="leading-none text-[#1a1a1a] text-[14px] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 500 }}>{price}</p>
                <p className="leading-[18px] line-through text-[#666] text-[12px] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 400 }}>{original}</p>
              </div>
              <div className="flex gap-[4px] items-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/tag.svg" alt="" aria-hidden className="shrink-0 size-[12px] block" />
                <p className="leading-none text-[#14774f] text-[14px] whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{discount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopCategoriesSection() {
  const [active, setActive] = useState("Strappy Sandals");

  return (
    <div className="bg-[#f9f8f7] flex flex-col items-center justify-center px-[120px] py-[64px] w-full">
      <div className="flex flex-wrap gap-[16px] items-start w-full">

        {/* Left panel: title + category buttons */}
        <div className="flex flex-col gap-[16px] h-[439px] items-start shrink-0 w-[288px]">

          {/* Title */}
          <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
            <p className="leading-none text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 500 }}>
              Your Top Categories
            </p>
            <p className="leading-[20px] text-[#666] overflow-hidden text-ellipsis" style={{ fontFamily: PP, fontWeight: 400 }}>
              And their top products by impressions
            </p>
          </div>

          {/* Category filter buttons */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="border border-[#e3e3e3] flex gap-[8px] h-[44px] items-center justify-center px-[18px] rounded-[6px] shrink-0 w-full"
            >
              <span className="text-[12px] text-black whitespace-nowrap leading-none" style={{ fontFamily: PP, fontWeight: 500 }}>
                {cat}
              </span>
              {active === cat && (
                <div className="flex items-start overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/caret-right.svg" alt="" aria-hidden className="size-[16px] block" />
                </div>
              )}
            </button>
          ))}

        </div>

        {/* Product cards */}
        {PRODUCTS.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}

      </div>
    </div>
  );
}
