// path: src/lib/buoyService.js
/**
 * Centralized buoy data service.
 *
 * Currently returns data for ONE deployed buoy (Buoy 01).
 * When additional buoys are deployed, simply add entries to buoyData
 * or fetch from Supabase — the rest of the app stays unchanged.
 */

const BUOY_ID = 1

const buoyData = [
  {
    id: BUOY_ID,
    name: "Buoy 01",
    coords: "14.62°N, 120.97°E",
    lat: 14.62,
    lon: 120.97,
    status: "green",
    temp: "28.6°C",
    salinity: "34.4 PSU",
    ph: "8.1",
    do: "6.7 mg/L",
    turb: "2.3 NTU",
    battery: "98%",
    solarVoltage: "12.4V",
    signal: "Excellent",
    fishActivity: "Moderate",
    lastUpdate: "2h ago",
    esp32Status: "Online",
    calibrationDate: "2026-07-15",
    deviceLogs: "No errors",
  },
]

export const alerts = [
  { time: "10m ago", buoy: "Buoy 01", desc: "Water temperature rising above normal range", priority: "Warning" },
  { time: "1h ago", buoy: "Buoy 01", desc: "Fish activity detected near Buoy 01", priority: "Info" },
  { time: "2h ago", buoy: "Buoy 01", desc: "Salinity levels within normal range", priority: "Info" },
  { time: "3h ago", buoy: "Buoy 01", desc: "Wind speed increasing — small craft advisory", priority: "Warning" },
  { time: "5h ago", buoy: "Buoy 01", desc: "Battery level stable at 98%", priority: "Info" },
]

export const heroStats = [
  { icon: "Ship", value: "1", label: "Active Buoy", trend: "Online", up: true },
  { icon: "Wifi", value: "1", label: "Online", trend: "100%", up: true },
  { icon: "AlertTriangle", value: "1", label: "Advisory", trend: "Active", up: false },
  { icon: "Thermometer", value: "28.6°C", label: "Water Temp", trend: "+0.3°", up: true },
]

export const sensorData = {
  temperature: 28.6,
  salinity: 34.4,
  ph: 8.1,
  do: 6.7,
  turbidity: 2.3,
  battery: 98,
  solarVoltage: 12.4,
  signal: "Excellent",
  fishActivity: "Moderate",
  status: "green",
}

export const maintenanceData = [
  { task: "Calibration check", status: "Completed", date: "2026-07-15" },
  { task: "Battery inspection", status: "Scheduled", date: "2026-08-10" },
  { task: "Solar panel cleaning", status: "Pending", date: "2026-08-15" },
  { task: "Firmware update", status: "Completed", date: "2026-06-28" },
]

/**
 * Get the single deployed buoy.
 * Future: replace with a Supabase fetch for multiple buoys.
 */
export function getBuoy(id = BUOY_ID) {
  return buoyData.find((b) => b.id === id) || buoyData[0]
}

/**
 * Get all buoys. Currently returns one buoy.
 * Future: replace with a Supabase fetch.
 */
export function getAllBuoys() {
  return buoyData
}

/**
 * Get buoy by ID. Returns the single buoy if only one exists.
 */
export function getBuoyById(id) {
  return buoyData.find((b) => b.id === Number(id)) || buoyData[0]
}

/**
 * Get the current buoy (the one deployed).
 */
export function getCurrentBuoy() {
  return buoyData[0]
}

export default { getBuoy, getAllBuoys, getBuoyById, getCurrentBuoy, buoyData, alerts, heroStats, sensorData, maintenanceData }
