// path: src/pages/InteractiveMap.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { BuoyCard } from '../components/ui/BuoyCard'
import { buoyData } from '../api/sampleData'
import { MapPin, Navigation } from 'lucide-react'

export default function InteractiveMap() {
  const navigate = useNavigate()
  const [selectedBuoy, setSelectedBuoy] = useState(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
        <Navigation size={24} className="text-ocean-500" />
        Interactive Map
      </h1>

      <Card className="overflow-hidden">
        <div className="bg-ocean-100 h-[360px] lg:h-[420px] relative flex items-center justify-center border-b border-border overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: 'linear-gradient(#0b6b8f 1px, transparent 1px), linear-gradient(90deg, #0b6b8f 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="relative z-10 text-center">
            <MapPin size={48} className="text-ocean-400 mx-auto mb-3" />
            <p className="text-ocean-600 font-medium">GIS Map · Click a buoy marker for details</p>
            <div className="flex gap-4 mt-4 justify-center">
              <span className="flex items-center gap-1.5 text-xs text-text-muted"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Healthy</span>
              <span className="flex items-center gap-1.5 text-xs text-text-muted"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Warning</span>
              <span className="flex items-center gap-1.5 text-xs text-text-muted"><span className="w-2.5 h-2.5 bg-red-500 rounded-full" /> Critical</span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">{buoyData.length} buoys deployed</span>
            <Button variant="primary" size="sm" onClick={() => setSelectedBuoy(buoyData[1])}>
              Simulate AI Click
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Buoy Details</h2>
          <Badge variant="info">{buoyData.length} buoys</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {buoyData.map(b => (
            <BuoyCard key={b.id} buoy={b} onView={(buoy) => setSelectedBuoy(buoy)} onFish={() => navigate('/fish')} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}