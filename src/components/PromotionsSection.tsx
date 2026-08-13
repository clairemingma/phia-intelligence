"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

type Promo = {
  amount: string;
  unit: string;
  title: string;
  meta: string;
  code: string;
  /** The lead row inverts the colours and swaps the "Code" label for a badge. */
  featured?: boolean;
};

const PROMOS: Promo[] = [
  {
    amount: "20%",
    unit: "Off",
    title: "Extra 20% off full-price Acne Studios — sitewide",
    meta: "841 shoppers saved with this code in the last 24 hours",
    code: "ACNE20",
    featured: true,
  },
  {
    amount: "15%",
    unit: "Off",
    title: "15% off your order when you spend $300+",
    meta: "312 interested users tried this code today",
    code: "ACNE15",
  },
  {
    amount: "$50",
    unit: "Off",
    title: "$50 off your first order over $400",
    meta: "128 new customers used this welcome offer this week",
    code: "WELCOME50",
  },
  {
    amount: "Free",
    unit: "Ship",
    title: "Free standard shipping on orders $250 and up",
    meta: "574 checkouts applied free shipping today",
    code: "FREESHIP",
  },
];

function PromoRow({ promo }: { promo: Promo }) {
  const { amount, unit, title, meta, code, featured } = promo;
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — leave the label unchanged */
    }
  }

  return (
    <div
      className={`w-full rounded-[6px] ${
        featured ? "bg-[#e5eaf5]" : "border border-[rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="flex gap-[24px] items-center p-[16px] w-full">

        {/* Amount tile */}
        <div
          className={`flex flex-col gap-[12px] h-[96px] w-[128px] shrink-0 items-center justify-center p-[16px] ${
            featured ? "bg-[#002d9f]" : "bg-[#e5eaf5]"
          }`}
        >
          <p
            className={`text-[28px] leading-[20px] tracking-[-0.154px] text-center whitespace-nowrap ${
              featured ? "text-white" : "text-[#002d9f]"
            }`}
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {amount}
          </p>
          <p
            className={`opacity-50 text-[28px] leading-[20px] tracking-[-0.154px] text-center whitespace-nowrap ${
              featured ? "text-white" : "text-[#002d9f]"
            }`}
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {unit}
          </p>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-[12px] flex-1 min-w-0 items-start justify-center">
          {featured ? (
            <div className="flex gap-[6px] items-center bg-[#002d9f] rounded-full px-[8px] py-[4px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-phia-exclusive.svg" alt="" aria-hidden className="block size-[12px] shrink-0" />
              <p
                className="text-[11px] leading-[14px] tracking-[-0.154px] text-white whitespace-nowrap"
                style={{ fontFamily: PP, fontWeight: 500 }}
              >
                Phia exclusive
              </p>
            </div>
          ) : (
            <p
              className="text-[12px] leading-[16px] tracking-[-0.154px] text-[#1a1a1a] whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              Code
            </p>
          )}

          <div className="flex flex-col gap-[6px] items-start w-full">
            <p
              className="text-[16px] leading-[20px] tracking-[-0.154px] text-black"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {title}
            </p>
            <p
              className="text-[12px] leading-[18px] tracking-[-0.154px] text-black"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {meta}
            </p>
          </div>
        </div>

        {/* Code chip. The design leaves a 160px slot with the chip at its right
            end; the copy button fills that slot on hover so the code stays
            legible at rest. */}
        <div className="group/code relative h-[44px] w-[160px] shrink-0">
          <div className="absolute right-0 top-0 flex h-[44px] items-center justify-center rounded-full bg-[#e5eaf5] border border-dashed border-[#002d9f] px-[11px] py-px overflow-hidden">
            <span
              className="text-[12px] leading-[12px] tracking-[-0.154px] text-[#002092] whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {code}
            </span>
          </div>

          {!featured && (
            <button
              onClick={copyCode}
              aria-label={`Copy code ${code}`}
              className="absolute left-0 top-0 flex gap-[8px] h-[44px] w-[114px] cursor-pointer items-center justify-center rounded-full bg-[#002092] opacity-0 drop-shadow-[0px_2px_3px_rgba(0,5,20,0.08),0px_8px_12px_rgba(0,5,20,0.06)] transition-[opacity,background-color] hover:bg-[#001a75] group-hover/code:opacity-100 focus-visible:opacity-100"
            >
              <span
                className="text-[12px] leading-[12px] tracking-[-0.154px] text-white text-center whitespace-nowrap"
                style={{ fontFamily: PP, fontWeight: 500 }}
              >
                {copied ? "Copied" : "Copy Code"}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-copy.svg" alt="" aria-hidden className="block size-[11px] shrink-0" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default function PromotionsSection() {
  return (
    <section className="bg-white flex flex-col gap-[48px] items-start px-[120px] py-[64px] w-[1440px] overflow-hidden">
      <SectionHeading title="Promotional Codes" action={<CreateButton />} />

      <div className="flex flex-col gap-[24px] items-start w-full">
        {PROMOS.map((promo) => (
          <PromoRow key={promo.code} promo={promo} />
        ))}
      </div>
    </section>
  );
}
