// path: src/components/ui/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

export function Dropdown({ trigger, items, className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={cn('relative inline-block', className)} ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-border shadow-lg shadow-black/5 py-1 z-50 animate-fade-in">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick?.(); setOpen(false) }}
              className={cn(
                'w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors flex items-center gap-2',
                item.danger && 'text-red-600 hover:bg-red-50'
              )}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
