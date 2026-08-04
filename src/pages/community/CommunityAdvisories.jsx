// path: src/pages/community/CommunityAdvisories.jsx
import React from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { PublicAdvisoriesWidget } from "../../components/widgets/core/PublicAdvisoriesWidget";
import { PollutionAlertsWidget } from "../../components/widgets/core/PollutionAlertsWidget";
import { NotificationsWidget } from "../../components/widgets/core/NotificationsWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";

export function CommunityAdvisories() {
  const selectedBuoy = buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  // Map AI recommendations to PublicAdvisoriesWidget format
  const advisories = (ai?.recommendations ?? []).map((r, i) => ({
    id: i + 1,
    text: r.text,
    type:
      r.priority === "High"
        ? "warning"
        : r.priority === "Medium"
          ? "info"
          : "success",
  }));

  // Map AI risk levels to PollutionAlertsWidget format
  const alerts = (ai?.riskLevels ?? []).map((r, i) => ({
    id: i + 1,
    type: r.label,
    location: "Community Zone",
    severity: r.level,
    time: "Now",
  }));

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

      {/* Public Advisories + Pollution Alerts Row */}
      <WidgetGrid columns={2}>
        <PublicAdvisoriesWidget advisories={advisories} />
        <PollutionAlertsWidget alerts={alerts} />
      </WidgetGrid>

      {/* Notifications */}
      <WidgetGrid columns={1}>
        <NotificationsWidget />
      </WidgetGrid>
    </motion.div>
  );
}
