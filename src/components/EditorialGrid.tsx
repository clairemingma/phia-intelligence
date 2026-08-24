"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import EditorialCard, { type EditorialCardData } from "@/components/EditorialCard";
import ProductHighlightStrip from "@/components/ProductHighlightStrip";

/**
 * Grid of editorial cards. Clicking one opens the product panel directly
 * beneath that card's row, so the panel never splits a row in half.
 */
export default function EditorialGrid({
  cards,
  columnsClass,
  brand = "Rhode",
}: {
  cards: EditorialCardData[];
  columnsClass: string;
  brand?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Read the live column count so the panel lands at the true end of the row
  // at every breakpoint. ResizeObserver fires once on observe, so this also
  // covers the initial measurement.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new ResizeObserver(() => {
      const tracks = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
      setColumns(Math.max(1, tracks));
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const rowEndIndex =
    openIndex === null
      ? null
      : Math.min(cards.length - 1, (Math.floor(openIndex / columns) + 1) * columns - 1);

  return (
    <div ref={gridRef} className={columnsClass}>
      {cards.map((card, i) => (
        <Fragment key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            className={`cursor-pointer text-left w-full rounded-[6px] transition-opacity hover:opacity-80 ${
              openIndex !== null && openIndex !== i ? "opacity-60" : ""
            }`}
          >
            <EditorialCard {...card} />
          </button>

          {rowEndIndex === i && openIndex !== null && (
            // Negative margins cancel the section's padding so the panel
            // spans the viewport edge to edge, as the design has it. They have
            // to track PAGE_GUTTER step for step.
            <div className="col-span-full -mx-6 lg:-mx-16 xl:-mx-[120px]">
              <ProductHighlightStrip
                editorial={cards[openIndex]}
                brand={brand}
                onClose={() => setOpenIndex(null)}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
