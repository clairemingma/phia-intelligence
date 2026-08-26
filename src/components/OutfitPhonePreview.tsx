import {
  OUTFIT_COVER,
  OUTFIT_COVER_POSITION,
  type OutfitProduct,
} from "@/lib/outfitData";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";
/** The status bar is iOS chrome, so it sets in the system face the design uses
 *  for it (SF Pro Text) rather than in the brand's own. */
const SF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

/* eslint-disable @next/next/no-img-element */

/**
 * Icon box from the design: a fixed-size square the artwork is drawn into.
 *
 * Most of these exports already carry their own padding inside a square
 * viewBox, so the box size alone places the glyph. `inset` is only for assets
 * whose artwork runs edge to edge, where it stands in for the padding the
 * design's own export bakes in — these SVGs don't preserve their aspect ratio,
 * so an inset that isn't matched to the asset skews the glyph.
 */
function Icon({ src, box, inset }: { src: string; box: number; inset?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: box, height: box }}>
      <div className="absolute" style={{ inset: inset ?? 0 }}>
        <img src={src} alt="" aria-hidden className="block size-full max-w-none" />
      </div>
    </div>
  );
}

/**
 * One tappable slot in the sub-nav pill: a 20.9px square of artwork in a 5.97px
 * surround. Both icons get the same slot, and each glyph's own padding inside
 * its square viewBox is what makes the bookmark read narrower than the share
 * box — so neither needs sizing of its own.
 */
function SubNavIcon({ src }: { src: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center p-[5.97px]">
      <img
        src={src}
        alt=""
        aria-hidden
        className="block size-[20.896px] max-w-none shrink-0"
      />
    </div>
  );
}

/**
 * Pill that floats over the cover photo. The fill and hairline ring are keyed
 * to how the design renders against the dark cover — a flat dark overlay would
 * disappear there.
 */
const OVERLAY_PILL =
  "flex items-center rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-[4px]";

/**
 * One piece of the look, as a chip in the shop-the-outfit rail. The dark wash
 * under the cut-out is what gives the chips their grey field on the white pill.
 */
function OutfitChip({ product }: { product: OutfitProduct }) {
  return (
    <div className="relative size-[23.881px] shrink-0 overflow-hidden rounded-full drop-shadow-[0_1.114px_2.228px_rgba(0,0,0,0.08)]">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.16)]" />
      <img
        src={product.image}
        alt=""
        className="absolute inset-0 size-full max-w-none object-cover"
      />
    </div>
  );
}

/**
 * Live phone preview of the outfit being composed: the cover photo full-bleed,
 * the caption over its foot, and the chosen pieces stacked in a rail beside it.
 * Everything but the chrome comes from the form, so the panel keeps up as the
 * brand types.
 */
