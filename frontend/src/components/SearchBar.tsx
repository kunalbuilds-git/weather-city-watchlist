import { useState } from "react";

interface SearchBarProps {
  loading: boolean;
  onSearch: (city: string) => void;
  onReset: () => void;
}

export default function SearchBar({ loading, onSearch, onReset }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // lets the Enter key trigger a search
    const city = value.trim();
    if (city) onSearch(city);
  }

  function handleReset() {
    setValue("");
    onReset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter city name"
        aria-label="City name"
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}