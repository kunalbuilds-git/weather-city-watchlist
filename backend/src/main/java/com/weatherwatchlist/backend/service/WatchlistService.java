package com.weatherwatchlist.backend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.client.GeocodingApiClient;
import com.weatherwatchlist.backend.client.GeocodingApiClient.LocationResult;
import com.weatherwatchlist.backend.client.WeatherApiClient;
import com.weatherwatchlist.backend.external.OpenMeteoResponse;
import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WatchlistService {

    private final List<WeatherResponse> watchlist;
    private final GeocodingApiClient geocodingApiClient;
    private final WeatherApiClient weatherApiClient;

    public WatchlistService(
            GeocodingApiClient geocodingApiClient,
            WeatherApiClient weatherApiClient) {

        this.watchlist = new ArrayList<>();
        this.geocodingApiClient = geocodingApiClient;
        this.weatherApiClient = weatherApiClient;
    }

    public List<WeatherResponse> getWatchlist() {
        return watchlist;
    }

    public List<WeatherResponse> addCity(String city) {

        if (containsCity(city)) {
            return watchlist;
        }

        LocationResult locationResult =
                geocodingApiClient.findCity(city);

        OpenMeteoResponse weatherResult =
                weatherApiClient.getWeather(
                        locationResult.getLatitude(),
                        locationResult.getLongitude()
                );

        OpenMeteoResponse.Current current =
                weatherResult.getCurrent();

        Weather weather = new Weather(
                new Temperature(
                        (int) Math.round(current.getTemperature()),
                        "C"
                ),
                getWeatherCondition(current.getWeatherCode()),
                current.getHumidity(),
                current.getWindSpeed(),
                "km/h"
        );

        WeatherResponse weatherResponse = new WeatherResponse(
                "watchlist_" + (watchlist.size() + 1),
                new Location(
                        locationResult.getCity(),
                        locationResult.getCountry()
                ),
                weather,
                Instant.now().toString()
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

    private String getWeatherCondition(int weatherCode) {

        if (weatherCode == 0) {
            return "Clear";
        }

        if (weatherCode >= 1 && weatherCode <= 3) {
            return "Cloudy";
        }

        if (weatherCode >= 51 && weatherCode <= 67) {
            return "Rainy";
        }

        if (weatherCode >= 71 && weatherCode <= 77) {
            return "Snowy";
        }

        if (weatherCode >= 80 && weatherCode <= 82) {
            return "Rainy";
        }

        if (weatherCode >= 95) {
            return "Thunderstorm";
        }

        return "Unknown";
    }
}