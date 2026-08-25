type NavColumn = {
  heading: string;
  items: string[];
  /** The mobile design lists a shortened column; falls back to `items`. */
  mobileItems?: string[];
};

const navColumns: NavColumn[] = [
  { heading: "Download", items: ["App Store", "Chrome Store"] },
  { heading: "Shopping", items: ["Brands", "All Brands", "Editorials"] },
  { heading: "Company", items: ["Careers", "Partner", "Press"] },
  {
    heading: "Resources",
    items: ["Privacy", "Terms", "Copyright", "Return Policy", "Contact", "FAQ"],
    mobileItems: ["Privacy", "Terms", "FAQ"],
  },
];

const SOCIALS = [
  { src: "/assets/icon-twitter.svg", label: "Twitter" },
  { src: "/assets/icon-instagram.svg", label: "Instagram" },
  { src: "/assets/icon-linkedin.svg", label: "LinkedIn" },
];

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

/* eslint-disable @next/next/no-img-element */

/** The three marks, at whichever size the arrangement calls for. */
function Socials({ size, gap }: { size: number; gap: number }) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {SOCIALS.map(({ src, label }) => (
        <img key={label} src={src} alt={label} style={{ width: size, height: size, display: "block" }} />
      ))}
    </div>
  );
}

/**
 * The phia mark. Its artboard is 45x36 with the letterforms already inset, so
 * the box and the mark inside it both land where the design puts them.
 */
function PhiaMark() {
  return (
    <img src="/assets/footer-logo.svg" alt="Phia" style={{ width: 45, height: 36, display: "block" }} />
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-white">

      {/* On a phone: the four link columns two up, a rule, then the mark,
          socials and copyright stacked down the middle. The oversized
          background wordmark belongs to the desktop arrangement only — it is
          1467px wide, far past any phone, and the design does not show it. */}
      <div className="lg:hidden flex flex-col gap-[48px] items-start px-6 pt-[60px] pb-[48px] w-full">

        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] w-full">
          {navColumns.map(({ heading, items, mobileItems }) => (
            <div key={heading} className="flex flex-col gap-[16px] items-start">
              <p
                className="text-[14px] leading-[16px] tracking-[-0.154px] text-black"
                style={{ fontFamily: PP, fontWeight: 500 }}
              >
                {heading}
              </p>
              <div className="flex flex-col gap-[12px] items-start">
                {(mobileItems ?? items).map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[14px] leading-[16px] tracking-[-0.154px] text-[#6b7280] hover:text-black transition-colors"
                    style={{ fontFamily: PP, fontWeight: 500 }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px w-full shrink-0 bg-[#e3e3e3]" />

        <div className="flex flex-col gap-[24px] items-center w-full">
          <PhiaMark />
          <Socials size={18} gap={20} />
          <p
            className="text-[13px] leading-[16px] tracking-[-0.154px] text-[#6b7280] text-center"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            © 2026 • All Rights Reserved
          </p>
        </div>
      </div>

      {/* From lg: the drawn arrangement, mark and columns on one band over the
          background wordmark. */}
      <div className="hidden lg:block relative pt-[300px] pb-[80px] px-[100px]">

        {/* Background phia wordmark */}
        <img
          src="/assets/footer-wordmark.svg"
          alt=""
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            bottom: 7.13,
            left: "-3.47%",
            width: 1467,
            height: 491,
            opacity: 0.56,
          }}
        />

        {/* Gradient + blur overlay — fades the wordmark to white at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 300,
            background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            WebkitMaskImage: "url('/assets/footer-gradient-mask.svg')",
            maskImage: "url('/assets/footer-gradient-mask.svg')",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
        />

        {/* Content row */}
        <div className="relative h-[208px]">

          {/* Left column: logo → social icons → copyright */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start">
            <div className="flex flex-col gap-[16px] items-start">
              <PhiaMark />
              <Socials size={16} gap={16} />
            </div>

            <p
              className="text-[14px] leading-[20px] text-[#6b7280]"
              style={{ fontFamily: PP, fontWeight: 400 }}
            >
              © 2026 • All Rights Reserved
            </p>
          </div>

          {/* Nav columns */}
          <div
            className="absolute top-0 flex items-start gap-x-[75px]"
            style={{ left: 724.13 }}
          >
            {navColumns.map(({ heading, items }) => (
              <div key={heading} className="flex flex-col gap-[12px] items-start">
                <p
                  className="text-[14px] leading-none tracking-[0.1px] text-black"
                  style={{ fontFamily: PP, fontWeight: 500 }}
                >
                  {heading}
                </p>
                <div className="flex flex-col gap-[8px] items-start">
                  {items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-[14px] leading-[20px] tracking-[0.1px] text-[#6b7280] hover:text-black transition-colors"
                      style={{ fontFamily: PP, fontWeight: 500 }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
