const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

export default function HeroSection() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.2)]"
      style={{ height: 405 }}
    >
      {/* Background: single photo + dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-brand-bg.png"
            alt=""
            className="absolute max-w-none w-full"
            style={{ height: "439.75%", left: "0.01%", top: "-103.91%" }}
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-[24px] items-center justify-center z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/rhode-skin-logo.svg"
          alt="Rhode Skin"
          style={{ width: 200, height: 52, display: "block" }}
        />

        <div className="flex gap-[4px] items-center">
          <p
            className="text-[14px] leading-none text-white whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            #5 in Trending Brands
          </p>
          <p
            className="text-[14px] leading-none text-white whitespace-nowrap"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            ·
          </p>
          <p
            className="text-[14px] leading-none text-white whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontFamily: PP, fontWeight: 500 }}
          >
            145K Visits
          </p>
        </div>
      </div>
    </section>
  );
}
