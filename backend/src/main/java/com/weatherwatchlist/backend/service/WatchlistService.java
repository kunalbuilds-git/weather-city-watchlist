package com.weatherwatchlist.backend.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

@Service
public class WatchlistService {

    private final HashMap<String, String> watchlist;

    public WatchlistService() {
        this.watchlist = new HashMap<>();
    }

    public HashMap<String, String> getWatchlist() {
        return watchlist;
    }

    public HashMap<String, String> addCity(String city) {
        watchlist.put(city, "saved");
        return watchlist;
    }

    public HashMap<String, String> removeCity(String city) {
        watchlist.remove(city);
        return watchlist;
    }

    public boolean containsCity(String city) {
        return watchlist.containsKey(city);
    }
}