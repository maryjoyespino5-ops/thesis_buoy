// path: src/components/dashboards/FishermanDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { FishProbabilityWidget } from "../widgets/core/FishProbabilityWidget"
import { FishDensityWidget } from "../widgets/core/FishDensityWidget"
import { SonarWidget } from "../widgets/core/SonarWidget"
import { FishingRecommendationWidget } from "../widgets/core/FishingRecommendationWidget"
import { WeatherWidget } from "../widgets/core/WeatherWidget"
import { WindWidget } from "../widgets/core/WindWidget"
import { WaveForecastWidget } from "../widgets/core/WaveForecastWidget"
import { BestFishingTimeWidget } from "../widgets/core/BestFishingTimeWidget"
import { AIFishingAnalysisWidget } from "../widgets/core/AIFishingAnalysisWidget"
import { MapWidget } from "../widgets/core/MapWidget"
import { NearbyBuoysWidget } from "../widgets/core/NearbyBuoysWidget"
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
import { cn } from "../../lib/utils"
import {
  Fish,
  Wifi,
  AlertTriangle,
  Bell,
  ArrowRight,
  MapPin,
  Ship,
} from "lucide-react"

const fishermanBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function FishermanDashboard() {
  const { user } = useAuth()
  const { currentRole } = useRole()
  const navigate = useNavigate()
  const [selectedBuoyId, setSelectedBuoyId] = useState(1)
  const [alertFilter, setAlertFilter] = useState("All")

  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0]
  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter)

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy)

  const fishermanStats = [
    { icon: "Ship", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "1",
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Fish", value: "High", label: "Fish Activity", trend: "↑", up: true },
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
                Fisherman Dashboard — Fishing Activity & Buoy Data
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
                <Fish size={12} /> Fish Activity
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {fishermanStats.map((s, i) => (
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

      {/* Weather + Wind + Wave Forecast Row */}
      <WidgetGrid columns={3}>
        <WeatherWidget
          temperature={selectedBuoy?.temp || "28.4°C"}
          condition="Sunny"
          humidity="72%"
          windSpeed="12 km/h"
        />
        <WindWidget speed="12 km/h" direction="NE" gusts="18 km/h" />
        <WaveForecastWidget height="1.2m" period="8s" direction="NE" />
      </WidgetGrid>

      {/* Fish Probability + Fish Density + Sonar Row */}
      <WidgetGrid columns={3}>
        <FishProbabilityWidget
          probability={ai?.fishProbability ?? 87}
          trend="up"
        />
        <FishDensityWidget density="Medium" count="200-400" />
        <SonarWidget depth="6.4m" bottomType="Sandy" coverage="Good" />
      </WidgetGrid>

      {/* AI Fishing Analysis + Fishing Recommendation Row */}
      <WidgetGrid columns={2}>
        <AIFishingAnalysisWidget
          confidence={ai?.confidence ?? 91}
          summary={ai?.dailySummary ?? "High fish activity detected in the Northwest zone."}
        />
        <FishingRecommendationWidget
          zone="Northwest"
          confidence={ai?.confidence ?? 91}
          reason={ai?.recommendations?.[0]?.text ?? "Optimal temperature and DO levels."}
        />
      </WidgetGrid>

      {/* Best Fishing Time + Alerts Row */}
      <WidgetGrid columns={2}>
        <BestFishingTimeWidget bestTime="05:00 - 08:00" nextBest="17:00 - 20:00" />
        <WidgetContainer title="Alerts" icon="🔔">
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
      </WidgetGrid>

      {/* Map + Nearby Buoys Row */}
      <WidgetGrid columns={2}>
        <MapWidget
          buoys={fishermanBuoys}
          selectedBuoyId={selectedBuoyId}
          onSelectBuoy={setSelectedBuoyId}
        />
        <NearbyBuoysWidget
          buoys={fishermanBuoys}
          selectedBuoyId={selectedBuoyId}
          onSelectBuoy={setSelectedBuoyId}
        />
      </WidgetGrid>
    </motion.div>
  )
}
