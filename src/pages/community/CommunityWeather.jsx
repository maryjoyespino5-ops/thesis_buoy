// path: src/pages/community/CommunityWeather.jsx
import React from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { WindWidget } from "../../components/widgets/core/WindWidget";
import { WaveForecastWidget } from "../../components/widgets/core/WaveForecastWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";

export function CommunityWeather() {
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
        <h1 className="text-2xl font-bold text-text-primary">Weather</h1>
        <p className="text-sm text-text-muted mt-1">
          Current conditions and forecasts
        </p>
      </div>

      {/* Temperature + Weather Condition Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay lat={14.62} lon={120.97} />
        <WindWidget />
      </WidgetGrid>

      {/* Wind + Wave Forecast Row */}
      <WidgetGrid columns={2}>
        <WindWidget />
        <WaveForecastWidget />
      </WidgetGrid>
    </motion.div>
  );
}
