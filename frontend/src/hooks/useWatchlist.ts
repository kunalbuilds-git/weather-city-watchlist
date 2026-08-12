import { useState, useEffect } from "react";
import type { City } from "../types/City";
import { getWatchlist, addCityToWatchlist, removeCityFromWatchlist } from "../services/watchlistService";

// Handles adding/removing cities from the watchlist (mock only)
export function useWatchlist(): {
  
  watchlist: City[];
  loading: boolean;
  addCity: (name: string) => Promise<void>;
  removeCity: (name: string) => Promise<void>;
} {
  const [watchlist, setWatchlist] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist from backend on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error("Failed to load watchlist: ", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  // Add city to backend and update the state
  async function addCity(name: string) {
    try {
      console.log("Adding city: ", name);
      const updated = await addCityToWatchlist(name);
      setWatchlist(updated);
    } catch (error) {
      console.error("Failed to add city: ", error);
    }
  }

  // Remove city from backend and update state
  async function removeCity(name: string) {
    try {
      const updated = await removeCityFromWatchlist(name);
      setWatchlist(updated);
    } catch (error) {
      console.error("Failed to remove city: ", error);
    }
  }

  return {
    watchlist,
    loading,
    addCity,
    removeCity,
  };
}