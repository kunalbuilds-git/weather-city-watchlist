import { useCallback, useEffect, useState } from "react";
import { getSearchHistory } from "../services/searchHistoryService";
import type { SearchHistoryItem } from "../types/SearchHistory";

const MAX_ITEMS = 5;

// Backend returns every search; keep the most recent entry per city
function uniqueRecent(items: SearchHistoryItem[]): SearchHistoryItem[] {
  const seen = new Set<string>();
  const result: SearchHistoryItem[] = [];

  for (const item of items) {
    const key = item.city.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
    if (result.length === MAX_ITEMS) break;
  }
  return result;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  const reload = useCallback(async () => {
    try {
      setHistory(uniqueRecent(await getSearchHistory()));
    } catch {
      setHistory([]); // history is a nice-to-have, never block the page on it
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getSearchHistory()
      .then((data) => {
        if (!cancelled) setHistory(uniqueRecent(data));
      })
      .catch(() => {
        if (!cancelled) setHistory([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { history, reload };
}