// path: src/pages/Sanctuary.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { MetricCard } from '../components/ui/MetricCard'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Mic, Volume2, Shield, Navigation, Sparkles } from 'lucide-react'

export default function Sanctuary() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <Mic size={24} className="text-ocean-500" />
          Marine Sanctuary Intelligence
        </h1>
        <p className="text-text-muted text-sm mt-1">Hydrophone acoustic monitoring · Vessel detection · Unusual noise alerts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<Volume2 size={18} />} value="Normal" label="Acoustic Activity" trend="No noise" up iconColor="text-emerald-500" />
        <MetricCard icon={<Shield size={18} />} value="None" label="Engine Noise Detected" trend="Clear" up iconColor="text-sky-500" />
        <MetricCard icon={<Navigation size={18} />} value="—" label="Est. Vessel Distance" trend="Safe" up iconColor="text-ocean-500" />
        <MetricCard icon={<Shield size={18} />} value="Low" label="Unauthorized Vessel Prob." trend="Minimal" up iconColor="text-emerald-500" />
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-text-primary mb-3">Acoustic Timeline</h3>
          <div className="h-24 bg-surface-muted rounded-xl p-3 flex items-end gap-1.5">
            {[20,35,15,45,25,18,30,12,40,22].map((h, i) => (
              <div key={i} style={{ height: `${h}%`, width: '12px', background: h > 35 ? '#d4a13e' : '#2c9f6b', borderRadius: '4px' }} />
            ))}
          </div>
          <div className="flex gap-4 mt-2 text-xs text-text-muted">
            <span>14:00</span><span>14:15</span><span>14:30</span><span>14:45</span><span>15:00</span>
          </div>
          <div className="mt-3">
            <Badge variant="success">AI: No unusual acoustic signatures detected in the last 2 hours.</Badge>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Sanctuary Alerts</h2>
        <div className="space-y-3">
          {[
            { time: '14:20', event: 'No unusual noise', status: 'Normal' },
            { time: '13:45', event: 'Engine noise detected (low confidence)', status: 'Info' },
            { time: '12:10', event: 'Acoustic activity spike', status: 'Resolved' },
          ].map((a, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-sm text-text-primary">{a.event}</strong>
                    <span className="text-xs text-text-muted ml-2">{a.time}</span>
                  </div>
                  <Badge variant={a.status === 'Normal' ? 'success' : a.status === 'Info' ? 'warning' : 'default'}>
                    {a.status === 'Normal' ? 'Normal' : a.status === 'Info' ? 'Info' : 'Resolved'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}