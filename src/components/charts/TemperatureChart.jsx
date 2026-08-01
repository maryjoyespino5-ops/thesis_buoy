// path: src/components/charts/TemperatureChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function TemperatureChart({ className }) {
  const data = [
    { name: "Mon", temp: 27.2, salinity: 34.0 },
    { name: "Tue", temp: 28.1, salinity: 34.2 },
    { name: "Wed", temp: 28.6, salinity: 34.4 },
    { name: "Thu", temp: 29.0, salinity: 34.6 },
    { name: "Fri", temp: 28.8, salinity: 34.3 },
    { name: "Sat", temp: 28.2, salinity: 34.1 },
    { name: "Sun", temp: 28.6, salinity: 34.2 },
  ];

  return (
    <div
      className={`bg-surface rounded-lg border border-border/50 p-3 ${className || ""}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-text-primary">
          Temperature & Salinity
        </h4>
        <span className="text-[9px] text-text-muted">7-day trend</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            domain={[26, 30]}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "6px",
              color: "#e2e8f0",
              fontSize: "11px",
              padding: "6px 10px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "9px", paddingTop: "4px" }}
            iconType="circle"
            iconSize={6}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 3, fill: "#0ea5e9", strokeWidth: 0 }}
            name="Temp (°C)"
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="salinity"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
            name="Salinity (PSU)"
            strokeDasharray="4 4"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
