// path: src/components/ui/StatCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function StatCard({ icon, value, label, trend, up, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl p-4 border border-[#e2ebf4] shadow-soft cursor-pointer hover:shadow-hover transition-all'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#517b9d]">{label}</span>
        {icon && <span className="text-xl text-[#267d9e] opacity-70">{icon}</span>}
      </div>
      <div className="text-3xl font-semibold text-[#11364f] mt-1">{value}</div>
      {trend && (
        <div className="mt-1">
          <span className={cn(
            'text-xs px-2.5 py-1 rounded-full inline-block',
            up ? 'bg-[#e5f2e9] text-[#1b784a]' : 'bg-[#fce9e9] text-[#b33a3a]'
          )}>
            {up ? '↑' : '↓'} {trend}
          </span>
        </div>
      )}
    </motion.div>
  )
}
