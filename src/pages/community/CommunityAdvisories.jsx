// path: src/pages/community/CommunityAdvisories.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { PublicAdvisoriesWidget } from "../../components/widgets/core/PublicAdvisoriesWidget";
import { PollutionAlertsWidget } from "../../components/widgets/core/PollutionAlertsWidget";
import { NotificationsWidget } from "../../components/widgets/core/NotificationsWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Megaphone, AlertTriangle, Info, CheckCircle, Clock, MapPin, Shield } from "lucide-react";
import { cn } from "../../lib/utils";

// Sample advisories data
const advisoriesData = [
  {
    id: 1,
    title: "High Bacteria Levels at South Cove",
    category: "Water Quality",
    severity: "Critical",
    affectedArea: "South Cove, Zone C",
    issueDate: "2026-08-03",
    description: "Bacteria levels exceeded safe limits. Avoid swimming and water contact.",
    status: "Active",
  },
  {
    id: 2,
    title: "Fish Kill Reported at East Shore",
    category: "Fisheries",
    severity: "Warning",
    affectedArea: "East Shore, Zone D",
    issueDate: "2026-08-02",
    description: "Small-scale fish kill event observed. Investigating potential causes.",
    status: "Active",
  },
  {
    id: 3,
    title: "Beach Cleanup Event This Saturday",
    category: "Community",
    severity: "Info",
    affectedArea: "North Beach, Zone A",
    issueDate: "2026-08-01",
    description: "Community beach cleanup scheduled for Saturday 9AM-12PM. Volunteers welcome.",
    status: "Active",
  },
  {
    id: 4,
    title: "Water Quality Improved in Zone A",
    category: "Water Quality",
    severity: "Info",
    affectedArea: "North Beach, Zone A",
    issueDate: "2026-07-31",
    description: "Recent water quality tests show improvement. Safe for all beach activities.",
    status: "Resolved",
  },
  {
    id: 5,
    title: "Coral Bleaching Alert - Reef Delta",
    category: "Coral Reef",
    severity: "Warning",
    affectedArea: "West Zone",
    issueDate: "2026-07-30",
    description: "Moderate bleaching observed at Reef Delta. Monitoring closely.",
    status: "Active",
  },
  {
    id: 6,
    title: "Fishing Allowed in All Zones Today",
    category: "Fisheries",
    severity: "Info",
    affectedArea: "All Zones",
    issueDate: "2026-08-03",
    description: "Fishing is permitted in all zones. Please follow catch limits.",
    status: "Active",
  },
];

const severityConfig = {
  Critical: { color: "text-red-500 bg-red-50", icon: AlertTriangle },
  Warning: { color: "text-amber-500 bg-amber-50", icon: AlertTriangle },
  Info: { color: "text-sky-500 bg-sky-50", icon: Info },
};

const categories = ["All", "Water Quality", "Fisheries", "Community", "Coral Reef"];

export function CommunityAdvisories() {
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [advisoryFilter, setAdvisoryFilter] = useState("All");
  const selectedBuoy = buoyData.find((b) => b.id === selectedBuoyId) || buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  const filteredAdvisories = advisoryFilter === "All"
    ? advisoriesData
    : advisoriesData.filter((a) => a.category === advisoryFilter);

  const activeCount = advisoriesData.filter((a) => a.status === "Active").length;
  const criticalCount = advisoriesData.filter((a) => a.severity === "Critical").length;

  const advisoryStats = [
    { label: "Total Advisories", value: String(advisoriesData.length), icon: Megaphone },
    { label: "Active", value: String(activeCount), icon: Clock },
    { label: "Critical", value: String(criticalCount), icon: AlertTriangle },
    { label: "Resolved", value: String(advisoriesData.filter((a) => a.status === "Resolved").length), icon: CheckCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Advisories</h1>
        <p className="text-sm text-text-muted mt-1">
          AI-generated advisories and alerts
        </p>
      </div>

      {/* Advisory Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {advisoryStats.map((s, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-primary-500" />
              <span className="text-xs text-text-muted">{s.label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Public Advisories + Pollution Alerts Row */}
      <WidgetGrid columns={2}>
        <PublicAdvisoriesWidget
          advisories={ai?.recommendations?.map((r, i) => ({
            id: i + 1,
            text: r.text,
            type:
              r.priority === "High"
                ? "warning"
                : r.priority === "Medium"
                  ? "info"
                  : "success",
          })) ?? [
            { id: 1, text: "Swimming recommended at North Beach", type: "info" },
            { id: 2, text: "Avoid South Cove — high bacteria levels", type: "warning" },
            { id: 3, text: "Fishing allowed in all zones today", type: "success" },
          ]}
        />
        <PollutionAlertsWidget
          alerts={ai?.riskLevels?.map((r, i) => ({
            id: i + 1,
            type: r.label,
            location: "Community Zone",
            severity: r.level,
            time: "Now",
          })) ?? [
            { id: 1, type: "Oil Slick", location: "North Beach", severity: "Warning", time: "2h ago" },
            { id: 2, type: "Plastic Debris", location: "South Cove", severity: "Info", time: "5h ago" },
            { id: 3, type: "Algae Bloom", location: "East Shore", severity: "Critical", time: "1d ago" },
          ]}
        />
      </WidgetGrid>

      {/* Advisories Table */}
      <Card className="bg-surface rounded-lg border border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Megaphone size={14} className="text-primary-500" />
            All Advisories
          </CardTitle>
          <div className="flex gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setAdvisoryFilter(c)}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-md transition-colors",
                  advisoryFilter === c
                    ? "bg-primary-500 text-white"
                    : "bg-surface-muted/50 text-text-muted hover:text-text-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Title</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Category</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Severity</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Area</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Date</th>
                  <th className="text-left px-3 py-2 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvisories.map((adv) => (
                  <tr key={adv.id} className="border-b border-border/10 hover:bg-surface-muted/30 transition-colors">
                    <td className="px-3 py-2 text-text-primary font-medium">{adv.title}</td>
                    <td className="px-3 py-2 text-text-secondary">{adv.category}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        severityConfig[adv.severity]?.color || "bg-sky-50 text-sky-700"
                      )}>{adv.severity}</span>
                    </td>
                    <td className="px-3 py-2 text-text-secondary">{adv.affectedArea}</td>
                    <td className="px-3 py-2 text-text-muted">{adv.issueDate}</td>
                    <td className="px-3 py-2">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-medium",
                        adv.status === "Active"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      )}>{adv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <WidgetGrid columns={1}>
        <NotificationsWidget />
      </WidgetGrid>
    </motion.div>
  );
}
