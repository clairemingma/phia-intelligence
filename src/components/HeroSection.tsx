const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* eslint-disable @next/next/no-img-element */

/**
 * The partner's brand banner. The navbar sits over the top of it, so this
 * starts at the very top of the page with no spacer above it.
 */
export default function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">

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

      {/* Brand mark, on the vertical centre of the band */}
      <img
        src="/assets/frame-logo.svg"
        alt="FRAME"
        className="absolute left-[64px] top-1/2 block h-[50px] w-[333.333px] max-w-none -translate-y-1/2"
      />

      {/* Standing, against the opposite gutter */}
      <div className="absolute right-[64px] top-1/2 flex -translate-y-1/2 items-center gap-[4px]">
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
    </section>
  );
}
