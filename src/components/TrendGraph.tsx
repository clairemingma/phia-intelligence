"use client";

import { useState, useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { MetricKey, buildData, buildCustomLabels, TOOLTIP_FORMAT, CURRENT_VALUES } from "@/lib/trendData";

function niceAxisTicks(max: number): number[] {
  if (max <= 0) return [0, 0, 0, 0, 0, 0];
  const roughStep = max / 5;
  const exp = Math.floor(Math.log10(roughStep));
  const mag = Math.pow(10, exp);
  const norm = roughStep / mag;
  let step: number;
  if      (norm <= 1)   step = mag;
  else if (norm <= 1.5) step = 1.5 * mag;
  else if (norm <= 2)   step = 2   * mag;
  else if (norm <= 2.5) step = 2.5 * mag;
  else if (norm <= 5)   step = 5   * mag;
  else                  step = 10  * mag;
  return [0, 1, 2, 3, 4, 5].map(i => step * i);
}

function formatYTick(metric: MetricKey, value: number): string {
  if (value === 0) return "0";
  switch (metric) {
    case "Total Sales":
      if (value >= 1_000_000) return `$${Math.round(value / 1_000_000)}M`;
      if (value >= 1_000)     return `$${Math.round(value / 1_000)}K`;
      return `$${Math.round(value)}`;
    case "Average Order Value":
      return `$${Math.round(value)}`;
    case "Total Transactions":
    case "Product Views":
      if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
      if (value >= 1_000)     return `${Math.round(value / 1_000)}K`;
      return `${Math.round(value)}`;
    case "Click Through Rate":
      return `${value.toFixed(1)}%`;
  }
}

const PP          = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const LINE_COLOR  = "#002D9F";
const FILL_START  = "#002D9F";
const AXIS_COLOR  = "#999999";

const Y_AXIS_WIDTH = 40;
const CHART_RIGHT_MARGIN = 8;

/** The plot area inside the 320px chart — 8px of top margin, 16px of bottom. */
const PLOT_TOP = 8;
const PLOT_BOTTOM = 304;

/**
 * The fill under the curve. A straight two-stop fade came out far paler than
 * the design, so these stops trace the falloff sampled off it: at a twentieth
 * of the way down from the peak the design reads rgb(85,116,192) where the
 * two-stop version gave rgb(151,169,216). Offsets run top of plot to baseline.
 */
const FILL_STOPS: [number, number][] = [
  [0,    0.78],
  [0.09, 0.67],
  [0.23, 0.49],
  [0.38, 0.34],
  [0.52, 0.22],
  [0.67, 0.13],
  [0.81, 0.06],
  [0.96, 0.02],
  [1,    0.01],
];

interface Props {
  metricLabel: string;
  timeFilter: string;
  customRange?: { start: string; end: string };
}

interface YTickProps {
  x?: number;
  y?: number;
  payload?: { value: number };
  niceTicks?: number[];
  formatTick?: (v: number) => string;
}

function YTick({ x, y, payload, niceTicks = [], formatTick = String }: YTickProps) {
  if (x === undefined || y === undefined || !payload) return null;
  const idx = payload.value / 20; // normalized 0,20,40,60,80,100 → index 0..5
  const realValue = niceTicks[idx] ?? 0;
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
      fill={AXIS_COLOR}
      fontSize={12}
      fontFamily={PP}
      fontWeight={500}
    >
      {formatTick(realValue)}
    </text>
  );
}

interface DotProps {
  cx?: number;
  cy?: number;
  index?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { real: number; label: string } }>;
  formatValue?: (v: number) => string;
}

function CustomTooltip({ active, payload, formatValue }: CustomTooltipProps) {
  if (!active || !payload?.length || !formatValue) return null;
  const { real, label } = payload[0]?.payload ?? { real: 0, label: "" };
  return (
    <div
      className="pointer-events-none bg-[#1a1a1a] text-white rounded-[6px] px-[10px] py-[6px] whitespace-nowrap"
      style={{ fontFamily: PP }}
    >
      <span className="text-[12px] font-medium">{label}</span>
      <span className="text-[12px] opacity-60 ml-[6px]">{formatValue(real)}</span>
    </div>
  );
}

export default function TrendGraph({ metricLabel, timeFilter, customRange }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      setChartWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    setChartWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const metric    = metricLabel as MetricKey;
  const niceTicks = niceAxisTicks(CURRENT_VALUES[metric]);
  const customLabels = customRange ? buildCustomLabels(customRange.start, customRange.end) : undefined;
  const data      = buildData(metric, timeFilter, customLabels);
  const labels    = data.map(d => d.label);
  const lastIndex = data.length - 1;

  const renderDot = ({ cx, cy, index }: DotProps) => {
    if (cx === undefined || cy === undefined || index === undefined) return <g />;
    if (isHovering || index !== lastIndex) return <g />;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={LINE_COLOR}
      />
    );
  };

  return (
    <div className="w-full bg-white rounded-[8px] p-[24px] outline-none" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="[&_svg]:overflow-visible [&_*]:outline-none" ref={containerRef}>
        <AreaChart width={chartWidth} height={320}
          data={data}
          margin={{ top: 8, right: CHART_RIGHT_MARGIN, left: 0, bottom: 16 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <defs>
            <linearGradient id="phia-fill" x1="0" y1={PLOT_TOP} x2="0" y2={PLOT_BOTTOM} gradientUnits="userSpaceOnUse">
              {FILL_STOPS.map(([offset, opacity]) => (
                <stop key={offset} offset={offset} stopColor={FILL_START} stopOpacity={opacity} />
              ))}
            </linearGradient>
          </defs>

          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={1}
          />

          <YAxis
            width={Y_AXIS_WIDTH}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={<YTick niceTicks={niceTicks} formatTick={(v) => formatYTick(metric, v)} />}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomTooltip formatValue={TOOLTIP_FORMAT[metric]} />}
            wrapperStyle={{ outline: "none" }}
            cursor={{
              stroke: "rgba(0,0,0,0.04)",
              strokeWidth: 1,
            }}
          />

          <Area
            type="natural"
            dataKey="value"
            stroke={LINE_COLOR}
            strokeWidth={2}
            strokeLinecap="round"
            fill="url(#phia-fill)"
            // Recharts defaults an Area to 0.6, which would scale every stop
            // above; the falloff is carried by the gradient itself.
            fillOpacity={1}
            dot={renderDot}
            isAnimationActive={false}
            activeDot={{ r: 5, fill: LINE_COLOR, stroke: "none" }}
          />
        </AreaChart>
      </div>

      {/* X-axis labels: twelve fit a desktop chart, six fit a phone. */}
      {([
        { count: 6,  cls: "flex lg:hidden" },
        { count: 12, cls: "hidden lg:flex" },
      ] as const).map(({ count, cls }) => (
        <div
          key={count}
          className={cls}
          style={{ justifyContent: "space-between", marginLeft: Y_AXIS_WIDTH, marginRight: CHART_RIGHT_MARGIN, marginTop: 16, height: 16 }}
        >
          {Array.from({ length: count }, (_, idx) => {
            const labelIdx = Math.round(idx * (labels.length - 1) / (count - 1));
            return (
              <span key={idx} style={{ fontFamily: PP, fontWeight: 500, fontSize: 12, lineHeight: "16px", color: AXIS_COLOR, whiteSpace: "nowrap" }}>
                {labels[labelIdx]}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
