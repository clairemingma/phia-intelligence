"use client";

import { useEffect, useRef, useState } from "react";
import FloatingInput from "@/components/FloatingInput";
import DateField from "@/components/DateField";
import CoverUpload, {
  FilledPill,
  GripAction,
  PillAction,
  PILL_ICON_EDIT,
  PILL_ICON_REMOVE,
} from "@/components/CoverUpload";
import StepButton from "@/components/StepButton";
import ProductSearchField from "@/components/ProductSearchField";
import { useReorder } from "@/components/useReorder";
import { AddButton } from "@/components/ProductSlots";
import EditorialPhonePreview, {
  type EditorialBlockView,
} from "@/components/EditorialPhonePreview";
import {
  EDITORIAL_PLACEMENTS,
  type EditorialPlacement,
} from "@/lib/editorialPlacements";
import { isOwnBrand } from "@/lib/brand";
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

/**
 * The editorial body is built a block at a time — a header, a line of copy, or
 * a product — so the brand can order them however the piece reads rather than
 * filling a fixed shape.
 */
type BlockKind = "header" | "description" | "product";
type EditorialBlock = {
  key: string;
  kind: BlockKind;
  /** Copy, for a header or a description. */
  text: string;
  /** What a product block holds, once chosen. */
  productId: string | null;
};

