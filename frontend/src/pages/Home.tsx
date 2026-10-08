import CityCard from "../components/CityCard";
import WeatherDetails from "../components/WeatherDetails";
import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useWeather } from "../hooks/useWeather";
import { useWatchlist } from "../hooks/useWatchlist";
import { useSearchHistory } from "../hooks/useSearchHistory";

export default function Home() {
  const { weather, loading, error, fetchWeather, resetWeather } = useWeather();
  const { addCity, busy, isInWatchlist, error: watchlistError } = useWatchlist();
  const { history, reload: reloadHistory } = useSearchHistory();

  async function handleSearch(city: string) {
    await fetchWeather(city);
    await reloadHistory();
  }

  const alreadySaved = weather ? isInWatchlist(weather.city) : false;

  return (
    <div className="flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Weather Overview</h1>

      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 space-y-6">
        <SearchBar loading={loading} onSearch={handleSearch} onReset={resetWeather} />

        <RecentSearches items={history} onSelect={handleSearch} />

        {loading && <Loader label="Fetching weather..." />}
        {error && <ErrorMessage message={error} />}
        {watchlistError && <ErrorMessage message={watchlistError} />}

        {!loading && weather && (
          <>
            <CityCard weather={weather} />
            <WeatherDetails weather={weather} />

            <button
              onClick={() => addCity(weather.city)}
              disabled={alreadySaved || busy}
              className="w-full py-2 rounded-md transition bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {alreadySaved ? "Already in watchlist" : busy ? "Adding..." : "Add to Watchlist"}
            </button>
          </>
        )}

        {!loading && !weather && !error && (
          <p className="text-gray-500 text-center">Search for a city to see its current weather.</p>
        )}
      </div>
    </div>
  );
}