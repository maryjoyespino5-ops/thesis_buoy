// path: src/components/ui/SearchInput.jsx
import React from 'react'
import { cn } from '../../lib/utils'

export function SearchInput({ placeholder = 'Search...', value, onChange, className, icon, ...props }) {
  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-surface-muted',
      'focus-within:border-primary-400 focus-within:bg-white focus-within:shadow-sm transition-all',
      className
    )}>
      {icon || (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a99b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      )}
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-placeholder font-sans"
        aria-label={placeholder}
        {...props}
      />
    </div>
  )
}
