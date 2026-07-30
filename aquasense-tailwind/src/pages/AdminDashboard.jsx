// path: src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import { MetricCard } from '../components/ui/MetricCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { BuoyCard } from '../components/ui/BuoyCard'
import { TemperatureChart } from '../components/charts/TemperatureChart'
import { DOChart } from '../components/charts/DOChart'
import { RadarChartWidget } from '../components/charts/RadarChart'
import { buoyData, stats, heroStats, sensorData, alerts, maintenanceData } from '../api/sampleData'
import { Sparkles, Ship, Wifi, AlertTriangle, Thermometer, Droplets, Zap, Eye, TrendingUp, Activity, ArrowRight, Clock, MapPin, Shield, Settings, Users, FileText, Wrench, Bell, Menu, X, ChevronRight, Check } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()
  const { currentRole, hasPermission } = useRole()
  const navigate = useNavigate()
  const [buoys, setBuoys] = useState([])
  const [selectedBuoy, setSelectedBuoy] = useState(null)
  const [alertFilter, setAlertFilter] = useState('All')

  useEffect(() => { setBuoys(buoyData) }, [])

  const filteredAlerts = alertFilter === 'All' ? alerts : alerts.filter(a => a.priority === alertFilter)

  const adminStats = [
    { icon: 'Users', value: '6', label: 'Total Users', trend: '+2', up: true },
    { icon: 'Shield', value: '14', label: 'Total Buoys', trend: '+2', up: true },
    { icon: 'Wifi', value: '12', label: 'Online', trend: '92%', up: true },
    { icon: 'AlertTriangle', value: '2', label: 'Offline', trend: '-1', up: false },
    { icon: 'Bell', value: '4', label: 'Active Alerts', trend: '+1', up: false },
    { icon: 'Wrench', value: '3', label: 'Pending Maintenance', trend: '+1', up: false },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden border-l-4 border-l-primary-500">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
                  Good morning, {user?.name?.split(' ')[0] || 'John'}
                </h1>
                <Badge variant="primary" className="bg-primary-50 text-primary-600">
                  <Sparkles size={10} /> AI Active
                </Badge>
                <Badge variant="info" className="bg-sky-50 text-sky-600">
                  <Shield size={10} /> Admin
                </Badge>
              </div>
              <p className="text-text-muted text-sm lg:text-base">
                System overview · {buoys.filter(b => b.status === 'green').length} buoys healthy · {alerts.filter(a => a.priority === 'Critical').length} critical alerts
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => navigate('/alerts')}>
                <Bell size={14} /> View Alerts
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/buoys')}>
                <Ship size={14} /> Manage Buoys
              </Button>
            </div>
          </div>

          {/* Hero stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {heroStats.map((s, i) => (
              <MetricCard key={i} value={s.num} label={s.label} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((s, i) => (
          <MetricCard
            key={i}
            value={s.value}
            label={s.label}
            trend={s.trend}
            up={s.up}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group" onClick={() => navigate('/buoys')}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <Ship size={22} className="text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Buoy Management</h3>
              <p className="text-sm text-text-muted">{buoys.length} buoys · {buoys.filter(b => b.status === 'green').length} online</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-text-muted group-hover:text-primary-500 transition-colors" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow group" onClick={() => navigate('/alerts')}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <Bell size={22} className="text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Alerts & Incidents</h3>
              <p className="text-sm text-text-muted">{alerts.length} alerts · {alerts.filter(a => a.priority === 'Critical').length} critical</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-text-muted group-hover:text-primary-500 transition-colors" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow group" onClick={() => navigate('/maintenance')}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <Wrench size={22} className="text-teal-500" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Maintenance</h3>
              <p className="text-sm text-text-muted">{maintenanceData.length} tasks · {maintenanceData.filter(m => m.status === 'Pending').length} pending</p>
            </div>
            <ArrowRight size={18} className="ml-auto text-text-muted group-hover:text-primary-500 transition-colors" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TemperatureChart />
        </div>
        <div className="lg:col-span-1">
          <DOChart />
        </div>
      </div>

      {/* Sensor Contribution Radar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sensor Contribution to AI</CardTitle>
          <Badge variant="info">{sensorData.length} sensors</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RadarChartWidget data={{ labels: sensorData.map(s => s.label), datasets: [{ label: 'AI Contribution %', data: sensorData.map(s => parseInt(s.contrib)) }] }} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sensorData.map((s, i) => (
                <div key={i} className="bg-surface-muted rounded-xl p-3 text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">{s.label}</div>
                  <div className="text-lg font-bold text-text-primary">{s.value}</div>
                  <div className="text-[10px] text-text-muted">AI: {s.contrib}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buoy Status */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Activity size={18} className="text-ocean-500" />
            Live Buoy Status
          </h2>
          <Badge variant="success">{buoys.filter(b => b.status === 'green').length} online</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {buoys.map(buoy => (
            <BuoyCard key={buoy.id} buoy={buoy} onView={(b) => setSelectedBuoy(b)} onFish={(b) => navigate('/fish')} />
          ))}
        </div>
      </div>

      {/* Alerts & Maintenance - Admin Specific */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} className="text-amber-500" />
              Recent Alerts
            </CardTitle>
            <div className="flex gap-1">
              {['All', 'Critical', 'Warning', 'Info'].map(f => (
                <button
                  key={f}
                  onClick={() => setAlertFilter(f)}
                  className={`px-2 py-1 rounded-full text-[10px] font-medium transition-colors ${
                    alertFilter === f
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-muted text-text-muted hover:bg-surface-muted/80'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAlerts.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    a.priority === 'Critical' ? 'bg-red-500' : a.priority === 'Warning' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <span className="text-xs text-text-muted w-16 flex-shrink-0">{a.time}</span>
                  <span className="text-sm text-text-secondary flex-1">{a.buoy} · {a.desc}</span>
                  <Badge variant={a.priority === 'Critical' ? 'danger' : a.priority === 'Warning' ? 'warning' : 'success'} className="text-[10px]">
                    {a.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench size={18} className="text-teal-500" />
              Maintenance Tasks
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/maintenance')}>
              View All <ChevronRight size={12} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceData.map((m, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    m.status === 'Completed' ? 'bg-emerald-500' : m.status === 'Scheduled' ? 'bg-sky-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary font-medium">{m.task}</p>
                    <p className="text-xs text-text-muted">{m.buoy} · Due {m.due}</p>
                  </div>
                  <Badge variant={m.status === 'Completed' ? 'success' : m.status === 'Scheduled' ? 'info' : 'warning'} className="text-[10px]">
                    {m.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '14:22', event: 'Buoy 04 battery low (67%)', type: 'warning' },
              { time: '13:10', event: 'DO decreased at Buoy 02 (5.9 mg/L)', type: 'critical' },
              { time: '11:45', event: 'Firmware update available for Buoy 03', type: 'info' },
              { time: '09:30', event: 'Calibration due in 3 days for Buoy 01', type: 'info' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  a.type === 'critical' ? 'bg-red-500' : a.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <span className="text-xs text-text-muted w-16 flex-shrink-0">{a.time}</span>
                <span className="text-sm text-text-secondary flex-1">{a.event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}