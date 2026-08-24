import type { ReactNode } from "react";

/**
 * The gutter every full-width band shares. The design is drawn at 1440px, where
 * it is the specified 120px; narrower desktops give the gutter back to the
 * content rather than scrolling the page sideways.
 */
export const PAGE_GUTTER = "px-6 lg:px-16 xl:px-[120px]";

/**
 * The shared shell for the partner page's content sections — one full-width
 * band with the page gutter and the 48px gap between a section heading and its
 * body.
 *
 * `index` is the section's position down the page, and sets the stacking order
 * so the sections layer front-to-back in the order they are rendered.
 */
export default function StackedSection({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <section
      className={`relative bg-white flex flex-col gap-[48px] items-start py-[64px] w-full overflow-hidden ${PAGE_GUTTER}`}
      style={{ zIndex: index }}
    >
      {children}
    </section>
  );
}
