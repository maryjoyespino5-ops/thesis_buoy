// path: src/api/sampleData.js
export const buoyData = [
  { id: 1, name: 'Buoy 01', coords: '14.62°N, 120.97°E', status: 'green', temp: '28.6°C', salinity: '34.4 PSU', ph: '8.1', do: '6.7 mg/L', turb: '2.3 NTU', battery: '98%', signal: 'Excellent', fishActivity: 'Moderate' },
  { id: 2, name: 'Buoy 02', coords: '14.58°N, 121.02°E', status: 'yellow', temp: '29.1°C', salinity: '34.9 PSU', ph: '8.0', do: '5.9 mg/L', turb: '3.1 NTU', battery: '81%', signal: 'Strong', fishActivity: 'High' },
  { id: 3, name: 'Buoy 03', coords: '14.70°N, 120.90°E', status: 'green', temp: '27.9°C', salinity: '33.8 PSU', ph: '8.2', do: '7.1 mg/L', turb: '1.8 NTU', battery: '93%', signal: 'Excellent', fishActivity: 'Moderate' },
  { id: 4, name: 'Buoy 04', coords: '14.48°N, 121.10°E', status: 'red', temp: '30.2°C', salinity: '34.0 PSU', ph: '7.8', do: '5.2 mg/L', turb: '4.0 NTU', battery: '67%', signal: 'Moderate', fishActivity: 'Low' },
  { id: 5, name: 'Buoy 05', coords: '14.80°N, 120.85°E', status: 'green', temp: '28.2°C', salinity: '34.2 PSU', ph: '8.0', do: '6.9 mg/L', turb: '2.1 NTU', battery: '96%', signal: 'Excellent', fishActivity: 'Moderate' },
]

export const stats = [
  { icon: 'Ship', value: '14', label: 'Total Buoys', trend: '+2', up: true },
  { icon: 'Wifi', value: '12', label: 'Online', trend: '92%', up: true },
  { icon: 'AlertTriangle', value: '2', label: 'Offline', trend: '-1', up: false },
  { icon: 'Thermometer', value: '28.6°C', label: 'Avg Temp', trend: '+0.4°', up: true },
  { icon: 'Flask', value: '34.2 PSU', label: 'Avg Salinity', trend: '-0.1', up: false },
  { icon: 'Droplets', value: '8.1', label: 'Avg pH', trend: '+0.05', up: true },
  { icon: 'Bolt', value: '6.8 mg/L', label: 'Avg DO', trend: '-0.3', up: false },
  { icon: 'Eye', value: '2.4 NTU', label: 'Avg Turbidity', trend: '+0.2', up: false },
]

export const heroStats = [
  { num: '28.6°C', label: 'Sea temp' },
  { num: '7.9', label: 'pH' },
  { num: '6.7 mg/L', label: 'DO' },
  { num: '94%', label: 'Health' },
]

export const riskData = [
  { label: 'Fish Kill Risk', level: 'Low', confidence: '94%', trend: 'Stable', color: '#2c9f6b', desc: 'No immediate threat' },
  { label: 'Algal Bloom Risk', level: 'Moderate', confidence: '88%', trend: 'Increasing', color: '#d4a13e', desc: 'Slight nutrient increase' },
  { label: 'Pollution Risk', level: 'Low', confidence: '96%', trend: 'Stable', color: '#2c9f6b', desc: 'No pollutants detected' },
  { label: 'Low Oxygen Risk', level: 'Moderate', confidence: '91%', trend: 'Increasing', color: '#d4a13e', desc: 'DO decreasing at Buoy 02' },
  { label: 'Acidification Risk', level: 'Low', confidence: '93%', trend: 'Stable', color: '#2c9f6b', desc: 'pH within normal range' },
  { label: 'High Temperature Risk', level: 'Low', confidence: '95%', trend: 'Stable', color: '#2c9f6b', desc: 'Temp stable' },
]

export const predictions = [
  { label: 'Next 6h', val: 'Stable', desc: 'No significant changes expected' },
  { label: 'Next 24h', val: 'Slight DO drop', desc: 'Overnight decrease possible' },
  { label: 'Next 3 Days', val: 'Stable', desc: 'Conditions remain favorable' },
  { label: 'Next Week', val: 'Good', desc: 'Minor temp fluctuation' },
]

export const recommendations = [
  { text: 'Inspect Buoy 03 within 48 hours', priority: 'High', reason: 'Turbidity increase' },
  { text: 'Continue routine monitoring', priority: 'Medium', reason: 'Stable conditions' },
  { text: 'Increase sampling frequency at Buoy 02', priority: 'High', reason: 'DO decreasing' },
  { text: 'Calibrate sensors on Buoy 04', priority: 'Medium', reason: 'Battery low' },
]

export const sensorData = [
  { label: 'Temperature', value: '28.6°C', range: '25-30°C', status: 'Normal', contrib: '32%' },
  { label: 'Dissolved Oxygen', value: '6.7 mg/L', range: '>5 mg/L', status: 'Normal', contrib: '24%' },
  { label: 'pH', value: '8.1', range: '7.5-8.5', status: 'Normal', contrib: '18%' },
  { label: 'Salinity', value: '34.2 PSU', range: '30-35 PSU', status: 'Normal', contrib: '12%' },
  { label: 'Turbidity', value: '2.4 NTU', range: '<5 NTU', status: 'Normal', contrib: '8%' },
  { label: 'Weather', value: 'Sunny', range: '-', status: 'Normal', contrib: '6%' },
]

export const alerts = [
  { time: '14:22', buoy: 'Buoy 04', desc: 'Battery low (67%)', priority: 'Warning' },
  { time: '13:10', buoy: 'Buoy 02', desc: 'Dissolved oxygen dropped to 5.9 mg/L', priority: 'Critical' },
  { time: '11:45', buoy: 'Buoy 03', desc: 'Firmware update available', priority: 'Info' },
  { time: '09:30', buoy: 'Buoy 01', desc: 'Calibration due in 3 days', priority: 'Info' },
]

export const maintenanceData = [
  { buoy: 'Buoy 04', task: 'Battery replacement', due: '2026-08-02', status: 'Pending' },
  { buoy: 'Buoy 02', task: 'Sensor calibration', due: '2026-07-30', status: 'Scheduled' },
  { buoy: 'Buoy 01', task: 'Firmware update', due: '2026-07-28', status: 'Completed' },
]

export const fishInsights = [
  { title: 'Activity Level', value: 'High', desc: '87% presence estimate' },
  { title: 'School Size', value: 'Medium', desc: 'Estimated 200-400 individuals' },
  { title: 'Recommended Zone', value: 'Northwest', desc: '6.4m depth, optimal temp' },
  { title: 'AI Confidence', value: '91%', desc: 'Based on sonar + environmental data' },
]

export const tempSalData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  temp: [27.2, 28.1, 28.6, 29.0, 28.8, 28.2, 28.6],
  salinity: [34.0, 34.2, 34.4, 34.6, 34.3, 34.1, 34.2],
}

export const doPhData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  do: [6.8, 6.5, 6.2, 5.9, 6.3, 6.7, 6.7],
  ph: [8.2, 8.1, 8.0, 7.9, 8.0, 8.1, 8.1],
}

export const historyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  quality: [88, 91, 89, 94, 93, 96],
}

export const radarData = {
  labels: ['Temp', 'DO', 'pH', 'Salinity', 'Turbidity', 'Weather'],
  datasets: [{ label: 'AI Contribution %', data: [32, 24, 18, 12, 8, 6] }],
}
