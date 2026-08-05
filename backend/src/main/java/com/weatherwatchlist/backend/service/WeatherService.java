package com.weatherwatchlist.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.exception.CityNotFoundException;
import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WeatherService {

    private final Map<String, WeatherResponse> weatherData = new HashMap<>();

    public WeatherService() {

        // Tokyo
        weatherData.put(
                "tokyo",
                new WeatherResponse(
                        "city_001",
                        new Location("Tokyo", "Japan"),
                        new Weather(
                                new Temperature(30, "C"),
                                "Cloudy",
                                68,
                                10.5,
                                "km/h"
                        ),
                        "2026-08-05T10:00:00Z"
                )
        );

        // Paris
        weatherData.put(
                "paris",
                new WeatherResponse(
                        "city_002",
                        new Location("Paris", "France"),
                        new Weather(
                                new Temperature(21, "C"),
                                "Rainy",
                                80,
                                18.2,
                                "km/h"
                        ),
                        "2026-08-05T10:00:00Z"
                )
        );
    }

    public WeatherResponse getWeather(String city) {

        WeatherResponse response = weatherData.get(city.toLowerCase());

        if (response == null) {
            throw new CityNotFoundException(city);
        }

        return response;
    }
}