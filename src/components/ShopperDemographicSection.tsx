"use client";

import { useState, useEffect, useRef } from "react";

const PP = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const GT = "var(--font-gt-super-display), 'Playfair Display', Georgia, serif";

type Slice = { label: string; pct: string; value: number; color: string };

/* Two-slot categorical order, shared by every donut in this section so the
   same visual weight always means "the larger share". */
const SLICE_COLORS = ["#1a42a9", "#6681c5"] as const;

const genderData: Slice[] = [
  { label: "Women", pct: "68%", value: 68, color: SLICE_COLORS[0] },
  { label: "Men",   pct: "32%", value: 32, color: SLICE_COLORS[1] },
];

const channelData: Slice[] = [
  { label: "Retail partners", pct: "59%", value: 59, color: SLICE_COLORS[0] },
  { label: "Brand direct",    pct: "41%", value: 41, color: SLICE_COLORS[1] },
];

const CX = 150, CY = 150, IR = 110, OR = 130;

/** Height of the artwork band. Every card reserves the same, so the first
    legend/list row lines up across the row. */
const ART_BAND = "flex-1 min-h-0 lg:flex-none lg:h-[280px]";

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

/** Lays slices clockwise from twelve o'clock, sized by share of the total. */
function toSegments(data: Slice[]) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cursor = 0;
  return data.map((d) => {
    const startDeg = cursor;
    cursor += (d.value / total) * 360;
    return { ...d, startDeg, endDeg: cursor };
  });
}

const locationData = [
  { rank: 1, city: "New York",    pct: "18%", x: 502, y: 110 },
  { rank: 2, city: "Los Angeles", pct: "14%", x:  79, y: 190 },
  { rank: 3, city: "Chicago",     pct: "8%",  x: 377, y: 116 },
  { rank: 4, city: "Houston",     pct: "6%",  x: 308, y: 269 },
  { rank: 5, city: "Miami",       pct: "5%",  x: 477, y: 303 },
];

function DonutCard({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: Slice[];
}) {
  const segments = toSegments(data);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="flex w-full lg:w-[540px] shrink-0 aspect-square flex-col gap-[16px] items-start p-[21px] rounded-[6px]"
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="flex flex-col gap-[4px] w-full">
        <p className="text-[14px] leading-none text-[#1a1a1a] truncate" style={{ fontFamily: PP, fontWeight: 500 }}>
          {title}
        </p>
        <p className="text-[14px] leading-[20px] text-[#666] truncate" style={{ fontFamily: PP, fontWeight: 400 }}>
          {subtitle}
        </p>
      </div>

      <div
        className={`flex items-center justify-center w-full relative ${ART_BAND}`}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => { setCursor(null); setActiveIndex(null); }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <circle cx={CX} cy={CY} r={(IR + OR) / 2} stroke="rgba(0,0,0,0.06)" strokeWidth={OR - IR} fill="none" />
          {segments.map((seg, i) => (
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
            <span className="text-[12px] font-medium">{data[activeIndex].label}</span>
            <span className="text-[12px] opacity-60 ml-[6px]">{data[activeIndex].pct}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[8px] w-full">
        {data.map(({ label, pct, color }, i) => (
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
      style={{ left: `clamp(0px, calc(${xPct}% - 75px), calc(100% - 150px))`, top: above ? `calc(${yPct}% - 48px)` : `calc(${yPct}% + 16px)`, fontFamily: PP }}
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
      className="flex w-full lg:w-[540px] shrink-0 aspect-square flex-col gap-[16px] items-center p-[21px] rounded-[6px]"
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

      {/* The wrapper owns the leftover height; the map fits inside it by
          height, so the card can stay square however tall the list gets. */}
      <div className={`w-full flex items-center justify-center ${ART_BAND}`}>
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: `${MAP_W}/${MAP_H}`, height: "100%", maxWidth: "100%" }}
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
      </div>

      <div className="flex flex-col gap-[8px] w-full shrink-0">
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

/**
 * FRAME's nearest neighbours: premium denim-led labels at the same price and,
 * for the last two, the elevated contemporary a FRAME shopper buys alongside.
 * `mark` is a monogram standing in for a logo we do not have artwork for.
 */
const BRANDS = [
  { name: "AGOLDE",     mark: "AG", overlap: "44% shopper overlap" },
  { name: "MOTHER",     mark: "MO", overlap: "37% shopper overlap" },
  { name: "rag & bone", mark: "RB", overlap: "31% shopper overlap" },
  { name: "NILI LOTAN", mark: "NL", overlap: "24% shopper overlap" },
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
    <div className="flex flex-col gap-[48px] items-center py-[64px] px-6 lg:px-[120px] w-full">

      {/* Section title */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        <div className="w-full h-px bg-[#999999]" />
        <h2 className="text-[28px] lg:text-[36px] leading-[32px] lg:leading-[40px] tracking-[-0.56px] lg:tracking-[-0.72px] text-[#1a1a1a]" style={{ fontFamily: GT, fontWeight: 300 }}>
          Shopper Demographic
        </h2>
      </div>

      {/* Cards row */}
      {/* items-start, not stretch: stretching sets each card's height and would
          override the square aspect. */}
      <div className="grid grid-cols-1 gap-[16px] w-full lg:flex lg:flex-row lg:items-start lg:overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DonutCard title="Gender" subtitle="By reported identity" data={genderData} />
        <LocationsCard />
        <DonutCard title="Retail vs Brand" subtitle="Where shoppers buy you" data={channelData} />
      </div>

      {/* Similar Brands */}
      <div className="flex flex-col gap-[24px] items-start py-[48px] w-full">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[14px] leading-none text-[#1a1a1a]" style={{ fontFamily: PP, fontWeight: 500 }}>
              Similar Brands on Phia
            </p>
            <p className="text-[14px] leading-[20px] text-[#666]" style={{ fontFamily: PP, fontWeight: 400 }}>
              Brands your shoppers also browse
            </p>
          </div>

          <div ref={brandsRef} className="flex flex-col lg:flex-row gap-[24px] items-start w-full lg:overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {BRANDS.map(({ name, mark, overlap }, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center w-full lg:w-auto lg:flex-1 lg:min-w-max"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex gap-[16px] items-center shrink-0">
                  {/* The name sits right beside it, so the monogram is decoration. */}
                  <div
                    aria-hidden
                    className="bg-white flex items-center justify-center rounded-full shrink-0 size-[75px]"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <span
                      className="text-[18px] leading-none tracking-[1px] text-[#1a1a1a]"
                      style={{ fontFamily: PP, fontWeight: 500 }}
                    >
                      {mark}
                    </span>
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
