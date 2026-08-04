// path: src/components/dashboards/ResearchDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { RawSensorDataWidget } from "../widgets/core/RawSensorDataWidget"
import { HistoricalGraphsWidget } from "../widgets/core/HistoricalGraphsWidget"
import { ExportCSVWidget } from "../widgets/core/ExportCSVWidget"
import { ExportPDFWidget } from "../widgets/core/ExportPDFWidget"
import { AIAnalysisWidget } from "../widgets/core/AIAnalysisWidget"
import { WaterQualityIndexWidget } from "../widgets/core/WaterQualityIndexWidget"
import { MarineHealthWidget } from "../widgets/core/MarineHealthWidget"
import { EnvironmentalTrendsWidget } from "../widgets/core/EnvironmentalTrendsWidget"
import { DeploymentMapWidget } from "../widgets/core/DeploymentMapWidget"
import { MultiBuoyAnalyticsWidget } from "../widgets/core/MultiBuoyAnalyticsWidget"
import { MetricCard } from "../../components/ui/MetricCard"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { buoyData, alerts } from "../../api/sampleData"
import {
  Microscope,
  Wifi,
  AlertTriangle,
  Clock,
  ArrowRight,
  MapPin,
  Download,
  FileText,
} from "lucide-react"
import { cn } from "../../lib/utils"

const researchBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function ResearchDashboard() {
  const { user } = useAuth()
  const { currentRole } = useRole()
  const navigate = useNavigate()
  const [buoys, setBuoys] = useState([])
  const [alertFilter, setAlertFilter] = useState("All")
  const [selectedBuoyId, setSelectedBuoyId] = useState(1)
  const [selectedZone, setSelectedZone] = useState(1)
  const [comparisonIds, setComparisonIds] = useState([1, 2, 3])

  useEffect(() => {
    setBuoys(buoyData)
  }, [])

  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter)

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0]

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy)

  const researchStats = [
    { icon: "Microscope", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "2",
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Clock", value: "12", label: "Datasets", trend: "+3", up: true },
  ]

  const handleToggleBuoy = (id) => {
    setComparisonIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Hero */}
      <Card className="border-l-2 border-l-primary-500 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                Good morning, {user?.name?.split(" ")[0] || "John"}
              </h1>
              <p className="text-sm text-text-muted">
                Researcher — Marine Data Analysis
              </p>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/alerts")}
              >
                <Clock size={12} /> Research Data
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/history")}
              >
                <FileText size={12} /> History
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {researchStats.map((s, i) => (
              <MetricCard
                key={i}
                value={s.value}
                label={s.label}
                trend={s.trend}
                up={s.up}
                className="p-3"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Raw Sensor Data + Historical Graphs Row */}
      <WidgetGrid columns={2}>
        <RawSensorDataWidget />
        <HistoricalGraphsWidget />
      </WidgetGrid>

      {/* Export CSV + Export PDF Row */}
      <WidgetGrid columns={2}>
        <ExportCSVWidget />
        <ExportPDFWidget />
      </WidgetGrid>

      {/* AI Analysis + Water Quality Index Row */}
      <WidgetGrid columns={2}>
        <AIAnalysisWidget
          confidence={ai?.confidence ?? 97}
          summary={ai?.dailySummary ?? "All sensors operating within normal parameters."}
        />
        <WaterQualityIndexWidget
          wqi={ai?.waterQualityIndex ?? 96}
          trend="up"
        />
      </WidgetGrid>

      {/* Marine Health + Environmental Trends Row */}
      <WidgetGrid columns={2}>
        <MarineHealthWidget health={ai?.marineHealthIndex ?? 94} trend="up" />
        <EnvironmentalTrendsWidget />
      </WidgetGrid>

      {/* Deployment Map + Multi-Buoy Analytics Row */}
      <WidgetGrid columns={2}>
        <DeploymentMapWidget
          zones={researchBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
        <MultiBuoyAnalyticsWidget
          buoys={buoys}
          selectedIds={comparisonIds}
          onToggleBuoy={handleToggleBuoy}
        />
      </WidgetGrid>
    </motion.div>
  )
}
