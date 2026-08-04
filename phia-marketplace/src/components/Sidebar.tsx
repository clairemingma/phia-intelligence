"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, CheckSquare, Square, X } from "@phosphor-icons/react";
import Link from "next/link";
import {
  brands,
  categoryHref,
  categoryMenus,
  colors,
  conditions,
  materials,
  stores,
  subcategoriesOf,
} from "@/lib/data";
import { scrollToTop } from "@/lib/scroll";
import { useOverlay } from "@/lib/overlay";
import SearchField from "./SearchField";

// Same taxonomy as the masthead, in the same order — one source so the filter
// column and the top nav can't drift apart.
const categories = categoryMenus.map((c) => c.label);

const womensSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const mensSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const PRICE_FLOOR = 60;
const PRICE_CEILING = 2620;
const PRICE_STEP = 20;

// Shared expand/collapse motion: a long, decelerating ease so sections
// settle rather than snap. Everything that moves on toggle uses it.
const EASE = "duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

function CaretIcon({ open }: { open: boolean }) {
  return (
    <CaretDown
      size={12}
      weight="regular"
      className={`text-[#999] shrink-0 transition-transform ${EASE} ${open ? "rotate-180" : ""}`}
    />
  );
}

// Selection indicator for every multiselect row: Phosphor CheckSquare (fill)
// when checked, its empty Square counterpart when not. The real input stays in
// the DOM, visually hidden, so keyboard and screen readers behave normally.
function CheckboxIndicator({ checked }: { checked: boolean }) {
  return (
    <span className="shrink-0 leading-none rounded-[3px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#002d9f]/25">
      {checked ? (
        <CheckSquare size={16} weight="fill" className="text-[#1a1a1a]" />
      ) : (
        <Square size={16} weight="regular" className="text-[#767676]" />
      )}
    </span>
  );
}