export default function OutfitPhonePreview({
  title,
  description,
  cover,
  products,
}: {
  title: string;
  description: string;
  cover?: string;
  products: OutfitProduct[];
}) {
  return (
    <div className="relative h-[652.239px] w-[300px] shrink-0 overflow-hidden rounded-[31.343px] bg-white shadow-[0_16px_48px_0_rgba(0,0,0,0.22)]">

      {/* Cover — fills the 300x652 screen, held on the look's own focal point */}
      <img
        src={cover || OUTFIT_COVER}
        alt=""
        className="absolute inset-0 size-full max-w-none object-cover"
        style={{ objectPosition: cover ? undefined : OUTFIT_COVER_POSITION }}
      />

      {/* Scrims: one carrying the whole frame down into black at the foot, one
          deepening the last 91px behind the caption, and one darkening the top
          so the status bar stays legible over a bright cover. Written out in
          full because the stop positions are the design's, not round numbers. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 57.403%, rgba(0,0,0,0.8) 90.49%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[91.045px]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[142.537px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
        }}
      />

      <div className="relative flex h-full flex-col justify-between px-[14.925px] pt-[62.687px]">

        {/* Status bar sits over the top scrim, outside the card's padding */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[23.881px] py-[14.925px]">
          {/* Centred in a fixed 40.3px cell, as the design sets it */}
          <p
            className="h-[14.925px] w-[40.299px] text-center text-[9.47px] leading-[12.252px] tracking-[-0.3045px] text-white"
            style={{ fontFamily: SF, fontWeight: 600, fontFeatureSettings: '"case" 1' }}
          >
            9:41
          </p>
          <div className="relative h-[9.701px] w-[57.762px] shrink-0">
            <img
              src="/assets/icon-statusbar-right.svg"
              alt=""
              aria-hidden
              className="absolute inset-x-0 top-[-2.31%] block w-full max-w-none"
            />
          </div>
        </div>

        {/* Sub-nav */}
        <div className="flex w-full items-center justify-between">
          <div
            className={`${OVERLAY_PILL} size-[35.821px] justify-center bg-[rgba(255,255,255,0.04)] p-[5.97px]`}
          >
            {/* This X runs edge to edge, unlike the design's own export, so it
                takes the inset that export's padding would have given it. */}
            <Icon src="/assets/icon-close-x.svg" box={20.896} inset="18.75%" />
          </div>
          <div
            className={`${OVERLAY_PILL} h-[35.846px] w-[81.343px] justify-center gap-[4.478px] bg-[rgba(255,255,255,0.08)] px-[8.955px] py-[2.985px]`}
          >
            <SubNavIcon src="/assets/icon-bookmark-simple.svg" />
            <SubNavIcon src="/assets/icon-export.svg" />
          </div>
        </div>

        {/* Caption and rail — pulled to the screen's full width so the home
            indicator clears the card's padding. */}
        <div className="-mx-[14.925px] flex w-[300px] flex-col items-end">
          <div className="relative flex w-full items-end justify-between px-[14.925px]">

            {/* The design blurs the cover behind the caption rather than only
                darkening it, so the type never fights the photo's detail. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-[-14.925px] top-[-35.821px] backdrop-blur-[3px]"
              style={{
                maskImage: "linear-gradient(to top, black 40%, transparent)",
                WebkitMaskImage: "linear-gradient(to top, black 40%, transparent)",
              }}
            />

            <div className="relative flex flex-col items-start justify-end gap-[7.463px]">
              <div className="flex h-[16.418px] items-center gap-[1.493px]">
                <p
                  className="text-[8.955px] leading-[11.94px] tracking-[0.1791px] whitespace-nowrap text-white"
                  style={{ fontFamily: PP, fontWeight: 500, fontFeatureSettings: '"ss02" 1' }}
                >
                  @frame
                </p>
                <Icon src="/assets/icon-verified-on-dark.svg" box={8.955} inset="0" />
              </div>

              {/* The design keeps the title on one line, which suits a short
                  one. Holding the block to the caption width instead lets a
                  longer title wrap rather than truncate, and keeps it off the
                  rail — a short title still sets on one line either way. */}
              <div className="flex w-[197.015px] flex-col items-start gap-[5.97px]">
                <p
                  className="text-[26.866px] leading-[29.851px] tracking-[-0.5373px] text-white"
                  style={{ fontFamily: GT, fontWeight: 300 }}
                >
                  {title}
                </p>
                <p
                  className="text-[11.94px] leading-[14.925px] tracking-[0.1194px] text-[rgba(255,255,255,0.7)]"
                  style={{ fontFamily: PP, fontWeight: 400, fontFeatureSettings: '"ss02" 1' }}
                >
                  {description}
                </p>
              </div>
            </div>

            {/* Shop-the-outfit rail */}
            {products.length > 0 && (
              <div className="relative flex flex-col items-start gap-[4.478px] rounded-[32px] bg-[rgba(255,255,255,0.9)] p-[2.985px]">
                {products.map((p) => (
                  <OutfitChip key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>

          {/* Home indicator. The bar sits at the foot of a taller band, which
              is what holds the caption clear of the bottom edge. */}
          <div className="flex h-[38.06px] w-[300px] flex-col items-center justify-end px-[29.851px] pb-[5.97px]">
            <div className="h-[3.731px] w-full max-w-[100px] rounded-[100px] bg-[rgba(255,255,255,0.9)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
