// path: src/components/ui/BuoyCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Eye, Brain, Wifi, Battery, Signal } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from './Badge'

const statusConfig = {
  green: { color: 'bg-emerald-500', label: 'Healthy', variant: 'success' },
  yellow: { color: 'bg-amber-500', label: 'Warning', variant: 'warning' },
  red: { color: 'bg-red-500', label: 'Critical', variant: 'danger' },
}

export function BuoyCard({ buoy, onView, onFish, onSanctuary }) {
  const status = statusConfig[buoy.status] || statusConfig.green

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-4 border border-border shadow-soft hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn('w-2.5 h-2.5 rounded-full', status.color)} />
          <span className="font-semibold text-text-primary text-sm">{buoy.name}</span>
        </div>
        <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3">
        <MapPin size={12} />
        {buoy.coords}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs mb-3">
        <div className="flex justify-between"><span className="text-text-muted">Temp</span><span className="font-medium text-text-primary">{buoy.temp}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">Sal</span><span className="font-medium text-text-primary">{buoy.salinity}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">pH</span><span className="font-medium text-text-primary">{buoy.ph}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">DO</span><span className="font-medium text-text-primary">{buoy.do}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">Turb</span><span className="font-medium text-text-primary">{buoy.turb}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">Fish</span><span className="font-medium text-text-primary">{buoy.fishActivity}</span></div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-[10px] text-text-muted">
          <span className="flex items-center gap-1"><Battery size={10} /> {buoy.battery}</span>
          <span className="flex items-center gap-1"><Signal size={10} /> {buoy.signal}</span>
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onView && (
            <button
              onClick={() => onView(buoy)}
              className="p-1.5 rounded-lg hover:bg-surface-muted text-text-muted hover:text-primary-500 transition-colors"
              aria-label={`View details for ${buoy.name}`}
            >
              <Eye size={14} />
            </button>
          )}
          {onFish && (
            <button
              onClick={() => onFish(buoy)}
              className="p-1.5 rounded-lg hover:bg-surface-muted text-text-muted hover:text-primary-500 transition-colors"
              aria-label={`AI analysis for ${buoy.name}`}
            >
              <Brain size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
