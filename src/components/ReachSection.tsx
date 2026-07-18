const features = ["Featured Placements", "Editorial Roundups", "Category Spotlights"];

export default function ReachSection() {
  return (
    <div className="flex flex-col items-center py-[96px] w-full">
      <div className="flex gap-[64px] h-[625px] items-start w-[1200px]">

        {/* Left — dark box with phone mockup */}
        <div className="relative bg-[#1a1a1a] border border-[rgba(0,0,0,0.08)] overflow-hidden shrink-0 size-[625px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/app-screen.jpg"
            alt="Phia app"
            className="absolute object-cover pointer-events-none"
            style={{ left: 111, top: 64, width: 400, height: 818 }}
          />
        </div>

        {/* Right — copy */}
        <div className="flex flex-1 flex-col h-full items-start min-w-0">
          <div className="flex flex-col gap-[48px] items-start w-full">

            <div className="flex flex-col gap-[36px] items-start w-full">

              {/* Headline */}
              <div
                className="flex flex-col gap-[4px] text-[44px] leading-[1.16] tracking-[-1.76px] text-black w-full"
                style={{
                  fontFamily: "var(--font-gt-super-display), 'Playfair Display', Georgia, serif",
                  fontWeight: 300,
                }}
              >
                <p className="opacity-30 w-full">Unlock Opportunities</p>
                <p className="w-full">Reach Obsessive Shoppers</p>
              </div>

              <div className="flex flex-col gap-[20px] items-start w-full">
                {/* Body */}
                <p
                  className="text-[18px] leading-[32px] tracking-[0.18px] text-[#666] w-full"
                  style={{
                    fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  More visibility starts with a competitive commission rate. Unlock featured placements, editorial roundups, category spotlights, and increased recommendation frequency.
                </p>

                {/* Feature tags with dividers */}
                <div className="flex gap-[24px] items-center">
                  {features.map((feature, i) => (
                    <div key={feature} className="flex gap-[24px] items-center">
                      <p
                        className="text-[14px] leading-[16px] tracking-[0.14px] text-black whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                          fontWeight: 500,
                          fontFeatureSettings: '"ss02" 1',
                        }}
                      >
                        {feature}
                      </p>
                      {i < features.length - 1 && (
                        <div className="bg-[rgba(0,0,0,0.24)] h-[16px] w-px shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="flex h-[44px] items-center justify-center px-[18px] bg-black rounded-full shrink-0">
              <span
                className="text-[12px] leading-[10.7px] tracking-[-0.214px] text-white whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Get in Touch
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
