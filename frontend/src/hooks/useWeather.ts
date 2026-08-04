import { useState } from "react";
import type { Weather } from "../types/Weather";
import { getWeatherByCity } from "../services/weatherService";

// Handles weather fetching logic + loading state
export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather(city: string) {
    setLoading(true);
    const data = await getWeatherByCity(city);
    setWeather(data);
    setLoading(false);
  }

  function resetWeather() {
    setWeather(null);
  }

  return {
    weather,
    loading,
    fetchWeather,
    resetWeather,
  };
}