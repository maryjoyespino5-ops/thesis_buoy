// path: src/pages/community/CommunityMap.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { InteractiveMapWidget } from "../../components/widgets/core/InteractiveMapWidget";
import { MapWidget } from "../../components/widgets/core/MapWidget";
import { WaterQualityStatusWidget } from "../../components/widgets/core/WaterQualityStatusWidget";
import { FishProbabilityWidget } from "../../components/widgets/core/FishProbabilityWidget";
import { AIEnvironmentalSummaryWidget } from "../../components/widgets/core/AIEnvironmentalSummaryWidget";
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

export function CommunityMap() {
  const [selectedZone, setSelectedZone] = useState(1);
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
        <h1 className="text-2xl font-bold text-text-primary">Map</h1>
        <p className="text-sm text-text-muted mt-1">
          Interactive community map with live buoy data
        </p>
      </div>

      {/* Interactive Map */}
      <WidgetGrid columns={1}>
        <InteractiveMapWidget
          zones={communityBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>

      {/* Current Buoy + Weather Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <WaterQualityStatusWidget
          status={ai?.waterQualityIndex >= 85 ? "Good" : "Moderate"}
          description={
            ai?.waterQualityIndex >= 85
              ? "Water quality is within safe limits."
              : "Water quality is moderate. Monitor conditions."
          }
        />
      </WidgetGrid>

      {/* Fish Probability + AI Summary Row */}
      <WidgetGrid columns={2}>
        <FishProbabilityWidget
          probability={ai?.fishProbability ?? 70}
          confidence={ai?.confidence ?? 94}
        />
        <AIEnvironmentalSummaryWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Overall environmental conditions are good."}
        />
      </WidgetGrid>

      {/* Map Widget */}
      <WidgetGrid columns={1}>
        <MapWidget />
      </WidgetGrid>
    </motion.div>
  );
}
