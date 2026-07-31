// path: src/components/ui/BuoyCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Eye, Brain, Wifi, Battery, Signal } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "./Badge";

const statusConfig = {
  green: { color: "bg-emerald-500", label: "Healthy", variant: "success" },
  yellow: { color: "bg-amber-500", label: "Warning", variant: "warning" },
  red: { color: "bg-red-500", label: "Critical", variant: "danger" },
};

export function BuoyCard({
  buoy,
  onView,
  onFish,
  onSanctuary,
  compact = false,
}) {
  const status = statusConfig[buoy.status] || statusConfig.green;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="bg-surface rounded-lg border border-border/50 hover:border-primary-200/50 hover:shadow-sm transition-all group p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className={cn("w-2 h-2 rounded-full", status.color)} />
          <span className="font-medium text-text-primary text-xs">
            {buoy.name}
          </span>
        </div>
        <Badge variant={status.variant} size="sm">
          {status.label}
        </Badge>
      </div>

      <div className="flex items-center gap-1 text-[10px] text-text-muted mb-2">
        <MapPin size={11} />
        {buoy.coords}
      </div>

      <div className="grid grid-cols-3 gap-1 text-[10px] mb-2">
        <div className="flex justify-between px-1.5 py-0.5 bg-surface-muted/30 rounded">
          <span className="text-text-muted">Temp</span>
          <span className="font-medium text-text-primary">{buoy.temp}</span>
        </div>
        <div className="flex justify-between px-1.5 py-0.5 bg-surface-muted/30 rounded">
          <span className="text-text-muted">pH</span>
          <span className="font-medium text-text-primary">{buoy.ph}</span>
        </div>
        <div className="flex justify-between px-1.5 py-0.5 bg-surface-muted/30 rounded">
          <span className="text-text-muted">DO</span>
          <span className="font-medium text-text-primary">{buoy.do}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <div className="flex items-center gap-2 text-[9px] text-text-muted">
          <span className="flex items-center gap-0.5">
            <Battery size={9} /> {buoy.battery}
          </span>
          <span className="flex items-center gap-0.5">
            <Signal size={9} /> {buoy.signal}
          </span>
        </div>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {onView && (
            <button
              onClick={() => onView(buoy)}
              className="p-1 rounded hover:bg-surface-muted text-text-muted hover:text-primary-500 transition-colors"
              aria-label={`View details for ${buoy.name}`}>
              <Eye size={13} />
            </button>
          )}
          {onFish && (
            <button
              onClick={() => onFish(buoy)}
              className="p-1 rounded hover:bg-surface-muted text-text-muted hover:text-primary-500 transition-colors"
              aria-label={`AI analysis for ${buoy.name}`}>
              <Brain size={13} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
