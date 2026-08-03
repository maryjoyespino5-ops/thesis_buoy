// path: src/lib/weatherService.js

const BASE_URL = "https://api.open-meteo.com/v1";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const BASE_RETRY_DELAY_MS = 1000; // 1 second

// In-memory cache: key -> { data, timestamp }
const cache = new Map();

// In-flight request deduplication: key -> Promise
const inflightRequests = new Map();

/**
 * Build a cache/dedup key from coordinates.
 */
function cacheKey(lat, lon) {
  return `${lat.toFixed(4)},${lon.toFixed(4)}`;
}

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch current weather and forecast for a given latitude and longitude.
 * Uses the Open-Meteo API (free, no API key required).
 *
 * Features:
 * - In-memory cache with TTL
 * - Request deduplication (concurrent identical requests share one fetch)
 * - Retry with exponential backoff
 * - AbortSignal support for cancellation
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {object} [options] - Optional overrides
 * @param {number} [options.forecastHours=24] - Number of hourly forecast entries
 * @param {string} [options.timezone="auto"] - Timezone for hourly data
 * @param {AbortSignal} [options.signal] - AbortSignal for cancellation
 * @param {number} [options.cacheTTL=300000] - Cache TTL in milliseconds
 * @param {boolean} [options.skipCache=false] - Bypass cache
 * @returns {Promise<object>} Structured weather data
 */
export async function fetchWeather(lat, lon, options = {}) {
  const {
    forecastHours = 24,
    timezone = "auto",
    signal,
    cacheTTL = CACHE_TTL_MS,
    skipCache = false,
  } = options;

  // Input validation (throws immediately, no network)
  validateCoordinates(lat, lon);

  const key = cacheKey(lat, lon);

  // Check cache (skip if explicitly requested)
  if (!skipCache) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < cacheTTL) {
      return cached.data;
    }
  }

  // Check for in-flight duplicate request
  if (inflightRequests.has(key)) {
    return inflightRequests.get(key);
  }

  // If aborted already, throw immediately
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  // Create the fetch promise with retry logic
  const fetchPromise = fetchWithRetry(lat, lon, {
    forecastHours,
    timezone,
    signal,
  });

  // Store in inflight map for deduplication
  inflightRequests.set(key, fetchPromise);

  try {
    const data = await fetchPromise;

    // Cache the successful result
    cache.set(key, { data, timestamp: Date.now() });

    return data;
  } finally {
    // Clean up inflight entry
    inflightRequests.delete(key);
  }
}

/**
 * Fetch weather data with retry and exponential backoff.
 */
async function fetchWithRetry(lat, lon, options) {
  const { forecastHours, timezone, signal } = options;
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    // Check abort signal before each attempt
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    try {
      return await doFetch(lat, lon, { forecastHours, timezone, signal });
    } catch (err) {
      // Don't retry abort errors
      if (err.name === "AbortError") {
        throw err;
      }

      // Don't retry client errors (4xx) — they won't succeed on retry
      if (err instanceof WeatherServiceError && err.code.startsWith("INVALID_")) {
        throw err;
      }

      lastError = err;

      // Don't retry on the last attempt
      if (attempt === MAX_RETRIES) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = BASE_RETRY_DELAY_MS * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  // All retries exhausted
  throw lastError ?? new WeatherServiceError("Unknown error", "UNKNOWN_ERROR");
}

/**
 * Perform a single fetch request to the Open-Meteo API.
 */
async function doFetch(lat, lon, options) {
  const { forecastHours, timezone, signal } = options;

  const url = new URL(`${BASE_URL}/forecast`);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lon);
  url.searchParams.set("current", [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "wind_speed_10m",
    "wind_direction_10m",
    "pressure_msl",
    "cloud_cover",
    "visibility",
    "uv_index",
  ].join(","));
  url.searchParams.set("hourly", [
    "temperature_2m",
    "weather_code",
    "wind_speed_10m",
    "relative_humidity_2m",
  ].join(","));
  url.searchParams.set("daily", [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "sunrise",
    "sunset",
  ].join(","));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("forecast_hours", String(forecastHours));
  url.searchParams.set("current_weather", "true");

  let response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new WeatherServiceError(
      "Network error: failed to reach weather API",
      "NETWORK_ERROR",
      err
    );
  }

  if (!response.ok) {
    throw new WeatherServiceError(
      `Weather API responded with status ${response.status}`,
      "API_ERROR",
      { status: response.status, statusText: response.statusText }
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new WeatherServiceError(
      "Failed to parse weather API response",
      "PARSE_ERROR",
      err
    );
  }

  return normalizeWeatherData(data);
}

