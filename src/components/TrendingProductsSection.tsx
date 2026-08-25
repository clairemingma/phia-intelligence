"use client";

import { useState, useRef, useEffect } from "react";
import TopCategoriesSection from "@/components/TopCategoriesSection";
import { SORT_FILTERS, TRENDING, type Product, type SortFilter } from "@/lib/frameCatalog";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";



function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 size-[16px]" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2.5, 5.5)">
        <path d="M10.854 0.854028L5.85403 5.85403C5.80759 5.90052 5.75245 5.9374 5.69175 5.96256C5.63105 5.98772 5.56599 6.00067 5.50028 6.00067C5.43457 6.00067 5.36951 5.98772 5.30881 5.96256C5.24811 5.9374 5.19296 5.90052 5.14653 5.85403L0.146528 0.854028C0.0527077 0.760208 0 0.63296 0 0.500278C0 0.367596 0.0527077 0.240348 0.146528 0.146528C0.240348 0.0527074 0.367596 0 0.500278 0C0.63296 0 0.760208 0.0527074 0.854028 0.146528L5.50028 4.7934L10.1465 0.146528C10.193 0.100073 10.2481 0.0632225 10.3088 0.0380812C10.3695 0.0129398 10.4346 0 10.5003 0C10.566 0 10.631 0.0129398 10.6917 0.0380812C10.7524 0.0632225 10.8076 0.100073 10.854 0.146528C10.9005 0.192983 10.9373 0.248133 10.9625 0.30883C10.9876 0.369526 11.0006 0.434581 11.0006 0.500278C11.0006 0.565975 10.9876 0.63103 10.9625 0.691726C10.9373 0.752423 10.9005 0.807573 10.854 0.854028Z" fill="#1A1A1A" />
      </g>
    </svg>
  );
}

function ProductCard({ name, price, metric, rank, image }: Product & { rank: number }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image placeholder */}
        <div className="aspect-[400/500] border border-[rgba(227,227,227,0.4)] rounded-[6px] overflow-hidden shrink-0 w-full bg-[#e5eaf5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" aria-hidden className="size-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-[8px] items-start w-full">
          <p
            className="text-[14px] leading-none truncate whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500, color: "#002d9f" }}
          >
            #{rank} · {metric}
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSort(f: SortFilter) {
    if (f === activeSort) return;
    setActiveSort(f);
  }

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col gap-[48px] items-start justify-center px-6 lg:px-16 xl:px-[120px] py-[64px] w-full">

      {/* Section title + sort controls */}
      <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
        <div className="w-full h-px bg-[#999999]" />
        <div className="flex items-start justify-between w-full">
          <h2
            className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a]"
            style={{ fontFamily: GT, fontWeight: 300 }}
          >
            Trending Products
          </h2>

          {/* Sort dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className="cursor-pointer flex gap-[8px] h-[44px] items-center justify-center px-[18px] rounded-[6px] border border-[#e3e3e3] bg-white outline-none hover:bg-[rgba(0,0,0,0.04)] transition-colors"
            >
              <span className="text-[12px] leading-none whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500, color: "#1a1a1a" }}>
                {activeSort}
              </span>
              <ChevronDown />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[8px] border border-[rgba(0,0,0,0.08)] flex flex-col overflow-hidden"
                style={{ boxShadow: "0px 2px 4px rgba(0,5,20,0.04), 0px 1px 1.5px rgba(0,5,20,0.06)" }}
              >
                {SORT_FILTERS.map((f, i) => (
                  <div key={f}>
                    {i > 0 && <div className="h-px bg-[rgba(0,0,0,0.08)]" />}
                    <button
                      onClick={() => { handleSort(f); setDropdownOpen(false); }}
                      className="cursor-pointer flex h-[44px] items-center justify-start px-[18px] w-full outline-none hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      <span
                        className="text-[12px] leading-none whitespace-nowrap"
                        style={{ fontFamily: PP, fontWeight: 500, color: f === activeSort ? "#1a1a1a" : "#666" }}
                      >
                        {f}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Products grid — 5 per row, wraps with 48px row gap */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[16px] gap-y-[48px] w-full">
        {TRENDING[activeSort].map((p, i) => (
          <ProductCard key={p.name} rank={i + 1} {...p} />
        ))}
      </div>

      {/* Top Categories */}
      <div className="pt-[48px] w-full">
        <TopCategoriesSection />
      </div>

    </div>
  );
}
