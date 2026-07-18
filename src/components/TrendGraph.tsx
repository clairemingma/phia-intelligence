"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MetricKey, buildData, TOOLTIP_FORMAT } from "@/lib/trendData";

const PP          = "var(--font-pp-neue-montreal), system-ui, sans-serif";
const LINE_COLOR  = "#3B52C4";
const FILL_COLOR  = "#E5EAF5"; // Brand/Phia Secondary Blue
const AXIS_COLOR  = "#666666";
const GRID_COLOR  = "rgba(0,0,0,0.06)";

interface Props {
  metricLabel: string;
  timeFilter: string;
}

// Custom y-axis tick — right-aligned, PP Neue Montreal Medium 12px
function YTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: number } }) {
  if (x === undefined || y === undefined || !payload) return null;
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
      {payload.value}
    </text>
  );
}

// Custom x-axis tick — PP Neue Montreal Medium 12px
function XTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  if (x === undefined || y === undefined || !payload) return null;
  return (
    <text
      x={x}
      y={y}
      dy={14}
      textAnchor="middle"
      fill={AXIS_COLOR}
      fontSize={12}
      fontFamily={PP}
      fontWeight={500}
    >
      {payload.value}
    </text>
  );
}

export default function TrendGraph({ metricLabel, timeFilter }: Props) {
  const metric = metricLabel as MetricKey;
  const data   = buildData(metric, timeFilter);

  return (
    <div className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[8px] p-[20px]">
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, left: 0, bottom: 8 }}
        >
          <defs>
            <linearGradient id="phia-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={FILL_COLOR} stopOpacity={1} />
              <stop offset="100%" stopColor={FILL_COLOR} stopOpacity={1} />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines only */}
          <CartesianGrid
            vertical={false}
            stroke={GRID_COLOR}
            strokeDasharray=""
          />

          {/* Y-axis: 0–100 in steps of 20, right-aligned labels */}
          <YAxis
            width={32}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={<YTick />}
            axisLine={false}
            tickLine={false}
          />

          {/* X-axis: month labels */}
          <XAxis
            dataKey="label"
            interval={0}
            tick={<XTick />}
            axisLine={false}
            tickLine={false}
            height={32}
          />

          <Tooltip
            contentStyle={{
              fontFamily: PP,
              fontSize: 12,
              border: "1px solid #e3e3e3",
              borderRadius: 6,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              color: "#333",
              padding: "8px 12px",
            }}
            formatter={(_, __, props) => {
              const real = props.payload?.real ?? 0;
              return [TOOLTIP_FORMAT[metric](real), metricLabel];
            }}
            labelStyle={{ color: AXIS_COLOR, fontWeight: 500, marginBottom: 2 }}
            cursor={{
              stroke: LINE_COLOR,
              strokeWidth: 1,
              strokeDasharray: "4 4",
              strokeOpacity: 0.4,
            }}
          />

          <Area
            type="natural"
            dataKey="value"
            stroke={LINE_COLOR}
            strokeWidth={2}
            fill="url(#phia-fill)"
            dot={false}
            activeDot={{ r: 4, fill: LINE_COLOR, stroke: "white", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
