export default function PartnerSection() {
  return (
    <div className="bg-[#f9f8f7] flex flex-col items-center py-[96px] w-full">
      <div className="flex flex-col items-start w-[1200px]">
        <div className="flex gap-[64px] items-start w-full">

          {/* Left — portrait + name */}
          <div className="flex flex-1 gap-[64px] h-[132px] items-start min-w-0">
            {/* Circular portrait */}
            <div className="relative h-full aspect-square rounded-full shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/partner-bg.jpg"
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#e5eaf5]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/partner-fg.jpg"
                alt="Regina Sevilla"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Name block */}
            <div
              className="flex flex-1 flex-col gap-[4px] h-full items-center justify-center min-w-0 text-[44px] leading-[1.16] tracking-[-1.76px] text-black"
              style={{
                fontFamily: "var(--font-gt-super-display), 'Playfair Display', Georgia, serif",
                fontWeight: 300,
              }}
            >
              <p className="opacity-30 w-full">Your Partner at Phia</p>
              <p className="w-full">Regina Sevilla</p>
            </div>
          </div>

          {/* Right — description + CTA */}
          <div className="flex flex-col gap-[24px] items-start w-[511px] shrink-0">
            <p
              className="text-[18px] leading-[32px] tracking-[0.18px] text-[#666]"
              style={{
                fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              Regina is here for anything, partnerships, campaigns, or questions.
            </p>
            <button
              className="flex h-[44px] items-center justify-center px-[18px] bg-black rounded-full"
            >
              <span
                className="text-[12px] text-white whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Regina@Phia.com
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
