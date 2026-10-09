import type { SearchHistoryItem } from "../types/SearchHistory";

interface RecentSearchesProps {
  items: SearchHistoryItem[];
  onSelect: (city: string) => void;
}

export default function RecentSearches({ items, onSelect }: RecentSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-2">Recent searches</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.city}
            type="button"
            onClick={() => onSelect(item.city)}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
}