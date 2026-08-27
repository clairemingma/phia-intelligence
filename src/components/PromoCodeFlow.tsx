"use client";

import { useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import DateField from "@/components/DateField";
import PromoteFlowShell, {
  FlowSubmitButton,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";
import PromoRow from "@/components/PromoRow";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

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

/** The offer types that carry a figure; the rest name what they give instead. */
const PERCENT_TYPES: OfferType[] = [
  "Exclusive Phia discount",
  "Sitewide discount",
  "Special promotion",
];

/**
 * A sample offer per type, standing in until the brand types over it — the way
 * the editorial flow seeds its phone. Each type gets its own, since a denim
 * discount reads as a mistake beside a free-shipping tile.
 */
const OFFER_MOCKS: Record<
  OfferType,
  { title: string; description: string; code: string; percent: string }
> = {
  "Exclusive Phia discount": {
    title: "20% off full-price denim",
    description: "Applies to every full-price denim style, one use per shopper",
    code: "PHIA20",
    percent: "20",
  },
  "Sitewide discount": {
    title: "15% off everything",
    description: "Runs across the whole collection, no minimum spend",
    code: "FRAME15",
    percent: "15",
  },
  "Special promotion": {
    title: "25% off new arrivals",
    description: "Limited to this season's arrivals, while stock lasts",
    code: "NEWIN25",
    percent: "25",
  },
  "Free shipping": {
    title: "Free shipping on every order",
    description: "No minimum spend, standard delivery in three to five days",
    code: "FRAMESHIP",
    percent: "",
  },
  "Gift with Purchase": {
    title: "Free tote with orders over $250",
    description: "One gift per order, while stocks last",
    code: "FRAMEGIFT",
    percent: "",
  },
};

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
          ? "bg-[#002d9f] text-white"
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
 * The tile a shopper sees first. A discount shows its own figure, while free
 * shipping and a gift have no number to show and label themselves.
 */
function discountTile(offerType: OfferType, percent: string) {
  if (offerType === "Free shipping") return { amount: "Free", unit: "Ship" };
  if (offerType === "Gift with Purchase") return { amount: "Free", unit: "Gift" };
  return { amount: `${percent}%`, unit: "Off" };
}

/* ------------------------------------------------------------------ */
/* Flow                                                                 */
/* ------------------------------------------------------------------ */

export default function PromoCodeFlow() {
  const [offerType, setOfferType] = useState<OfferType>(OFFER_TYPES[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { submit, overlay } = useFlowSubmit();

  // Whatever has been typed wins; the rest comes from this type's sample.
  const mock = OFFER_MOCKS[offerType];
  const previewTitle = title || mock.title;
  // Free shipping and a gift have no figure to enter, so the field steps out.
  const takesPercent = PERCENT_TYPES.includes(offerType);

  return (
    <PromoteFlowShell
      title="Promotional Code"
      subtitle="Exclusive or site-wide discount codes surfaced directly to Phia shoppers."
      crumbHref="/promote"
      preview={
        <div className="w-[568px] max-w-full">
          <PromoRow
            promo={{
              ...discountTile(offerType, percent || mock.percent),
              title: previewTitle,
              meta: description || mock.description,
              // The code is what a shopper copies, so show it as typed.
              code: code.toUpperCase() || mock.code,
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
        {takesPercent && (
          <FloatingInput
            id="promo-percent"
            label="Discount*"
            value={percent}
            onChange={(v) => {
              // A percentage, so digits only and never past 100.
              const n = v.replace(/\D/g, "").slice(0, 3);
              setPercent(n && +n > 100 ? "100" : n);
            }}
            suffix="%"
          />
        )}
        <FloatingInput id="promo-code" label="Promo code*" value={code} onChange={setCode} />
        <FloatingInput
          id="promo-budget"
          label="Budget*"
          value={budget}
          onChange={setBudget}
          prefix="$"
        />

        {/* Timeframe reads as a range, so it is two boxes on one row */}
        <div className="flex w-full flex-col gap-[16px] lg:flex-row">
          <div className="min-w-0 flex-1">
            <DateField
              id="promo-start"
              label="Start date"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="min-w-0 flex-1">
            <DateField
              id="promo-end"
              label="End date"
              value={endDate}
              onChange={setEndDate}
              // An end cannot precede the start it belongs to.
              min={startDate}
            />
          </div>
        </div>

        <FlowSubmitButton />
      </form>

      {overlay}
    </PromoteFlowShell>
  );
}
