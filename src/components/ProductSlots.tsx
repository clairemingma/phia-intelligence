"use client";

import { useRef, useState } from "react";
import {
  FilledPill,
  PillAction,
  PILL_ICON_EDIT,
  PILL_ICON_REMOVE,
} from "@/components/CoverUpload";
import ProductSearchField, {
  type PickableProduct,
} from "@/components/ProductSearchField";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * A slot in the placement. It starts as a search field and holds a product once
 * one is chosen, so the rows are what the form is built from rather than a list
 * kept alongside the fields.
 */
type Slot = { key: string; productId: string | null };

/**
 * The product picker both the outfit and editorial flows use: one row per
 * product, each a search field until something is chosen in it, then the same
 * filled pill an uploaded cover image settles into.
 *
 * Returns what has been picked along with the rows to render, so the caller can
 * feed its live preview without owning the row bookkeeping.
 */
export function useProductSlots<T extends PickableProduct>({
  catalogue,
  resetOn,
}: {
  catalogue: T[];
  /** Changing this empties the slots — the catalogue underneath them changed. */
  resetOn?: string;
}) {
  const seed = useRef(1);
  const newSlot = (): Slot => ({ key: `slot-${seed.current++}`, productId: null });
  const [slots, setSlots] = useState<Slot[]>([{ key: "slot-0", productId: null }]);

  // Swapping catalogues would leave rows holding products that no longer exist,
  // so the slots start over. Adjusting during render rather than in an effect
  // keeps the stale rows from painting first.
  const [resetToken, setResetToken] = useState(resetOn);
  if (resetToken !== resetOn) {
    setResetToken(resetOn);
    // Keyed off the new catalogue rather than the seed, so the reset does not
    // have to reach into a ref mid-render.
    setSlots([{ key: `slot-${resetOn}`, productId: null }]);
  }

  const chosenIds = slots.flatMap((s) => (s.productId ? [s.productId] : []));
  // The preview follows the rows, so reordering the form reorders the placement.
  const picked = chosenIds
    .map((id) => catalogue.find((p) => p.id === id))
    .filter((p): p is T => Boolean(p));

  function fill(key: string, productId: string | null) {
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, productId } : s)));
  }

  // Dropping the last slot would leave nowhere to pick, so it reverts to empty.
  function remove(key: string) {
    setSlots((prev) => {
      const next = prev.filter((s) => s.key !== key);
      return next.length ? next : [newSlot()];
    });
  }

  const node = (
    // The slots and the control that adds one are a single group, so they sit
    // tighter to each other than to the step's own buttons.
    <div className="flex w-full flex-col items-start gap-[16px]">
      {slots.map((slot, i) => {
        const product = catalogue.find((p) => p.id === slot.productId);
        return product ? (
          <FilledPill
            key={slot.key}
            image={product.image}
            name={`${product.name} · ${product.price}`}
          >
            {/* The pencil hands the row back to its search field, so a
                different product can be picked in the same slot. */}
            <PillAction
              icon={PILL_ICON_EDIT}
              label={`Change ${product.name}`}
              onClick={() => fill(slot.key, null)}
            />
            <PillAction
              icon={PILL_ICON_REMOVE}
              label={`Remove ${product.name}`}
              onClick={() => remove(slot.key)}
            />
          </FilledPill>
        ) : (
          <ProductSearchField
            key={slot.key}
            available={catalogue.filter((p) => !chosenIds.includes(p.id))}
            onSelect={(productId) => fill(slot.key, productId)}
            // The first slot stays put; the rest can be dropped again.
            onRemove={i > 0 ? () => remove(slot.key) : undefined}
          />
        );
      })}

      <button
        type="button"
        onClick={() => setSlots((prev) => [...prev, newSlot()])}
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
          Add product
        </span>
      </button>
    </div>
  );

  return { picked, node };
}
