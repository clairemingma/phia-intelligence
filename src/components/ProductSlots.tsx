"use client";

import { useState } from "react";
import {
  FilledPill,
  GripAction,
  PillAction,
  PILL_ICON_EDIT,
  PILL_ICON_REMOVE,
} from "@/components/CoverUpload";
import ProductSearchField, {
  type PickableProduct,
} from "@/components/ProductSearchField";
import { useReorder } from "@/components/useReorder";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * A slot in the placement. It starts as a search field and holds a product once
 * one is chosen, so the rows are what the form is built from rather than a list
 * kept alongside the fields.
 */
export type Slot = { key: string; productId: string | null };

/** Keys only have to be unique, and a module counter is stable across renders
 *  without a ref the render phase would have to reach into. */
let keySeed = 0;
export const newSlot = (): Slot => ({ key: `slot-${++keySeed}`, productId: null });

/** Resolves what a set of slots has chosen, in the order they sit in. */
export function pickedFrom<T extends PickableProduct>(slots: Slot[], catalogue: T[]): T[] {
  return slots
    .flatMap((s) => (s.productId ? [s.productId] : []))
    .map((id) => catalogue.find((p) => p.id === id))
    .filter((p): p is T => Boolean(p));
}

/** The small white pill that appends a row. */
export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[999px] bg-white px-[18px] py-[14px] transition-opacity hover:opacity-60"
    >
      <img
        src="/assets/icon-plus.svg"
        alt=""
        aria-hidden
        className="block size-[16px] shrink-0"
      />
      <span
        className="text-[12px] leading-none whitespace-nowrap text-[#666]"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * One run of product slots: a row per product, each a search field until
 * something is chosen in it, then the same filled pill an uploaded cover image
 * settles into. Controlled, so a caller can keep several of these — an
 * editorial holds one per section.
 */
export default function ProductSlotList({
  catalogue,
  slots,
  onChange,
  chosenElsewhere = [],
}: {
  /** Every product that could be placed, for resolving a slot to its pill. */
  catalogue: PickableProduct[];
  slots: Slot[];
  onChange: (next: Slot[]) => void;
  /** Already placed in another run, so a product is only ever offered once. */
  chosenElsewhere?: string[];
}) {
  const chosenHere = slots.flatMap((s) => (s.productId ? [s.productId] : []));
  const taken = [...chosenHere, ...chosenElsewhere];

  // The rail follows this order, so the look is arranged by dragging the rows.
  const reorder = useReorder({
    items: slots,
    onMove: (from, to) => {
      const next = [...slots];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      onChange(next);
    },
  });

  const fill = (key: string, productId: string | null) =>
    onChange(slots.map((s) => (s.key === key ? { ...s, productId } : s)));

  // Dropping the last slot would leave nowhere to pick, so it reverts to empty.
  const remove = (key: string) => {
    const next = slots.filter((s) => s.key !== key);
    onChange(next.length ? next : [newSlot()]);
  };

  return (
    // The slots and the control that adds one are a single group, so they sit
    // tighter to each other than to the step's own buttons.
    <div className="flex w-full flex-col items-start gap-[16px]">
      {slots.map((slot, i) => {
        const product = catalogue.find((p) => p.id === slot.productId);
        // Only worth a handle once there is another row to trade places with.
        const grip =
          slots.length > 1 ? (
            <GripAction
              label="Drag to reorder"
              active={reorder.dragKey === slot.key}
              handlers={reorder.gripProps(slot.key)}
            />
          ) : null;
        return (
          <div
            key={slot.key}
            {...reorder.rowProps(slot.key, i)}
            {...reorder.rowDragProps(slot.key)}
          >
            {product ? (
              <FilledPill image={product.image} name={`${product.name} · ${product.price}`}>
                {grip}
                {/* The pencil hands the row back to its search field, so a
                    different product can be picked in the same slot. */}
                <PillAction
                  icon={PILL_ICON_EDIT}
                  label={`Change ${product.name}`}
                  onClick={() => fill(slot.key, null)}
                  revealOnHover
                />
                <PillAction
                  icon={PILL_ICON_REMOVE}
                  label={`Remove ${product.name}`}
                  onClick={() => remove(slot.key)}
                  revealOnHover
                />
              </FilledPill>
            ) : (
              <ProductSearchField
                available={catalogue.filter((p) => !taken.includes(p.id))}
                onSelect={(productId) => fill(slot.key, productId)}
                grip={grip}
                // The first slot stays put; the rest can be dropped again.
                onRemove={i > 0 ? () => remove(slot.key) : undefined}
              />
            )}
          </div>
        );
      })}

      <AddButton label="Add product" onClick={() => onChange([...slots, newSlot()])} />
    </div>
  );
}

/**
 * A single run of slots that owns its own state — what the outfit flow needs,
 * having one look rather than a set of sections.
 */
export function useProductSlots<T extends PickableProduct>({
  catalogue,
  resetOn,
}: {
  catalogue: T[];
  /** Changing this empties the slots — the catalogue underneath them changed. */
  resetOn?: string;
}) {
  const [slots, setSlots] = useState<Slot[]>([newSlot()]);

  // Swapping catalogues would leave rows holding products that no longer exist,
  // so the slots start over. Adjusting during render rather than in an effect
  // keeps the stale rows from painting first.
  const [resetToken, setResetToken] = useState(resetOn);
  if (resetToken !== resetOn) {
    setResetToken(resetOn);
    setSlots([newSlot()]);
  }

  return {
    picked: pickedFrom(slots, catalogue),
    node: <ProductSlotList catalogue={catalogue} slots={slots} onChange={setSlots} />,
  };
}
