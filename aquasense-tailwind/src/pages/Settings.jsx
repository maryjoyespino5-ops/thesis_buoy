// path: src/pages/Settings.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Settings as SettingsIcon, Moon, Sun, Bell, Clock, Sliders, Shield } from 'lucide-react'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(true)
  const [interval, setInterval] = useState('15 min')
  const [threshold, setThreshold] = useState(85)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <SettingsIcon size={24} className="text-ocean-500" />
          Settings
        </h1>
        <p className="text-text-muted text-sm mt-1">Configure your AquaSense experience</p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-5">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-surface-muted rounded-xl flex items-center justify-center">
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </div>
              <div>
                <div className="font-medium text-text-primary text-sm">Theme</div>
                <div className="text-xs text-text-muted">{darkMode ? 'Dark mode' : 'Light mode'}</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary-500' : 'bg-border'}`}
              role="switch"
              aria-checked={darkMode}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-surface-muted rounded-xl flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div>
                <div className="font-medium text-text-primary text-sm">AI Notifications</div>
                <div className="text-xs text-text-muted">Receive alerts and insights</div>
              </div>
            </div>
            <button
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${notifEnabled ? 'bg-primary-500' : 'bg-border'}`}
              role="switch"
              aria-checked={notifEnabled}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-surface-muted rounded-xl flex items-center justify-center">
                <Clock size={16} />
              </div>
              <div>
                <div className="font-medium text-text-primary text-sm">AI Sampling Interval</div>
                <div className="text-xs text-text-muted">How often AI analyzes data</div>
              </div>
            </div>
            <select
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="px-3 py-1.5 rounded-full border border-border bg-surface-muted text-sm text-text-primary"
            >
              <option>5 min</option>
              <option>15 min</option>
              <option>30 min</option>
              <option>1 hour</option>
            </select>
          </div>

          <div className="py-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-surface-muted rounded-xl flex items-center justify-center">
                  <Sliders size={16} />
                </div>
                <div>
                  <div className="font-medium text-text-primary text-sm">AI Confidence Threshold</div>
                  <div className="text-xs text-text-muted">Minimum confidence for alerts</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary-500">{threshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}