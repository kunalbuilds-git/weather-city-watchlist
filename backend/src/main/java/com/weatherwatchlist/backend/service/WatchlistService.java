package com.weatherwatchlist.backend.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.client.GeocodingApiClient;
import com.weatherwatchlist.backend.client.GeocodingApiClient.LocationResult;
import com.weatherwatchlist.backend.client.WeatherApiClient;
import com.weatherwatchlist.backend.entity.WatchlistEntity;
import com.weatherwatchlist.backend.external.OpenMeteoResponse;
import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;
import com.weatherwatchlist.backend.repository.WatchlistRepository;

@Service
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final GeocodingApiClient geocodingApiClient;
    private final WeatherApiClient weatherApiClient;

    public WatchlistService(
            WatchlistRepository watchlistRepository,
            GeocodingApiClient geocodingApiClient,
            WeatherApiClient weatherApiClient) {

        this.watchlistRepository = watchlistRepository;
        this.geocodingApiClient = geocodingApiClient;
        this.weatherApiClient = weatherApiClient;
    }

    public List<WeatherResponse> getWatchlist() {

        return watchlistRepository.findAll()
                .stream()
                .map(this::toWeatherResponse)
                .toList();
    }

    public List<WeatherResponse> addCity(String city) {

        if (containsCity(city)) {
            return getWatchlist();
        }

        LocationResult locationResult =
                geocodingApiClient.findCity(city);

        WatchlistEntity entity = new WatchlistEntity(
                locationResult.getCity(),
                locationResult.getCountry()
        );

        watchlistRepository.save(entity);

        return getWatchlist();
    }

    public List<WeatherResponse> removeCity(String city) {

        watchlistRepository.findAll()
                .stream()
                .filter(entity ->
                        entity.getCity()
                                .equalsIgnoreCase(city)
                )
                .forEach(watchlistRepository::delete);

        return getWatchlist();
    }

    public List<WeatherResponse> refreshWeather() {

        return getWatchlist();
    }

    public boolean containsCity(String city) {

        return watchlistRepository.findAll()
                .stream()
                .anyMatch(entity ->
                        entity.getCity()
                                .equalsIgnoreCase(city)
                );
    }

    private WeatherResponse toWeatherResponse(
            WatchlistEntity entity) {

        LocationResult locationResult =
                geocodingApiClient.findCity(
                        entity.getCity()
                );

        Weather weather = fetchWeather(
                locationResult.getLatitude(),
                locationResult.getLongitude()
        );

        return new WeatherResponse(
                "watchlist_" + entity.getId(),
                new Location(
                        entity.getCity(),
                        entity.getCountry()
                ),
                weather,
                Instant.now().toString()
        );
    }

    private Weather fetchWeather(
            double latitude,
            double longitude) {

        OpenMeteoResponse weatherResult =
                weatherApiClient.getWeather(
                        latitude,
                        longitude
                );

        OpenMeteoResponse.Current current =
                weatherResult.getCurrent();

        return new Weather(
                new Temperature(
                        (int) Math.round(
                                current.getTemperature()
                        ),
                        "C"
                ),
                getWeatherCondition(
                        current.getWeatherCode()
                ),
                current.getHumidity(),
                current.getWindSpeed(),
                "km/h"
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