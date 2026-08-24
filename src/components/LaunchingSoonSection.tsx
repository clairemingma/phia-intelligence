"use client";

import { useState } from "react";

import { LAUNCHING_SOON_SECTIONS as SECTIONS } from "@/lib/launchingSoonData";

const PP  = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT  = "var(--font-gt-super-display), Georgia, serif";

export default function LaunchingSoonSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#f9f8f7] flex flex-col items-center py-[96px] w-full">
      <div className="flex gap-[64px] items-start w-[1200px]">

        {/* Left — sticky label */}
        <div
          className="sticky top-[96px] flex-1 flex flex-col gap-[4px] text-black"
          style={{
            fontFamily: GT,
            fontWeight: 300,
            fontSize: 44,
            lineHeight: 1.16,
            letterSpacing: "-1.76px",
          }}
        >
          <p className="opacity-30">{SECTIONS[activeIdx].status}</p>
          <p className="transition-all duration-300">{SECTIONS[activeIdx].label}</p>
        </div>

        {/* Right — hover accordion */}
        <div className="flex flex-col w-[568px]">
          {SECTIONS.map((section, i) => (
            <div key={section.label}>
              <div
                className="flex flex-col gap-[8px] py-[12px] cursor-pointer"
                onMouseEnter={() => setActiveIdx(i)}
              >
                <p
                  className="text-black text-[14px] leading-[16px] tracking-[0.14px]"
                  style={{ fontFamily: PP, fontWeight: 500, fontFeatureSettings: '"ss02" 1' }}
                >
                  {section.label}
                </p>
                <p
                  className="text-[#7f7f7f] text-[14px] leading-[20px] tracking-[0.14px] w-[365px]"
                  style={{ fontFamily: PP, fontWeight: 400 }}
                >
                  {section.subtitle}
                </p>
                <div
                  className="w-full overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ height: activeIdx === i ? 320 : 0 }}
                >
                  <div className="w-full h-[320px] bg-[#E5EAF5]" />
                </div>
              </div>
              {i < SECTIONS.length - 1 && (
                <div className="w-full h-px bg-black/[0.08]" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
