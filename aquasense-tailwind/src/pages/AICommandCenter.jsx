// path: src/pages/AICommandCenter.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MetricCard } from '../components/ui/MetricCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { RadarChartWidget } from '../components/charts/RadarChart'
import { buoyData, riskData, predictions, recommendations, sensorData } from '../api/sampleData'
import { Sparkles, Brain, TrendingUp, Shield, AlertTriangle, CheckCircle, Info, ChevronRight, ChevronDown, Zap, Target, Lightbulb, Activity, Download, FileText, Filter } from 'lucide-react'
import { cn } from '../lib/utils'

const statusColors = { healthy: '#2c9f6b', warning: '#d4a13e', critical: '#c74545' }

export default function AICommandCenter() {
  const navigate = useNavigate()
  const [expandedRisk, setExpandedRisk] = useState(null)
  const [expandedRec, setExpandedRec] = useState(null)
  const [riskFilter, setRiskFilter] = useState('All')

  const filteredRisks = riskFilter === 'All' ? riskData : riskData.filter(r =>
    r.level.toLowerCase() === riskFilter.toLowerCase()
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight flex items-center gap-3">
            <Brain size={28} className="text-primary-500" />
            AI Command Center
          </h1>
          <p className="text-text-muted mt-1">Continuous environmental intelligence · Real-time risk assessment · Predictive analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/reports')}>
            <FileText size={14} /> Generate Report
          </Button>
          <Button variant="primary" size="sm">
            <Sparkles size={14} /> Full Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={<Shield size={20} />} value="96%" label="Environmental Health Score" trend="Excellent · Stable" up iconColor="text-emerald-500" />
        <MetricCard icon={<Activity size={20} />} value="Good" label="Water Quality Classification" trend="No immediate threats" up iconColor="text-sky-500" />
        <MetricCard icon={<Zap size={20} />} value="97.8%" label="AI Confidence" trend="High confidence · 12 sensors" up iconColor="text-primary-500" />
      </div>

      {/* Executive Summary */}
      <Card className="border-l-4 border-l-primary-500">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-primary-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">AI Executive Summary</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Environmental conditions remain stable across all deployed buoys. Water quality is classified as <strong className="text-text-primary">Good</strong>. No immediate threats to marine life detected. Slight turbidity increases observed near Buoy 03 but within acceptable limits.
              </p>
            </div>
            <Badge variant="primary">97.8% confidence</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Target size={18} className="text-primary-500" />
            Risk Assessment
          </h2>
          <div className="flex gap-2">
            {['All', 'Low', 'Moderate', 'High'].map(f => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                  riskFilter === f
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
          {filteredRisks.map((r, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpandedRisk(expandedRisk === i ? null : i)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-text-primary text-sm">{r.label}</span>
                  <span className="text-sm font-bold" style={{ color: r.color }}>● {r.level}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                  <span>Confidence: {r.confidence}</span>
                  <span>·</span>
                  <span>Trend: {r.trend}</span>
                </div>
                <p className="text-xs text-text-secondary">{r.desc}</p>
                {expandedRisk === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-text-muted mb-2">AI Explanation: This risk is assessed based on sensor data from 12 buoys, historical patterns, and environmental models.</p>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate('/reports') }}>
                      View Full Report <ChevronRight size={12} />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary-500" />
          AI Predictions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {predictions.map((p, i) => (
            <Card key={i} className="text-center">
              <CardContent className="p-4">
                <div className="text-xs text-text-muted mb-1">{p.label}</div>
                <div className="text-xl font-bold text-text-primary">{p.val}</div>
                <div className="text-xs text-text-muted mt-1">{p.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-500" />
          AI Recommendations
        </h2>
        <div className="space-y-3">
          {recommendations.map((r, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpandedRec(expandedRec === i ? null : i)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                    r.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-text-primary text-sm">{r.text}</span>
                      <Badge variant={r.priority === 'High' ? 'danger' : 'warning'}>{r.priority}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">Reason: {r.reason}</p>
                    {expandedRec === i && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex gap-2">
                        <Button variant="primary" size="sm">Schedule</Button>
                        <Button variant="ghost" size="sm">Dismiss</Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sensor Contribution */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Contribution to AI Decision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RadarChartWidget data={{ labels: sensorData.map(s => s.label), datasets: [{ label: 'AI Contribution %', data: sensorData.map(s => parseInt(s.contrib)) }] }} />
            <div className="space-y-3">
              {sensorData.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-muted rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{s.label}</div>
                    <div className="text-xs text-text-muted">{s.value} · Range: {s.range}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary-500">{s.contrib}</div>
                    <div className="text-[10px] text-text-muted">AI contribution</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explainability */}
      <Card>
        <CardHeader>
          <CardTitle>AI Explainability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm"><strong>Detected:</strong> Turbidity increase (3.1 NTU) at Buoy 02</div>
          </div>
          <div className="flex items-start gap-3">
            <Info size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm"><strong>Why:</strong> Sediment disturbance likely due to recent rainfall. Sensor contribution: Turbidity (34%), DO (22%), pH (18%).</div>
          </div>
          <div className="flex items-start gap-3">
            <Zap size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm"><strong>Confidence:</strong> 94% · <strong>Impact:</strong> Moderate — monitor for algal bloom risk.</div>
          </div>
          <div className="flex items-start gap-3">
            <Target size={16} className="text-ocean-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm"><strong>Recommendation:</strong> Inspect Buoy 02 within 48 hours.</div>
          </div>
          <div className="pt-3 flex gap-2">
            <Button variant="primary" size="sm"><Download size={14} className="mr-1" /> Generate Full Report</Button>
            <Button variant="ghost" size="sm">View Methodology</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}