/**
 * Validate latitude and longitude values.
 */
function validateCoordinates(lat, lon) {
  if (typeof lat !== "number" || typeof lon !== "number" || isNaN(lat) || isNaN(lon)) {
    throw new WeatherServiceError(
      "Invalid coordinates: lat and lon must be valid numbers",
      "INVALID_COORDINATES"
    );
  }

  if (lat < -90 || lat > 90) {
    throw new WeatherServiceError(
      `Invalid latitude: ${lat} (must be between -90 and 90)`,
      "INVALID_LATITUDE"
    );
  }

  if (lon < -180 || lon > 180) {
    throw new WeatherServiceError(
      `Invalid longitude: ${lon} (must be between -180 and 180)`,
      "INVALID_LONGITUDE"
    );
  }
}

/**
 * Transform raw Open-Meteo response into a clean, structured object.
 */
function normalizeWeatherData(raw) {
  const current = raw.current || {};
  const currentWeather = raw.current_weather || {};
  const hourly = raw.hourly || {};
  const daily = raw.daily || {};

  return Object.freeze({
    location: Object.freeze({
      latitude: raw.latitude ?? null,
      longitude: raw.longitude ?? null,
      timezone: raw.timezone ?? null,
      utcOffsetSeconds: raw.utc_offset_seconds ?? null,
    }),
    current: Object.freeze({
      temperature: current.temperature_2m ?? currentWeather.temperature ?? null,
      feelsLike: current.apparent_temperature ?? null,
      humidity: current.relative_humidity_2m ?? null,
      pressure: current.pressure_msl ?? null,
      cloudCover: current.cloud_cover ?? null,
      visibility: current.visibility ?? null,
      uvIndex: current.uv_index ?? null,
      windSpeed: current.wind_speed_10m ?? currentWeather.windspeed ?? null,
      windDirection: current.wind_direction_10m ?? currentWeather.winddirection ?? null,
      weatherCode: current.weather_code ?? currentWeather.weathercode ?? null,
      condition: weatherCodeToCondition(current.weather_code ?? currentWeather.weathercode ?? null),
      observedAt: current.time ?? null,
    }),
    hourly: Object.freeze(buildHourlyForecast(hourly)),
    daily: Object.freeze(buildDailyForecast(daily)),
  });
}

/**
 * Build an array of hourly forecast entries from raw hourly data.
 */
function buildHourlyForecast(hourly) {
  if (!hourly.time || hourly.time.length === 0) return [];

  const length = hourly.time.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = Object.freeze({
      time: hourly.time[i] ?? null,
      temperature: hourly.temperature_2m?.[i] ?? null,
      weatherCode: hourly.weather_code?.[i] ?? null,
      condition: weatherCodeToCondition(hourly.weather_code?.[i] ?? null),
      windSpeed: hourly.wind_speed_10m?.[i] ?? null,
      humidity: hourly.relative_humidity_2m?.[i] ?? null,
    });
  }

  return result;
}

/**
 * Build an array of daily forecast entries from raw daily data.
 */
function buildDailyForecast(daily) {
  if (!daily.time || daily.time.length === 0) return [];

  const length = daily.time.length;
  const result = new Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = Object.freeze({
      date: daily.time[i] ?? null,
      weatherCode: daily.weather_code?.[i] ?? null,
      condition: weatherCodeToCondition(daily.weather_code?.[i] ?? null),
      tempMax: daily.temperature_2m_max?.[i] ?? null,
      tempMin: daily.temperature_2m_min?.[i] ?? null,
      sunrise: daily.sunrise?.[i] ?? null,
      sunset: daily.sunset?.[i] ?? null,
    });
  }

  return result;
}

/**
 * Convert a WMO weather code to a human-readable condition string.
 */
function weatherCodeToCondition(code) {
  if (code === null || code === undefined) return "Unknown";

  const codeMap = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snow Fall",
    73: "Moderate Snow Fall",
    75: "Heavy Snow Fall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail",
  };

  return codeMap[code] ?? `Unknown (${code})`;
}

/**
 * Clear the weather cache. Useful for testing or forced refresh.
 */
export function clearWeatherCache() {
  cache.clear();
}

/**
 * Get cache statistics (for debugging/monitoring).
 */
export function getWeatherCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}

/**
 * Custom error class for weather service failures.
 */
export class WeatherServiceError extends Error {
  constructor(message, code, cause = null) {
    super(message);
    this.name = "WeatherServiceError";
    this.code = code;
    this.cause = cause;
  }
}
