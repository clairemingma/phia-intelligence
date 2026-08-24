import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StackedSection from "@/components/StackedSection";

/* eslint-disable @next/next/no-img-element */

/** Every placement a brand can ask for, in the order the design lists them. */
const PLACEMENTS = [
  {
    title: "Editorial Feature",
    description:
      "Feature your brand in Phia editorial content, style guides, and trend reports.",
    href: "/promote/editorial-feature",
  },
  {
    title: "Outfit Feature",
    description:
      "Style your products into complete looks shoppers can shop in a single tap.",
    href: "/promote/outfit-feature",
  },
  {
    title: "Social Feature",
    description:
      "Surface your social posts and creator content alongside your products.",
    href: "/promote/social-feature",
  },
  {
    title: "Promotional Code",
    description:
      "Exclusive or site-wide discount codes surfaced directly to Phia shoppers.",
    href: "/promote/promotional-code",
  },
];

/** 20px caret at the right end of a row, as the design draws it. */
function RowCaret() {
  return (
    <span className="relative block size-[20px] shrink-0">
      <img
        src="/assets/caret-right.svg"
        alt=""
        aria-hidden
        className="block size-full max-w-none"
      />
    </span>
  );
}

export default function PromoteIndex() {
  return (
    <StackedSection index={0}>
      {PLACEMENTS.map(({ title, description, href }) => (
        // The whole row is the link, so the hit area matches the rule above it.
        <Link
          key={href}
          href={href}
          className="w-full transition-opacity hover:opacity-60"
        >
          <SectionHeading title={title} description={description} action={<RowCaret />} />
        </Link>
      ))}
    </StackedSection>
  );
}
