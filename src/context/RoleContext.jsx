// path: src/context/RoleContext.jsx
import React, { createContext, useContext, useState } from 'react'

const RoleContext = createContext()

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) throw new Error('useRole must be used within RoleProvider')
  return context
}

const roles = {
  admin: { label: 'Administrator', icon: 'Shield', description: 'Full system access' },
  fisherman: { label: 'Fisherman', icon: 'Ship', description: 'Fishing activity and buoy data' },
  lgu: { label: 'LGU Environmental Officer', icon: 'Building2', description: 'Local government environmental monitoring' },
  bfar: { label: 'BFAR Officer', icon: 'Fish', description: 'Bureau of Fisheries and Aquatic Resources' },
  research: { label: 'Researcher', icon: 'Microscope', description: 'Marine research and data analysis' },
  community: { label: 'Community Member', icon: 'Users', description: 'Community-based monitoring' },
  beach: { label: 'Beach Monitor', icon: 'Sun', description: 'Beach water quality monitoring' },
  coral_reef: { label: 'Coral Reef Monitor', icon: 'Coral', description: 'Coral reef ecosystem monitoring' },
}

const permissions = {
  admin: [
    'dashboard', 'admin/dashboard', 'ai', 'fish', 'sanctuary', 'monitoring',
    'map', 'buoys', 'alerts', 'reports', 'maintenance', 'history', 'settings', 'profile',
    'weather', 'community', 'beach', 'coral',
  ],
  fisherman: [
    'dashboard', 'ai', 'fish', 'map', 'buoys', 'alerts', 'monitoring', 'weather', 'community',
  ],
  lgu: [
    'dashboard', 'ai', 'alerts', 'reports', 'monitoring', 'map', 'buoys', 'weather', 'community',
  ],
  bfar: [
    'dashboard', 'fish', 'ai', 'reports', 'monitoring', 'map', 'buoys', 'alerts', 'weather',
  ],
  research: [
    'dashboard', 'history', 'ai', 'reports', 'monitoring', 'map', 'buoys', 'fish', 'weather',
  ],
  community: [
    'dashboard', 'map', 'buoys', 'alerts', 'monitoring', 'weather', 'community',
  ],
  beach: [
    'dashboard', 'map', 'buoys', 'alerts', 'monitoring', 'weather', 'beach',
  ],
  coral_reef: [
    'dashboard', 'map', 'buoys', 'alerts', 'monitoring', 'weather', 'coral',
  ],
}

const dashboardWidgets = {
  admin: ['weather', 'buoyStatus', 'metrics', 'sensorChart', 'alertFeed', 'maintenanceTracker', 'aiSuggestion', 'map', 'forecastChart', 'waterQuality', 'fishActivity', 'riskAssessment', 'communityFeed'],
  fisherman: ['weather', 'buoyStatus', 'metrics', 'sensorChart', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'fishActivity', 'riskAssessment'],
  lgu: ['weather', 'buoyStatus', 'metrics', 'sensorChart', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'waterQuality', 'riskAssessment', 'communityFeed'],
  bfar: ['weather', 'buoyStatus', 'metrics', 'sensorChart', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'fishActivity', 'waterQuality', 'riskAssessment'],
  research: ['weather', 'buoyStatus', 'metrics', 'sensorChart', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'waterQuality', 'fishActivity', 'riskAssessment', 'history'],
  community: ['weather', 'buoyStatus', 'metrics', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'communityFeed'],
  beach: ['weather', 'buoyStatus', 'metrics', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'waterQuality'],
  coral_reef: ['weather', 'buoyStatus', 'metrics', 'alertFeed', 'aiSuggestion', 'map', 'forecastChart', 'waterQuality', 'riskAssessment'],
}

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('admin')

  const switchRole = (role) => {
    if (roles[role]) {
      setCurrentRole(role)
    }
  }

  const hasPermission = (page) => {
    const normalized = page.startsWith('/') ? page.slice(1) : page
    return permissions[currentRole]?.includes(normalized) || false
  }

  const getDashboardWidgets = () => {
    return dashboardWidgets[currentRole] || []
  }

  const getRoleLabel = () => {
    return roles[currentRole]?.label || currentRole
  }

  const getRoleIcon = () => {
    return roles[currentRole]?.icon || 'Shield'
  }

  return (
    <RoleContext.Provider value={{ currentRole, roles, switchRole, hasPermission, permissions, getDashboardWidgets, getRoleLabel, getRoleIcon }}>
      {children}
    </RoleContext.Provider>
  )
}
