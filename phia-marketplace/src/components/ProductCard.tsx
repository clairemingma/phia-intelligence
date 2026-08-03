"use client";

import { Tag } from "@phosphor-icons/react";

export default function ProductCard() {
  return (
    <article className="min-w-0">
      <a href="#" className="block">
        {/* Image placeholder */}
        <div className="aspect-[4/5] bg-[#e5eaf5] mb-3 border border-[rgba(227,227,227,0.4)]" />

        {/* Info */}
        <div className="flex flex-col gap-[6px] overflow-hidden">
          <div className="flex flex-col gap-[8px]">
            {/* Name + brand */}
            <div className="flex flex-col gap-[4px]">
              <p className="text-[14px] font-medium leading-[normal] text-[#1a1a1a] truncate">
                Multipocket Tote Bag
              </p>
              <p className="text-[14px] font-normal leading-[20px] text-[#666] truncate">
                Nike
              </p>
            </div>

            {/* Price row */}
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center gap-[4px] whitespace-nowrap">
                <span className="text-[14px] font-medium text-[#1a1a1a]">$1,000</span>
                <span className="text-[12px] font-normal text-[#666] line-through leading-[18px]">$1,750</span>
              </div>
              <div className="flex items-center gap-[4px] shrink-0">
                <Tag weight="fill" size={12} color="#14774f" aria-hidden />
                <span className="text-[14px] font-medium text-[#14774f] whitespace-nowrap">14% off</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
