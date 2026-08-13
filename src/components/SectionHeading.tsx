import type { ReactNode } from "react";

const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/**
 * Rule + 36px display title, shared by every partner-page section.
 * `action` fills the right end of the title row (the blue "Create" pill).
 */
export default function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
      <div className="w-full h-px bg-[#999999]" />
      <div className="flex items-start justify-between w-full">
        <h2
          className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a] whitespace-nowrap"
          style={{ fontFamily: GT, fontWeight: 300 }}
        >
          {title}
        </h2>
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