function CheckboxList({
  items,
  selected,
  onToggle,
  scroll = false,
}: {
  items: string[];
  selected: Set<string>;
  onToggle: (item: string) => void;
  scroll?: boolean;
}) {
  return (
    <ul className={scroll ? "max-h-[240px] overflow-y-auto" : ""}>
      {items.map((item) => (
        <li key={item}>
          <label className="flex items-center gap-2.5 py-[5px] cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.has(item)}
              onChange={() => onToggle(item)}
              className="peer sr-only"
            />
            <CheckboxIndicator checked={selected.has(item)} />
            <span className="text-[14px] font-normal leading-[20px] text-[#666] group-hover:text-[#1a1a1a] transition-colors">
              {item}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

// Brands and Stores are long enough to search, so they also get a no-results
// state and their own scrollbar. Shorter lists render in full.
function SearchableList({
  placeholder,
  query,
  onQueryChange,
  items,
  selected,
  onToggle,
}: {
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
  items: string[];
  selected: Set<string>;
  onToggle: (item: string) => void;
}) {
  const matches = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-3">
        <SearchField
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
          className="w-full"
        />
      </div>
      {matches.length === 0 ? (
        <p className="text-[14px] font-normal leading-[20px] text-[#1a1a1a]">
          No results for &quot;{query}&quot;
        </p>
      ) : (
        <CheckboxList items={matches} selected={selected} onToggle={onToggle} scroll />
      )}
    </>
  );
}

function FilterSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  // Dividers sit between sections only — no rule above the first one, which the
  // sticky column would leave floating under the nav on scroll, and none below
  // the last one.
  return (
    <div className="border-b border-[#e3e3e3] last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center justify-between w-full h-[41px] text-left cursor-pointer"
      >
        <span className="text-[14px] font-medium text-[#1a1a1a]">{label}</span>
        <CaretIcon open={open} />
      </button>
      {children && (
        // 0fr → 1fr animates to the content's natural height without measuring it.
        // `inert` keeps a collapsed panel out of tab order while it stays mounted.
        <div
          className={`grid transition-[grid-template-rows,opacity] ${EASE} ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          inert={!open}
        >
          <div className="overflow-hidden">
            <div
              className={`pb-4 transition-transform ${EASE} ${
                open ? "translate-y-0" : "-translate-y-1"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  activeCategory,
  activeSubcategory,
}: {
  activeCategory?: string;
  activeSubcategory?: string;
}) {
  const [brandQuery, setBrandQuery] = useState("");
  const [storeQuery, setStoreQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedWomensSizes, setSelectedWomensSizes] = useState<Set<string>>(new Set());
  const [selectedMensSizes, setSelectedMensSizes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedStores, setSelectedStores] = useState<Set<string>>(new Set());
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(new Set());
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = useState(PRICE_FLOOR);
  const [priceMax, setPriceMax] = useState(PRICE_CEILING);
  // At a subcategory there is nowhere further to drill, so the Categories
  // section is dropped and Price leads the filters instead.
  const showCategories = !activeSubcategory;

  // Accordion: at most one section open at a time, the first one open on load.
  const [openSection, setOpenSection] = useState<string | null>(
    showCategories ? "Categories" : "Price"
  );

  // Below lg there is no room for a filter column, so the same panel becomes a
  // full-screen page, raised by a pill floating over the results. One instance
  // either way — the filters keep their state across the breakpoint rather than
  // forking into two copies.
  const [sheetOpen, setSheetOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  // A filter changed while the sheet covered the results. Scrolling them now
  // would be invisible, so it waits for the sheet to come down.
  const scrollPending = useRef(false);

  // At lg the panel is the column again, so the sheet state has to let go —
  // otherwise a resize leaves the page scroll locked behind a panel that is no
  // longer covering anything.
  useEffect(() => {
    const column = window.matchMedia("(min-width: 64rem)");
    const sync = () => {
      if (column.matches) setSheetOpen(false);
    };
    sync();
    column.addEventListener("change", sync);
    return () => column.removeEventListener("change", sync);
  }, []);

  // The page behind the panel holds still, Escape closes it, and focus moves to
  // the panel itself — the way every panel on the page behaves. Focus lands on
  // the panel rather than on the button that closes it: a browser draws its
  // focus ring on a control focused from script, so the X would open the page
  // wearing a ring nobody asked for, and a Tab from the panel reaches that
  // button first anyway.
  useOverlay({ open: sheetOpen, onDismiss: () => closeSheet(), focusRef: panelRef });

  // `key` is the section's stable identity; `label` is what it displays, which
  // for Categories changes to the category you've drilled into.
  const sectionProps = (key: string, label = key) => ({
    label,
    open: openSection === key,
    onToggle: () => setOpenSection(openSection === key ? null : key),
  });

  // Inside a category the section becomes that category: its heading is the
  // category name and its list is the taxonomy one level down. A category with
  // nothing beneath it stays on the top-level list rather than going empty.
  const subcategories = activeCategory ? subcategoriesOf(activeCategory) : [];
  const drilledIn = subcategories.length > 0;

  const pct = (value: number) =>
    ((value - PRICE_FLOOR) / (PRICE_CEILING - PRICE_FLOOR)) * 100;

  function toggleSet(set: Set<string>, item: string): Set<string> {
    const next = new Set(set);
    next.has(item) ? next.delete(item) : next.add(item);
    return next;
  }

  // Every filter change returns the shopper to the top of the results — unless
  // the sheet is over them, in which case it waits until the sheet is down.
  function afterFilterChange() {
    if (sheetOpen) {
      scrollPending.current = true;
      return;
    }
    scrollToTop();
  }

  function closeSheet() {
    setSheetOpen(false);
    triggerRef.current?.focus();
    if (scrollPending.current) {
      scrollPending.current = false;
      scrollToTop();
    }
  }

  const toggleFilter = (
    set: Set<string>,
    setter: (next: Set<string>) => void,
    item: string
  ) => {
    setter(toggleSet(set, item));
    afterFilterChange();
  };

  const priceIsFiltered = priceMin !== PRICE_FLOOR || priceMax !== PRICE_CEILING;

  // One row per checkbox group: drives the tags above the filters and Clear All.
  const groups = [
    { key: "brand", set: selectedBrands, setter: setSelectedBrands },
    { key: "color", set: selectedColors, setter: setSelectedColors },
    { key: "store", set: selectedStores, setter: setSelectedStores },
    { key: "material", set: selectedMaterials, setter: setSelectedMaterials },
    { key: "condition", set: selectedConditions, setter: setSelectedConditions },
    {
      key: "womens",
      set: selectedWomensSizes,
      setter: setSelectedWomensSizes,
      label: (size: string) => `Women's ${size}`,
    },
    {
      key: "mens",
      set: selectedMensSizes,
      setter: setSelectedMensSizes,
      label: (size: string) => `Men's ${size}`,
    },
  ];

  const toggleGroup = (group: (typeof groups)[number]) => (item: string) =>
    toggleFilter(group.set, group.setter, item);

  const group = (key: string) => groups.find((g) => g.key === key)!;

  const activeFilters: { id: string; label: string; onRemove: () => void }[] = [
    ...(priceIsFiltered
      ? [
          {
            id: "price",
            label: `$${priceMin.toLocaleString()} – $${priceMax.toLocaleString()}`,
            onRemove: () => {
              setPriceMin(PRICE_FLOOR);
              setPriceMax(PRICE_CEILING);
              afterFilterChange();
            },
          },
        ]
      : []),
    ...groups.flatMap((g) =>
      [...g.set].map((item) => ({
        id: `${g.key}:${item}`,
        label: g.label ? g.label(item) : item,
        onRemove: () => toggleFilter(g.set, g.setter, item),
      }))
    ),
  ];

  function clearAll() {
    groups.forEach((g) => g.setter(new Set()));
    setPriceMin(PRICE_FLOOR);
    setPriceMax(PRICE_CEILING);
    afterFilterChange();
  }

  return (
    // At lg this is the grid's first column, and with no `self-start` it
    // stretches to the row's full height — the containing block the sticky
    // column needs room to travel in. Below lg every child is out of flow, so
    // `contents` keeps the collapsed column from opening a row of its own above
    // the results.
    <div className="contents lg:block lg:w-full lg:min-w-0">
      {/* Below lg the column collapses to this: the header's CTA pill, in phia
          blue and at the same size, floating clear of the bottom edge over the
          results rather than taking a row of its own. Its count says what is on
          without opening anything. It gives way to the sheet it raises, and
          stays in the DOM while the sheet is up so closing the sheet has
          somewhere to put focus back. */}
      <button
        ref={triggerRef}
        onClick={() => setSheetOpen(true)}
        aria-expanded={sheetOpen}
        aria-controls="filter-sheet"
        className={`lg:hidden fixed left-1/2 -translate-x-1/2 bottom-[calc(64px_+_env(safe-area-inset-bottom))] z-40 flex items-center justify-center h-11 px-[18px] rounded-full bg-[#002d9f] text-[12px] font-medium text-white cursor-pointer transition-opacity duration-200 motion-reduce:transition-none ${
          sheetOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          boxShadow: "0px 1px 3px rgba(0,5,20,0.06), 0px 2px 8px -1px rgba(0,5,20,0.04)",
        }}
      >
        <span className="whitespace-nowrap">
          Filters
          {activeFilters.length > 0 && ` (${activeFilters.length})`}
        </span>
      </button>

      {/* Scrim — under the panel rather than around it now that the panel fills
          the screen, so all it does is darken the results for the moment the
          panel takes to rise over them. It goes when the column returns. */}
      {sheetOpen && (
        <div aria-hidden className="sheet-scrim lg:hidden fixed inset-0 z-[60] bg-black/40" />
      )}

      <aside
        id="filter-sheet"
        ref={panelRef}
        // tabIndex only while it is a dialog, so the panel can take focus on
        // open; as the filter column it is nothing to focus. outline-none keeps
        // that focus silent — it marks where a screen reader is, not something
        // to draw a ring around.
        {...(sheetOpen
          ? { role: "dialog", "aria-modal": true, "aria-label": "Filters", tabIndex: -1 }
          : {})}
        // Two shapes, one element: a page of its own below lg, filling the
        // screen edge to edge, and the sticky filter column at lg and up.
        // Closed, it is display:none on mobile — nothing to tab into — while
        // lg:block keeps the column up regardless of its state.
        //
        // Anchored to the top and sized in dvh rather than stretched between
        // both edges: on a phone browser a fixed element's bottom edge sits
        // under the toolbar, which would take the footer's buttons with it. The
        // page holds still while this is up, so dvh can't shift underneath it.
        className={`no-scrollbar outline-none ${
          sheetOpen ? "filter-sheet flex" : "hidden"
        } fixed inset-x-0 top-0 z-[70] flex-col h-dvh bg-white overflow-hidden
        lg:block lg:sticky lg:inset-x-auto lg:z-auto lg:top-[calc(var(--nav-height)_+_16px)] lg:h-auto lg:max-h-[calc(100vh_-_var(--nav-height)_-_32px)] lg:overflow-y-auto lg:overflow-x-clip`}
      >
        {/* Sheet header — the column needs no title, the page already gives it */}
        <div className="lg:hidden flex items-center justify-between shrink-0 h-[52px] px-5 border-b border-[#e3e3e3]">
          <span className="text-[14px] font-medium text-[#1a1a1a]">Filters</span>
          <button
            onClick={closeSheet}
            aria-label="Close filters"
            className="flex items-center justify-center size-[32px] -mr-2 text-[#666] hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* The scrolling region is the sheet's body below lg and the whole
            sticky column at lg, so the scroll moves with it. */}
        <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto px-5 pt-4 lg:flex-none lg:min-h-0 lg:overflow-visible lg:px-0 lg:pt-0">
      {/* Selected filters — wrap as they accumulate, above the filter list */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={filter.onRemove}
              aria-label={`Remove ${filter.label} filter`}
              className="filter-tag group flex items-center gap-2 h-[34px] pl-4 pr-3.5 rounded-full border border-[#e3e3e3] text-[12px] font-medium text-[#1a1a1a] cursor-pointer hover:border-[#1a1a1a] transition-colors"
            >
              <span className="whitespace-nowrap">{filter.label}</span>
              <X
                size={10}
                weight="bold"
                className="shrink-0 text-[#999] group-hover:text-[#1a1a1a] transition-colors"
              />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="h-[34px] px-1 text-[12px] text-[#666] underline underline-offset-[3px] hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Categories — or the category you're in, listing what's beneath it */}
      {showCategories && (
        <FilterSection {...sectionProps("Categories", drilledIn ? activeCategory : "Categories")}>
          <ul>
            {(drilledIn ? subcategories : categories).map((item) => (
              <li key={item}>
                <Link
                  href={drilledIn ? categoryHref(activeCategory!, item) : categoryHref(item)}
                  className="block w-full py-[5px] text-[14px] font-normal leading-[20px] text-[#666] hover:text-[#1a1a1a] transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      {/* Price – range slider. Leads the list whenever Categories is gone. */}
      <FilterSection {...sectionProps("Price")}>
        <div className="pt-1">
          <div className="flex justify-between mb-3">
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              ${priceMin.toLocaleString()}
            </span>
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              ${priceMax.toLocaleString()}
            </span>
          </div>
          <div className="relative h-[16px] mx-[8px]">
            {/* Rail */}
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-[2px] bg-[#e3e3e3] rounded-full" />
            {/* Selected range */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#1a1a1a] rounded-full"
              style={{ left: `${pct(priceMin)}%`, right: `${100 - pct(priceMax)}%` }}
            />
            <input
              type="range"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={PRICE_STEP}
              value={priceMin}
              aria-label="Minimum price"
              onChange={(e) =>
                setPriceMin(Math.min(Number(e.target.value), priceMax - PRICE_STEP))
              }
              onPointerUp={afterFilterChange}
              onKeyUp={afterFilterChange}
              className="price-range price-range-min"
              // Lift the min thumb above the max thumb when both sit at the top of
              // the range, otherwise the max thumb covers it and it can't be dragged back.
              style={{ zIndex: priceMin > PRICE_CEILING - PRICE_STEP * 2 ? 4 : 2 }}
            />
            <input
              type="range"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={PRICE_STEP}
              value={priceMax}
              aria-label="Maximum price"
              onChange={(e) =>
                setPriceMax(Math.max(Number(e.target.value), priceMin + PRICE_STEP))
              }
              onPointerUp={afterFilterChange}
              onKeyUp={afterFilterChange}
              className="price-range price-range-max"
              style={{ zIndex: 3 }}
            />
            {/* The handles you see. The inputs above paint nothing — a phone
                decorates a native range control in ways an appearance reset
                can't reach — so they only carry the drag, and these follow their
                values. Ordered after the inputs so a drag can lift its own
                handle. */}
            <span className="price-thumb price-thumb-min" style={{ left: `${pct(priceMin)}%` }} />
            <span className="price-thumb price-thumb-max" style={{ left: `${pct(priceMax)}%` }} />
          </div>
        </div>
      </FilterSection>

      {/* Brands – searchable multiselect */}
      <FilterSection {...sectionProps("Brands")}>
        <SearchableList
          placeholder="Search Brands"
          query={brandQuery}
          onQueryChange={setBrandQuery}
          items={brands}
          selected={selectedBrands}
          onToggle={toggleGroup(group("brand"))}
        />
      </FilterSection>

      {/* Color */}
      <FilterSection {...sectionProps("Color")}>
        <ul>
          {colors.map((color) => (
            <li key={color.name}>
              <label className="flex items-center gap-2.5 py-[5px] cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedColors.has(color.name)}
                  onChange={() => toggleFilter(selectedColors, setSelectedColors, color.name)}
                  className="peer sr-only"
                />
                <CheckboxIndicator checked={selectedColors.has(color.name)} />
                <span
                  className="block w-[13px] h-[13px] rounded-full border shrink-0"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: color.name === "White" ? "#e3e3e3" : color.hex,
                  }}
                />
                <span className="text-[14px] font-normal leading-[20px] text-[#666] group-hover:text-[#1a1a1a] transition-colors">
                  {color.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Women's Size */}
      <FilterSection {...sectionProps("Women's Size")}>
        <CheckboxList
          items={womensSizes}
          selected={selectedWomensSizes}
          onToggle={toggleGroup(group("womens"))}
        />
      </FilterSection>

      {/* Men's Size */}
      <FilterSection {...sectionProps("Men's Size")}>
        <CheckboxList
          items={mensSizes}
          selected={selectedMensSizes}
          onToggle={toggleGroup(group("mens"))}
        />
      </FilterSection>

      {/* Stores – the sellers phia compares across, searchable */}
      <FilterSection {...sectionProps("Stores")}>
        <SearchableList
          placeholder="Search Stores"
          query={storeQuery}
          onQueryChange={setStoreQuery}
          items={stores}
          selected={selectedStores}
          onToggle={toggleGroup(group("store"))}
        />
      </FilterSection>

      {/* Material */}
      <FilterSection {...sectionProps("Material")}>
        <CheckboxList
          items={materials}
          selected={selectedMaterials}
          onToggle={toggleGroup(group("material"))}
        />
      </FilterSection>

      {/* Condition */}
      <FilterSection {...sectionProps("Condition")}>
        <CheckboxList
          items={conditions}
          selected={selectedConditions}
          onToggle={toggleGroup(group("condition"))}
        />
      </FilterSection>
        </div>

        {/* Sheet footer — the way back to the results, and a way out of every
            filter at once when there is something to clear. Clear All takes the
            left and Apply the right: the dismissive action before the confirming
            one, which is how both platform guidelines order a pair and how the
            filter sheets shoppers already know are built. The pair holds the
            same 350px envelope one button had, so they split it evenly. */}
        <div className="lg:hidden shrink-0 px-5 py-3 border-t border-[#e3e3e3] pb-[calc(12px_+_env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-3 w-full max-w-[350px] mx-auto">
            {activeFilters.length > 0 && (
              <button
                onClick={clearAll}
                className="flex-1 h-[44px] rounded-full border border-[#e3e3e3] text-[12px] font-medium text-[#1a1a1a] cursor-pointer hover:border-[#1a1a1a] transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeSheet}
              className="flex-1 h-[44px] rounded-full bg-[#002d9f] text-[12px] font-medium text-white cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
