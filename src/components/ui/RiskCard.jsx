// path: src/components/ui/RiskCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function RiskCard({ label, level, confidence, trend, color, desc }) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      className="bg-surface rounded-lg p-3.5 border border-border/50 border-l-2 hover:shadow-sm transition-all"
      style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-primary">{label}</span>
        <span className="text-[10px] font-medium" style={{ color }}>
          {level}
        </span>
      </div>
      <div className="text-[10px] text-text-muted mt-0.5">
        Confidence {confidence} · {trend}
      </div>
      <div className="text-[10px] text-text-secondary mt-1">{desc}</div>
    </motion.div>
  );
}
