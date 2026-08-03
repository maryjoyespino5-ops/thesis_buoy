// path: src/components/widgets/BuoySelector.jsx
import React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";

export function BuoySelector({ buoys, selectedBuoyId, onSelect, className }) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border border-border/50 p-3",
        className
      )}>
      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
        Select Buoy
      </h4>
      <div className="space-y-1">
        {buoys.map((buoy) => (
          <button
            key={buoy.id}
            onClick={() => onSelect(buoy.id)}
            className={cn(
              "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
              selectedBuoyId === buoy.id
                ? "bg-primary-50 text-primary-600 font-medium"
                : "text-text-secondary hover:bg-surface-muted"
            )}>
            <div className="flex items-center justify-between">
              <span>{buoy.name}</span>
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  buoy.status === "green"
                    ? "bg-emerald-500"
                    : buoy.status === "yellow"
                      ? "bg-amber-500"
                      : "bg-red-500"
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
