// path: src/components/ui/SensorItem.jsx
import React from 'react'
import { cn } from '../../lib/utils'

export function SensorItem({ label, value, range, status, contrib }) {
  return (
    <div className="bg-surface-muted rounded-xl p-3 border border-border">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">{label}</div>
      <div className="font-semibold text-text-primary">{value}</div>
      <div className="text-xs text-text-muted mt-0.5">{status} · AI {contrib}</div>
    </div>
  )
}
