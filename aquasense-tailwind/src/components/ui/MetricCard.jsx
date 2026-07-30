// path: src/components/ui/MetricCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function MetricCard({ icon, value, label, trend, up, iconColor, className, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-white rounded-2xl p-4 border border-border shadow-soft hover:shadow-md transition-all',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-muted font-medium">{label}</span>
        {icon && (
          <span className={cn('text-lg opacity-70', iconColor || 'text-ocean-500')}>
            {icon}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-text-primary">{value}</div>
      {trend && (
        <div className="mt-1.5">
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1',
            up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          )}>
            {up ? '↑' : '↓'} {trend}
          </span>
        </div>
      )}
    </motion.div>
  )
}
