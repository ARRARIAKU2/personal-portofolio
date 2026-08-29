"use client";
import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/stores/portofolio-a/theme-context";
import { formatCompactCurrency } from "@/lib/portofolio-a/format";

interface Point {
  month: string;
  revenue: number;
  leads: number;
}

// Isolated, memoized chart leaf — perpetual/heavy render kept out of parent tree.
export const RevenueChart = memo(function RevenueChart({
  data,
}: {
  data: Point[];
}) {
  const { theme } = useTheme();
  const grid = theme === "dark" ? "#27272a" : "#f4f4f5";
  const axis = theme === "dark" ? "#71717a" : "#a1a1aa";

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={grid} vertical={false} />
        <XAxis
          dataKey="month"
          stroke={axis}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={axis}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => formatCompactCurrency(Number(v))}
          width={64}
        />
        <Tooltip
          cursor={{ stroke: "#10b981", strokeWidth: 1 }}
          contentStyle={{
            borderRadius: 12,
            border: "none",
            fontSize: 12,
            background: theme === "dark" ? "#18181b" : "#ffffff",
            color: theme === "dark" ? "#f4f4f5" : "#18181b",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          }}
          formatter={(value) => [formatCompactCurrency(Number(value)), "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#rev)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});
