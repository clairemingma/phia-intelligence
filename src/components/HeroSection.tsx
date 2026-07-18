const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col gap-[24px] items-center justify-center"
      style={{
        height: 439,
        paddingTop: 48,
        paddingLeft: 100,
        paddingRight: 100,
        background: "rgba(0,0,0,0.2)",
      }}
    >
      {/* Three-layer background — exactly as Figma */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" aria-hidden>
        {/* Layer 1: base photo (RGBA PNG) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-bg1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layer 2: full-cover overlay */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-bg2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layer 3: tall image with crop positioning */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-bg3.jpg"
            alt=""
            className="absolute left-0 w-full max-w-none"
            style={{ height: "405.67%", top: "-92.62%" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-[24px] items-center justify-center z-10">
        {/* Rhode logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/rhode-logo.svg"
          alt="Rhode Skin"
          style={{ width: 200, height: 52, display: "block" }}
        />

        {/* Metadata: ranking · visits */}
        <div className="flex gap-[4px] items-center">
          <p
            className="text-[14px] leading-[18px] tracking-[0.14px] text-white whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            #5 in Trending Brands
          </p>
          <p
            className="text-[14px] leading-[18px] tracking-[0.14px] text-white opacity-60 whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            ·
          </p>
          <p
            className="text-[14px] leading-[18px] tracking-[0.14px] text-white whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            145K Visits
          </p>
        </div>
      </div>
    </section>
  );
}
