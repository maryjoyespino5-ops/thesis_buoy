// path: src/components/ui/RoleSelector.jsx
import React from 'react'
import { useRole } from '../../hooks/useRole'
import { cn } from '../../lib/utils'

const roleLabels = {
  admin: 'Administrator',
  lgu: 'LGU Officer',
  bfar: 'BFAR Officer',
  sanctuary: 'Sanctuary Officer',
  researcher: 'Researcher',
  fisherman: 'Fisherman',
}

export function RoleSelector() {
  const { currentRole, switchRole } = useRole()

  return (
    <div className="role-selector" role="tablist" aria-label="Role selector">
      {Object.entries(roleLabels).map(([key, label]) => (
        <button
          key={key}
          role="tab"
          aria-selected={currentRole === key}
          className={cn(
            'role-btn px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-text-secondary transition-colors',
            'hover:bg-surface-muted',
            currentRole === key && 'bg-primary-500 text-white border-primary-500'
          )}
          onClick={() => switchRole(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
