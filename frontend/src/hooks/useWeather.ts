import { useCallback, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import type { Weather } from "../types/Weather";

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      setWeather(await getWeatherByCity(city));
    } catch (err: unknown) {
      setWeather(null);
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetWeather = useCallback(() => {
    setWeather(null);
    setError(null);
  }, []);

  return { weather, loading, error, fetchWeather, resetWeather };
}