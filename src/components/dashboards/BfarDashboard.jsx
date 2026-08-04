// path: src/components/dashboards/BfarDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { FishPopulationTrendsWidget } from "../widgets/core/FishPopulationTrendsWidget"
import { FishingZonesWidget } from "../widgets/core/FishingZonesWidget"
import { FishHabitatScoreWidget } from "../widgets/core/FishHabitatScoreWidget"
import { WaterQualityStatusWidget } from "../widgets/core/WaterQualityStatusWidget"
import { AIFisheriesAnalysisWidget } from "../widgets/core/AIFisheriesAnalysisWidget"
import { HistoricalFishActivityWidget } from "../widgets/core/HistoricalFishActivityWidget"
import { WeatherWidget } from "../widgets/core/WeatherWidget"
import { SonarAnalyticsWidget } from "../widgets/core/SonarAnalyticsWidget"
import { MultiBuoyComparisonWidget } from "../widgets/core/MultiBuoyComparisonWidget"
import { ReportsWidget } from "../widgets/core/ReportsWidget"
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
  Fish,
  Wifi,
  AlertTriangle,
  Bell,
  ArrowRight,
  MapPin,
} from "lucide-react"
import { cn } from "../../lib/utils"

const bfarBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function BfarDashboard() {
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

  const bfarStats = [
    { icon: "Fish", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "2",
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Droplets", value: "3", label: "Water Alerts", trend: "+1", up: false },
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
                BFAR Officer — Fishery & Aquatic Monitoring
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
                onClick={() => navigate("/fish")}
              >
                <Fish size={12} /> Fishery Reports
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {bfarStats.map((s, i) => (
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

      {/* Fish Population Trends + Fishing Zones Row */}
      <WidgetGrid columns={2}>
        <FishPopulationTrendsWidget />
        <FishingZonesWidget
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>

      {/* Fish Habitat Score + Water Quality Row */}
      <WidgetGrid columns={2}>
        <FishHabitatScoreWidget score={ai?.fishHabitatScore ?? 82} />
        <WaterQualityStatusWidget
          status={ai?.waterQualityIndex >= 85 ? "Good" : "Moderate"}
          description="Water quality is within safe limits for fishing activities."
        />
      </WidgetGrid>

      {/* AI Fisheries Analysis + Historical Fish Activity Row */}
      <WidgetGrid columns={2}>
        <AIFisheriesAnalysisWidget
          confidence={ai?.confidence ?? 89}
          summary={ai?.dailySummary ?? "Fish population is stable across all zones."}
        />
        <HistoricalFishActivityWidget />
      </WidgetGrid>

      {/* Weather + Sonar Analytics Row */}
      <WidgetGrid columns={2}>
        <WeatherWidget
          temperature={selectedBuoy?.temp || "28.4°C"}
          condition="Sunny"
          humidity="72%"
          windSpeed="12 km/h"
        />
        <SonarAnalyticsWidget
          depth="12.4m"
          bottomType="Sandy"
          coverage="Good"
          fishDetected="Moderate"
        />
      </WidgetGrid>

      {/* Multi-Buoy Comparison + Reports Row */}
      <WidgetGrid columns={2}>
        <MultiBuoyComparisonWidget
          buoys={buoys}
          selectedIds={comparisonIds}
          onToggleBuoy={handleToggleBuoy}
        />
        <ReportsWidget />
      </WidgetGrid>
    </motion.div>
  )
}
