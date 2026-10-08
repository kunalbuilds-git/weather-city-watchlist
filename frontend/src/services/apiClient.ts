import type { ApiErrorBody } from "../types/api";

// Empty in dev (Vite proxies /api to localhost:8080). Set VITE_API_BASE_URL for production builds.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Single place that talks to fetch: builds the URL, parses JSON and turns backend errors into ApiError
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, init);
  } catch {
    throw new ApiError("Cannot reach the server. Is the backend running?", 0);
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as Partial<ApiErrorBody>;
      if (body.message) message = body.message;
    } catch {
      /* error body was not JSON, keep the generic message */
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}