import { useEffect, useState } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { getWeatherByCity } from "../services/weatherService";
import type { Weather } from "../types/Weather";

export default function Watchlist() {
  const { watchlist, loading: watchlistLoading, removeCity } = useWatchlist();
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // Load weather for each city in watchlist
  useEffect(() => {
    async function loadAllWeather() {
      if (watchlist.length === 0) {
        setWeatherList([]);
        return;
      }

      setLoadingWeather(true);
      const results: Weather[] = [];

      for (const city of watchlist) {
        try {
          const data = await getWeatherByCity(city.name.trim().toLowerCase());
          results.push(data);
        } catch (error) {
          console.error("Failed to fetch weather for:", city.name, error);
        }
      }

      setWeatherList(results);
      setLoadingWeather(false);
    }

    loadAllWeather();
  }, [watchlist]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Your Watchlist</h2>

      {watchlistLoading && <p>Loading watchlist...</p>}
      {loadingWeather && <p>Loading weather...</p>}

      {!watchlistLoading && weatherList.length === 0 && (
        <p className="text-gray-600">No cities added yet.</p>
      )}

      {weatherList.map((weather) => (
        <div
          key={weather.city}
          className="flex justify-between items-center p-3 border rounded-md"
        >
          <span>
            {weather.city}, {weather.country} — {weather.temperature}°C
          </span>

          <button
            onClick={() => removeCity(weather.city)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}