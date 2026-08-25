const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

export default function PartnerSection() {
  return (
    <div className="bg-[#f9f8f7] flex flex-col items-start justify-center px-6 lg:px-[120px] py-[64px] w-full">
      <div className="flex flex-col lg:flex-row items-start w-full gap-[32px] lg:gap-0">

        {/* Left — avatar + name */}
        <div className="flex flex-[1_0_0] gap-[24px] items-start min-w-0 w-full">
          {/* Circular avatar over a flat tint, which shows only while the
              photograph is still loading. */}
          <div className="relative rounded-full shrink-0 size-[100px] overflow-hidden">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#e5eaf5] inset-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Regina Sevilla"
                className="absolute inset-0 max-w-none object-cover size-full"
                src="/assets/partner-avatar.jpg"
              />
            </div>
          </div>

          {/* Name block */}
          <div
            className="flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center self-stretch min-w-0 text-[36px] leading-[40px] tracking-[-0.72px] text-black"
            style={{ fontFamily: GT, fontWeight: 300 }}
          >
            <p className="opacity-30 w-full">Your Partner at Phia</p>
            <p className="w-full">Regina Sevilla</p>
          </div>
        </div>

        {/* Right — description + email CTA */}
        <div className="flex flex-[1_0_0] flex-col gap-[24px] items-start self-stretch min-w-0 w-full">
          <p
            className="flex-[1_0_0] leading-[32px] tracking-[0.18px] text-[18px] text-[#666] min-w-0"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            Regina is here for anything, partnerships, campaigns, or questions.
          </p>
          {/* Presentational: it carries the same hover and cursor as the other
              black pills, but deliberately goes nowhere. */}
          <div className="bg-black flex h-[44px] items-center justify-center px-[18px] rounded-full shrink-0 cursor-pointer transition-opacity hover:opacity-80">
            <span
              className="text-[12px] text-white whitespace-nowrap leading-none"
              style={{ fontFamily: PP, fontWeight: 500 }}
            >
              Regina@Phia.com
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
