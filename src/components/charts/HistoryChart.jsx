// path: src/components/charts/HistoryChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

export function HistoryChart({
  data,
  className,
  color = "#0ea5e9",
  label = "Value",
}) {
  // Default sample data
  const chartData = data || [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 32 },
    { name: "Apr", value: 40 },
    { name: "May", value: 38 },
    { name: "Jun", value: 45 },
    { name: "Jul", value: 42 },
  ];

  return (
    <div
      className={`bg-surface rounded-lg border border-border/50 p-3 ${className || ""}`}>
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-text-primary">
          Historical Trend
        </h4>
        <span className="text-[9px] text-text-muted">Last 7 months</span>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            fontSize={9}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={9}
            tickLine={false}
            axisLine={false}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              color: "#e2e8f0",
              fontSize: "10px",
              padding: "4px 8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`${color}15`}
            strokeWidth={2}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 2, fill: color, strokeWidth: 0 }}
            name={label}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
