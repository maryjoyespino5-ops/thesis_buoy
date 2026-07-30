// path: src/components/ui/RiskCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function RiskCard({ label, level, confidence, trend, color, desc }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="risk-card"
      style={{ borderLeftColor: color }}
    >
      <div className="risk-level">
        {label}{' '}
        <span className="text-sm font-normal" style={{ color }}>● {level}</span>
      </div>
      <div className="risk-desc">Confidence {confidence} · Trend {trend}</div>
      <div className="text-sm text-[#3b6587]">{desc}</div>
    </motion.div>
  )
}
