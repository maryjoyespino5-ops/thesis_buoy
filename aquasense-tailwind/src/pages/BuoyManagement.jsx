// path: src/pages/BuoyManagement.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BuoyCard } from '../components/ui/BuoyCard'
import { SearchInput } from '../components/ui/SearchInput'
import { buoyData } from '../api/sampleData'
import { Badge } from '../components/ui/Badge'
import { Ship } from 'lucide-react'

export default function BuoyManagement() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [buoys] = useState(buoyData)
  const filtered = buoys.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Ship size={24} className="text-ocean-500" />
            Buoy Management
          </h1>
          <p className="text-text-muted text-sm mt-1">Monitor and manage all deployed buoys</p>
        </div>
        <Badge variant="info">{filtered.length} buoys</Badge>
      </div>

      <SearchInput
        placeholder="Filter buoys..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filtered.map(buoy => (
          <BuoyCard key={buoy.id} buoy={buoy} onView={(b) => {}} onFish={(b) => navigate('/fish')} />
        ))}
      </div>
    </motion.div>
  )
}