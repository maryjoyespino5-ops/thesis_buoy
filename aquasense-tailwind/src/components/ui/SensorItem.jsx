// path: src/components/ui/SensorItem.jsx
import React from "react";
import { cn } from "../../lib/utils";

export function SensorItem({ label, value, range, status, contrib }) {
  return (
    <div className="bg-surface-muted/50 rounded-md p-2.5 border border-border/30">
      <div className="text-[8px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </div>
      <div className="text-sm font-semibold text-text-primary">{value}</div>
      <div className="text-[9px] text-text-muted mt-0.5">
        {status} · AI {contrib}
      </div>
    </div>
  );
}
