// path: src/components/ui/ModuleCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function ModuleCard({ icon, title, status, tag, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className="bg-surface rounded-lg p-3.5 border border-border/50 hover:border-primary-200/50 hover:shadow-sm transition-all cursor-pointer group">
      <div className="w-8 h-8 bg-primary-50 rounded-md flex items-center justify-center mb-2 group-hover:bg-primary-100 transition-colors">
        {icon}
      </div>
      <h4 className="text-xs font-semibold text-text-primary mb-0.5">
        {title}
      </h4>
      <p className="text-[10px] text-text-secondary">{status}</p>
      {tag && (
        <span className="inline-block mt-1.5 text-[9px] font-medium text-primary-500 bg-primary-50 px-1.5 py-0.5 rounded">
          {tag}
        </span>
      )}
    </motion.div>
  );
}
