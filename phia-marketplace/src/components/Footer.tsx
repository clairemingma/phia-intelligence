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
      <div className="relative overflow-hidden flex flex-col items-center justify-center gap-8 px-5 py-20 text-center md:gap-6 md:px-[60px] md:py-[120px] md:min-h-[400px]">
        <div className="flex flex-col items-center gap-4 md:gap-7 max-w-[900px] w-full">
          <h2
            className="text-[28px] font-light leading-none tracking-[-0.56px] text-black md:text-[56px] md:leading-[1.1] md:tracking-[-2.24px]"
            style={{ fontFamily: "var(--font-gt-super-display)" }}
          >
            Never overpay again
          </h2>
          <p className="text-[16px] font-normal leading-[22px] text-[#666] tracking-[0.16px] opacity-70 md:text-[24px]">
            Find deals wherever you shop with Phia.
          </p>
        </div>

        {/* One CTA on a phone, where a pair of pills would each be too narrow to
            read: the app, on the full width of the column. */}
        <button className="md:hidden flex items-center justify-center gap-3 w-full max-w-[350px] px-6 py-3.5 rounded-[40px] bg-[#15009c] cursor-pointer">
          <img
            src="/icon-apple-white.svg"
            alt=""
            width={16}
            height={20}
            className="shrink-0 w-[16px] h-[19.651px]"
          />
          <span
            className="flex items-center gap-1 text-[16px] leading-5 text-white tracking-[0.16px] whitespace-nowrap"
            style={{ fontFeatureSettings: '"ss02" 1' }}
          >
            <span className="font-medium">iOS App</span>
            <span aria-hidden className="font-medium opacity-20">
              |
            </span>
            <span className="font-normal">It&apos;s Free</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-2">
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
      <div className="relative overflow-hidden md:min-h-[588px]">
        {/* "phia" watermark — it needs the width of a desktop page to read as a
            wordmark rather than a stray letter, so a phone goes without it. */}
        <div
          className="hidden md:block absolute bottom-[7px] pointer-events-none select-none overflow-hidden opacity-[0.56]"
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
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

        <div className="max-w-[1440px] mx-auto px-6 pt-[60px] pb-12 md:px-[100px] md:pt-[300px] md:pb-[80px] relative z-20">
          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            {/* Logo + social. The page's sign-off on a phone, centred under the
                links and their rule; the left column at md. */}
            <div className="order-3 flex flex-col items-center gap-6 md:order-1 md:items-start md:justify-between md:gap-0 md:min-w-[174px]">
              <a href="/" className="block">
                <img
                  src="/footer-phia-logo.svg"
                  alt="Phia"
                  width={45}
                  height={36}
                />
              </a>
              <div className="flex flex-col items-center gap-6 md:items-start md:gap-4">
                <div className="flex items-center gap-5 md:gap-4">
                  {socialLinks.map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <img
                        src={icon}
                        alt=""
                        width={18}
                        height={18}
                        className="w-[18px] h-[18px] md:w-4 md:h-4"
                      />
                    </a>
                  ))}
                </div>
                <p className="text-[13px] font-normal text-[#6b7280] md:text-[14px]">
                  © 2026 • All Rights Reserved
                </p>
              </div>
            </div>

            {/* Rule between the links and the sign-off, which only stack on a
                phone. */}
            <div aria-hidden className="order-2 border-t border-[#e3e3e3] md:hidden" />

            {/* Nav columns — two up on a phone, four across the page at md */}
            <div className="order-1 grid grid-cols-2 gap-x-6 gap-y-8 md:order-2 md:flex md:flex-1 md:justify-end md:gap-[75px]">
              {footerColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-4">
                  <p className="text-[14px] font-medium leading-4 text-black tracking-[0.1px] md:leading-normal">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-3 md:gap-4">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[14px] font-medium leading-4 text-[#6b7280] hover:text-[#1a1a1a] tracking-[0.1px] transition-colors md:leading-normal"
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
