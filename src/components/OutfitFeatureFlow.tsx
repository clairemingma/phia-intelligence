"use client";

import { useEffect, useRef, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import CoverUpload from "@/components/CoverUpload";
import StepButton from "@/components/StepButton";
import { useProductSlots } from "@/components/ProductSlots";
import OutfitPhonePreview from "@/components/OutfitPhonePreview";
import PromoteFlowShell, {
  FlowSubmitButton,
  scrollFlowToTop,
  useFlowSubmit,
} from "@/components/PromoteFlowShell";
import {
  OUTFIT_DESCRIPTION,
  OUTFIT_PRODUCTS,
  OUTFIT_TITLE,
} from "@/lib/outfitData";

const SUBTITLE =
  "Style your products into complete looks shoppers can shop in a single tap.";

/**
 * Two-step outfit request: the placement's details and cover, then the products
 * that make up the look. Both steps sit beside a live phone preview, so the
 * brand can see the look it is describing as it fills the form in.
 */
export default function OutfitFeatureFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const { submit, overlay } = useFlowSubmit();

  // Each step reads as its own page, so land at the top of it.
  function goToStep(next: 1 | 2) {
    setStep(next);
    scrollFlowToTop();
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // The rail follows the slots, so reordering the form reorders the look.
  const { picked: pickedProducts, node: productSlots } = useProductSlots({
    catalogue: OUTFIT_PRODUCTS,
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
      title="Outfit Feature"
      subtitle={SUBTITLE}
      crumbHref="/promote"
      preview={
        <OutfitPhonePreview
          title={title || OUTFIT_TITLE}
          description={description || OUTFIT_DESCRIPTION}
          cover={cover?.url}
          // Nothing chosen yet still needs to read as a look, so the preview
          // shows the whole rail until the brand starts picking.
          products={pickedProducts.length ? pickedProducts : OUTFIT_PRODUCTS}
        />
      }
    >
      {step === 1 ? (
        <form
          className="flex w-full flex-col items-end gap-[24px]"
          onSubmit={(e) => {
            e.preventDefault();
            goToStep(2);
          }}
        >
          <FloatingInput id="outfit-title" label="Title*" value={title} onChange={setTitle} />
          <FloatingInput
            id="outfit-description"
            label="Description*"
            value={description}
            onChange={setDescription}
          />
          <FloatingInput
            id="outfit-budget"
            label="Budget*"
            value={budget}
            onChange={setBudget}
            prefix="$"
          />
          {/* Timeframe reads as a range, so it is two boxes on one row */}
          <div className="flex w-full gap-[16px]">
            <div className="min-w-0 flex-1">
              <FloatingInput
                id="outfit-start"
                label="Start"
                value={startDate}
                onChange={setStartDate}
              />
            </div>
            <div className="min-w-0 flex-1">
              <FloatingInput
                id="outfit-end"
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

          <StepButton label="Select products" direction="next" onClick={() => goToStep(2)} />
        </form>
      ) : (
        <div className="flex w-full flex-col items-start gap-[24px]">
          <StepButton label="Back" direction="back" onClick={() => goToStep(1)} />

          {productSlots}

          <FlowSubmitButton type="button" onClick={submit} />

          {overlay}
        </div>
      )}
    </PromoteFlowShell>
  );
}
