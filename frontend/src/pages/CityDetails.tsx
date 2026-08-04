import sampleResponse from "../services/sample-response.json";
import { getWeatherIcon } from "../utils/weatherIcons";

export default function CityDetails() {
  const data = { // JSON fields mapped correctly to the data object
    city: sampleResponse.location.city,
    country: sampleResponse.location.country,
    temperature: sampleResponse.weather.temperature.value,
    condition: sampleResponse.weather.condition,
    humidity: sampleResponse.weather.humidity,
    windSpeed: sampleResponse.weather.wind.speed,
    windUnit: sampleResponse.weather.wind.unit,
    updatedAt: sampleResponse.updatedAt,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {data.city}, {data.country}
        <span className="text-3xl">{getWeatherIcon(data.condition)}</span>
      </h2>

      <p><strong>Temperature:</strong> {data.temperature}°C</p>
      <p><strong>Condition:</strong> {data.condition}</p>
      <p><strong>Humidity:</strong> {data.humidity}%</p>
      <p><strong>Wind:</strong> {data.windSpeed} {data.windUnit}</p>
      <p><strong>Updated:</strong> {data.updatedAt}</p>
    </div>
  );
}