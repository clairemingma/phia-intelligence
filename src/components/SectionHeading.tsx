import type { ReactNode } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/**
 * Rule + 36px display title, shared by every partner-page section and by the
 * rows of the promote index. `action` fills the right end of the title row —
 * the blue "Create" pill on a section, a caret on a promote row.
 *
 * With a `description` the row centers on the taller left column; without one
 * the action sits level with the title.
 */
export default function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
      <div className="w-full h-px bg-[#999999]" />
      <div
        className={`flex gap-[16px] justify-between w-full ${description ? "items-center" : "items-start"}`}
      >
        <div className="flex flex-col gap-[8px] items-start min-w-0">
          <h2
            className="text-[28px] lg:text-[36px] leading-[32px] lg:leading-[40px] tracking-[-0.72px] text-[#1a1a1a] lg:whitespace-nowrap"
            style={{ fontFamily: GT, fontWeight: 300 }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="text-[16px] leading-[20px] text-[#6b7280]"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}

/**
 * Carousel affordance from the design. Decorative: the design specifies the
 * glyph and its position but no additional pages of content to advance to.
 */
export function CarouselCaret({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/caret-right.svg"
      alt=""
      aria-hidden
      className={`size-[32px] select-none pointer-events-none ${className}`}
    />
  );
}
