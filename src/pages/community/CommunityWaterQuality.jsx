// path: src/pages/community/CommunityWaterQuality.jsx
import React from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WaterQualityWidget } from "../../components/widgets/core/WaterQualityWidget";
import { PHWidget } from "../../components/widgets/core/PHWidget";
import { SalinityWidget } from "../../components/widgets/core/SalinityWidget";
import { DissolvedOxygenWidget } from "../../components/widgets/core/DissolvedOxygenWidget";
import { TurbidityWidget } from "../../components/widgets/core/TurbidityWidget";
import { WaterQualityIndexWidget } from "../../components/widgets/core/WaterQualityIndexWidget";
import { HistoricalTrendsWidget } from "../../components/widgets/core/HistoricalTrendsWidget";
import { AIAnalysisWidget } from "../../components/widgets/core/AIAnalysisWidget";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";

export function CommunityWaterQuality() {
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
        <h1 className="text-2xl font-bold text-text-primary">Water Quality</h1>
        <p className="text-sm text-text-muted mt-1">
          Water quality metrics, trends, and AI analysis
        </p>
      </div>

      {/* Temperature + pH Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <PHWidget />
      </WidgetGrid>

      {/* Salinity + Dissolved Oxygen Row */}
      <WidgetGrid columns={2}>
        <SalinityWidget />
        <DissolvedOxygenWidget />
      </WidgetGrid>

      {/* Turbidity + Water Quality Index Row */}
      <WidgetGrid columns={2}>
        <TurbidityWidget />
        <WaterQualityIndexWidget
          wqi={ai?.waterQualityIndex ?? 80}
          confidence={ai?.confidence ?? 94}
        />
      </WidgetGrid>

      {/* Historical Trends + AI Analysis Row */}
      <WidgetGrid columns={2}>
        <HistoricalTrendsWidget />
        <AIAnalysisWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Water quality conditions are stable. No anomalies detected."}
          recommendations={ai?.recommendations ?? []}
        />
      </WidgetGrid>
    </motion.div>
  );
}
