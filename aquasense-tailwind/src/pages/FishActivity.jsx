// path: src/pages/FishActivity.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { MetricCard } from '../components/ui/MetricCard'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { buoyData } from '../api/sampleData'
import { Activity, MapPin, TrendingUp, Target } from 'lucide-react'

export default function FishActivity() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <Activity size={24} className="text-ocean-500" />
          Fish Activity Intelligence
        </h1>
        <p className="text-text-muted text-sm mt-1">Sonar + environmental data · Estimated fish presence and activity zones</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<Activity size={18} />} value="87%" label="Fish Presence Estimate" trend="High" up iconColor="text-emerald-500" />
        <MetricCard icon={<TrendingUp size={18} />} value="★★★★☆" label="Activity Index" trend="High" up iconColor="text-amber-500" />
        <MetricCard icon={<Target size={18} />} value="6.4m" label="Estimated Depth" trend="Optimal" up iconColor="text-sky-500" />
        <MetricCard icon={<MapPin size={18} />} value="Northwest" label="Recommended Zone" trend="Sector" up iconColor="text-ocean-500" />
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-text-primary mb-3">Sonar Fish Echoes · Activity Heatmap</h3>
          <div className="h-32 bg-gradient-to-r from-ocean-100 via-ocean-300 to-ocean-500 rounded-xl flex items-center justify-center text-white font-medium">
            Fish density: High (center) · Moderate (edges)
          </div>
          <div className="flex gap-6 mt-3 text-xs text-text-muted">
            <span><span className="inline-block w-3 h-3 bg-emerald-500 rounded mr-1"></span> High density</span>
            <span><span className="inline-block w-3 h-3 bg-amber-500 rounded mr-1"></span> Moderate</span>
            <span><span className="inline-block w-3 h-3 bg-red-500 rounded mr-1"></span> Low</span>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">AI Fish Activity Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buoyData.map((b, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="text-xs text-text-muted mb-1">{b.name}</div>
                <div className="text-xl font-bold text-text-primary">{b.fishActivity}</div>
                <div className="text-xs text-text-muted mt-1">{b.coords}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}