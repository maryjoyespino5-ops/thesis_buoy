// path: src/components/ui/RoleSelector.jsx
import React from "react";
import { useRole } from "../../hooks/useRole";
import { cn } from "../../lib/utils";

const roleLabels = {
  admin: "Admin",
  lgu: "LGU",
  bfar: "BFAR",
  sanctuary: "Sanctuary",
  researcher: "Researcher",
  fisherman: "Fisherman",
};

export function RoleSelector() {
  const { currentRole, switchRole } = useRole();

  return (
    <div
      className="flex flex-wrap gap-1"
      role="tablist"
      aria-label="Role selector">
      {Object.entries(roleLabels).map(([key, label]) => (
        <button
          key={key}
          role="tab"
          aria-selected={currentRole === key}
          className={cn(
            "px-2.5 py-1 rounded-md border text-sm font-medium transition-all",
            "hover:bg-surface-muted",
            currentRole === key
              ? "bg-primary-500 text-white border-primary-500 shadow-sm"
              : "bg-surface text-text-secondary border-border/50 hover:border-border",
          )}
          onClick={() => switchRole(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}
