"use client";

import { useEffect, useRef, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import EditorialPhonePreview from "@/components/EditorialPhonePreview";
import PromoteFlowShell, {
  FlowSubmitButton,
  scrollFlowToTop,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const DEFAULT_TITLE = "The It Girl's Holiday Gift Guide";
const DEFAULT_DESCRIPTION =
  "Curated essentials for the trend-setting, city-hopping it-girl, featuring MANGO.";

/* ------------------------------------------------------------------ */
/* Placement choice                                                     */
/* ------------------------------------------------------------------ */

type PlacementId = "exclusive" | "inclusion";

const PLACEMENTS: { id: PlacementId; title: string; body: string }[] = [
  {
    id: "exclusive",
    title: "Exclusive Editorial",
    body: "An editorial devoted entirely to your brand.",
  },
  {
    id: "inclusion",
    title: "Editorial Inclusion",
    body: "A considered placement amongst like-minded brands.",
  },
];

/** Plain bordered card; selecting it fills the whole card charcoal. */
function PlacementCard({
  placement,
  selected,
  onSelect,
}: {
  placement: (typeof PLACEMENTS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex h-[120px] flex-1 min-w-0 cursor-pointer flex-col items-start justify-center gap-[4px] rounded-[6px] border px-[18px] py-[14px] text-left transition-colors duration-200 ${
        selected
          ? "border-[#292929] bg-[#292929]"
          : "border-[#e3e3e3] bg-white hover:border-[#9a9a9a]"
      }`}
    >
      <p
        className={`text-[14px] leading-none ${selected ? "text-white" : "text-black"}`}
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {placement.title}
      </p>
      <p
        className={`text-[14px] leading-[20px] ${
          selected ? "text-[rgba(255,255,255,0.65)]" : "text-[#666]"
        }`}
        style={{ fontFamily: PP, fontWeight: 400 }}
      >
        {placement.body}
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Cover upload                                                         */
/* ------------------------------------------------------------------ */

function CoverUpload({
  file,
  previewUrl,
  onPick,
  onClear,
}: {
  file: File | null;
  previewUrl: string | null;
  onPick: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function take(list: FileList | null) {
    const next = list?.[0];
    if (next && next.type.startsWith("image/")) onPick(next);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        take(e.dataTransfer.files);
      }}
      className={`flex h-[60px] w-full shrink-0 items-center rounded-[999px] border bg-white transition-colors duration-200 ${
        dragging
          ? "border-[#1a1a1a]"
          : previewUrl
            ? "border-[#d2cecb]"
            : "border-[#d2cecb] hover:border-[#1a1a1a]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => take(e.target.files)}
      />

      {previewUrl ? (
        <div className="flex h-full w-full items-center gap-[10px] px-[18px] py-[16px]">
          <img
            src={previewUrl}
            alt=""
            className="size-[28px] shrink-0 rounded-full object-cover"
          />
          <p
            className="min-w-0 flex-1 truncate text-[16px] leading-[28px] tracking-[0.16px] text-[#1a1a1a]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            {file?.name}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 cursor-pointer text-[12px] leading-[16px] text-[#1a1a1a] underline underline-offset-2 transition-opacity hover:opacity-60"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            Replace
          </button>
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 cursor-pointer text-[12px] leading-[16px] text-[#999] underline underline-offset-2 transition-colors hover:text-[#1a1a1a]"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            Remove
          </button>
        </div>
      ) : (
        // The whole pill is the control, so the hit area matches the border
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-full cursor-pointer items-center gap-[10px] rounded-[999px] px-[18px] py-[16px] text-left"
        >
          {/* 16px icon box with the glyph inset, as the design draws it */}
          <span className="relative block size-[16px] shrink-0">
            <span className="absolute inset-[12.5%]">
              <img
                src="/assets/icon-upload.svg"
                alt=""
                aria-hidden
                className="block size-full max-w-none"
              />
            </span>
          </span>
          <span
            className="text-[16px] leading-[28px] tracking-[0.16px] text-[#1a1a1a] whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            Upload cover image
          </span>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — product picker                                              */
/* ------------------------------------------------------------------ */

const CANDIDATES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: "Multipocket Tote Bag",
  price: "$1,000",
}));

function ProductCard({
  name,
  price,
  selected,
  onToggle,
}: {
  name: string;
  price: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className="group/product flex w-[227.2px] shrink-0 cursor-pointer flex-col items-start justify-center text-left"
    >
      <div className="flex w-full flex-col gap-[12px]">
        <div
          className={`relative aspect-[400/500] w-full overflow-hidden rounded-[6px] border transition-colors duration-200 ${
            selected ? "border-[#1a1a1a]" : "border-[rgba(227,227,227,0.4)]"
          }`}
        >
          <div className="size-full bg-[#e5eaf5]" />
          {/* The design has no resting-state mark, so the ring only appears on
              hover or once the product is chosen. */}
          <span
            className={`absolute right-[10px] top-[10px] flex size-[18px] items-center justify-center rounded-full border transition-all duration-200 group-hover/product:opacity-100 ${
              selected
                ? "border-[#1a1a1a] bg-[#1a1a1a] opacity-100"
                : "border-[#cfcbc8] bg-white/70 opacity-0"
            }`}
          >
            <span
              className={`size-[4px] rounded-full bg-white transition-opacity duration-200 ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </div>
        <div className="flex w-full flex-col gap-[4px] overflow-hidden">
          <p
            className="truncate text-[14px] leading-none text-[#1a1a1a]"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {name}
          </p>
          <p
            className="truncate text-[14px] leading-[20px] text-[#666]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            {price}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Flow                                                                 */
/* ------------------------------------------------------------------ */

/** Small white pill used for the step's forward / back control. */
function StepButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "next" | "back";
  onClick: () => void;
}) {
  // 16px icon box with the glyph inset, as the design draws it
  const caret = (
    <span className="relative block size-[16px] shrink-0">
      <span
        className="absolute"
        style={{
          inset:
            direction === "next"
              ? "16.46% 28.91% 16.46% 35.21%"
              : "16.46% 35.1% 16.35% 28.91%",
        }}
      >
        <img
          src={
            direction === "next"
              ? "/assets/icon-caret-right-sm.svg"
              : "/assets/icon-caret-left-sm.svg"
          }
          alt=""
          aria-hidden
          className="block size-full max-w-none"
        />
      </span>
    </span>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[999px] bg-white px-[18px] py-[14px] transition-opacity hover:opacity-60"
    >
      {direction === "back" && caret}
      <span
        className="text-[12px] leading-none text-black whitespace-nowrap"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
      {direction === "next" && caret}
    </button>
  );
}

export default function EditorialFeatureFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const submit = useFlowSubmit();

  // Each step reads as its own page, so land at the top of it.
  function goToStep(next: 1 | 2) {
    setStep(next);
    scrollFlowToTop();
  }

  const [placement, setPlacement] = useState<PlacementId>("exclusive");
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<number[]>([]);

  const [cover, setCover] = useState<{ file: File; url: string } | null>(null);

  // Object URLs must be released or the blob stays resident for the session.
  // The ref mirrors the live URL so both swaps and unmount can revoke it.
  const coverUrlRef = useRef<string | null>(null);

  function pickCover(file: File | null) {
    if (coverUrlRef.current) URL.revokeObjectURL(coverUrlRef.current);
    if (!file) {
      coverUrlRef.current = null;
      setCover(null);
      return;
    }
    const url = URL.createObjectURL(file);
    coverUrlRef.current = url;
    setCover({ file, url });
  }

  useEffect(
    () => () => {
      if (coverUrlRef.current) URL.revokeObjectURL(coverUrlRef.current);
    },
    [],
  );

  return (
    <PromoteFlowShell
      title="Editorial Feature"
      subtitle="Feature your brand in Phia editorial content, style guides, and trend reports."
      crumbHref="/promote"
      preview={
        <EditorialPhonePreview
          title={title || DEFAULT_TITLE}
          description={description || DEFAULT_DESCRIPTION}
          cover={cover?.url}
        />
      }
    >
      {step === 1 ? (
      <form
        className="flex w-full flex-col gap-[24px] items-end"
        onSubmit={(e) => {
          e.preventDefault();
          goToStep(2);
        }}
      >
        <div className="flex w-full gap-[16px] items-start" role="radiogroup" aria-label="Placement type">
          {PLACEMENTS.map((p) => (
            <PlacementCard
              key={p.id}
              placement={p}
              selected={placement === p.id}
              onSelect={() => setPlacement(p.id)}
            />
          ))}
        </div>

        <FloatingInput id="editorial-title" label="Title*" value={title} onChange={setTitle} />
        <FloatingInput
          id="editorial-description"
          label="Description*"
          value={description}
          onChange={setDescription}
        />
        <FloatingInput
          id="editorial-budget"
          label="Budget*"
          value={budget}
          onChange={setBudget}
          prefix="$"
        />
        {/* Timeframe reads as a range, so it is two boxes on one row */}
        <div className="flex w-full gap-[16px]">
          <div className="min-w-0 flex-1">
            <FloatingInput
              id="editorial-start"
              label="Start"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="min-w-0 flex-1">
            <FloatingInput
              id="editorial-end"
              label="End"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>

        <CoverUpload
          file={cover?.file ?? null}
          previewUrl={cover?.url ?? null}
          onPick={pickCover}
          onClear={() => pickCover(null)}
        />

        <StepButton label="Select Products" direction="next" onClick={() => goToStep(2)} />
      </form>
      ) : (
      <div className="flex w-full flex-col gap-[24px] items-start">
        <StepButton label="Back" direction="back" onClick={() => goToStep(1)} />

        <div className="flex h-[60px] w-full items-center gap-[10px] rounded-[999px] border border-[#d2cecb] bg-white pl-[15px] pr-[24px]">
          <img src="/assets/icon-search.svg" alt="" aria-hidden className="block size-[16px] shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Paste URL or search"
            aria-label="Paste URL or search"
            className="h-full flex-1 bg-transparent text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08] outline-none placeholder:text-[rgba(12,10,8,0.6)]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          />
        </div>

        {/* Clipped to the search field's width; the row scrolls within it */}
        <div className="w-full overflow-x-auto pb-[4px]">
          <div className="flex w-max gap-[16px] items-start">
            {CANDIDATES.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                selected={picked.includes(p.id)}
                onToggle={() =>
                  setPicked((prev) =>
                    prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id],
                  )
                }
              />
            ))}
          </div>
        </div>

        <FlowSubmitButton type="button" onClick={submit} />
      </div>
      )}
    </PromoteFlowShell>
  );
}
