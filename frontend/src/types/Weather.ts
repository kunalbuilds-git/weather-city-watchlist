// UI model: flat and easy to render. Built from WeatherResponseDto in utils/mapWeather.ts
export interface Weather {
  id: string;
  city: string;
  country: string;
  temperature: number;
  temperatureUnit: string; // 'C'
  condition: string; // Clear | Cloudy | Rainy | Snowy | Thunderstorm | Unknown
  humidity: number; // percentage
  windSpeed: number;
  windUnit: string; // 'km/h'
  updatedAt: string; // ISO timestamp
}