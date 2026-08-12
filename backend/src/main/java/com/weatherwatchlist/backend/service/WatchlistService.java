package com.weatherwatchlist.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WatchlistService {

    private final List<WeatherResponse> watchlist;

    public WatchlistService() {
        this.watchlist = new ArrayList<>();
    }

    public List<WeatherResponse> getWatchlist() {
        return watchlist;
    }

    public List<WeatherResponse> addCity(String city) {

        if (containsCity(city)) {
            return watchlist;
        }

        WeatherResponse weatherResponse = new WeatherResponse(
                "watchlist_" + (watchlist.size() + 1),
                new Location(city, ""),
                null,
                null
        );

        watchlist.add(weatherResponse);

        return watchlist;
    }

    public List<WeatherResponse> removeCity(String city) {

        watchlist.removeIf(
                weather -> weather.getLocation()
                        .getCity()
                        .equalsIgnoreCase(city)
        );

        return watchlist;
    }

    public boolean containsCity(String city) {

        return watchlist.stream()
                .anyMatch(
                        weather -> weather.getLocation()
                                .getCity()
                                .equalsIgnoreCase(city)
                );
    }
}