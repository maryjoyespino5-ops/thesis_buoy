// path: src/components/widgets/system/WidgetRegistry.jsx
import React, { createContext, useContext, useMemo } from "react"

const WidgetRegistryContext = createContext(null)

const widgetMap = new Map()

export function registerWidget(name, component) {
  widgetMap.set(name, component)
}

export function unregisterWidget(name) {
  widgetMap.delete(name)
}

export function getWidget(name) {
  return widgetMap.get(name)
}

export function getRegisteredWidgets() {
  return Array.from(widgetMap.keys())
}

export function WidgetRegistry({ children }) {
  const value = useMemo(
    () => ({ registerWidget, unregisterWidget, getWidget, getRegisteredWidgets }),
    [],
  )

  return (
    <WidgetRegistryContext.Provider value={value}>
      {children}
    </WidgetRegistryContext.Provider>
  )
}

export function useWidgetRegistry() {
  const context = useContext(WidgetRegistryContext)
  if (!context) {
    throw new Error("useWidgetRegistry must be used within WidgetRegistry")
  }
  return context
}
