// path: src/components/dashboards/BeachMonitoringDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { BeachWaterQualityWidget } from "../widgets/core/BeachWaterQualityWidget"
import { SwimmingSafetyWidget } from "../widgets/core/SwimmingSafetyWidget"
import { UVIndexWidget } from "../widgets/core/UVIndexWidget"
import { TrashDensityWidget } from "../widgets/core/TrashDensityWidget"
import { PollutionAlertsWidget } from "../widgets/core/PollutionAlertsWidget"
import { AIBeachAssessmentWidget } from "../widgets/core/AIBeachAssessmentWidget"
import { TideInformationWidget } from "../widgets/core/TideInformationWidget"
import { BeachMapWidget } from "../widgets/core/BeachMapWidget"
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
  Wifi,
  AlertTriangle,
  Bell,
  ArrowRight,
  Sun,
  Droplets,
} from "lucide-react"
import { cn } from "../../lib/utils"

const beachBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function BeachMonitoringDashboard() {
  const { user } = useAuth()
  const { currentRole } = useRole()
  const navigate = useNavigate()
  const [buoys, setBuoys] = useState([])
  const [alertFilter, setAlertFilter] = useState("All")
  const [selectedBuoyId, setSelectedBuoyId] = useState(1)
  const [selectedZone, setSelectedZone] = useState(1)

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

  const beachStats = [
    { icon: "Sun", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "1",
      label: "Water Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Thermometer", value: "28°C", label: "Avg Temp", trend: "+0.5", up: true },
  ]

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
                Beach Monitor — Water Quality & Safety
              </p>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/alerts")}
              >
                <Bell size={12} /> Alerts
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/beach")}
              >
                <Sun size={12} /> Beach Data
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {beachStats.map((s, i) => (
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

      {/* Beach Water Quality + Swimming Safety + UV Index Row */}
      <WidgetGrid columns={3}>
        <BeachWaterQualityWidget quality="Good" bacteria="Safe" />
        <SwimmingSafetyWidget safety="Safe" risk="Low" />
        <UVIndexWidget uv={7} level="High" />
      </WidgetGrid>

      {/* Trash Density + Tide Information Row */}
      <WidgetGrid columns={2}>
        <TrashDensityWidget density="Low" items="3/100m" />
        <TideInformationWidget
          highTide="06:30"
          lowTide="12:45"
          nextHigh="18:50"
          tideState="Rising"
        />
      </WidgetGrid>

      {/* AI Beach Assessment + Pollution Alerts Row */}
      <WidgetGrid columns={2}>
        <AIBeachAssessmentWidget
          confidence={ai?.confidence ?? 92}
          summary={ai?.dailySummary ?? "Beach conditions are favorable for swimming."}
        />
        <PollutionAlertsWidget />
      </WidgetGrid>

      {/* Weather + Beach Map Row */}
      <WidgetGrid columns={2}>
        <WidgetContainer title="Weather" icon="🌤️">
          <div className="flex items-center gap-3">
            <span className="text-4xl">☀️</span>
            <div>
              <p className="text-2xl font-bold text-text-primary leading-none">
                {selectedBuoy?.temp || "28.4°C"}
              </p>
              <p className="text-xs text-text-muted mt-0.5">Sunny</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span>💧</span> Humidity: 72%
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span>💨</span> Wind: 12 km/h
            </div>
          </div>
        </WidgetContainer>
        <BeachMapWidget
          zones={beachBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>
    </motion.div>
  )
}
