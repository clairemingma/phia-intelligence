const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";
const MONO = "var(--font-roboto-mono), ui-monospace, monospace";

/* eslint-disable @next/next/no-img-element */

const PRODUCTS = [
  "/assets/editorial-product-1.png",
  "/assets/editorial-product-2.png",
  "/assets/editorial-product-3.png",
  "/assets/editorial-product-4.png",
];

/**
 * Icon box from the design: a fixed-size outer square with the glyph inset
 * inside it. Passing the inset separately keeps the glyph from being scaled up
 * to fill the whole box.
 */
function Icon({ src, box, inset }: { src: string; box: number; inset: string }) {
  return (
    <div className="relative shrink-0" style={{ width: box, height: box }}>
      <div className="absolute" style={{ inset }}>
        <img src={src} alt="" aria-hidden className="block size-full max-w-none" />
      </div>
    </div>
  );
}

/**
 * Pill that floats over the cover photo. The fill and hairline ring are keyed
 * to how the design renders against the dark cover — a flat dark overlay would
 * disappear there. Inset shadow rather than a border so the 26.87px box holds.
 */
const OVERLAY_PILL =
  "flex items-center rounded-full bg-[rgba(255,255,255,0.04)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-[4px]";

function OverlayButton({ children }: { children: React.ReactNode }) {
  return <div className={`${OVERLAY_PILL} gap-[7.463px] p-[5.97px]`}>{children}</div>;
}

function ProductTile({ image }: { image: string }) {
  return (
    <div className="flex w-[142.537px] flex-col items-start justify-center">
      <div className="flex w-full flex-col gap-[7.463px] rounded-[4.478px] bg-white pb-[7.463px]">

        <div className="relative h-[201.493px] w-full overflow-hidden rounded-[4.478px] p-[8.955px]">
          <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="relative flex justify-end">
            <div className="flex size-[26.866px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.32)]">
              <Icon
                src="/assets/icon-bookmark-tile.svg"
                box={14.925}
                inset="10.94% 20.31% 7.81% 20.31%"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[1.493px] items-start pl-[7.463px]">
          <div className="flex w-full items-start justify-between">
            <p
              className="text-[8.96px] leading-[13.433px] tracking-[0.5376px] uppercase text-[#929292]"
              style={{ fontFamily: MONO, fontWeight: 400 }}
            >
              mango
            </p>
            <Icon src="/assets/icon-dots-vertical.svg" box={14.925} inset="17.19% 43.75%" />
          </div>
          <p
            className="text-[11.94px] leading-[14.925px] tracking-[0.1194px] text-black"
            style={{ fontFamily: PP, fontWeight: 500, fontFeatureSettings: '"ss02" 1' }}
          >
            Product title
          </p>
          <p
            className="text-[13.43px] leading-[17.91px] tracking-[0.1343px] text-black"
            style={{ fontFamily: PP, fontWeight: 400, fontFeatureSettings: '"ss02" 1' }}
          >
            $125
          </p>
        </div>

      </div>
    </div>
  );
}

/**
 * Live phone preview of the editorial being composed. The title, description
 * and cover come from the form, so the panel updates as the brand types.
 */
export default function EditorialPhonePreview({
  title,
  description,
  cover,
}: {
  title: string;
  description: string;
  cover?: string;
}) {
  return (
    <div className="relative h-[652px] w-[300px] shrink-0">

      {/* Device frame sits behind the screen, so only its outer rim shows —
          the same layering the design uses. */}
      <img
        src="/assets/phone-bezel-17pro.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[-17.91px] top-[-17.16px] h-[686.567px] w-[335.821px] max-w-none"
      />

      {/* Screen — clipped to the display area the bezel leaves open. The
          content scrolls inside it, with the bar hidden so it reads as a phone. */}
      <div className="absolute inset-0 overflow-hidden rounded-[44px] bg-white">
        <div className="flex h-full w-[300px] flex-col overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Cover */}
          <div className="relative h-[205.97px] w-full shrink-0 overflow-hidden bg-[#f8f8f8]">
            {/* The design crops the cover to 203.91% height, nudged up 1.94% */}
            <img
              src={cover || "/assets/editorial-cover.png"}
              alt=""
              className="absolute left-0 top-[-1.94%] h-[203.91%] w-full max-w-none object-cover"
            />

            <div className="relative flex h-full flex-col">
              {/* Status bar */}
              <div className="flex items-center justify-between px-[23.881px] py-[14.925px]">
                <p
                  className="text-[9.47px] leading-[12.252px] tracking-[-0.3045px] text-white"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  9:41
                </p>
                <img
                  src="/assets/icon-statusbar-right.svg"
                  alt=""
                  aria-hidden
                  className="block h-[9.701px] w-[57.762px]"
                />
              </div>

              <div className="flex flex-1 flex-col items-center justify-start px-[23.881px]">
                <div className="flex w-[259.702px] items-center justify-between">
                  <OverlayButton>
                    <Icon src="/assets/icon-close-x.svg" box={14.925} inset="18.75%" />
                  </OverlayButton>
                  <div className="flex items-center gap-[8.955px]">
                    <div className={`${OVERLAY_PILL} gap-[7.463px] px-[7.463px] py-[5.97px]`}>
                      <Icon
                        src="/assets/icon-share.svg"
                        box={14.925}
                        inset="9.38% 6.25% 18.75% 6.25%"
                      />
                      <Icon src="/assets/icon-ellipsis.svg" box={14.925} inset="45.31% 18.75%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body — a white sheet that rides up over the foot of the cover */}
          <div className="relative z-10 -mt-[19px] flex min-h-[calc(100%-186.97px)] shrink-0 flex-col gap-[21.4px] rounded-t-[18px] bg-white px-[4.478px] pb-[14.925px] pt-[15.4px]">

            <div className="flex w-full flex-col items-center gap-[11.94px] px-[14.925px]">
              <p
                className="w-full text-center text-[32.836px] leading-[1.16] tracking-[-1.3134px] text-black"
                style={{ fontFamily: GT, fontWeight: 300 }}
              >
                {title}
              </p>
              <p
                className="w-full text-center text-[11.94px] leading-[14.925px] tracking-[0.1194px] text-[#7f7f7f]"
                style={{ fontFamily: PP, fontWeight: 400, fontFeatureSettings: '"ss02" 1' }}
              >
                {description}
              </p>

              {/* Brand chip */}
              <div className="flex items-center gap-[2.985px] rounded-[26.119px] border-[0.373px] border-[rgba(0,0,0,0.04)] bg-[#f8f8f8] py-[4.478px] pl-[4.478px] pr-[5.97px]">
                <img
                  src="/assets/editorial-brand-mango.png"
                  alt=""
                  className="block size-[15.672px] rounded-full border-[0.746px] border-[#e9e9e9] object-contain"
                />
                <span
                  className="text-[10.448px] leading-[11.94px] tracking-[0.1045px] text-[#666]"
                  style={{ fontFamily: PP, fontWeight: 500, fontFeatureSettings: '"ss02" 1' }}
                >
                  @MANGO
                </span>
                <Icon src="/assets/icon-verified.svg" box={11.94} inset="6.25%" />
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-x-[5.97px] gap-y-[8px]">
              {PRODUCTS.map((src) => (
                <ProductTile key={src} image={src} />
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
