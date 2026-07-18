const navLinks = ["Performance", "Editorials", "Contact"];

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 drop-shadow-[0px_2px_4px_rgba(0,5,20,0.04),0px_1px_1.5px_rgba(0,5,20,0.06)]">
      <div className="bg-white border-b border-[#e3e3e3] flex items-center justify-center pl-[24px] pr-[20px] py-[12px]">
        <div className="flex flex-1 items-center min-w-0">

          {/* Logo */}
          <div className="flex flex-1 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/phia-logo.svg"
              alt="phia"
              width={55}
              height={30}
              className="shrink-0"
            />
          </div>

          {/* Nav links */}
          <div className="flex flex-1 items-center justify-center gap-[26px] min-w-0">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[12px] text-black whitespace-nowrap hover:opacity-60 transition-opacity"
                style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 500 }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-1 items-center justify-end min-w-0">
            <button
              className="border border-[#e3e3e3] flex items-center justify-center gap-2 h-[44px] px-[18px] py-[14px] rounded-full text-[12px] text-black whitespace-nowrap hover:bg-[#f9f8f7] transition-colors"
              style={{ fontFamily: "var(--font-pp-neue-montreal), system-ui, sans-serif", fontWeight: 500 }}
            >
              Hailey@Rhode.com
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
