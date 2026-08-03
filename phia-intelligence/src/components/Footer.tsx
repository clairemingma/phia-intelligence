const navColumns = [
  { heading: "Download", items: ["App Store", "Chrome Store"] },
  { heading: "Shopping", items: ["Brands", "All Brands", "Editorials"] },
  { heading: "Company", items: ["Careers", "Partner", "Press"] },
  {
    heading: "Resources",
    items: ["Privacy", "Terms", "Copyright", "Return Policy", "Contact", "FAQ"],
  },
];

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-white"
      style={{ paddingTop: 300, paddingBottom: 80, paddingLeft: 100, paddingRight: 100 }}
    >
      {/* Background phia wordmark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <div className="relative" style={{ height: 208 }}>

        {/* Left column: logo → social icons → copyright */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start">
          {/* Logo + socials group */}
          <div className="flex flex-col gap-[16px] items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/footer-logo.svg"
              alt="Phia"
              style={{ width: 45, height: 36, display: "block" }}
            />
            <div className="flex gap-[16px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-twitter.svg" alt="Twitter" style={{ width: 16, height: 16 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-instagram.svg" alt="Instagram" style={{ width: 16, height: 16 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-linkedin.svg" alt="LinkedIn" style={{ width: 16, height: 16 }} />
            </div>
          </div>

          {/* Copyright */}
          <p
            className="text-[14px] leading-[20px] text-[#6b7280]"
            style={{ fontFamily: PP, fontWeight: 400 }}
          >
            © 2026 • All Rights Reserved
          </p>
        </div>

        {/* Nav columns */}
        <div
          className="absolute top-0 flex items-start"
          style={{ left: 724.13, gap: 75 }}
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
    </footer>
  );
}
