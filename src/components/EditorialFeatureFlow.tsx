"use client";

import { useEffect, useRef, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import CoverUpload from "@/components/CoverUpload";
import StepButton from "@/components/StepButton";
import { useProductSlots } from "@/components/ProductSlots";
import EditorialPhonePreview from "@/components/EditorialPhonePreview";
import {
  EDITORIAL_PLACEMENTS,
  type EditorialPlacement,
} from "@/lib/editorialPlacements";
import PromoteFlowShell, {
  FlowSubmitButton,
  scrollFlowToTop,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* ------------------------------------------------------------------ */
/* Placement choice                                                     */
/* ------------------------------------------------------------------ */

type PlacementId = EditorialPlacement["id"];

/** Plain bordered card; selecting it fills the whole card phia blue. */
function PlacementCard({
  placement,
  selected,
  onSelect,
}: {
  placement: EditorialPlacement;
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
          ? "border-[#002d9f] bg-[#002d9f]"
          : "border-[#e3e3e3] bg-white hover:border-[#9a9a9a]"
      }`}
    >
      <p
        className={`text-[14px] leading-none ${selected ? "text-white" : "text-black"}`}
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {placement.cardTitle}
      </p>
      <p
        className={`text-[14px] leading-[20px] ${
          selected ? "text-[rgba(255,255,255,0.65)]" : "text-[#666]"
        }`}
        style={{ fontFamily: PP, fontWeight: 400 }}
      >
        {placement.cardBody}
      </p>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Flow                                                                 */
/* ------------------------------------------------------------------ */

export default function EditorialFeatureFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const { submit, overlay } = useFlowSubmit();

  // Each step reads as its own page, so land at the top of it.
  function goToStep(next: 1 | 2) {
    setStep(next);
    scrollFlowToTop();
  }

  const [placementId, setPlacementId] = useState<PlacementId>("exclusive");
  const placement =
    EDITORIAL_PLACEMENTS.find((p) => p.id === placementId) ?? EDITORIAL_PLACEMENTS[0];
  // The title and description follow whichever editorial is selected, until
  // the brand types over them.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // The picker offers whatever the selected editorial is made of, and starts
  // over when that changes.
  const { picked, node: productSlots } = useProductSlots({
    catalogue: placement.products,
    resetOn: placement.id,
  });

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
          placement={placement}
          // Nothing chosen yet still needs to read as an editorial, so the
          // preview shows the whole edit until the brand starts picking.
          products={picked.length ? picked : placement.products}
          title={title || placement.title}
          description={description || placement.description}
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
          {EDITORIAL_PLACEMENTS.map((p) => (
            <PlacementCard
              key={p.id}
              placement={p}
              selected={placementId === p.id}
              onSelect={() => setPlacementId(p.id)}
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

        {productSlots}

        <FlowSubmitButton type="button" onClick={submit} />

        {overlay}
      </div>
      )}
    </PromoteFlowShell>
  );
}
