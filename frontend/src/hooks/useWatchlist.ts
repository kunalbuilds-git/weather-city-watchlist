import { useState } from "react";
import type { City } from "../types/City";

// Handles adding/removing cities from the watchlist (mock only)
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<City[]>([]);

  function addCity(city: City) {
    setWatchlist(prev => [...prev, city]);
  }

  function removeCity(name: string) {
    setWatchlist(prev => prev.filter(c => c.name !== name));
  }

  return {
    watchlist,
    addCity,
    removeCity,
  };
}