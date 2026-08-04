// path: src/pages/community/CommunityCoral.jsx
import React from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { CoralHealthIndexWidget } from "../../components/widgets/core/CoralHealthIndexWidget";
import { MarineHealthWidget } from "../../components/widgets/core/MarineHealthWidget";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { PHWidget } from "../../components/widgets/core/PHWidget";
import { DissolvedOxygenWidget } from "../../components/widgets/core/DissolvedOxygenWidget";
import { SalinityWidget } from "../../components/widgets/core/SalinityWidget";
import { PollutionRiskWidget } from "../../components/widgets/core/PollutionRiskWidget";
import { AICoralAssessmentWidget } from "../../components/widgets/core/AICoralAssessmentWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";

export function CommunityCoral() {
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
        <h1 className="text-2xl font-bold text-text-primary">Coral Reef</h1>
        <p className="text-sm text-text-muted mt-1">
          Coral reef health monitoring and assessment
        </p>
      </div>

      {/* Coral Health + Marine Health Row */}
      <WidgetGrid columns={2}>
        <CoralHealthIndexWidget
          index={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
        <MarineHealthWidget
          health={ai?.marineHealthIndex ?? 85}
          confidence={ai?.confidence ?? 94}
        />
      </WidgetGrid>

      {/* Temperature + pH Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <PHWidget />
      </WidgetGrid>

      {/* Dissolved Oxygen + Salinity Row */}
      <WidgetGrid columns={2}>
        <DissolvedOxygenWidget />
        <SalinityWidget />
      </WidgetGrid>

      {/* Pollution Risk + AI Assessment Row */}
      <WidgetGrid columns={2}>
        <PollutionRiskWidget
          risk={ai?.pollutionRisk?.risk ?? "Low"}
          confidence={ai?.pollutionRisk?.confidence ?? 95}
        />
        <AICoralAssessmentWidget
          confidence={ai?.confidence ?? 93}
          summary={ai?.dailySummary ?? "Coral reef conditions are stable. No significant threats detected."}
        />
      </WidgetGrid>
    </motion.div>
  );
}
