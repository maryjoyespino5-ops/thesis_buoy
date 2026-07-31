// path: src/components/ui/Hero.jsx
import React from 'react'
import { cn } from '../../lib/utils'

export function Hero({ title, subtitle, stats, children }) {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
      {stats && (
        <div className="hero-right">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
