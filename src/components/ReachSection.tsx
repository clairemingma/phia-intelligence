const features = ["Featured Placements", "Editorial Roundups", "Category Spotlights"];

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

export default function ReachSection() {
  return (
    <div className="flex flex-col items-center py-[96px] px-6 lg:px-[120px] w-full">
      <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[64px] items-start w-full max-w-[1200px]">

        {/* Left — copy */}
        <div className="flex flex-1 flex-col h-full items-start min-w-0">
          <div className="flex flex-col gap-[48px] items-start w-full">

            <div className="flex flex-col gap-[36px] items-start w-full">
              <div
                className="flex flex-col gap-[4px] text-[32px] lg:text-[44px] leading-[1.16] tracking-[-1.28px] lg:tracking-[-1.76px] text-black w-full"
                style={{ fontFamily: "var(--font-gt-super-display), 'Playfair Display', Georgia, serif", fontWeight: 300 }}
              >
                <p className="opacity-30 w-full">Unlock Opportunities</p>
                <p className="w-full">Reach Obsessive Shoppers</p>
              </div>

              <div className="flex flex-col gap-[20px] items-start w-full">
                <p className="text-[18px] leading-[32px] tracking-[0.18px] text-[#666] w-full" style={{ fontFamily: PP, fontWeight: 400 }}>
                  More visibility starts with a competitive commission rate. Unlock featured placements, editorial roundups, category spotlights, and increased recommendation frequency.
                </p>

                {/* Wraps on a phone; the rules would strand at line ends, so
                    they only separate items once the row fits on one line. */}
                <div className="flex flex-wrap lg:flex-nowrap gap-x-[24px] gap-y-[10px] items-center">
                  {features.map((feature, i) => (
                    <div key={feature} className="flex gap-[24px] items-center">
                      <p
                        className="text-[14px] leading-[16px] tracking-[0.14px] text-black whitespace-nowrap"
                        style={{ fontFamily: PP, fontWeight: 500, fontFeatureSettings: '"ss02" 1' }}
                      >
                        {feature}
                      </p>
                      {i < features.length - 1 && (
                        <div className="hidden lg:block bg-[rgba(0,0,0,0.24)] h-[16px] w-px shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#get-in-touch"
              className="flex h-[44px] items-center justify-center px-[18px] bg-black rounded-full shrink-0 transition-opacity hover:opacity-80"
            >
              <span className="text-[12px] leading-[10.7px] tracking-[-0.214px] text-white whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>
                Get in Touch
              </span>
            </a>
          </div>
        </div>

        {/* Right — dark box with phone mockup */}
        <div
          className="relative bg-[#1a1a1a] overflow-hidden aspect-square w-full lg:w-[625px] shrink-0"
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/phone-closet.png"
            alt="Phia app"
            className="absolute pointer-events-none"
            style={{ left: "17.76%", top: "10.24%", width: "64%", height: "130.88%" }}
          />
        </div>

      </div>
    </div>
  );
}
