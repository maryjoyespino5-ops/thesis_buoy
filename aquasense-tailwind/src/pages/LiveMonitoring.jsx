// path: src/pages/LiveMonitoring.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BuoyCard } from '../components/ui/BuoyCard'
import { buoyData } from '../api/sampleData'
import { Badge } from '../components/ui/Badge'
import { Activity, Satellite } from 'lucide-react'

export default function LiveMonitoring() {
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Satellite size={24} className="text-ocean-500" />
            Live Monitoring
          </h1>
          <p className="text-text-muted text-sm mt-1">AI is tracking 5 buoys in real time</p>
        </div>
        <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {buoyData.map(buoy => (
          <BuoyCard key={buoy.id} buoy={buoy} onView={(b) => {}} onFish={(b) => navigate('/fish')} />
        ))}
      </div>
    </motion.div>
  )
}