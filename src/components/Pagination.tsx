"use client";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/** The design shows four consecutive pages before the gap. */
const WINDOW = 4;

/**
 * The page numbers to render, with `null` standing in for an elided run.
 * The first and last page are always shown, plus a sliding window around the
 * current one — so page 1 of 10 reads 01 02 03 04 … 10, as the design has it.
 */
export function pageItems(current: number, total: number): (number | null)[] {
  const start = Math.min(Math.max(current - 1, 1), Math.max(total - WINDOW + 1, 1));

  const shown = new Set([1, total]);
  for (let p = start; p < start + WINDOW && p <= total; p++) shown.add(p);

  const sorted = [...shown].sort((a, b) => a - b);

  return sorted.flatMap((p, i) =>
    // A gap of exactly one page needs no ellipsis — the number itself is shorter.
    i > 0 && p - sorted[i - 1] > 1 ? [null, p] : [p],
  );
}

/** "Previous" / "Next". Inert at the ends of the range, rather than hidden. */
function StepButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`shrink-0 text-[12px] leading-none whitespace-nowrap ${
        disabled
          ? "cursor-default text-[rgba(0,0,0,0.4)]"
          : "cursor-pointer text-[#002d9f] underline decoration-solid underline-offset-2 transition-opacity hover:opacity-60"
      }`}
      style={{ fontFamily: PP, fontWeight: 500 }}
    >
      {label}
    </button>
  );
}

/** Three 2px dots sitting on the text baseline, as the design draws them. */
function Ellipsis() {
  return (
    <span className="flex size-[40px] shrink-0 items-center justify-center" aria-hidden>
      <span className="flex h-[20px] items-end gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="mb-[5px] size-[2px] shrink-0 rounded-full bg-[#666]" />
        ))}
      </span>
    </span>
  );
}

/**
 * Centred page navigation for the partner page's paged sections. Page numbers
 * are zero-padded to two digits, matching the design.
 */
export default function Pagination({
  page,
  totalPages,
  onChange,
  label,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Names the control for assistive tech, e.g. "Editorial features pages". */
  label: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={label} className="flex w-full flex-col items-center">
      {/* The row is capped at the design's 800px and centred in the section */}
      <div className="flex w-full max-w-[800px] items-center justify-between gap-[16px] py-[12px]">
        <StepButton label="Previous" disabled={page === 1} onClick={() => onChange(page - 1)} />

        <div className="flex items-center gap-[16px]">
          {pageItems(page, totalPages).map((p, i) =>
            p === null ? (
              <Ellipsis key={`gap-${i}`} />
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onChange(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={`flex size-[40px] shrink-0 items-center justify-center rounded-[4px] text-[14px] leading-[20px] text-center ${
                  p === page
                    ? "cursor-default text-[#1a1a1a]"
                    : "cursor-pointer text-[#666] transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                }`}
                style={{ fontFamily: PP, fontWeight: p === page ? 500 : 400 }}
              >
                {String(p).padStart(2, "0")}
              </button>
            ),
          )}
        </div>

        <StepButton
          label="Next"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        />
      </div>
    </nav>
  );
}
