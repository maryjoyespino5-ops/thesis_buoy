// path: src/hooks/useWeather.js
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { fetchWeather, WeatherServiceError } from "../lib/weatherService";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const RETRY_DELAY_MS = 3000; // 3 seconds between retries on error

export function useWeather(lat, lon, options = {}) {
  const {
    enabled = true,
    refreshInterval = REFRESH_INTERVAL_MS,
    retryDelay = RETRY_DELAY_MS,
  } = options;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  // Refs for stable callbacks and avoiding stale closures
  const weatherRef = useRef(weather);
  const isMounted = useRef(true);
  const isFetchingRef = useRef(false);
  const abortControllerRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const lastFetchTimeRef = useRef(0);

  // Keep weatherRef in sync
  useEffect(() => {
    weatherRef.current = weather;
  }, [weather]);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Memoize the fetch function to avoid unnecessary effect re-runs
  const fetchData = useCallback(async () => {
    if (!enabled) return;

    // Prevent duplicate requests
    if (isFetchingRef.current) {
      return;
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Handle offline mode — keep cached data, set error
    if (!isOnline) {
      if (isMounted.current) {
        setError(
          new WeatherServiceError(
            "Device is offline. Showing last cached data.",
            "OFFLINE"
          )
        );
      }
      return;
    }

    // Input validation
    if (typeof lat !== "number" || typeof lon !== "number" || isNaN(lat) || isNaN(lon)) {
      if (isMounted.current) {
        setError(
          new WeatherServiceError(
            "Invalid coordinates",
            "INVALID_COORDINATES"
          )
        );
        setLoading(false);
      }
      return;
    }

    if (lat < -90 || lat > 90) {
      if (isMounted.current) {
        setError(
          new WeatherServiceError(
            `Invalid latitude: ${lat}`,
            "INVALID_LATITUDE"
          )
        );
        setLoading(false);
      }
      return;
    }

    if (lon < -180 || lon > 180) {
      if (isMounted.current) {
        setError(
          new WeatherServiceError(
            `Invalid longitude: ${lon}`,
            "INVALID_LONGITUDE"
          )
        );
        setLoading(false);
      }
      return;
    }

    // Debounce: don't refetch if last fetch was less than 1 second ago
    const now = Date.now();
    if (now - lastFetchTimeRef.current < 1000) {
      return;
    }
    lastFetchTimeRef.current = now;

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const data = await fetchWeather(lat, lon, {
        signal: abortController.signal,
      });

      if (isMounted.current && !abortController.signal.aborted) {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      // Ignore abort errors (cancelled requests)
      if (err.name === "AbortError") {
        return;
      }

      if (isMounted.current) {
        const weatherError =
          err instanceof WeatherServiceError
            ? err
            : new WeatherServiceError(
                "Failed to fetch weather data",
                "UNKNOWN_ERROR",
                err
              );
        setError(weatherError);

        // Keep existing weather data on error (stale-while-revalidate)
      }

      // Schedule a retry after delay
      if (isMounted.current && retryDelay > 0) {
        retryTimeoutRef.current = setTimeout(() => {
          if (isMounted.current) {
            fetchData();
          }
        }, retryDelay);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
      isFetchingRef.current = false;
      abortControllerRef.current = null;
    }
  }, [lat, lon, enabled, isOnline, retryDelay]);

  // Auto-refresh interval
  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Set up interval for periodic refresh
    intervalRef.current = setInterval(fetchData, refreshInterval);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [fetchData, refreshInterval, enabled]);

  // Re-fetch when coordinates change (buoy switch)
  useEffect(() => {
    setError(null);
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  // Manual refresh — bypasses debounce
  const refresh = useCallback(() => {
    lastFetchTimeRef.current = 0;
    if (retryTimeoutRef.current !== null) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    return fetchData();
  }, [fetchData]);

  // Memoize return value to prevent unnecessary re-renders in consumers
  return useMemo(
    () => ({
      weather,
      loading,
      error,
      isOnline,
      lastUpdated: weatherRef.current ? new Date() : null,
      refresh,
    }),
    [weather, loading, error, isOnline, refresh]
  );
}
