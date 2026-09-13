package com.weatherwatchlist.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weatherwatchlist.backend.model.WeatherResponse;
import com.weatherwatchlist.backend.repository.SearchHistoryRepository;
import com.weatherwatchlist.backend.service.WeatherService;

@RestController
@CrossOrigin
public class WeatherController {

    private final WeatherService weatherService;
    private final SearchHistoryRepository searchHistoryRepository;

    public WeatherController(WeatherService weatherService, SearchHistoryRepository searchHistoryRepository) {
        this.weatherService = weatherService;
        this.searchHistoryRepository = searchHistoryRepository;
    }

    @GetMapping("/api/weather")
    public WeatherResponse getWeather(
            @RequestParam(required = false) String city) {

        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException("City name cannot be empty");
        }

        return weatherService.getWeather(city);
    }

    @GetMapping("/api/search-history")
    public List<Object> getSearchHistory() {
        return searchHistoryRepository.findRecentSearches()
                .stream()
                .map(h -> java.util.Map.of(
                    "city", h.getCity(),
                    "country", h.getCountry(),
                    "searchedAt", h.getSearchedAt()
                ))
                .collect(Collectors.toList());
    }
}