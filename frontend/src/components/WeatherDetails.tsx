import type { Weather } from "../types/Weather";
import { formatWind } from "../utils/weatherWind";
import { formatUpdatedAt } from "../utils/formatDate";

export default function WeatherDetails({ weather }: { weather: Weather }) {
  return (
    <div className="bg-green-50 p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Weather Details</h2>

      <p className="text-gray-700">
        <span className="font-medium">Humidity:</span> {weather.humidity}%
      </p>

      <p className="text-gray-700">
        <span className="font-medium">Wind Speed:</span> {formatWind(weather.windSpeed, weather.windUnit)}
      </p>

      <p className="text-gray-700">
        <span className="font-medium">Updated At:</span> {formatUpdatedAt(weather.updatedAt)}
      </p>
    </div>
  );
}