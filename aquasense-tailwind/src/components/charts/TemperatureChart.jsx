// path: src/components/charts/TemperatureChart.jsx
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function TemperatureChart() {
  const data = [
    { name: 'Mon', temp: 27.2, salinity: 34.0 },
    { name: 'Tue', temp: 28.1, salinity: 34.2 },
    { name: 'Wed', temp: 28.6, salinity: 34.4 },
    { name: 'Thu', temp: 29.0, salinity: 34.6 },
    { name: 'Fri', temp: 28.8, salinity: 34.3 },
    { name: 'Sat', temp: 28.2, salinity: 34.1 },
    { name: 'Sun', temp: 28.6, salinity: 34.2 },
  ]

  return (
    <div className="chart-box">
      <h4>Temperature & Salinity</h4>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef3f9" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip
            contentStyle={{ background: '#1a2236', border: '1px solid #2a3654', borderRadius: '8px', color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Line type="monotone" dataKey="temp" stroke="#11749b" strokeWidth={2} dot={{ r: 3 }} name="Temp °C" />
          <Line type="monotone" dataKey="salinity" stroke="#2b9e7a" strokeWidth={2} dot={{ r: 3 }} name="Salinity PSU" strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
