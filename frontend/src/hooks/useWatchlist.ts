import { useCallback, useEffect, useState } from "react";
import type { Weather } from "../types/Weather";
import {
  getWatchlist,
  addCityToWatchlist,
  removeCityFromWatchlist,
  refreshWatchlist,
  clearWatchlist,
} from "../services/watchlistService";

function toMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true); // first load
  const [busy, setBusy] = useState(false); // add / remove / refresh / clear in progress
  const [error, setError] = useState<string | null>(null);

  // Runs a backend action that returns the updated list
  const run = useCallback(
    async (action: () => Promise<Weather[]>, fallbackMessage: string) => {
      setBusy(true);
      setError(null);
      try {
        setWatchlist(await action());
        return true;
      } catch (err) {
        setError(toMessage(err, fallbackMessage));
        return false;
      } finally {
        setBusy(false);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    getWatchlist()
      .then((data) => {
        if (!cancelled) setWatchlist(data);
      })
      .catch((err) => {
        if (!cancelled) setError(toMessage(err, "Failed to load watchlist"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addCity = (city: string) => run(() => addCityToWatchlist(city), "Failed to add city");
  const removeCity = (city: string) => run(() => removeCityFromWatchlist(city), "Failed to remove city");
  const refresh = () => run(refreshWatchlist, "Failed to refresh watchlist");
  const clear = () => run(clearWatchlist, "Failed to clear watchlist");

  const isInWatchlist = (city: string) =>
    watchlist.some((item) => item.city.toLowerCase() === city.toLowerCase());

  return { watchlist, loading, busy, error, addCity, removeCity, refresh, clear, isInWatchlist };
}