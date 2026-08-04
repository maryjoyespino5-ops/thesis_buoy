// path: src/pages/community/CommunityFisheries.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WidgetGrid } from "../../components/widgets/system/WidgetGrid";
import { WeatherDisplay } from "../../components/widgets/core/WeatherDisplay";
import { FishProbabilityWidget } from "../../components/widgets/core/FishProbabilityWidget";
import { FishDensityWidget } from "../../components/widgets/core/FishDensityWidget";
import { FishHabitatScoreWidget } from "../../components/widgets/core/FishHabitatScoreWidget";
import { BestFishingTimeWidget } from "../../components/widgets/core/BestFishingTimeWidget";
import { WindWidget } from "../../components/widgets/core/WindWidget";
import { InteractiveMapWidget } from "../../components/widgets/core/InteractiveMapWidget";
import { AIFishingAnalysisWidget } from "../../components/widgets/core/AIFishingAnalysisWidget";
import { buoyData } from "../../api/sampleData";
import { useAI } from "../../hooks/useAI";
import { Fish, MapPin, Clock, Droplets, Thermometer } from "lucide-react";
import { cn } from "../../lib/utils";

const communityBuoys = buoyData.map((b) => ({
  id: b.id,
  name: b.name,
  coords: b.coords,
  status: b.status,
  x: 15 + Math.random() * 70,
  y: 15 + Math.random() * 70,
}));

export function CommunityFisheries() {
  const [buoys, setBuoys] = useState([]);
  const [selectedBuoyId, setSelectedBuoyId] = useState(1);
  const [selectedZone, setSelectedZone] = useState(1);

  useEffect(() => {
    setBuoys(buoyData);
  }, []);

  const selectedBuoy = buoys.find((b) => b.id === selectedBuoyId) || buoys[0];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fisheries</h1>
          <p className="text-sm text-text-muted mt-1">
            Fishing conditions, fish probability, and AI recommendations
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Fish size={16} />
          <span>{selectedBuoy?.name || "Buoy"}</span>
        </div>
      </div>

      {/* Fish Probability + Fish Density Row */}
      <WidgetGrid columns={2}>
        <FishProbabilityWidget
          probability={ai?.fishProbability ?? 70}
          confidence={ai?.confidence ?? 94}
        />
        <FishDensityWidget />
      </WidgetGrid>

      {/* Fish Habitat + Best Fishing Time Row */}
      <WidgetGrid columns={2}>
        <FishHabitatScoreWidget
          score={ai?.fishHabitatScore ?? 75}
          confidence={ai?.confidence ?? 94}
        />
        <BestFishingTimeWidget />
      </WidgetGrid>

      {/* Weather + Wind Row */}
      <WidgetGrid columns={2}>
        <WeatherDisplay
          lat={selectedBuoy?.lat || 14.62}
          lon={selectedBuoy?.lon || 120.97}
        />
        <WindWidget />
      </WidgetGrid>

      {/* Interactive Map */}
      <WidgetGrid columns={1}>
        <InteractiveMapWidget
          zones={communityBuoys}
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />
      </WidgetGrid>

      {/* AI Fishing Recommendation */}
      <WidgetGrid columns={1}>
        <AIFishingAnalysisWidget
          confidence={ai?.confidence ?? 91}
          summary={ai?.dailySummary ?? "High fish activity detected in the Northwest zone. Water conditions are favorable."}
        />
      </WidgetGrid>
    </motion.div>
  );
}
