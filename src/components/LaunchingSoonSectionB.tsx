"use client";

import { useState } from "react";

import { LAUNCHING_SOON_SECTIONS as SECTIONS } from "@/lib/launchingSoonData";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), Georgia, serif";

export default function LaunchingSoonSectionB() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#f9f8f7] flex flex-col items-center py-[64px] px-6 lg:px-16 xl:px-[120px] w-full">
      <div className="flex flex-col-reverse lg:flex-row gap-[64px] items-start w-full max-w-[1200px]">

        {/* Left — Figma mockup, exact positioning, sticky. The backdrop is the
            same gradient the browser tiles are drawn on, so the device shots
            cut out over it sit on one continuous surface. */}
        <div
          className="sticky top-[96px] shrink-0 aspect-square w-full max-w-[625px] mx-auto lg:mx-0 lg:w-[568px] overflow-hidden relative"
          style={{ background: "linear-gradient(to bottom, #565656 0%, #3c3c3c 100%)" }}
        >

          {/* One layer per surface, cross-fading on the active index. Each
              carries its own placement — see the section data. */}
          {SECTIONS.map((section, i) => (
            <div
              key={section.label}
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: activeIdx === i ? 1 : 0, zIndex: 2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.image}
                alt={section.label}
                className="absolute pointer-events-none"
                style={section.imageStyle}
              />
            </div>
          ))}

        </div>

        {/* Right — title + click accordion */}
        <div className="flex flex-1 flex-col gap-[64px] min-w-0">

          {/* Launching Soon / active label */}
          <div
            className="flex flex-col gap-[4px] text-black w-full"
            style={{
              fontFamily: GT,
              fontWeight: 300,
              fontSize: 44,
              lineHeight: 1.16,
              letterSpacing: "-1.76px",
            }}
          >
            <p className="opacity-30">{SECTIONS[activeIdx].status}</p>
            <p>{SECTIONS[activeIdx].label}</p>
          </div>

          {/* Section accordion */}
          <div className="flex flex-col w-full">
            {SECTIONS.map((section, i) => {
              const isActive = activeIdx === i;
              return (
                <div key={section.label}>
                  <button
                    className="w-full text-left flex flex-col gap-[8px] py-[16px] cursor-pointer"
                    onClick={() => setActiveIdx(i)}
                  >
                    {/* Label */}
                    <p
                      className="text-[18px] leading-[22px] transition-colors duration-300"
                      style={{
                        fontFamily: PP,
                        fontWeight: 500,
                        fontFeatureSettings: '"ss02" 1',
                        color: isActive ? "#000" : "#7f7f7f",
                      }}
                    >
                      {section.label}
                    </p>

                    {/* Subtitle — grid-rows collapse, no bounce */}
                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="text-[15px] leading-[22px] pb-[2px]"
                          style={{ fontFamily: PP, fontWeight: 400, color: "#7f7f7f" }}
                        >
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>

                  {i < SECTIONS.length - 1 && (
                    <div className="w-full h-px bg-black/[0.08]" />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
