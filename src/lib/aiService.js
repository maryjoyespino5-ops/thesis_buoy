// path: src/lib/aiService.js

/**
 * Centralized AI service that processes sensor data and generates
 * all AI outputs. Each dashboard selects only the outputs relevant
 * to its role. No duplicated logic.
 */

// --- Input: normalized sensor data from any source ---
function normalizeSensorData(sensorData) {
  return {
    temperature: sensorData.temp ? parseFloat(sensorData.temp) : null,
    salinity: sensorData.salinity ? parseFloat(sensorData.salinity) : null,
    ph: sensorData.ph ? parseFloat(sensorData.ph) : null,
    do: sensorData.do ? parseFloat(sensorData.do) : null,
    turbidity: sensorData.turb ? parseFloat(sensorData.turb) : null,
    battery: sensorData.battery ? parseInt(sensorData.battery) : null,
    signal: sensorData.signal || "Unknown",
    fishActivity: sensorData.fishActivity || "Unknown",
    status: sensorData.status || "green",
  }
}

// --- Core AI computations ---

function computeFishProbability(sensor) {
  let score = 70
  if (sensor.do !== null && sensor.do >= 6) score += 10
  if (sensor.do !== null && sensor.do < 5) score -= 15
  if (sensor.temperature !== null && sensor.temperature >= 26 && sensor.temperature <= 30) score += 5
  if (sensor.turbidity !== null && sensor.turbidity < 3) score += 5
  if (sensor.fishActivity === "High") score += 10
  if (sensor.fishActivity === "Low") score -= 10
  return Math.min(100, Math.max(0, score))
}

function computeWaterQualityIndex(sensor) {
  let score = 80
  if (sensor.ph !== null && sensor.ph >= 7.5 && sensor.ph <= 8.5) score += 5
  if (sensor.ph !== null && (sensor.ph < 7.0 || sensor.ph > 9.0)) score -= 20
  if (sensor.do !== null && sensor.do >= 6) score += 5
  if (sensor.do !== null && sensor.do < 5) score -= 15
  if (sensor.turbidity !== null && sensor.turbidity < 3) score += 5
  if (sensor.turbidity !== null && sensor.turbidity > 5) score -= 15
  if (sensor.temperature !== null && sensor.temperature >= 25 && sensor.temperature <= 30) score += 3
  return Math.min(100, Math.max(0, score))
}

function computeMarineHealthIndex(sensor) {
  let score = 85
  if (sensor.status === "green") score += 5
  if (sensor.status === "yellow") score -= 10
  if (sensor.status === "red") score -= 25
  if (sensor.battery !== null && sensor.battery < 80) score -= 5
  if (sensor.do !== null && sensor.do >= 6) score += 3
  if (sensor.do !== null && sensor.do < 5) score -= 10
  if (sensor.turbidity !== null && sensor.turbidity < 3) score += 2
  return Math.min(100, Math.max(0, score))
}

function computePollutionRisk(sensor) {
  let risk = "Low"
  let confidence = 95
  if (sensor.turbidity !== null && sensor.turbidity > 4) { risk = "Moderate"; confidence = 88 }
  if (sensor.turbidity !== null && sensor.turbidity > 6) { risk = "High"; confidence = 82 }
  if (sensor.do !== null && sensor.do < 5.5) { risk = risk === "Low" ? "Moderate" : risk; confidence = 85 }
  if (sensor.ph !== null && (sensor.ph < 7.0 || sensor.ph > 8.5)) { risk = "Moderate"; confidence = 80 }
  if (sensor.status === "red") { risk = "High"; confidence = 90 }
  return { risk, confidence }
}

function computeFishHabitatScore(sensor) {
  let score = 75
  if (sensor.temperature !== null && sensor.temperature >= 26 && sensor.temperature <= 30) score += 10
  if (sensor.do !== null && sensor.do >= 6) score += 8
  if (sensor.ph !== null && sensor.ph >= 7.5 && sensor.ph <= 8.5) score += 5
  if (sensor.salinity !== null && sensor.salinity >= 30 && sensor.salinity <= 35) score += 5
  if (sensor.turbidity !== null && sensor.turbidity < 3) score += 5
  if (sensor.status === "green") score += 5
  if (sensor.status === "red") score -= 20
  return Math.min(100, Math.max(0, score))
}

function computeTrashDetectionSummary(sensor) {
  if (sensor.turbidity !== null && sensor.turbidity > 4) return { level: "High", items: "8-12/100m", confidence: 82 }
  if (sensor.turbidity !== null && sensor.turbidity > 2) return { level: "Moderate", items: "3-7/100m", confidence: 78 }
  return { level: "Low", items: "0-2/100m", confidence: 91 }
}

