import EditorialCard from "@/components/EditorialCard";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.";

/** First slot carries the expiry copy; the rest reuse the featured blurb. */
const CARDS = [
  { eyebrow: "Exclusive", title: "Multipocket Tote Bag", description: "Expired Jul 18, 2026" },
  ...Array.from({ length: 7 }, () => ({
    eyebrow: "Featured",
    title: "Multipocket Tote Bag",
    description: LOREM,
  })),
];

export default function PreviouslyFeaturedSection() {
  return (
    <section className="bg-[#f9f8f7] flex flex-col gap-[48px] items-start px-[120px] py-[64px] w-[1440px] overflow-hidden">

      {/* This section pairs the title with body copy instead of a rule */}
      <div className="flex gap-[16px] items-start text-[#1a1a1a] w-full">
        <h2
          className="flex-1 min-w-0 text-[36px] leading-[40px] tracking-[-0.72px]"
          style={{ fontFamily: GT, fontWeight: 300 }}
        >
          Previously Featured
        </h2>
        {/* The copy column is 592px wide but the design sets the text to 568px */}
        <div className="flex flex-col flex-1 min-w-0 items-start">
          <p
            className="w-[568px] text-[14px] leading-[20px] tracking-[-0.154px]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            Want to get some of these back in the spotlight? Reach out to partners@phia.com or visit this page to curate your next placement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[48px] w-full">
        {CARDS.map((card, i) => (
          <EditorialCard key={i} {...card} />
        ))}
      </div>
    </section>
  );
}
