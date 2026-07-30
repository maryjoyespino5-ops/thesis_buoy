// path: src/components/charts/RadarChart.jsx
import React from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export function RadarChartWidget({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2ebf4" />
        <PolarAngleAxis dataKey="label" stroke="#64748b" fontSize={11} />
        <PolarRadiusAxis angle={90} domain={[0, 40]} stroke="#64748b" fontSize={10} />
        <Tooltip
          contentStyle={{ background: '#1a2236', border: '1px solid #2a3654', borderRadius: '8px', color: '#e2e8f0' }}
        />
        <Radar name="AI Contribution %" dataKey="data" stroke="#0b6b8f" fill="rgba(11,107,143,0.15)" strokeWidth={2} point={{ fill: '#0b6b8f', r: 4 }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
