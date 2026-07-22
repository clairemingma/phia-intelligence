"use client";

import { useState } from "react";

import { LAUNCHING_SOON_SECTIONS as SECTIONS } from "@/lib/launchingSoonData";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), Georgia, serif";

export default function LaunchingSoonSectionB() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#f9f8f7] flex flex-col items-center py-[64px] w-full">
      <div className="flex gap-[64px] items-start w-[1200px]">

        {/* Left — Figma mockup, exact positioning, sticky */}
        <div className="sticky top-[96px] shrink-0 w-[568px] h-[568px] overflow-hidden bg-[#0e0e0e] relative">

          {/* Film grain noise overlay — sits above bg, below all mockup images */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
              opacity: 0.09,
              mixBlendMode: "screen",
              zIndex: 1,
            }}
          />

          {/* Phia.com — single image, exact Figma coords: centered-x, top 64px */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: activeIdx === 0 ? 1 : 0, zIndex: 2 }}
          >
            <img
              src="/assets/phia-browser-v2.png"
              alt="Phia.com"
              className="absolute"
              style={{
                width: 400,
                height: 550,
                left: "50%",
                top: 64,
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* Digital Closet — single combined image, exact Figma coords */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: activeIdx === 1 ? 1 : 0, zIndex: 2 }}
          >
            <img
              src="/assets/phone-closet.png"
              alt="Digital Closet"
              className="absolute object-cover pointer-events-none"
              style={{ left: 116, top: 46, width: 336, height: 687 }}
            />
          </div>

          {/* Creator Network — single combined image, exact Figma coords */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: activeIdx === 2 ? 1 : 0, zIndex: 2 }}
          >
            <img
              src="/assets/phone-creator.png"
              alt="Creator Network"
              className="absolute object-cover pointer-events-none"
              style={{ left: "50%", top: 46, width: 336, height: 687, transform: "translateX(-50%)" }}
            />
          </div>

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
            <p className="opacity-30">Launching Soon</p>
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
