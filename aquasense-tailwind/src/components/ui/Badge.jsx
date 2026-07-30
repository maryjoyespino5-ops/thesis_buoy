// path: src/components/ui/Badge.jsx
import React from 'react'
import { cn } from '../../lib/utils'

const variantStyles = {
  default: 'bg-surface-muted text-text-secondary',
  primary: 'bg-primary-50 text-primary-600',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-sky-50 text-sky-700',
  healthy: 'bg-emerald-50 text-emerald-700',
  critical: 'bg-red-50 text-red-700',
}

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
