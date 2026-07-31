// path: src/components/charts/RadarChart.jsx
import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function RadarChartWidget({ data, className }) {
  // Default sample data if none provided
  const chartData = data || [
    { label: "Temp", data: 32 },
    { label: "DO", data: 28 },
    { label: "pH", data: 35 },
    { label: "Salinity", data: 25 },
    { label: "Turbidity", data: 30 },
    { label: "AI Score", data: 38 },
  ];

  return (
    <div
      className={`bg-surface rounded-lg border border-border/50 p-3 ${className || ""}`}>
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-semibold text-text-primary">
          Sensor AI Contribution
        </h4>
        <span className="text-[9px] text-text-muted">Real-time</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <PolarGrid stroke="#e2e8f0" opacity={0.5} />
          <PolarAngleAxis
            dataKey="label"
            stroke="#94a3b8"
            fontSize={9}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 40]}
            stroke="#94a3b8"
            fontSize={8}
            tickLine={false}
            axisLine={false}
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
          <Radar
            name="AI Score"
            dataKey="data"
            stroke="#0ea5e9"
            fill="rgba(14,165,233,0.12)"
            strokeWidth={2}
            dot={{ fill: "#0ea5e9", r: 3 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
