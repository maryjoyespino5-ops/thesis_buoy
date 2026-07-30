// path: src/components/charts/DOChart.jsx
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function DOChart() {
  const data = [
    { name: 'Mon', do: 6.8, ph: 8.2 },
    { name: 'Tue', do: 6.5, ph: 8.1 },
    { name: 'Wed', do: 6.2, ph: 8.0 },
    { name: 'Thu', do: 5.9, ph: 7.9 },
    { name: 'Fri', do: 6.3, ph: 8.0 },
    { name: 'Sat', do: 6.7, ph: 8.1 },
    { name: 'Sun', do: 6.7, ph: 8.1 },
  ]

  return (
    <div className="chart-box">
      <h4>DO & pH</h4>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef3f9" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip
            contentStyle={{ background: '#1a2236', border: '1px solid #2a3654', borderRadius: '8px', color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="do" fill="#2b8cae" radius={[6, 6, 0, 0]} name="DO mg/L" />
          <Bar dataKey="ph" fill="#63b39e" radius={[6, 6, 0, 0]} name="pH" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
