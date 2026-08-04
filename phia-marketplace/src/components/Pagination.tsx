"use client";

import Link from "next/link";
import { pageCount, pageHref } from "@/lib/data";
import { scrollToTop } from "@/lib/scroll";

// How many consecutive pages the numeric run shows around the current one.
const RUN = 4;

// Page numbers read as a two-digit set — 01 rather than 1 — so the run keeps an
// even rhythm until the count passes 99.
function label(page: number) {
  return String(page).padStart(2, "0");
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

// A run of four consecutive pages including the current one, with the first and
// last page always reachable and ••• standing in for whatever is skipped. On
// page 1 of 54 that reads 01 02 03 04 ••• 54. A gap is only worth drawing when
// it hides more than one page — at the edges the skipped page is shown instead.
function pageItems(page: number): (number | "gap")[] {
  if (pageCount <= RUN + 2) return range(1, pageCount);

  const start = Math.min(Math.max(page - 1, 1), pageCount - RUN + 1);
  const end = start + RUN - 1;

  return [
    ...(start > 2 ? [1, "gap" as const] : start > 1 ? [1] : []),
    ...range(start, end),
    ...(end < pageCount - 1 ? ["gap" as const, pageCount] : end < pageCount ? [pageCount] : []),
  ];
}

// Every page cell is a 40px square holding one 20px line of type, so the run
// keeps its rhythm however the current page moves.
const cell = "flex items-center justify-center size-[40px]";

const number = "text-[14px] leading-[20px] text-center";

const step = "text-[12px] font-medium leading-[normal]";

// PP Neue Montreal draws every dot as a square — bullet, period and middot are
// all straight-edged paths — so the ellipsis is drawn rather than set as text.
// Three 2px circles land lighter than the font's 2.7px bullets.
function Ellipsis() {
  return (
    <span aria-hidden className={`${cell} text-[#666]`}>
      {/* Set on the numbers' own baseline, which sits 5px up from the bottom of
          their 20px line box, so the dots read as a typed "..." beside them. */}
      <span className="flex items-end gap-[3px] h-[20px]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-[2px] mb-[5px] rounded-full bg-current" />
        ))}
      </span>
    </span>
  );
}

export default function Pagination({
  page,
  activeCategory,
  activeSubcategory,
}: {
  page: number;
  activeCategory?: string;
  activeSubcategory?: string;
}) {
  // One page of results is the whole set — nothing to page through.
  if (pageCount <= 1) return null;

  const href = (target: number) => pageHref(target, activeCategory, activeSubcategory);

  // Paging lands you at the top of the new results. Next only scrolls when the
  // page leaves the viewport, and this tall a grid never does, so the scroll is
  // ours to make — the same move a filter change makes.
  const stepLinkProps = { onClick: scrollToTop, scroll: false as const };

  return (
    <nav aria-label="Pagination" className="mt-16">
      {/* The bar holds the design's 800px width and centres under the page. */}
      <div className="flex items-center justify-between gap-4 max-w-[800px] mx-auto py-3">
        {page > 1 ? (
          <Link
            {...stepLinkProps}
            href={href(page - 1)}
            rel="prev"
            className={`${step} shrink-0 text-[#002d9f] underline underline-offset-[4px] rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002d9f]/25`}
          >
            Previous
          </Link>
        ) : (
          // Nothing before page 1, so the control is stated rather than offered.
          <span className={`${step} shrink-0 text-black/40`}>Previous</span>
        )}

        <div className="flex items-center gap-4">
          {pageItems(page).map((item, i) => {
            if (item === "gap") return <Ellipsis key={`gap-${i}`} />;

            if (item === page) {
              // Weight and charcoal mark the current page, the way the sort menu
              // and the filter rows mark their own selection.
              return (
                <span
                  key={item}
                  aria-current="page"
                  className={`${cell} ${number} font-medium text-[#1a1a1a]`}
                >
                  {/* The padded number reads as "zero four" aloud, so the page
                      is announced in words alongside it. */}
                  <span className="sr-only">Page {item}</span>
                  <span aria-hidden>{label(item)}</span>
                </span>
              );
            }

            return (
              <Link
                {...stepLinkProps}
                key={item}
                href={href(item)}
                aria-label={`Page ${item}`}
                className={`${cell} ${number} font-normal text-[#666] hover:text-[#1a1a1a] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002d9f]/25`}
              >
                {label(item)}
              </Link>
            );
          })}
        </div>

        {page < pageCount ? (
          <Link
            {...stepLinkProps}
            href={href(page + 1)}
            rel="next"
            className={`${step} shrink-0 text-[#002d9f] underline underline-offset-[4px] rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002d9f]/25`}
          >
            Next
          </Link>
        ) : (
          <span className={`${step} shrink-0 text-black/40`}>Next</span>
        )}
      </div>
    </nav>
  );
}
