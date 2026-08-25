const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* eslint-disable @next/next/no-img-element */

/**
 * The partner's brand banner. The navbar sits over the top of it, so this
 * starts at the very top of the page with no spacer above it.
 */
export default function HeroSection() {
  return (
    <section className="relative h-[420px] lg:h-[600px] w-full overflow-hidden">

      {/* The design crops its 600px band out of a much taller photo. Cover
          scales it to exactly that height, and the vertical offset lands on
          the same slice the design shows. */}
      <img
        src="/assets/hero-frame.png"
        alt=""
        aria-hidden
        className="absolute inset-0 size-full select-none object-cover pointer-events-none"
        style={{ objectPosition: "center 15.6%" }}
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] pointer-events-none" aria-hidden />

      {/* One line from lg up, mark and standing pushed to opposite gutters.
          Narrower than that they stack, since the two together are wider than
          a phone. The mark is drawn with preserveAspectRatio="none", so its
          width scales with its height to keep the letterforms from squashing. */}
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[16px] lg:gap-0 px-6 lg:px-[64px]">
        <img
          src="/assets/frame-logo.svg"
          alt="FRAME"
          className="block h-[30px] w-[200px] lg:h-[40px] lg:w-[266.666px] max-w-none shrink-0"
        />

        <div className="flex shrink-0 items-center gap-[4px]">
          {["#5 in Trending Brands", "·", "145K visits"].map((part) => (
            <p
              key={part}
              className="text-[14px] leading-[14px] text-white whitespace-nowrap"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              {part}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
