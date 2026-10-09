import type { SearchHistoryDto } from "../types/api";
import type { SearchHistoryItem } from "../types/SearchHistory";
import { request } from "./apiClient";

// GET /api/search-history
export async function getSearchHistory(): Promise<SearchHistoryItem[]> {
  return request<SearchHistoryDto[]>("/api/search-history");
}