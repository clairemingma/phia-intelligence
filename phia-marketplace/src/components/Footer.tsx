const footerColumns = [
  {
    heading: "Download",
    links: ["App Store", "Chrome Store"],
  },
  {
    heading: "Shopping",
    links: ["Brands", "All Brands", "Editorials"],
  },
  {
    heading: "Company",
    links: ["Careers", "Partner", "Press"],
  },
  {
    heading: "Resources",
    links: ["Privacy", "Terms", "Copyright", "Return Policy", "Contact", "FAQ"],
  },
];

const socialLinks = [
  { href: "#", label: "Follow Phia on Twitter", icon: "/icon-twitter.svg" },
  { href: "#", label: "Follow Phia on Instagram", icon: "/icon-instagram.svg" },
  { href: "#", label: "Follow Phia on LinkedIn", icon: "/icon-linkedin.svg" },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* CTA section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center gap-6 px-[60px] py-[120px] text-center min-h-[400px]">
        <div className="flex flex-col items-center gap-7 max-w-[900px] w-full">
          <h2
            className="text-[56px] font-light leading-[1.1] tracking-[-2.24px] text-black"
            style={{ fontFamily: "var(--font-gt-super-display)" }}
          >
            Never overpay again
          </h2>
          <p className="text-[24px] font-normal text-[#666] tracking-[0.24px] opacity-70">
            Find deals wherever you shop with Phia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Add to Chrome */}
          <button className="flex items-center gap-3 h-11 px-4 rounded-full bg-[#15009c] hover:opacity-90 transition-opacity">
            <img
              src="/icon-chrome.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
            <div className="flex items-center gap-1">
              <span
                className="text-[16px] font-medium text-white tracking-[0.16px] whitespace-nowrap leading-5"
                style={{ fontFeatureSettings: '"ss02" 1' }}
              >
                Add to Chrome
              </span>
              <span className="text-[16px] font-medium text-white opacity-60 leading-5">|</span>
              <span
                className="text-[16px] font-normal text-white tracking-[0.16px] whitespace-nowrap leading-5"
                style={{ fontFeatureSettings: '"ss02" 1' }}
              >
                It&apos;s Free
              </span>
            </div>
          </button>

          {/* iOS App */}
          <button className="flex items-center gap-2 h-11 px-[18px] rounded-full border border-[#e3e3e3] text-black hover:border-[#1a1a1a] transition-colors">
            <img
              src="/icon-apple.svg"
              alt=""
              width={16}
              height={20}
              className="shrink-0"
            />
            <span className="text-[12px] font-medium whitespace-nowrap">iOS App</span>
          </button>
        </div>
      </div>

      {/* Site footer */}
      <div className="relative overflow-hidden min-h-[588px]">
        {/* "phia" watermark */}
        <div
          className="absolute bottom-[7px] pointer-events-none select-none overflow-hidden opacity-[0.56]"
          style={{ left: "-3.47%", right: "1.6%" }}
          aria-hidden
        >
          <img
            src="/footer-watermark.svg"
            alt=""
            width={1467}
            height={491}
            className="block max-w-none"
          />
        </div>

        {/* gradient mask */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div className="max-w-[1440px] mx-auto px-[100px] pt-[300px] pb-[80px] relative z-20">
          <div className="flex gap-16">
            {/* Logo + social */}
            <div className="flex flex-col justify-between min-w-[174px]">
              <a href="/" className="block">
                <img
                  src="/footer-phia-logo.svg"
                  alt="Phia"
                  width={45}
                  height={36}
                />
              </a>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {socialLinks.map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <img src={icon} alt="" width={16} height={16} />
                    </a>
                  ))}
                </div>
                <p className="text-[14px] font-normal text-[#6b7280]">
                  © 2026 • All Rights Reserved
                </p>
              </div>
            </div>

            {/* Nav columns */}
            <div className="flex flex-1 justify-end gap-[75px]">
              {footerColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-4">
                  <p className="text-[14px] font-medium text-black tracking-[0.1px]">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[14px] font-medium text-[#6b7280] hover:text-[#1a1a1a] tracking-[0.1px] transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
