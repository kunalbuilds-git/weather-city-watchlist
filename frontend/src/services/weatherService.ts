// This service simulates API calls for weather data
import sampleResponse from "./sample-response.json";

// Simulated API call to fetch weather data for a given city
export async function getWeatherByCity(city: string) {
  console.log(`Fetching weather for: ${city}`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For now, always return the mock JSON
  return {
    city: sampleResponse.location.city,
    country: sampleResponse.location.country,
    temperature: sampleResponse.weather.temperature.value,
    condition: sampleResponse.weather.condition,
    humidity: sampleResponse.weather.humidity,
    windSpeed: sampleResponse.weather.wind.speed,
    windUnit: sampleResponse.weather.wind.unit,
    updatedAt: sampleResponse.updatedAt,
  };
}