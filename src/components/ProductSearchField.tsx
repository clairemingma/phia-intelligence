"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { PillAction, PILL_ICON_REMOVE } from "@/components/CoverUpload";
import { isOwnBrand } from "@/lib/brand";

/* eslint-disable @next/next/no-img-element */

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const MONO = "var(--font-roboto-mono), ui-monospace, monospace";



/**
 * What a slot can hold. Both the outfit rail and the editorial grid pick from
 * lists of this shape, so they share the field below.
 */
export type PickableProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  /** Named only where a list spans brands, as an editorial inclusion does. */
  brand?: string;
};

/**
 * Narrows the catalogue to what a query is reaching for. A pasted product URL
 * is matched on its slug, so the field takes either a link or a few words of
 * the name; an empty query offers everything still unclaimed.
 */
function matching(products: PickableProduct[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      q.includes(p.id) ||
      p.name.toLowerCase().includes(q) ||
      (p.brand?.toLowerCase().includes(q) ?? false) ||
      p.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && q.includes(word)),
  );
}

/**
 * One product slot: the design's search field, which opens into a list of the
 * products available to place. The field itself grows to hold the list rather
 * than dropping a separate panel beneath it, so it reads as one surface.
 *
 * Choosing a product hands it up to the form, which settles the row into its
 * filled state.
 */
export default function ProductSearchField({
  available,
  onSelect,
  onRemove,
  grip,
}: {
  /** Catalogue entries not already placed in another row. */
  available: PickableProduct[];
  onSelect: (productId: string) => void;
  /** Omitted on the first slot, which the form always keeps. */
  onRemove?: () => void;
  /** The handle this row is dragged by, where the run can be reordered. */
  grip?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  // Only arrow-key navigation is marked; pointing at a row is not.
  const [viaKeyboard, setViaKeyboard] = useState(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = matching(available, query);
  // Keep the highlight inside the list as the query narrows it
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  function choose(product: PickableProduct) {
    setOpen(false);
    onSelect(product.id);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (!results.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setViaKeyboard(true);
      setActive((activeIndex + step + results.length) % results.length);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[activeIndex];
      if (pick) choose(pick);
    }
  }

  return (
    // The wrapper holds the closed field's space, so opening the list grows the
    // field over what follows instead of pushing the form down.
    <div className="relative h-[60px] w-full shrink-0">
      <div
        onMouseDown={(e) => {
          if (e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
        // The open row has to outrank its siblings, or a later row's field
        // paints over the list and takes the clicks meant for it.
        className={`group absolute inset-x-0 top-0 overflow-hidden border bg-white transition-colors ${
          open
            ? "z-30 rounded-[30px] border-[#1a1a1a]"
            : "z-10 rounded-[999px] border-[#d2cecb]"
        }`}
      >
        {/* Search row — keeps the closed field's height as the list opens. With
            a remove control it takes the filled pill's 18px right padding, so
            the bins line up down the column. */}
        <div
          className={`flex h-[58px] items-center gap-[10px] pl-[15px] ${
            onRemove || grip ? "pr-[18px]" : "pr-[24px]"
          }`}
        >
          <img
            src="/assets/icon-search.svg"
            alt=""
            aria-hidden
            className="block size-[16px] shrink-0"
          />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              setViaKeyboard(false);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            placeholder="Search for a product or paste a URL"
            aria-label="Search for a product or paste a URL"
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] leading-[28px] tracking-[0.16px] text-[#0c0a08] outline-none placeholder:text-[rgba(12,10,8,0.6)]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          />
          {grip}
          {onRemove && (
            <PillAction
              icon={PILL_ICON_REMOVE}
              label="Remove this product slot"
              onClick={onRemove}
              revealOnHover
            />
          )}
        </div>

        {open && (
          <ul
            id={listId}
            role="listbox"
            className="max-h-[244px] overflow-y-auto pt-[6px] pb-[10px]"
          >
            {results.length === 0 ? (
              <li
                className="px-[15px] py-[10px] text-[14px] leading-[20px] text-[#666]"
                style={{ fontFamily: PP, fontWeight: 400 }}
              >
                {available.length ? "No matching products" : "Every product is already placed"}
              </li>
            ) : (
              results.map((p, i) => (
                <li
                  key={p.id}
                  id={`${listId}-${p.id}`}
                  role="option"
                  aria-selected={i === activeIndex}
                >
                  {/* Mouse-down is swallowed so the field keeps focus and the
                      click still lands on the option. */}
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    // Pointing still aims Enter at the row, but leaves no mark.
                    onMouseEnter={() => {
                      setActive(i);
                      setViaKeyboard(false);
                    }}
                    onClick={() => choose(p)}
                    className="flex w-full cursor-pointer items-center gap-[10px] py-[8px] pr-[24px] pl-[15px] text-left"
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="size-[28px] shrink-0 rounded-full bg-[#f2f0ee] object-cover"
                    />
                    {p.brand && !isOwnBrand(p.brand) && (
                      <span
                        className="shrink-0 text-[11px] leading-[20px] tracking-[0.66px] whitespace-nowrap uppercase text-[#929292]"
                        style={{ fontFamily: MONO, fontWeight: 400 }}
                      >
                        {p.brand}
                      </span>
                    )}
                    <span
                      className={`min-w-0 flex-1 truncate text-[14px] leading-[20px] text-[#1a1a1a] ${
                        viaKeyboard && i === activeIndex ? "underline underline-offset-[3px]" : ""
                      }`}
                      style={{ fontFamily: PP, fontWeight: 500 }}
                    >
                      {p.name}
                    </span>
                    <span
                      className={`shrink-0 text-[14px] leading-[20px] transition-colors ${
                        viaKeyboard && i === activeIndex ? "text-[#1a1a1a]" : "text-[#666]"
                      }`}
                      style={{ fontFamily: PP, fontWeight: 400 }}
                    >
                      {p.price}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
