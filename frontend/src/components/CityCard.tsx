import type { Weather } from "../types/Weather";
import { getWeatherIcon } from "../utils/weatherIcons";
import { formatTemperature } from "../utils/formatTemperature";

export default function CityCard({ weather }: { weather: Weather }) {
  return (
    <div className="bg-blue-50 p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {weather.city}, {weather.country}
        <span className="text-3xl">{getWeatherIcon(weather.condition)}</span>
      </h2>

      <p className="text-gray-700">
        <span className="font-medium">Temperature:</span>{" "}
        {formatTemperature(weather.temperature, weather.temperatureUnit)}
      </p>

      <p className="text-gray-700">
        <span className="font-medium">Condition:</span> {weather.condition}
      </p>
    </div>
  );
}