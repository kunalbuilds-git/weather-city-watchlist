import { Link } from "react-router-dom";
import type { Weather } from "../types/Weather";
import { getWeatherIcon } from "../utils/weatherIcons";
import { formatTemperature } from "../utils/formatTemperature";

interface WatchlistItemProps {
  weather: Weather;
  disabled: boolean;
  onRemove: (city: string) => void;
}

export default function WatchlistItem({ weather, disabled, onRemove }: WatchlistItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md bg-white shadow-sm">
      <Link
        to={`/city/${encodeURIComponent(weather.city)}`}
        className="flex items-center gap-3 hover:text-blue-700 transition"
      >
        <span className="text-2xl">{getWeatherIcon(weather.condition)}</span>
        <span className="font-medium">
          {weather.city}, {weather.country}
        </span>
        <span className="text-gray-600">
          {formatTemperature(weather.temperature, weather.temperatureUnit)} · {weather.condition}
        </span>
      </Link>

      <button
        onClick={() => onRemove(weather.city)}
        disabled={disabled}
        className="text-red-600 hover:text-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Remove
      </button>
    </div>
  );
}