function generateRecommendations(sensor, wqi, fishProb, marineHealth, pollutionRisk) {
  const recommendations = []

  if (fishProb < 60) {
    recommendations.push({ text: "Fish activity is low. Consider moving to a different zone.", priority: "Medium", reason: "Low fish probability" })
  }
  if (wqi < 70) {
    recommendations.push({ text: "Water quality is below optimal. Increase monitoring frequency.", priority: "High", reason: "Low WQI" })
  }
  if (marineHealth < 80) {
    recommendations.push({ text: "Marine health is declining. Inspect nearby buoys.", priority: "High", reason: "Low marine health index" })
  }
  if (pollutionRisk.risk === "High") {
    recommendations.push({ text: "High pollution risk detected. Issue public advisory.", priority: "High", reason: "Elevated pollution risk" })
  }
  if (pollutionRisk.risk === "Moderate") {
    recommendations.push({ text: "Moderate pollution risk. Monitor turbidity levels.", priority: "Medium", reason: "Moderate pollution risk" })
  }
  if (sensor.battery !== null && sensor.battery < 80) {
    recommendations.push({ text: "Buoy battery is low. Schedule maintenance.", priority: "Medium", reason: "Low battery" })
  }
  if (recommendations.length === 0) {
    recommendations.push({ text: "All conditions are normal. Continue routine monitoring.", priority: "Low", reason: "All metrics stable" })
  }

  return recommendations
}

function computeRiskLevels(sensor, wqi, pollutionRisk) {
  const levels = []
  if (wqi < 70) levels.push({ label: "Water Quality", level: "High", color: "#ef4444" })
  else if (wqi < 85) levels.push({ label: "Water Quality", level: "Moderate", color: "#f59e0b" })
  else levels.push({ label: "Water Quality", level: "Low", color: "#10b981" })

  if (pollutionRisk.risk === "High") levels.push({ label: "Pollution", level: "High", color: "#ef4444" })
  else if (pollutionRisk.risk === "Moderate") levels.push({ label: "Pollution", level: "Moderate", color: "#f59e0b" })
  else levels.push({ label: "Pollution", level: "Low", color: "#10b981" })

  if (sensor.status === "red") levels.push({ label: "Buoy Health", level: "High", color: "#ef4444" })
  else if (sensor.status === "yellow") levels.push({ label: "Buoy Health", level: "Moderate", color: "#f59e0b" })
  else levels.push({ label: "Buoy Health", level: "Low", color: "#10b981" })

  return levels
}

function generateDailySummary(sensor, wqi, fishProb, marineHealth, pollutionRisk) {
  const parts = []
  parts.push(`Water quality is ${wqi >= 85 ? "good" : wqi >= 70 ? "moderate" : "poor"} with a WQI of ${wqi}.`)
  parts.push(`Fish probability is ${fishProb}%.`)
  parts.push(`Marine health index is ${marineHealth}%.`)
  parts.push(`Pollution risk is ${pollutionRisk.risk} (confidence: ${pollutionRisk.confidence}%).`)
  if (sensor.status === "red") parts.push("One or more buoys are in critical condition.")
  else if (sensor.status === "yellow") parts.push("One or more buoys are in warning condition.")
  return parts.join(" ")
}

// --- Public API ---

/**
 * Process sensor data and return all AI outputs.
 * @param {Object} sensorData - Raw sensor data (buoy object)
 * @returns {Object} All AI outputs
 */
export function processSensorData(sensorData) {
  const sensor = normalizeSensorData(sensorData)

  const fishProbability = computeFishProbability(sensor)
  const waterQualityIndex = computeWaterQualityIndex(sensor)
  const marineHealthIndex = computeMarineHealthIndex(sensor)
  const pollutionRisk = computePollutionRisk(sensor)
  const fishHabitatScore = computeFishHabitatScore(sensor)
  const trashDetection = computeTrashDetectionSummary(sensor)
  const riskLevels = computeRiskLevels(sensor, waterQualityIndex, pollutionRisk)
  const recommendations = generateRecommendations(sensor, waterQualityIndex, fishProbability, marineHealthIndex, pollutionRisk)
  const dailySummary = generateDailySummary(sensor, waterQualityIndex, fishProbability, marineHealthIndex, pollutionRisk)

  return {
    fishProbability,
    waterQualityIndex,
    marineHealthIndex,
    pollutionRisk,
    fishHabitatScore,
    trashDetection,
    riskLevels,
    recommendations,
    dailySummary,
    confidence: 94,
  }
}

/**
 * Process multiple buoys and return aggregated AI outputs.
 * @param {Array} buoyDataArray - Array of buoy objects
 * @returns {Object} Aggregated AI outputs
 */
export function processMultipleBuoys(buoyDataArray) {
  if (!buoyDataArray || buoyDataArray.length === 0) {
    return processSensorData({})
  }

  const results = buoyDataArray.map((b) => processSensorData(b))

  const avg = (key) => {
    const vals = results.map((r) => r[key])
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
  }

  return {
    fishProbability: avg("fishProbability"),
    waterQualityIndex: avg("waterQualityIndex"),
    marineHealthIndex: avg("marineHealthIndex"),
    pollutionRisk: results.reduce((worst, r) => {
      const order = { Low: 0, Moderate: 1, High: 2 }
      return order[r.pollutionRisk.risk] > order[worst.pollutionRisk.risk] ? r : worst
    }, results[0]).pollutionRisk,
    fishHabitatScore: avg("fishHabitatScore"),
    trashDetection: results.reduce((worst, r) => {
      const order = { Low: 0, Moderate: 1, High: 2 }
      return order[r.trashDetection.level] > order[worst.trashDetection.level] ? r : worst
    }, results[0]).trashDetection,
    riskLevels: results.flatMap((r) => r.riskLevels),
    recommendations: results.flatMap((r) => r.recommendations),
    dailySummary: results.map((r) => r.dailySummary).join(" "),
    confidence: Math.round(results.reduce((sum, r) => sum + r.confidence, 0) / results.length),
  }
}
