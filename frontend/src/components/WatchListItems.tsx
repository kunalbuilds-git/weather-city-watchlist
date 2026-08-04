import type { City } from "../types/City";

interface WatchListItemProps {
  city: City;                     // The city to display
  onRemove: (name: string) => void; // Callback to remove city from watchlist
}

export default function WatchListItem({ city, onRemove }: WatchListItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md bg-white shadow-sm">
      {/* City name + country */}
      <span className="font-medium">
        {city.name}, {city.country}
      </span>

      {/* Remove button */}
      <button
        onClick={() => onRemove(city.name)}
        className="text-red-600 hover:text-red-800 transition"
      >
        Remove
      </button>
    </div>
  );
}