let blockSeed = 0;
const newBlock = (kind: BlockKind): EditorialBlock => ({
  key: `block-${++blockSeed}`,
  kind,
  text: "",
  productId: null,
});

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
      className={`flex min-h-[120px] flex-1 min-w-0 cursor-pointer flex-col items-start justify-center gap-[4px] rounded-[6px] border px-[14px] py-[14px] text-left transition-colors duration-200 lg:h-[120px] lg:px-[18px] ${
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

  const [blocks, setBlocks] = useState<EditorialBlock[]>([newBlock("product")]);

  // Switching placement would leave blocks holding products that no longer
  // exist, so they start over. Adjusting during render rather than in an effect
  // keeps the stale rows from painting first.
  const [placementToken, setPlacementToken] = useState(placement.id);
  if (placementToken !== placement.id) {
    setPlacementToken(placement.id);
    setBlocks([newBlock("product")]);
  }

  const updateBlock = (key: string, patch: Partial<EditorialBlock>) =>
    setBlocks((prev) => prev.map((b) => (b.key === key ? { ...b, ...patch } : b)));
  const removeBlock = (key: string) =>
    setBlocks((prev) => prev.filter((b) => b.key !== key));
  const addBlock = (kind: BlockKind) => setBlocks((prev) => [...prev, newBlock(kind)]);
  // Lifted out and put back, so a block can be dragged anywhere in the run.
  const moveBlock = (from: number, to: number) =>
    setBlocks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  const reorder = useReorder({ items: blocks, onMove: moveBlock });

  // A brand places its own products and no one else's. In an inclusion the
  // peers are already in the edit — Phia put them there.
  const ownProducts = placement.products.filter((p) => isOwnBrand(p.brand));
  const peerProducts = placement.products.filter((p) => !isOwnBrand(p.brand));

  const chosenIds = blocks.flatMap((b) => (b.productId ? [b.productId] : []));

  // Until the brand has authored something, the preview shows the editorial as
  // it already stands rather than an empty shell.
  const touched = blocks.some((b) => b.text.trim() || b.productId);

  // Consecutive products become one grid, so a run of them reads as a set
  // rather than a column of single tiles.
  const authoredBlocks: EditorialBlockView[] = blocks.reduce<EditorialBlockView[]>(
    (out, b) => {
      if (b.kind === "product") {
        const product = placement.products.find((p) => p.id === b.productId);
        if (!product) return out;
        const last = out.at(-1);
        if (last?.kind === "products") {
          out[out.length - 1] = { kind: "products", products: [...last.products, product] };
        } else {
          out.push({ kind: "products", products: [product] });
        }
        return out;
      }
      if (!b.text.trim()) return out;
      out.push({ kind: b.kind, text: b.text.trim() });
      return out;
    },
    [],
  );

  /**
   * The peers belong to the edit whatever the brand does — Phia placed them —
   * so they follow whatever it puts in, rather than vanishing the moment it
   * starts picking.
   */
  const withPeers = (list: EditorialBlockView[]): EditorialBlockView[] => {
    if (!peerProducts.length) return list;
    const lastGrid = list.map((b) => b.kind).lastIndexOf("products");
    if (lastGrid === -1) return [...list, { kind: "products", products: peerProducts }];
    return list.map((b, i) =>
      i === lastGrid && b.kind === "products"
        ? { kind: "products", products: [...b.products, ...peerProducts] }
        : b,
    );
  };

  const previewBlocks: EditorialBlockView[] = touched
    ? withPeers(authoredBlocks)
    : [
        ...(placement.section
          ? ([
              { kind: "header", text: placement.section.title },
              { kind: "description", text: placement.section.body },
            ] as EditorialBlockView[])
          : []),
        { kind: "products", products: placement.products },
      ];

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
          // Each step is a fresh thing to scroll, so the hint plays again.
          replayHintOn={`${placement.id}-${step}`}
          blocks={previewBlocks}
          title={title || placement.title}
          description={description || placement.description}
          cover={placement.authoredByBrand ? cover?.url : undefined}
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
        <div
          className="flex w-full gap-[16px] items-stretch"
          role="radiogroup"
          aria-label="Placement type"
        >
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
        <div className="flex w-full flex-col gap-[16px] lg:flex-row">
          <div className="min-w-0 flex-1">
            <DateField
              id="editorial-start"
              label="Start date"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="min-w-0 flex-1">
            <DateField
              id="editorial-end"
              label="End date"
              value={endDate}
              onChange={setEndDate}
              // An end cannot precede the start it belongs to.
              min={startDate}
            />
          </div>
        </div>

        {/* Phia shoots an inclusion, so there is no cover for the brand to
            give — and no section copy for it to write. */}
        {placement.authoredByBrand && (
          <CoverUpload
            file={cover?.file ?? null}
            previewUrl={cover?.url ?? null}
            onPick={pickCover}
            onClear={() => pickCover(null)}
          />
        )}

        <StepButton label="Select Products" direction="next" onClick={() => goToStep(2)} />
      </form>
      ) : (
      <div className="flex w-full flex-col gap-[24px] items-start">
        <StepButton label="Back" direction="back" onClick={() => goToStep(1)} />

        {/* The body in the order it will read. Every block can be dropped, so
            an editorial can be emptied and started again. */}
        <div className="flex w-full flex-col items-start gap-[16px]">
          {blocks.map((block, i) => {
            const product = placement.products.find((p) => p.id === block.productId);
            // Only worth a handle once there is another row to trade with.
            const grip =
              blocks.length > 1 ? (
                <GripAction
                  label="Drag to reorder"
                  active={reorder.dragKey === block.key}
                  handlers={reorder.gripProps(block.key)}
                />
              ) : null;

            if (block.kind === "product") {
              return (
                <div
                  key={block.key}
                  {...reorder.rowProps(block.key, i)}
                  {...reorder.rowDragProps(block.key)}
                >
                  {product ? (
                    <FilledPill
                      image={product.image}
                      name={`${product.name} · ${product.price}`}
                    >
                      {grip}
                      <PillAction
                        icon={PILL_ICON_EDIT}
                        label={`Change ${product.name}`}
                        onClick={() => updateBlock(block.key, { productId: null })}
                        revealOnHover
                      />
                      <PillAction
                        icon={PILL_ICON_REMOVE}
                        label={`Remove ${product.name}`}
                        onClick={() => removeBlock(block.key)}
                        revealOnHover
                      />
                    </FilledPill>
                  ) : (
                    <ProductSearchField
                      available={ownProducts.filter((p) => !chosenIds.includes(p.id))}
                      onSelect={(productId) => updateBlock(block.key, { productId })}
                      grip={grip}
                      onRemove={() => removeBlock(block.key)}
                    />
                  )}
                </div>
              );
            }

            const isHeader = block.kind === "header";
            return (
              <div
                  key={block.key}
                  {...reorder.rowProps(block.key, i)}
                  {...reorder.rowDragProps(block.key)}
                >
                <FloatingInput
                  id={`editorial-${block.key}`}
                  label={isHeader ? "Header" : "Description"}
                  value={block.text}
                  onChange={(v) => updateBlock(block.key, { text: v })}
                  trailing={
                    <>
                      {grip}
                      <PillAction
                        icon={PILL_ICON_REMOVE}
                        label={isHeader ? "Remove header" : "Remove description"}
                        onClick={() => removeBlock(block.key)}
                        revealOnHover
                      />
                    </>
                  }
                />
              </div>
            );
          })}

          {/* The three things a body is made of, on one line */}
          <div className="flex flex-wrap items-center gap-[8px]">
            <AddButton label="Add product" onClick={() => addBlock("product")} />
            {placement.authoredByBrand && (
              <>
                <AddButton label="Add header" onClick={() => addBlock("header")} />
                <AddButton label="Add description" onClick={() => addBlock("description")} />
              </>
            )}
          </div>
        </div>

        <FlowSubmitButton type="button" onClick={submit} />

        {overlay}
      </div>
      )}
    </PromoteFlowShell>
  );
}
