// path: src/pages/History.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { HistoryChart } from '../components/charts/HistoryChart'
import { Badge } from '../components/ui/Badge'
import { Clock, TrendingUp } from 'lucide-react'

export default function History() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          <Clock size={24} className="text-ocean-500" />
          Historical Analytics
        </h1>
        <p className="text-text-muted text-sm mt-1">AI trend analysis · 6-month water quality</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Water Quality Index</h3>
            <Badge variant="success">Improving</Badge>
          </div>
          <HistoryChart />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-text-primary mb-3">Trend Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-surface-muted rounded-xl">
              <div className="text-2xl font-bold text-emerald-600">+8%</div>
              <div className="text-xs text-text-muted mt-1">Quality Improvement</div>
            </div>
            <div className="text-center p-3 bg-surface-muted rounded-xl">
              <div className="text-2xl font-bold text-primary-500">96%</div>
              <div className="text-xs text-text-muted mt-1">Current Score</div>
            </div>
            <div className="text-center p-3 bg-surface-muted rounded-xl">
              <div className="text-2xl font-bold text-text-primary">6mo</div>
              <div className="text-xs text-text-muted mt-1">Tracking Period</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}