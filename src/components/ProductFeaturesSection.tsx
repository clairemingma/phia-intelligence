import SectionHeading from "@/components/SectionHeading";
import CreateButton from "@/components/CreateButton";
import StackedSection from "@/components/StackedSection";
import type { FeatureTile } from "@/lib/featureTiles";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/**
 * Bookmark glyph. The nested insets reproduce the design's 24px icon box with
 * its 33.5px shadow-bleed artboard, so the shadow is not clipped or scaled.
 */
function BookmarkIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="absolute inset-[9.38%]">
        <div className="absolute inset-[-25.64%_-35.9%_-46.15%_-35.9%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icon-bookmark.svg" alt="" aria-hidden className="block max-w-none size-full" />
        </div>
      </div>
    </div>
  );
}

function ProductFeatureCard({
  title,
  description,
  image,
  bookmarked,
}: FeatureTile & { bookmarked?: boolean }) {
  return (
    <div className="flex flex-col min-w-0 items-start justify-center">
      <div className="relative flex flex-col gap-[12px] items-start w-full">

        {/* 4:5 image well. The artwork is positioned against this box rather
            than sized in flow, so its own proportions cannot stretch the well. */}
        <div className="relative aspect-[400/500] w-full shrink-0 rounded-[6px] overflow-hidden border border-[rgba(227,227,227,0.4)] bg-[#e5eaf5]">
          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={image} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
          )}
        </div>

        {bookmarked && (
          <div className="absolute right-[12px] top-[12.44px] flex items-start overflow-hidden">
            <BookmarkIcon />
          </div>
        )}

        <div className="flex flex-col gap-[6px] items-start w-full overflow-hidden">
          <div className="flex flex-col gap-[4px] items-start text-[14px] w-full">
            <p
              className="leading-none text-[#1a1a1a] truncate w-full whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {title}
            </p>
            <p
              className="leading-[20px] text-[#666] truncate w-full"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              {description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * Row of four 4:5 product tiles. Shared by "Outfit Features" and
 * "Social Features" — identical but for the title and the bookmark overlay.
 */
export default function ProductFeaturesSection({
  title,
  tiles,
  bookmarked = false,
  stackIndex,
  createHref,
}: {
  title: string;
  tiles: FeatureTile[];
  bookmarked?: boolean;
  stackIndex: number;
  /** The flow this section's Create pill opens. */
  createHref: string;
}) {
  return (
    <StackedSection index={stackIndex}>
      <SectionHeading title={title} action={<CreateButton href={createHref} />} />

      <div className="grid grid-cols-4 gap-[16px] items-start w-full">
        {tiles.map((tile, i) => (
          <ProductFeatureCard key={i} {...tile} bookmarked={bookmarked} />
        ))}
      </div>
    </StackedSection>
  );
}
