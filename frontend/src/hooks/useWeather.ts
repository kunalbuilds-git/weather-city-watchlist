import { useCallback, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import type { Weather } from "../types/Weather";

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherByCity(city.trim().toLowerCase());
      setWeather(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }, []);

  function resetWeather() {
    setWeather(null);
    setError(null);
  }

  return {
    weather,
    loading,
    error,
    fetchWeather,
    resetWeather,
  };
}