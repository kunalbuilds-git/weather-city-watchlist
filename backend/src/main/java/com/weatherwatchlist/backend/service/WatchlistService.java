package com.weatherwatchlist.backend.service;

import java.util.HashMap;

public class WatchlistService {

    private final HashMap<String, String> watchlist;

    public WatchlistService() {
        watchlist = new HashMap<>();
    }

    // Add a city
    public void addCity(String city) {
        watchlist.put(city, "saved");
    }

    // Get all saved cities
    public HashMap<String, String> getCities() {
        return watchlist;
    }

    // Remove a city
    public boolean removeCity(String city) {
        if (watchlist.containsKey(city)) {
            watchlist.remove(city);
            return true;
        }

        return false;
    }

    // Check whether a city is already saved
    public boolean containsCity(String city) {
        return watchlist.containsKey(city);
    }
}