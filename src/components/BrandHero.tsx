const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

/**
 * Brand identity block that opens the partner page: 120px avatar, a trend /
 * rank line, and the brand name set in 72px display.
 */
export default function BrandHero({
  name = "Acne Studios",
  logoSrc = "/assets/brand-acne-studios.png",
  trend = "Trending this week",
  rank = "#234 in Brands",
}: {
  name?: string;
  logoSrc?: string;
  trend?: string;
  rank?: string;
}) {
  return (
    <section className="flex flex-col gap-[28px] items-center w-[608px] py-[64px]">

      {/* Avatar — 4px white ring around a 112px circular logo */}
      <div className="size-[120px] shrink-0 rounded-full bg-white border-4 border-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-start overflow-hidden rounded-[inherit] p-[4px] size-full">
          <div className="relative h-[112px] w-full shrink-0 rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={name}
              className="absolute inset-0 size-full max-w-none rounded-full object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] items-center">

        {/* Trend · rank */}
        <div className="flex gap-[6px] items-center text-[12px] leading-[16px] tracking-[0.24px] whitespace-nowrap">
          <span className="text-[#1a1a1a]" style={{ fontFamily: PP, fontWeight: 500 }}>
            {trend}
          </span>
          <span className="text-[#999]" style={{ fontFamily: PP, fontWeight: 500 }}>
            ·
          </span>
          <span className="text-[#666]" style={{ fontFamily: PP, fontWeight: 500 }}>
            {rank}
          </span>
        </div>

        <h1
          className="text-[72px] leading-[79.2px] tracking-[-2.88px] text-center text-[#1a1a1a] whitespace-nowrap"
          style={{ fontFamily: GT, fontWeight: 300 }}
        >
          {name}
        </h1>
      </div>

    </section>
  );
}
