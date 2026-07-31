// path: src/components/charts/DOChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function DOChart({ className }) {
  const data = [
    { name: "Mon", do: 6.8, ph: 8.2 },
    { name: "Tue", do: 6.5, ph: 8.1 },
    { name: "Wed", do: 6.2, ph: 8.0 },
    { name: "Thu", do: 5.9, ph: 7.9 },
    { name: "Fri", do: 6.3, ph: 8.0 },
    { name: "Sat", do: 6.7, ph: 8.1 },
    { name: "Sun", do: 6.7, ph: 8.1 },
  ];

  return (
    <div
      className={`bg-surface rounded-lg border border-border/50 p-3 ${className || ""}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-text-primary">
          Dissolved Oxygen & pH
        </h4>
        <span className="text-[9px] text-text-muted">7-day trend</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
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
            domain={[0, 10]}
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
            cursor={{ fill: "rgba(0,0,0,0.02)" }}
          />
          <Legend
            wrapperStyle={{ fontSize: "9px", paddingTop: "4px" }}
            iconType="circle"
            iconSize={6}
          />
          <Bar
            dataKey="do"
            fill="#0ea5e9"
            radius={[3, 3, 0, 0]}
            name="DO (mg/L)"
            barSize={20}
          />
          <Bar
            dataKey="ph"
            fill="#10b981"
            radius={[3, 3, 0, 0]}
            name="pH"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
