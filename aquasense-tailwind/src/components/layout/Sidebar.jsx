// path: src/components/layout/Sidebar.jsx
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Brain, Satellite, Map, Ship,
  Bell, FileText, Wrench, Clock, Settings, User, Menu, X,
  Shield, Building2, Fish, Mic, Microscope, Anchor,
} from 'lucide-react'
import { useRole } from '../../hooks/useRole'
import { cn } from '../../lib/utils'

const navGroups = [
  {
    section: 'Overview',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/ai', label: 'AI Command Center', icon: Brain },
    ],
  },
  {
    section: 'Monitoring',
    items: [
      { path: '/monitoring', label: 'Live Monitoring', icon: Satellite },
      { path: '/map', label: 'Interactive Map', icon: Map },
      { path: '/buoys', label: 'Buoy Management', icon: Ship },
      { path: '/fish', label: 'Fish Activity', icon: Fish },
      { path: '/sanctuary', label: 'Sanctuary', icon: Mic },
    ],
  },
  {
    section: 'Reports',
    items: [
      { path: '/alerts', label: 'Alerts', icon: Bell },
      { path: '/history', label: 'History', icon: Clock },
      { path: '/reports', label: 'Reports', icon: FileText },
      { path: '/maintenance', label: 'Maintenance', icon: Wrench },
    ],
  },
  {
    section: 'Account',
    items: [
      { path: '/settings', label: 'Settings', icon: Settings },
      { path: '/profile', label: 'Profile', icon: User },
    ],
  },
]

const adminNavGroups = [
  {
    section: 'Admin',
    items: [
      { path: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield },
    ],
  },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const { hasPermission, currentRole } = useRole()
  const location = useLocation()

  const isActivePath = (path) => {
    const normalized = path.startsWith('/') ? path.slice(1) : path
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const filteredGroups = navGroups
    .map(group => ({
      ...group,
      items: group.items.filter(item => hasPermission(item.path)),
    }))
    .filter(group => group.items.length > 0)

  const adminFilteredGroups = currentRole === 'admin'
    ? adminNavGroups.map(group => ({
        ...group,
        items: group.items.filter(item => hasPermission(item.path)),
      }))
      .filter(group => group.items.length > 0)
    : []

  return (
    <>
      <button
        className="lg:hidden fixed top-3 left-3 z-50 bg-white p-2 rounded-lg border border-border shadow-sm"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside
        className={cn(
          'sidebar fixed lg:relative lg:translate-x-0 transition-transform duration-300 z-40',
          open ? 'open translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="sidebar-brand">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-lg flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <span>AquaSense</span>
        </div>

        <nav className="sidebar-nav flex-1 overflow-y-auto" aria-label="Main navigation">
          {currentRole === 'admin' && adminFilteredGroups.map((group, gi) => (
            <div key={gi} className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted px-4 mb-3">
                {group.section}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = isActivePath(item.path)
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'sidebar-nav-link flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        'text-text-secondary hover:bg-surface-muted hover:text-text-primary',
                        active && 'bg-primary-50 text-primary-600 font-semibold'
                      )}
                    >
                      <Icon size={18} className={cn(active ? 'text-primary-500' : 'text-text-muted')} />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
          {filteredGroups.map((group, gi) => (
            <div key={gi} className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted px-4 mb-3">
                {group.section}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = isActivePath(item.path)
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'sidebar-nav-link flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        'text-text-secondary hover:bg-surface-muted hover:text-text-primary',
                        active && 'bg-primary-50 text-primary-600 font-semibold'
                      )}
                    >
                      <Icon size={18} className={cn(active ? 'text-primary-500' : 'text-text-muted')} />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom border-t border-border pt-4 mt-2">
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
          >
            <User size={18} className="text-text-muted" />
            <span>Profile</span>
          </NavLink>
          <a
            href="/login"
            onClick={(e) => { e.preventDefault(); window.location.reload() }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
          >
            <Shield size={18} className="text-text-muted" />
            <span>Sign Out</span>
          </a>
        </div>
      </aside>
    </>
  )
}