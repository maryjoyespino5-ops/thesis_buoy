// path: src/components/ui/ModuleCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function ModuleCard({ icon, title, status, tag, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
        {icon}
      </div>
      <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-sm text-text-secondary">{status}</p>
      {tag && (
        <span className="inline-block mt-2 text-xs font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      )}
    </motion.div>
  )
}
