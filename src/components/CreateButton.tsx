import Link from "next/link";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

const CLASSES =
  "flex h-[44px] shrink-0 cursor-pointer items-center justify-center gap-[8px] rounded-[999px] bg-[#002d9f] px-[18px] py-[14px] transition-colors hover:bg-[#002092]";

function Body({ label }: { label: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/icon-create.svg"
        alt=""
        aria-hidden
        className="block size-[16px] shrink-0"
      />
      <span
        className="text-[12px] leading-none text-white whitespace-nowrap"
        style={{ fontFamily: PP, fontWeight: 500 }}
      >
        {label}
      </span>
    </>
  );
}

/**
 * Blue pill that sits at the right end of every partner-page section heading.
 * With `href` it navigates; without one it is an inert button, matching the
 * sections whose create flow does not exist yet.
 */
export default function CreateButton({
  label = "Create",
  href,
}: {
  label?: string;
  href?: string;
}) {
  if (href) {
    return (
      <Link href={href} className={CLASSES}>
        <Body label={label} />
      </Link>
    );
  }

  return (
    <button type="button" className={CLASSES}>
      <Body label={label} />
    </button>
  );
}
