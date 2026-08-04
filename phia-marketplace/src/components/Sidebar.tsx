"use client";

import { useState } from "react";
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
  first = false,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  first?: boolean;
  children?: React.ReactNode;
}) {
  // Dividers sit between sections, plus a rule above the first one to close the
  // list off at the top. The last section has no bottom rule.
  return (
    <div className={`border-b border-[#e3e3e3] last:border-b-0 ${first ? "border-t" : ""}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex items-center justify-between w-full h-[41px] text-left"
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

  // Every filter change — adding, removing, or clearing — returns the shopper
  // to the top of the results, since the grid below them just changed.
  function scrollToTop() {
    // Deferred a frame: focusing a control scrolls it into view during the
    // click, and that scroll would cancel a smooth one started synchronously.
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  const toggleFilter = (
    set: Set<string>,
    setter: (next: Set<string>) => void,
    item: string
  ) => {
    setter(toggleSet(set, item));
    scrollToTop();
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
              scrollToTop();
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
    scrollToTop();
  }

  return (
    <aside className="filters-scroll w-full min-w-0 self-start sticky top-[calc(var(--nav-height)_+_16px)] max-h-[calc(100vh_-_var(--nav-height)_-_32px)] overflow-y-auto overflow-x-clip">
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
            className="h-[34px] px-1 text-[12px] text-[#666] underline underline-offset-[3px] hover:text-[#1a1a1a] transition-colors"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Categories — or the category you're in, listing what's beneath it */}
      {showCategories && (
        <FilterSection
          {...sectionProps("Categories", drilledIn ? activeCategory : "Categories")}
          first
        >
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

      {/* Price – range slider. Leads the list, and takes the top rule, whenever
          the Categories section is gone. */}
      <FilterSection {...sectionProps("Price")} first={!showCategories}>
        <div className="pt-1">
          <div className="flex justify-between mb-3">
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              ${priceMin.toLocaleString()}
            </span>
            <span className="text-[14px] font-medium text-[#1a1a1a]">
              ${priceMax.toLocaleString()}
            </span>
          </div>
          <div className="relative h-[18px] mx-[9px]">
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
              onPointerUp={scrollToTop}
              onKeyUp={scrollToTop}
              className="price-range"
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
              onPointerUp={scrollToTop}
              onKeyUp={scrollToTop}
              className="price-range"
              style={{ zIndex: 3 }}
            />
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
    </aside>
  );
}
