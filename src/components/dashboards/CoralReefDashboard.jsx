// path: src/components/dashboards/CoralReefDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { MarineHealthWidget } from "../widgets/core/MarineHealthWidget"
import { CoralHealthIndexWidget } from "../widgets/core/CoralHealthIndexWidget"
import { WaterQualityWidget } from "../widgets/core/WaterQualityWidget"
import { DissolvedOxygenWidget } from "../widgets/core/DissolvedOxygenWidget"
import { PHWidget } from "../widgets/core/PHWidget"
import { SalinityWidget } from "../widgets/core/SalinityWidget"
import { PollutionRiskWidget } from "../widgets/core/PollutionRiskWidget"
import { TurbidityWidget } from "../widgets/core/TurbidityWidget"
import { AICoralAssessmentWidget } from "../widgets/core/AICoralAssessmentWidget"
import { HistoricalTrendsWidget } from "../widgets/core/HistoricalTrendsWidget"
import { ReefMonitoringMapWidget } from "../widgets/core/ReefMonitoringMapWidget"
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
  Droplets,
  Anchor,
} from "lucide-react"
import { cn } from "../../lib/utils"

const coralBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function CoralReefDashboard() {
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

  const coralStats = [
    { icon: "Anchor", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "1",
      label: "Reef Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Droplets", value: "Good", label: "Water Quality", trend: "Stable", up: true },
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
                Coral Reef Monitor — Ecosystem Health
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
                onClick={() => navigate("/coral")}
              >
                <span className="text-sm">🪸</span> Reef Data
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {coralStats.map((s, i) => (
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

      {/* Marine Health + Coral Health Index + Water Quality Row */}
      <WidgetGrid columns={3}>
        <MarineHealthWidget health={ai?.marineHealthIndex ?? 94} trend="up" />
        <CoralHealthIndexWidget index={ai?.fishHabitatScore ?? 88} trend="Stable" />
        <WaterQualityWidget quality="Good" turbidity="2.3 NTU" />
      </WidgetGrid>

      {/* Dissolved Oxygen + pH + Salinity Row */}
      <WidgetGrid columns={3}>
        <DissolvedOxygenWidget doLevel="6.7 mg/L" range=">5 mg/L" status="Normal" />
        <PHWidget ph="8.1" range="7.5–8.5" status="Normal" />
        <SalinityWidget salinity="34.2 PSU" range="30–35 PSU" status="Normal" />
      </WidgetGrid>

      {/* Pollution Risk + Turbidity Row */}
      <WidgetGrid columns={2}>
        <PollutionRiskWidget
          level={ai?.pollutionRisk?.risk ?? "Low"}
          confidence={ai?.pollutionRisk?.confidence ?? "96%"}
          trend="Stable"
          desc="No pollutants detected"
        />
        <TurbidityWidget turbidity="2.3 NTU" range="<5 NTU" status="Normal" />
      </WidgetGrid>

      {/* AI Coral Assessment + Historical Trends Row */}
      <WidgetGrid columns={2}>
        <AICoralAssessmentWidget
          confidence={ai?.confidence ?? 94}
          summary={ai?.dailySummary ?? "Coral ecosystem stable. No bleaching indicators."}
        />
        <HistoricalTrendsWidget />
      </WidgetGrid>

      {/* Alerts + Reef Map Row */}
      <WidgetGrid columns={2}>
        <WidgetContainer title="Reef Alerts" icon="🔔">
          <div className="space-y-2">
            {filteredAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center gap-2 text-xs">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    alert.priority === "Critical"
                      ? "bg-red-500"
                      : alert.priority === "Warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500",
                  )}
                />
                <span className="text-text-secondary flex-1 truncate">
                  {alert.buoy}: {alert.desc}
                </span>
                <Badge
                  variant={
                    alert.priority === "Critical"
                      ? "danger"
                      : alert.priority === "Warning"
                        ? "warning"
                        : "success"
                  }
                  size="sm"
                >
                  {alert.priority}
                </Badge>
              </div>
            ))}
          </div>
        </WidgetContainer>
        <ReefMonitoringMapWidget
          zones={coralBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>
    </motion.div>
  )
}
