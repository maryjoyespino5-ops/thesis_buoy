// path: src/components/dashboards/LGUDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";
import { MetricCard } from "../../components/ui/MetricCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { WeatherCard } from "../../components/ui/WeatherCard";
import { BuoySelector } from "../../components/widgets/BuoySelector";
import { AISuggestionCard } from "../../components/widgets/AISuggestionCard";
import { AlertFeed } from "../../components/widgets/AlertFeed";
import { ForecastChart } from "../../components/widgets/ForecastChart";
import { WaterQualityCard } from "../../components/widgets/WaterQualityCard";
import { RiskAssessmentCard } from "../../components/widgets/RiskAssessmentCard";
import { CommunityFeedCard } from "../../components/widgets/CommunityFeedCard";
import { MapWidget } from "../../components/widgets/MapWidget";
import {
  buoyData,
  alerts,
} from "../../api/sampleData";
import {
  Building2,
  Wifi,
  AlertTriangle,
  Thermometer,
  Droplets,
  Bell,
  ArrowRight,
  MapPin,
  FileText,
} from "lucide-react";

export function LGUDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [buoys, setBuoys] = useState([]);
  const [alertFilter, setAlertFilter] = useState("All");
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const filteredAlerts =
    alertFilter === "All"
      ? alerts
      : alerts.filter((a) => a.priority === alertFilter);

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0];

  const lguStats = [
    { icon: "Building2", value: "5", label: "Buoys", trend: "+1", up: true },
    { icon: "Wifi", value: "4", label: "Online", trend: "80%", up: true },
    {
      icon: "AlertTriangle",
      value: "2",
      label: "Alerts",
      trend: "+1",
      up: false,
    },
    { icon: "FileText", value: "3", label: "Reports", trend: "+1", up: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4">
      <Card className="border-l-2 border-l-primary-500 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                Good morning, {user?.name?.split(" ")[0] || "John"}
              </h1>
              <p className="text-sm text-text-muted">
                LGU Environmental Officer — Monitoring & Reports
              </p>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/alerts")}>
                <Bell size={12} /> Alerts
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-sm px-3"
                onClick={() => navigate("/reports")}>
                <FileText size={12} /> Reports
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {lguStats.map((s, i) => (
              <div
                key={i}
                className="bg-surface-muted/50 rounded-md px-3 py-1.5 text-center">
                <div className="text-xl font-bold text-text-primary leading-tight">
                  {s.value}
                </div>
                <div className="text-xs text-text-muted uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <WeatherCard buoyName={selectedBuoy?.name} />
        </div>
        <div>
          <BuoySelector
            buoys={buoys}
            selectedBuoyId={selectedBuoyId}
            onSelect={setSelectedBuoyId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <AISuggestionCard />
        <AlertFeed
          alerts={filteredAlerts.slice(0, 4)}
          alertFilter={alertFilter}
          setAlertFilter={setAlertFilter}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <WaterQualityCard />
        <RiskAssessmentCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ForecastChart />
        <MapWidget />
      </div>

      <CommunityFeedCard />
    </motion.div>
  );
}
