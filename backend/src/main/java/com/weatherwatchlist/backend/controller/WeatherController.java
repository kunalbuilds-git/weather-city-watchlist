package com.weatherwatchlist.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.weatherwatchlist.backend.model.WeatherResponse;
import com.weatherwatchlist.backend.service.WeatherService;

@RestController
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/weather")
    public WeatherResponse getWeather(
            @RequestParam(required = false) String city) {

        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException("City name cannot be empty");
        }

        return weatherService.getWeather(city);
    }
}