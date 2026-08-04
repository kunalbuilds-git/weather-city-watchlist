import { useWatchlist } from "../hooks/useWatchlist";

export default function Watchlist() {
  const { watchlist, removeCity } = useWatchlist();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Your Watchlist</h2>

      {watchlist.length === 0 && (
        <p className="text-gray-600">No cities added yet.</p>
      )}

      {watchlist.map(city => (
        <div
          key={city.name}
          className="flex justify-between items-center p-3 border rounded-md"
        >
          <span>{city.name}, {city.country}</span>

          <button
            onClick={() => removeCity(city.name)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}