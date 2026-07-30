// path: src/components/layout/TopNav.jsx
import React, { useState } from 'react'
import { Bell, Search, Moon, Sun, ChevronDown, Menu, Settings, User, Shield } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../lib/utils'
import { Dropdown } from '../ui/Dropdown'

export function TopNav() {
  const { darkMode, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="topnav h-16" role="banner">
      <div className="topnav-left">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors"
          onClick={() => document.querySelector('.sidebar')?.classList.toggle('open')}
          aria-label="Open sidebar"
        >
          <Menu size={20} className="text-text-secondary" />
        </button>
        <nav aria-label="Breadcrumb">
          <span className="font-semibold text-text-primary">AquaSense</span>
        </nav>
      </div>

      <div className="topnav-right flex items-center gap-3">
        <div className="search-wrap transition-all duration-200 w-48 lg:w-56">
          <Search size={15} className="text-text-placeholder flex-shrink-0" />
          <input
            placeholder="Search buoys, alerts..."
            aria-label="Search buoys and alerts"
            className="bg-transparent border-none outline-none text-sm flex-1 min-w-0 font-sans"
          />
        </div>

        <button
          className="icon-btn relative"
          onClick={() => setNotifOpen(!notifOpen)}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="badge-dot" />
        </button>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Dropdown
          trigger={
            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-surface-muted transition-colors" role="button" aria-label="User menu">
              <div className="avatar" title={user?.name}>
                {user?.name?.charAt(0) || 'J'}
              </div>
              <ChevronDown size={14} className="text-text-muted hidden sm:block" />
            </div>
          }
          items={[
            { label: 'Profile', icon: <User size={14} />, onClick: () => {} },
            { label: 'Settings', icon: <Settings size={14} />, onClick: () => {} },
            { label: 'Sign Out', icon: <Shield size={14} />, danger: true, onClick: () => {} },
          ]}
        />
      </div>
    </header>
  )
}