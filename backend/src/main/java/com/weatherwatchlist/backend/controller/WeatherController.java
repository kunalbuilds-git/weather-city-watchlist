package com.weatherwatchlist.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.weatherwatchlist.backend.model.WeatherResponse;
import com.weatherwatchlist.backend.service.WeatherService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/weather")
    public WeatherResponse getWeather(
            @RequestParam String city
    ) {
        return weatherService.getWeather(city);
    }
}