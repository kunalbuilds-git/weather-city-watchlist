/* This file communicates with the backend WatchlistController
providing functions to GET, ADD and REMOVE cities from the watchlist
stored in the backend's in-memory HashMap */

const BASE_URL = "http://localhost:8080/api/watchlist";

export async function getWatchlist() {
    // GET /api/watchlist
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error("Failed to load watchlist");
    return await response.json();
}

export async function addCityToWatchlist(city: string) {
    // POST /api/watchlist/add?city=Tokyo
    const response = await fetch(`${BASE_URL}/add?city=${encodeURIComponent(city)}`, {
        method: "POST",
    })
    
    if (!response.ok) throw new Error("Failed to add city");
    return await response.json();
}

export async function removeCityFromWatchlist(city: string) {
    // DELETE /api/watchlist/remove?city=Tokyo
    const response = await fetch(`${BASE_URL}/remove?city=${encodeURIComponent(city)}`, {
        method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to remove city");
    return await response.json();
}