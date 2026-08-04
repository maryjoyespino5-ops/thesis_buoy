// path: src/pages/community/CommunityBeaches.jsx
import React from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { BeachSafetyWidget } from "../../components/widgets/core/BeachSafetyWidget";
import { BeachWaterQualityWidget } from "../../components/widgets/core/BeachWaterQualityWidget";
import { UVIndexWidget } from "../../components/widgets/core/UVIndexWidget";
import { TrashDensityWidget } from "../../components/widgets/core/TrashDensityWidget";
import { AIBeachAssessmentWidget } from "../../components/widgets/core/AIBeachAssessmentWidget";
import { BeachMapWidget } from "../../components/widgets/core/BeachMapWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

export function CommunityBeaches() {
  const selectedBuoy = buoyData[0];

  // AI processes sensor data — same data for every role, no duplication
  const ai = useAI(selectedBuoy);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Beaches</h1>
        <p className="text-sm text-text-muted mt-1">
          Beach safety, water quality, and conditions
        </p>
      </div>

      {/* Swimming Safety + Water Quality Row */}
      <WidgetGrid columns={2}>
        <BeachSafetyWidget
          safety={ai?.pollutionRisk?.risk === "High" ? "Caution" : "Safe"}
          description={
            ai?.pollutionRisk?.risk === "High"
              ? "Pollution risk detected. Exercise caution."
              : "Conditions are safe for beach activities."
          }
        />
        <BeachWaterQualityWidget />
      </WidgetGrid>

      {/* UV Index + Trash Detection Row */}
      <WidgetGrid columns={2}>
        <UVIndexWidget />
        <TrashDensityWidget
          level={ai?.trashDetection?.level ?? "Low"}
          items={ai?.trashDetection?.items ?? "0-2/100m"}
          confidence={ai?.trashDetection?.confidence ?? 91}
        />
      </WidgetGrid>

      {/* Weather + AI Assessment Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <AIBeachAssessmentWidget
          confidence={ai?.confidence ?? 92}
          summary={ai?.dailySummary ?? "Beach conditions are favorable for swimming. Water quality is within safe limits."}
        />
      </WidgetGrid>

      {/* Beach Map */}
      <WidgetGrid columns={1}>
        <BeachMapWidget />
      </WidgetGrid>
    </motion.div>
  );
}
