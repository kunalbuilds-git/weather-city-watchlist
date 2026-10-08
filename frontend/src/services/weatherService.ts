import type { WeatherResponseDto } from "../types/api";
import type { Weather } from "../types/Weather";
import { mapWeather } from "../utils/mapWeather";
import { request } from "./apiClient";

// GET /api/weather?city=London
export async function getWeatherByCity(city: string): Promise<Weather> {
  const dto = await request<WeatherResponseDto>(
    `/api/weather?city=${encodeURIComponent(city.trim())}`
  );
  return mapWeather(dto);
}