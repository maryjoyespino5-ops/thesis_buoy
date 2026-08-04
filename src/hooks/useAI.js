// path: src/hooks/useAI.js
import { useMemo } from "react"
import { processSensorData, processMultipleBuoys } from "../lib/aiService"

/**
 * AI hook that processes sensor data and returns all AI outputs.
 * Each dashboard selects only the outputs relevant to its role.
 */
export function useAI(sensorData) {
  const result = useMemo(() => {
    if (!sensorData) return null
    if (Array.isArray(sensorData)) {
      return processMultipleBuoys(sensorData)
    }
    return processSensorData(sensorData)
  }, [sensorData])

  return result
}

/**
 * Hook for dashboards that need role-specific AI outputs.
 * Returns only the AI fields relevant to the given role.
 */
export function useRoleAI(sensorData, role) {
  const ai = useAI(sensorData)

  const roleOutputs = useMemo(() => {
    if (!ai) return null

    switch (role) {
      case "fisherman":
        return {
          fishProbability: ai.fishProbability,
          fishHabitatScore: ai.fishHabitatScore,
          waterQualityIndex: ai.waterQualityIndex,
          recommendations: ai.recommendations.filter((r) =>
            r.text.toLowerCase().includes("fish") ||
            r.text.toLowerCase().includes("zone") ||
            r.priority === "High",
          ),
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "coral_reef":
        return {
          marineHealthIndex: ai.marineHealthIndex,
          waterQualityIndex: ai.waterQualityIndex,
          pollutionRisk: ai.pollutionRisk,
          recommendations: ai.recommendations.filter((r) =>
            r.text.toLowerCase().includes("marine") ||
            r.text.toLowerCase().includes("coral") ||
            r.text.toLowerCase().includes("buoy") ||
            r.priority === "High",
          ),
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "beach":
        return {
          waterQualityIndex: ai.waterQualityIndex,
          pollutionRisk: ai.pollutionRisk,
          trashDetection: ai.trashDetection,
          recommendations: ai.recommendations.filter((r) =>
            r.text.toLowerCase().includes("water") ||
            r.text.toLowerCase().includes("pollution") ||
            r.text.toLowerCase().includes("advisory") ||
            r.priority === "High",
          ),
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "lgu":
        return {
          waterQualityIndex: ai.waterQualityIndex,
          marineHealthIndex: ai.marineHealthIndex,
          pollutionRisk: ai.pollutionRisk,
          fishHabitatScore: ai.fishHabitatScore,
          recommendations: ai.recommendations,
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "bfar":
        return {
          fishProbability: ai.fishProbability,
          fishHabitatScore: ai.fishHabitatScore,
          waterQualityIndex: ai.waterQualityIndex,
          pollutionRisk: ai.pollutionRisk,
          recommendations: ai.recommendations.filter((r) =>
            r.text.toLowerCase().includes("fish") ||
            r.text.toLowerCase().includes("water") ||
            r.priority === "High",
          ),
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "research":
        return {
          fishProbability: ai.fishProbability,
          waterQualityIndex: ai.waterQualityIndex,
          marineHealthIndex: ai.marineHealthIndex,
          pollutionRisk: ai.pollutionRisk,
          fishHabitatScore: ai.fishHabitatScore,
          trashDetection: ai.trashDetection,
          riskLevels: ai.riskLevels,
          recommendations: ai.recommendations,
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "community":
        return {
          waterQualityIndex: ai.waterQualityIndex,
          pollutionRisk: ai.pollutionRisk,
          trashDetection: ai.trashDetection,
          recommendations: ai.recommendations.filter((r) =>
            r.text.toLowerCase().includes("water") ||
            r.text.toLowerCase().includes("pollution") ||
            r.text.toLowerCase().includes("advisory") ||
            r.priority === "High",
          ),
          dailySummary: ai.dailySummary,
          confidence: ai.confidence,
        }
      case "admin":
      default:
        return ai
    }
  }, [ai, role])

  return roleOutputs
}
