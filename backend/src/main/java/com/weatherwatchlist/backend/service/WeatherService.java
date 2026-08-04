package com.weatherwatchlist.backend.service;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WeatherService {

    public WeatherResponse getWeather() {

        Location location = new Location("London", "UK");

        Temperature temperature = new Temperature(25, "C");

        Weather weather = new Weather(
                temperature,
                "Sunny",
                72,
                12.4,
                "km/h"
        );

        WeatherResponse response = new WeatherResponse(
                "city_001",
                location,
                weather,
                "2026-08-03T10:47:00Z"
        );

        return response;
    }
}