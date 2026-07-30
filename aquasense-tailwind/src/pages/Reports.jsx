// path: src/pages/Reports.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { FileText, Download, Eye, Sparkles, TrendingUp, Activity } from 'lucide-react'

const reports = [
  { id: 1, title: 'Weekly Water Quality Report', date: '2026-07-28', type: 'AI-Generated', status: 'Ready' },
  { id: 2, title: 'Monthly Environmental Summary', date: '2026-07-01', type: 'AI-Generated', status: 'Ready' },
  { id: 3, title: 'Buoy 04 Maintenance Report', date: '2026-07-15', type: 'System', status: 'Ready' },
  { id: 4, title: 'Fish Activity Analysis', date: '2026-07-10', type: 'AI-Generated', status: 'Ready' },
]

export default function Reports() {
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <FileText size={24} className="text-ocean-500" />
            AI-Generated Reports
          </h1>
          <p className="text-text-muted text-sm mt-1">Comprehensive environmental intelligence reports</p>
        </div>
        <Button variant="primary" loading={generating} onClick={handleGenerate}>
          <Sparkles size={14} /> {generating ? 'Generating...' : 'Generate AI Report'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">AI Executive Summary</h3>
              <p className="text-sm text-text-secondary">Water quality stable · 2 alerts active · AI confidence 97% · Recommend routine monitoring.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-muted rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-text-muted" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm">{report.title}</div>
                    <div className="text-xs text-text-muted">{report.date} · {report.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{report.status}</Badge>
                  <Button variant="ghost" size="sm" icon={<Eye size={14} />}>Preview</Button>
                  <Button variant="ghost" size="sm" icon={<Download size={14} />}>PDF</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}