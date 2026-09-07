package com.weatherwatchlist.backend.service;

import java.time.Instant;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(WatchlistService.class);

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

        logger.info("Fetching all cities from watchlist");
        List<WeatherResponse> watchlist = watchlistRepository.findAll()
                .stream()
                .map(this::toWeatherResponse)
                .toList();
        logger.info("Retrieved {} cities from watchlist", watchlist.size());

        return watchlist;
    }

    public List<WeatherResponse> addCity(String city) {

        logger.info("Attempting to add city: {}", city);

        if (containsCity(city)) {
            logger.warn("City {} already exists in watchlist", city);
            return getWatchlist();
        }

        try {
            LocationResult locationResult = geocodingApiClient.findCity(city);
            logger.debug("Found location for {}: ({}, {})", city, locationResult.getLatitude(), locationResult.getLongitude());

            WatchlistEntity entity = new WatchlistEntity(
                    locationResult.getCity(),
                    locationResult.getCountry(),
                    locationResult.getLatitude(),
                    locationResult.getLongitude()
            );

            watchlistRepository.save(entity);
            logger.info("Successfully added city: {} ({})", locationResult.getCity(), locationResult.getCountry());

        } catch (Exception e) {
            logger.error("Failed to add city: {}", city, e);
            throw e;
        }

        return getWatchlist();
    }

    public List<WeatherResponse> removeCity(String city) {

        logger.info("Attempting to remove city: {}", city);

        watchlistRepository.findByCity(city)
                .ifPresentOrElse(
                        entity -> {
                            watchlistRepository.delete(entity);
                            logger.info("Successfully removed city: {}", city);
                        },
                        () -> logger.warn("City {} not found for removal", city)
                );

        return getWatchlist();
    }

    public List<WeatherResponse> refreshWeather() {

        logger.info("Refreshing weather for all cities");
        return getWatchlist();
    }

    public List<WeatherResponse> clearWatchlist() {

        logger.info("Clearing entire watchlist");
        int count = (int) watchlistRepository.count();
        watchlistRepository.deleteAll();
        logger.info("Cleared {} cities from watchlist", count);

        return getWatchlist();
    }

    public boolean containsCity(String city) {

        return watchlistRepository.findByCity(city).isPresent();
    }

    private WeatherResponse toWeatherResponse(
            WatchlistEntity entity) {

        Weather weather = fetchWeather(
                entity.getLatitude(),
                entity.getLongitude()
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