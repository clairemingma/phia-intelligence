"use client";

import { useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import PromoteFlowShell, {
  FlowSubmitButton,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";
import PromoRow from "@/components/PromoRow";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* The preview stands in with the design's sample offer until the brand types
   over it, matching how the editorial flow seeds its phone. */
const DEFAULT_TITLE = "20% off full-price denim";
const DEFAULT_DESCRIPTION = "841 shoppers saved with this code today";
const DEFAULT_CODE = "PHIA20";

/* ------------------------------------------------------------------ */
/* Offer type                                                           */
/* ------------------------------------------------------------------ */

const OFFER_TYPES = [
  "Exclusive Phia discount",
  "Sitewide discount",
  "Special promotion",
  "Free shipping",
  "Gift with Purchase",
] as const;

type OfferType = (typeof OFFER_TYPES)[number];

/** Pill toggle; the chosen one fills black. */
function OfferTypePill({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex h-[44px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[999px] px-[18px] py-[14px] transition-colors duration-200 ${
        selected
          ? "bg-black text-white"
          : "border border-[#e3e3e3] bg-white text-black hover:border-[#9a9a9a]"
      }`}
    >
      <span
        className="text-[14px] leading-none whitespace-nowrap"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Preview                                                              */
/* ------------------------------------------------------------------ */

/**
 * The card has a discount tile but the form has no field for it, so the value
 * is read back out of the offer title — "Extra 20% off…" fills the tile with
 * "20% Off". Free shipping has no figure to show, so it labels itself.
 */
function discountTile(offerType: OfferType, title: string) {
  if (offerType === "Free shipping") return { amount: "Free", unit: "Ship" };

  const match = title.match(/\$\s?\d[\d,.]*|\d[\d,.]*\s?%/);
  if (!match) return { amount: "20%", unit: "Off" };

  return { amount: match[0].replace(/\s/g, ""), unit: "Off" };
}

/* ------------------------------------------------------------------ */
/* Flow                                                                 */
/* ------------------------------------------------------------------ */

export default function PromoCodeFlow() {
  const [offerType, setOfferType] = useState<OfferType>(OFFER_TYPES[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const { submit, overlay } = useFlowSubmit();

  const previewTitle = title || DEFAULT_TITLE;

  return (
    <PromoteFlowShell
      title="Promotional Code"
      subtitle="Exclusive or site-wide discount codes surfaced directly to Phia shoppers."
      crumbHref="/promote"
      preview={
        <div className="w-[568px] max-w-full">
          <PromoRow
            promo={{
              ...discountTile(offerType, previewTitle),
              title: previewTitle,
              meta: description || DEFAULT_DESCRIPTION,
              // The code is what a shopper copies, so show it as typed.
              code: code.toUpperCase() || DEFAULT_CODE,
              // Only the Phia-exclusive offer earns the badged treatment.
              featured: offerType === "Exclusive Phia discount",
            }}
          />
        </div>
      }
    >
      <form
        className="flex w-full flex-col gap-[24px] items-start"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {/* Five pills over two rows at 568px, so the row wraps */}
        <div
          className="flex w-full flex-wrap gap-[8px] items-start"
          role="radiogroup"
          aria-label="Offer type"
        >
          {OFFER_TYPES.map((type) => (
            <OfferTypePill
              key={type}
              label={type}
              selected={offerType === type}
              onSelect={() => setOfferType(type)}
            />
          ))}
        </div>

        <FloatingInput id="promo-title" label="Offer title*" value={title} onChange={setTitle} />
        <FloatingInput
          id="promo-description"
          label="Offer description*"
          value={description}
          onChange={setDescription}
        />
        <FloatingInput id="promo-code" label="Promo code*" value={code} onChange={setCode} />
        <FloatingInput
          id="promo-budget"
          label="Budget*"
          value={budget}
          onChange={setBudget}
          prefix="$"
        />

        {/* Timeframe reads as a range, so it is two boxes on one row */}
        <div className="flex w-full gap-[16px]">
          <div className="min-w-0 flex-1">
            <FloatingInput
              id="promo-start"
              label="Start"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="min-w-0 flex-1">
            <FloatingInput id="promo-end" label="End" value={endDate} onChange={setEndDate} />
          </div>
        </div>

        <FloatingInput
          id="promo-notes"
          label="Tell us what you're looking for"
          value={notes}
          onChange={setNotes}
        />

        <FlowSubmitButton />
      </form>

      {overlay}
    </PromoteFlowShell>
  );
}
