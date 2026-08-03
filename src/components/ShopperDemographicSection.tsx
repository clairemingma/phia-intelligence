"use client";

import { useState, useEffect, useRef } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

const genderData = [
  { label: "Women", pct: "68%", value: 68, color: "#1a42a9" },
  { label: "Men",   pct: "32%", value: 32, color: "#6681c5" },
];

const CX = 150, CY = 150, IR = 110, OR = 130;

function polarToCart(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function annularSector(cx: number, cy: number, ir: number, or: number, startDeg: number, endDeg: number) {
  const sOut = polarToCart(cx, cy, or, startDeg);
  const eOut = polarToCart(cx, cy, or, endDeg);
  const sIn  = polarToCart(cx, cy, ir, startDeg);
  const eIn  = polarToCart(cx, cy, ir, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${sOut.x} ${sOut.y}`,
    `A ${or} ${or} 0 ${large} 1 ${eOut.x} ${eOut.y}`,
    `L ${eIn.x} ${eIn.y}`,
    `A ${ir} ${ir} 0 ${large} 0 ${sIn.x} ${sIn.y}`,
    "Z",
  ].join(" ");
}

const SEGMENTS = [
  { ...genderData[0], startDeg: 0,     endDeg: 244.8 },
  { ...genderData[1], startDeg: 244.8, endDeg: 360   },
];

const locationData = [
  { rank: 1, city: "New York",    pct: "18%", x: 502, y: 110 },
  { rank: 2, city: "Los Angeles", pct: "14%", x:  79, y: 190 },
  { rank: 3, city: "Chicago",     pct: "8%",  x: 377, y: 116 },
  { rank: 4, city: "Houston",     pct: "6%",  x: 308, y: 269 },
  { rank: 5, city: "Miami",       pct: "5%",  x: 477, y: 303 },
];

function GenderCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="flex flex-1 flex-col gap-[16px] items-start min-w-0 p-[21px] rounded-[6px]"
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="flex flex-col gap-[4px] w-full">
        <p className="text-[14px] leading-none text-[#1a1a1a] truncate" style={{ fontFamily: PP, fontWeight: 500 }}>
          Gender
        </p>
        <p className="text-[14px] leading-[20px] text-[#666] truncate" style={{ fontFamily: PP, fontWeight: 400 }}>
          By reported identity
        </p>
      </div>

      <div
        className="flex-1 flex items-center justify-center w-full relative"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => { setCursor(null); setActiveIndex(null); }}
      >
        <svg viewBox="0 0 300 300" style={{ width: "min(300px, 100%)", height: "auto" }}>
          <circle cx={CX} cy={CY} r={(IR + OR) / 2} stroke="rgba(0,0,0,0.06)" strokeWidth={OR - IR} fill="none" />
          {SEGMENTS.map((seg, i) => (
            <path
              key={seg.label}
              d={annularSector(CX, CY, IR, OR, seg.startDeg, seg.endDeg)}
              fill={seg.color}
              opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
              style={{ transition: "opacity 0.15s" }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          ))}
        </svg>

        {activeIndex !== null && cursor && (
          <div
            className="absolute pointer-events-none z-10 bg-[#1a1a1a] text-white rounded-[6px] px-[10px] py-[6px] whitespace-nowrap"
            style={{ left: cursor.x, top: cursor.y - 40, transform: "translateX(-50%)", fontFamily: PP }}
          >
            <span className="text-[12px] font-medium">{genderData[activeIndex].label}</span>
            <span className="text-[12px] opacity-60 ml-[6px]">{genderData[activeIndex].pct}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[8px] w-full mt-auto mb-[84px]">
        {genderData.map(({ label, pct, color }, i) => (
          <div
            key={label}
            className="flex gap-[8px] items-center w-full cursor-default transition-opacity"
            style={{ opacity: activeIndex === null || activeIndex === i ? 1 : 0.4 }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="shrink-0 size-[8px] rounded-full" style={{ background: color }} />
            <p className="shrink-0 text-[14px] leading-[20px] text-[#1a1a1a]" style={{ fontFamily: PP, fontWeight: 400 }}>{label}</p>
            <div className="flex-1" />
            <p className="shrink-0 text-[14px] leading-[20px] text-black" style={{ fontFamily: PP, fontWeight: 500 }}>{pct}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const MAP_W = 550, MAP_H = 321.75;

function MapTooltip({ city, pct, xPct, yPct, above }: { city: string; pct: string; xPct: number; yPct: number; above: boolean }) {
  return (
    <div
      className="absolute pointer-events-none z-10 bg-[#1a1a1a] text-white rounded-[6px] px-[10px] py-[6px] whitespace-nowrap"
      style={{ left: `${xPct}%`, top: above ? `calc(${yPct}% - 48px)` : `calc(${yPct}% + 16px)`, transform: "translateX(-50%)", fontFamily: PP }}
    >
      <span className="text-[12px] font-medium">{city}</span>
      <span className="text-[12px] opacity-60 ml-[6px]">{pct}</span>
    </div>
  );
}

function LocationsCard() {
  const [hovered, setHovered] = useState<number | null>(null);

  function handleMapMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width  * MAP_W;
    const my = (e.clientY - rect.top)  / rect.height * MAP_H;
    let nearest = 0, minDist = Infinity;
    locationData.forEach(({ x, y }, i) => {
      const d = Math.hypot(mx - x, my - y);
      if (d < minDist) { minDist = d; nearest = i; }
    });
    setHovered(nearest);
  }

  return (
    <div
      className="flex flex-1 flex-col gap-[20px] items-center min-w-0 p-[21px] rounded-[6px]"
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="flex flex-col gap-[4px] w-full">
        <p className="text-[14px] leading-none text-[#1a1a1a] truncate" style={{ fontFamily: PP, fontWeight: 500 }}>
          Top Locations
        </p>
        <p className="text-[14px] leading-[20px] text-[#666] truncate" style={{ fontFamily: PP, fontWeight: 400 }}>
          By city
        </p>
      </div>

      <div
        className="relative w-full max-w-[550px] mx-auto overflow-hidden"
        style={{ aspectRatio: `${MAP_W}/${MAP_H}` }}
        onMouseMove={handleMapMouseMove}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/usa-map-locations.svg" alt="Top locations map" className="block w-full h-full pointer-events-none" />
        </div>
        {locationData.map(({ rank, x, y }) => (
          <div key={rank} className="absolute rounded-full pointer-events-none"
            style={{ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%`, width: 32, height: 32, transform: "translate(-50%, -50%)" }} />
        ))}
        {hovered !== null && (
          <MapTooltip
            city={locationData[hovered].city}
            pct={locationData[hovered].pct}
            xPct={(locationData[hovered].x / MAP_W) * 100}
            yPct={(locationData[hovered].y / MAP_H) * 100}
            above={locationData[hovered].y > MAP_H / 2}
          />
        )}
      </div>

      <div className="flex flex-col gap-[8px] w-full mt-auto">
        {locationData.map(({ rank, city, pct }, i) => (
          <div
            key={rank}
            className="flex gap-[8px] items-center w-full cursor-default transition-opacity"
            style={{ opacity: hovered === null || hovered === i ? 1 : 0.4 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="shrink-0 w-[12px] text-[14px] leading-[20px] text-[#afafaf] text-right" style={{ fontFamily: PP, fontWeight: 400 }}>{rank}</span>
            <p className="shrink-0 text-[14px] leading-[20px] text-[#1a1a1a]" style={{ fontFamily: PP, fontWeight: 400 }}>{city}</p>
            <div className="flex-1" />
            <p className="shrink-0 text-[14px] leading-[20px] text-black" style={{ fontFamily: PP, fontWeight: 500 }}>{pct}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const BRANDS = [
  { name: "Reformation", overlap: "41% shopper overlap", logo: "/assets/brand-reformation.png", logoW: 58.846, logoH: 7.444 },
  { name: "COS",         overlap: "34% shopper overlap", logo: "/assets/brand-cos.png",         logoW: 51.923, logoH: 18.462 },
  { name: "Mango",       overlap: "28% shopper overlap", logo: "/assets/brand-mango.png",       logoW: 71.538, logoH: 9.05 },
  { name: "Mango",       overlap: "28% shopper overlap", logo: "/assets/brand-mango.png",       logoW: 71.538, logoH: 9.05 },
];

export default function ShopperDemographicSection() {
  const [visible, setVisible] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = brandsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-[48px] items-center py-[64px] px-6 lg:px-16 xl:px-[120px] w-full">

      {/* Section title */}
      <div className="flex flex-col gap-[16px] items-start w-full max-w-full max-w-[1200px]">
        <div className="w-full h-px bg-[#1a1a1a]" />
        <h2 className="text-[36px] leading-[40px] tracking-[-0.72px] text-[#1a1a1a]" style={{ fontFamily: GT, fontWeight: 300 }}>
          Shopper Demographic
        </h2>
      </div>

      {/* Cards row */}
      <div className="flex flex-col lg:flex-row gap-[16px] items-stretch w-full max-w-[1200px]">
        <GenderCard />
        <LocationsCard />
      </div>

      {/* Similar Brands */}
      <div className="flex flex-col gap-[24px] items-start py-[48px] w-full max-w-[1200px]">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] leading-none text-[#1a1a1a]" style={{ fontFamily: PP, fontWeight: 500 }}>
              Similar Brands on Phia
            </p>
            <p className="text-[14px] leading-[20px] text-[#666]" style={{ fontFamily: PP, fontWeight: 400 }}>
              Brands your shoppers also browse
            </p>
          </div>

          <div ref={brandsRef} className="grid grid-cols-2 sm:flex sm:flex-row gap-[24px] items-start w-full sm:overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {BRANDS.map(({ name, overlap, logo, logoW, logoH }, i) => (
              <div
                key={i}
                className="flex sm:flex-1 sm:shrink-0 items-center sm:min-w-max"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex gap-[16px] items-center shrink-0">
                  <div
                    className="bg-white flex items-center justify-center overflow-hidden rounded-full shrink-0 size-[75px]"
                    style={{ border: "1px solid rgba(0,0,0,0.08)", padding: "1.611px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt={name} style={{ width: logoW, height: logoH, objectFit: "cover" }} />
                  </div>
                  <div className="flex flex-col gap-[6px] items-start overflow-hidden shrink-0">
                    <p className="text-[14px] leading-[20px] text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{name}</p>
                    <p className="text-[14px] leading-none text-[#002d9f] whitespace-nowrap" style={{ fontFamily: PP, fontWeight: 500 }}>{overlap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
}
