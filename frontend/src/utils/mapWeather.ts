import type { WeatherResponseDto } from "../types/api";
import type { Weather } from "../types/Weather";

// Converts the backend response into the flat model used by the UI
export function mapWeather(dto: WeatherResponseDto): Weather {
  return {
    id: dto.id,
    city: dto.location.city,
    country: dto.location.country,
    temperature: dto.weather.temperature.value,
    temperatureUnit: dto.weather.temperature.unit,
    condition: dto.weather.condition,
    humidity: dto.weather.humidity,
    windSpeed: dto.weather.windSpeed,
    windUnit: dto.weather.windUnit,
    updatedAt: dto.updatedAt,
  };
}