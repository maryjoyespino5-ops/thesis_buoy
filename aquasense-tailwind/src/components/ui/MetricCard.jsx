// path: src/components/ui/MetricCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function MetricCard({
  icon,
  value,
  label,
  trend,
  up,
  iconColor,
  className,
  ...props
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "bg-surface rounded-lg p-3 border border-border/50 hover:border-primary-200/50 hover:shadow-sm transition-all",
        className,
      )}
      {...props}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">
          {label}
        </span>
        {icon && (
          <span
            className={cn(
              "text-sm opacity-60",
              iconColor || "text-primary-500",
            )}>
            {icon}
          </span>
        )}
      </div>
      <div className="text-lg font-semibold text-text-primary mt-0.5">
        {value}
      </div>
      {trend && (
        <div className="mt-1">
          <span
            className={cn(
              "text-[9px] font-medium px-1.5 py-0.5 rounded inline-flex items-center gap-0.5",
              up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
            )}>
            {up ? "↑" : "↓"} {trend}
          </span>
        </div>
      )}
    </motion.div>
  );
}
