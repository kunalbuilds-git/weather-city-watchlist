package com.weatherwatchlist.backend.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.client.GeocodingApiClient;
import com.weatherwatchlist.backend.client.GeocodingApiClient.LocationResult;
import com.weatherwatchlist.backend.client.WeatherApiClient;
import com.weatherwatchlist.backend.exception.CityNotFoundException;
import com.weatherwatchlist.backend.external.OpenMeteoResponse;
import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WeatherService {

    private final GeocodingApiClient geocodingApiClient;
    private final WeatherApiClient weatherApiClient;

    public WeatherService(
            GeocodingApiClient geocodingApiClient,
            WeatherApiClient weatherApiClient) {

        this.geocodingApiClient = geocodingApiClient;
        this.weatherApiClient = weatherApiClient;
    }

    public WeatherResponse getWeather(String city) {

        try {
            LocationResult locationResult = geocodingApiClient.findCity(city);

            Weather weather = fetchWeather(
                    locationResult.getLatitude(),
                    locationResult.getLongitude()
            );

            return new WeatherResponse(
                    "search_" + city.toLowerCase(),
                    new Location(
                            locationResult.getCity(),
                            locationResult.getCountry()
                    ),
                    weather,
                    Instant.now().toString()
            );

        } catch (Exception e) {
            throw new CityNotFoundException(city);
        }
    }

    private Weather fetchWeather(double latitude, double longitude) {

        OpenMeteoResponse weatherResult = weatherApiClient.getWeather(
                latitude,
                longitude
        );

        OpenMeteoResponse.Current current = weatherResult.getCurrent();

        return new Weather(
                new Temperature(
                        (int) Math.round(current.getTemperature()),
                        "C"
                ),
                getWeatherCondition(current.getWeatherCode()),
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