// Raw shapes returned by the Spring Boot backend (do not use these directly in UI components)

export interface WeatherResponseDto {
  id: string;
  location: {
    city: string;
    country: string;
  };
  weather: {
    temperature: { value: number; unit: string };
    condition: string;
    humidity: number;
    windSpeed: number;
    windUnit: string;
  };
  updatedAt: string;
}

export interface SearchHistoryDto {
  city: string;
  country: string;
  searchedAt: string;
}

export interface ApiErrorBody {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}