import type { Weather } from "../types/Weather";

function normalizeWeatherResponse(data: any): Weather {
  return {
    city: data?.location?.city ?? "",
    country: data?.location?.country ?? "",
    temperature: data?.weather?.temperature?.value ?? 0,
    condition: data?.weather?.condition ?? "",
    humidity: data?.weather?.humidity ?? 0,
    windSpeed: data?.weather?.wind?.speed ?? 0,
    windUnit: data?.weather?.wind?.unit ?? "",
    updatedAt: data?.updatedAt ?? "",
  };
}

export async function getWeatherByCity(city: string): Promise<Weather> {
  try {
    const normalizedCity = city.trim().toLowerCase();
    const response = await fetch(
      `http://localhost:8080/api/weather?city=${encodeURIComponent(normalizedCity)}`
    );

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const payload = await response.json();
    return normalizeWeatherResponse(payload);
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}