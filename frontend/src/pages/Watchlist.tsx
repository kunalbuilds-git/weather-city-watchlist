import { useEffect, useState } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { getWeatherByCity } from "../services/weatherService";
import type { Weather } from "../types/Weather";

export default function Watchlist() {
  const { watchlist, removeCity } = useWatchlist();
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const results: Weather[] = [];

      for (const city of watchlist) {
        try {
          const data = await getWeatherByCity(city.name.trim().toLowerCase());
          results.push(data);
        } catch (error) {
          console.error("Failed to fetch:", city.name, error);
        }
      }

      setWeatherList(results);
      setLoading(false);
    }

    loadAll();
  }, [watchlist]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Your Watchlist</h2>

      {loading && <p>Loading cities...</p>}

      {!loading && weatherList.length === 0 && (
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