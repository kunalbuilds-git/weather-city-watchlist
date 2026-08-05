package com.weatherwatchlist.backend.service;

import org.springframework.stereotype.Service;

import com.weatherwatchlist.backend.exception.CityNotFoundException;
import com.weatherwatchlist.backend.model.Location;
import com.weatherwatchlist.backend.model.Temperature;
import com.weatherwatchlist.backend.model.Weather;
import com.weatherwatchlist.backend.model.WeatherResponse;

@Service
public class WeatherService {

    public WeatherResponse getWeather(String city) {

    Location location;
    Temperature temperature;
    Weather weather;

    if (city.equalsIgnoreCase("Tokyo")) {

        location = new Location("Tokyo", "Japan");
        temperature = new Temperature(30, "C");

        weather = new Weather(
                temperature,
                "Cloudy",
                68,
                10.5,
                "km/h"
        );

    } else if (city.equalsIgnoreCase("Paris")) {

        location = new Location("Paris", "France");
        temperature = new Temperature(21, "C");

        weather = new Weather(
                temperature,
                "Rainy",
                80,
                18.2,
                "km/h"
        );

    } else {
       throw new CityNotFoundException(city);
    }

    return new WeatherResponse(
            "city_001",
            location,
            weather,
            "2026-08-05T10:00:00Z"
    );
    }
}