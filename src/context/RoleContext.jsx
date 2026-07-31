// path: src/context/RoleContext.jsx
import React, { createContext, useContext, useState } from 'react'

const RoleContext = createContext()

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) throw new Error('useRole must be used within RoleProvider')
  return context
}

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('admin')

  const roles = {
    admin: { label: 'Administrator', icon: 'Shield' },
    lgu: { label: 'LGU Environmental Officer', icon: 'Building' },
    bfar: { label: 'BFAR Officer', icon: 'Fish' },
    sanctuary: { label: 'Marine Sanctuary Officer', icon: 'Mic' },
    researcher: { label: 'Researcher', icon: 'Microscope' },
    fisherman: { label: 'Fisherman', icon: 'Ship' },
  }

  const permissions = {
    admin: ['dashboard', 'admin/dashboard', 'ai', 'fish', 'sanctuary', 'monitoring', 'map', 'buoys', 'alerts', 'reports', 'maintenance', 'history', 'settings', 'profile'],
    lgu: ['dashboard', 'ai', 'alerts', 'reports', 'monitoring'],
    bfar: ['dashboard', 'fish', 'ai', 'reports', 'monitoring'],
    sanctuary: ['dashboard', 'sanctuary', 'map', 'alerts', 'monitoring'],
    researcher: ['dashboard', 'history', 'ai', 'reports', 'monitoring'],
    fisherman: ['dashboard', 'fish', 'map', 'alerts'],
  }

  const switchRole = (role) => setCurrentRole(role)
  const hasPermission = (page) => {
    const normalized = page.startsWith('/') ? page.slice(1) : page
    return permissions[currentRole]?.includes(normalized) || false
  }

  return (
    <RoleContext.Provider value={{ currentRole, roles, switchRole, hasPermission, permissions }}>
      {children}
    </RoleContext.Provider>
  )
}
