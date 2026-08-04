// path: src/components/dashboards/CommunityDashboard.jsx
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useRole } from "../../hooks/useRole"
import { useAI } from "../../hooks/useAI"
import { WidgetGrid } from "../widgets/system/WidgetGrid"
import { WidgetContainer } from "../widgets/system/WidgetContainer"
import { CurrentWeatherWidget } from "../widgets/core/CurrentWeatherWidget"
import { WaterQualityStatusWidget } from "../widgets/core/WaterQualityStatusWidget"
import { BeachSafetyWidget } from "../widgets/core/BeachSafetyWidget"
import { MarineNewsWidget } from "../widgets/core/MarineNewsWidget"
import { PublicAdvisoriesWidget } from "../widgets/core/PublicAdvisoriesWidget"
import { AIEnvironmentalSummaryWidget } from "../widgets/core/AIEnvironmentalSummaryWidget"
import { InteractiveMapWidget } from "../widgets/core/InteractiveMapWidget"
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
  Users,
  Wifi,
  AlertTriangle,
  Bell,
  ArrowRight,
  Anchor,
} from "lucide-react"
import { cn } from "../../lib/utils"

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}))

export function CommunityDashboard() {
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

  const communityStats = [
    { icon: "Users", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "2",
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "Anchor", value: "8", label: "Posts", trend: "+2", up: true },
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
                Community Member — Local Monitoring
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
                onClick={() => navigate("/community")}
              >
                <span className="text-sm">👥</span> Community
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {communityStats.map((s, i) => (
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

      {/* Current Weather + Water Quality Row */}
      <WidgetGrid columns={2}>
        <CurrentWeatherWidget
          temperature={selectedBuoy?.temp || "28.4°C"}
          condition="Sunny"
          humidity="72%"
          windSpeed="12 km/h"
        />
        <WaterQualityStatusWidget
          status={ai?.waterQualityIndex >= 85 ? "Good" : "Moderate"}
          description="Water is safe for swimming and recreation."
        />
      </WidgetGrid>

      {/* Beach Safety + Marine News Row */}
      <WidgetGrid columns={2}>
        <BeachSafetyWidget
          safety="Safe"
          description="Conditions are safe for beach activities."
        />
        <MarineNewsWidget />
      </WidgetGrid>

      {/* Public Advisories + AI Summary Row */}
      <WidgetGrid columns={2}>
        <PublicAdvisoriesWidget />
        <AIEnvironmentalSummaryWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Overall environmental conditions are good."}
        />
      </WidgetGrid>

      {/* Interactive Map Row */}
      <WidgetGrid columns={1}>
        <InteractiveMapWidget
          zones={communityBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>
    </motion.div>
  )
}
