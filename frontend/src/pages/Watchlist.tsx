import WatchlistItem from "../components/WatchlistItem";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useWatchlist } from "../hooks/useWatchlist";

export default function Watchlist() {
  const { watchlist, loading, busy, error, removeCity, refresh, clear } = useWatchlist();

  function handleClear() {
    if (window.confirm("Remove all cities from your watchlist?")) {
      clear();
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Watchlist</h2>

        <div className="flex gap-2">
          <button
            onClick={refresh}
            disabled={busy || loading || watchlist.length === 0}
            className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {busy ? "Working..." : "Refresh"}
          </button>

          <button
            onClick={handleClear}
            disabled={busy || loading || watchlist.length === 0}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear all
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader label="Loading watchlist..." />}

      {!loading && !error && watchlist.length === 0 && (
        <p className="text-gray-600">No cities added yet. Search for a city on the Home page to add one.</p>
      )}

      <div className="space-y-3">
        {watchlist.map((weather) => (
          <WatchlistItem key={weather.id} weather={weather} disabled={busy} onRemove={removeCity} />
        ))}
      </div>
    </div>
  );
}