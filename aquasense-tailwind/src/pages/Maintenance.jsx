// path: src/pages/Maintenance.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { SearchInput } from '../components/ui/SearchInput'
import { Wrench, Clock, CheckCircle, Calendar, Filter, Plus } from 'lucide-react'
import { cn } from '../lib/utils'

const maintenanceData = [
  { id: 1, buoy: 'Buoy 04', task: 'Battery replacement', due: '2026-08-02', status: 'Pending', priority: 'High' },
  { id: 2, buoy: 'Buoy 02', task: 'Sensor calibration', due: '2026-07-30', status: 'Scheduled', priority: 'Medium' },
  { id: 3, buoy: 'Buoy 01', task: 'Firmware update', due: '2026-07-28', status: 'Completed', priority: 'Low' },
  { id: 4, buoy: 'Buoy 03', task: 'Propeller inspection', due: '2026-08-05', status: 'Pending', priority: 'Medium' },
  { id: 5, buoy: 'Buoy 05', task: 'Solar panel cleaning', due: '2026-08-10', status: 'Scheduled', priority: 'Low' },
]

const statusConfig = {
  Pending: { variant: 'warning', icon: Clock },
  Scheduled: { variant: 'info', icon: Calendar },
  Completed: { variant: 'success', icon: CheckCircle },
}

export default function Maintenance() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = maintenanceData.filter(m => {
    const matchSearch = m.buoy.toLowerCase().includes(search.toLowerCase()) || m.task.toLowerCase().includes(search.toLowerCase())
    const matchFilter = statusFilter === 'All' || m.status === statusFilter
    return matchSearch && matchFilter
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Wrench size={24} className="text-ocean-500" />
            Maintenance
            <Badge variant="warning" className="ml-1">AI-predicted</Badge>
          </h1>
          <p className="text-text-muted text-sm mt-1">AI-predicted maintenance schedule and task management</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={14} className="mr-1" /> New Task
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          placeholder="Search maintenance tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          {['All', 'Pending', 'Scheduled', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                'px-3 py-2 rounded-full text-xs font-medium transition-colors',
                statusFilter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-border text-text-secondary hover:bg-surface-muted'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => {
          const s = statusConfig[m.status] || statusConfig.Pending
          const Icon = s.icon
          return (
            <Card key={m.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-text-primary">{m.buoy}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.variant}>{m.status}</Badge>
                    <Badge variant={m.priority === 'High' ? 'danger' : m.priority === 'Medium' ? 'warning' : 'default'}>
                      {m.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                  <Wrench size={14} className="text-text-muted" />
                  {m.task}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Calendar size={12} />
                  Due: {m.due}
                </div>
                <div className="flex gap-2 mt-4">
                  {m.status !== 'Completed' && (
                    <>
                      <Button variant="primary" size="sm">Start</Button>
                      <Button variant="ghost" size="sm">Reschedule</Button>
                    </>
                  )}
                  {m.status === 'Pending' && (
                    <Button variant="ghost" size="sm" onClick={() => {}}>Mark Scheduled</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}