// path: src/pages/Alerts.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SearchInput } from '../components/ui/SearchInput'
import { Bell, CheckCircle, AlertTriangle, Info, Filter, Check, X } from 'lucide-react'
import { cn } from '../lib/utils'

const alertsData = [
  { id: 1, time: '14:22', buoy: 'Buoy 04', desc: 'Battery low (67%)', priority: 'Warning', acknowledged: false },
  { id: 2, time: '13:10', buoy: 'Buoy 02', desc: 'Dissolved oxygen dropped to 5.9 mg/L', priority: 'Critical', acknowledged: false },
  { id: 3, time: '11:45', buoy: 'Buoy 03', desc: 'Firmware update available', priority: 'Info', acknowledged: true },
  { id: 4, time: '09:30', buoy: 'Buoy 01', desc: 'Calibration due in 3 days', priority: 'Info', acknowledged: false },
]

const priorityConfig = {
  Critical: { color: 'bg-red-500', bg: '#fce9e9', badge: 'danger' },
  Warning: { color: 'bg-amber-500', bg: '#fcf3e0', badge: 'warning' },
  Info: { color: 'bg-emerald-500', bg: '#e3f2eb', badge: 'success' },
}

export default function Alerts() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [alerts, setAlerts] = useState(alertsData)

  const filtered = alerts.filter(a => {
    const matchSearch = a.buoy.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || a.priority === filter
    return matchSearch && matchFilter
  })

  const handleAcknowledge = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a))
  }

  const handleResolve = (id) => {
    setAlerts(alerts.filter(a => a.id !== id))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Bell size={24} className="text-ocean-500" />
            Alerts
            <Badge variant="danger" className="ml-1">{alerts.filter(a => !a.acknowledged).length} active</Badge>
          </h1>
          <p className="text-text-muted text-sm mt-1">AI-prioritized alerts from all buoys</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          placeholder="Search alerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          {['All', 'Critical', 'Warning', 'Info'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-2 rounded-full text-xs font-medium transition-colors',
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-border text-text-secondary hover:bg-surface-muted'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => {
          const p = priorityConfig[a.priority]
          return (
            <Card key={a.id} className={cn('hover:shadow-md transition-shadow', a.acknowledged && 'opacity-60')}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', p.color)} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-text-primary text-sm">{a.buoy}</strong>
                        <span className="text-text-muted text-xs">· {a.time}</span>
                        {a.acknowledged && <Badge variant="success" className="text-[10px]">Acknowledged</Badge>}
                      </div>
                      <p className="text-sm text-text-secondary mt-0.5">{a.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={p.badge}>{a.priority}</Badge>
                    {!a.acknowledged && (
                      <Button variant="ghost" size="sm" onClick={() => handleAcknowledge(a.id)}>
                        <Check size={14} className="mr-1" /> Acknowledge
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleResolve(a.id)}>
                      <X size={14} className="mr-1" /> Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}