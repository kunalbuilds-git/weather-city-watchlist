import { useParams } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";
import { useEffect } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function CityDetails() {
  const { city } = useParams(); // /city-details/:city
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    if (city) {
      fetchWeather(city.trim().toLowerCase());
    }
  }, [city, fetchWeather]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>No weather data available.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {weather.city}, {weather.country}
        <span className="text-3xl">{getWeatherIcon(weather.condition)}</span>
      </h2>

      <p><strong>Temperature:</strong> {weather.temperature}°C</p>
      <p><strong>Condition:</strong> {weather.condition}</p>
      <p><strong>Humidity:</strong> {weather.humidity}%</p>
      <p><strong>Wind:</strong> {weather.windSpeed} {weather.windUnit}</p>
      <p><strong>Updated:</strong> {weather.updatedAt}</p>
    </div>
  );
}