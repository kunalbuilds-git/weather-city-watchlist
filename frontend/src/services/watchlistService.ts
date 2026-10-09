import type { WeatherResponseDto } from "../types/api";
import type { Weather } from "../types/Weather";
import { mapWeather } from "../utils/mapWeather";
import { request } from "./apiClient";

const BASE = "/api/watchlist";

// Every watchlist endpoint returns the full, updated list (with weather included)
async function requestList(path: string, method = "GET"): Promise<Weather[]> {
  const data = await request<WeatherResponseDto[]>(path, { method });
  return data.map(mapWeather);
}

export const getWatchlist = () => requestList(BASE);

export const addCityToWatchlist = (city: string) =>
  requestList(`${BASE}/add?city=${encodeURIComponent(city)}`, "POST");

export const removeCityFromWatchlist = (city: string) =>
  requestList(`${BASE}/remove?city=${encodeURIComponent(city)}`, "DELETE");

export const refreshWatchlist = () => requestList(`${BASE}/refresh`, "PUT");

export const clearWatchlist = () => requestList(`${BASE}/clear`, "DELETE");