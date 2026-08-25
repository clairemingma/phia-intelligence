import { CarouselCaret } from "@/components/SectionHeading";
import type { EditorialCardData } from "@/components/EditorialCard";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const PRODUCTS = Array.from({ length: 3 }, () => ({
  name: "Multipocket Tote Bag",
  price: "$1,000",
}));

function ProductCard({ name, price, brand }: { name: string; price: string; brand: string }) {
  return (
    <div className="flex flex-col items-start justify-center w-full min-w-0">
      <div className="flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image well */}
        <div className="aspect-[400/500] w-full shrink-0 rounded-[6px] overflow-hidden border border-[rgba(227,227,227,0.4)] bg-[#e5eaf5]" />

        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
            <p
              className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {name}
            </p>
            <p
              className="leading-[20px] text-[#666] truncate w-full"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {brand}
            </p>
          </div>
          <p
            className="text-[14px] leading-none text-[#1a1a1a] whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            {price}
          </p>
        </div>

      </div>
    </div>
  );
}

/**
 * Products inside one editorial, filtered to the current brand. Opens beneath
 * the row of the editorial that was clicked (Figma annotation: "pop-up on
 * click, shows products in editorial filtered by current brand").
 */
export default function ProductHighlightStrip({
  editorial,
  brand,
  onClose,
}: {
  editorial: EditorialCardData;
  brand: string;
  onClose: () => void;
}) {
  return (
    // Padding mirrors the section it breaks out of, so the 4-column content
    // lands on the same grid as the editorials above it.
    <section className="relative bg-[#f9f8f7] flex flex-col gap-[64px] items-center justify-center px-6 lg:px-16 xl:px-[120px] py-[64px] w-full overflow-hidden">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px] items-start w-full">

        {/* Editorial blurb + link */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-[16px] items-start w-full min-w-0">
          <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
            <p
              className="leading-none text-[#002d9f] truncate whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {editorial.eyebrow}
            </p>
            <p
              className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {editorial.title}
            </p>
            <p
              className="leading-[20px] text-[#666] w-full"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {editorial.description}
            </p>
          </div>
          <a
            href="#"
            className="text-[12px] leading-none text-[#002d9f] underline whitespace-nowrap hover:opacity-70 transition-opacity"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            View Editorial
          </a>
        </div>

        {PRODUCTS.map((product, i) => (
          <ProductCard key={i} {...product} brand={brand} />
        ))}
      </div>

      <CarouselCaret className="hidden lg:block absolute right-[74px] top-1/2 -translate-y-1/2" />

      <button
        onClick={onClose}
        className="absolute right-6 lg:right-[43px] top-[24px] lg:top-[36px] cursor-pointer text-[12px] leading-none text-[#999] underline whitespace-nowrap hover:text-[#666] transition-colors"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        Close
      </button>

    </section>
  );
}
