package com.weatherwatchlist.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weatherwatchlist.backend.model.WeatherResponse;
import com.weatherwatchlist.backend.service.WatchlistService;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public List<WeatherResponse> getWatchlist() {
        return watchlistService.getWatchlist();
    }

    @PostMapping("/add")
    public List<WeatherResponse> addCity(
            @RequestParam String city) {

        return watchlistService.addCity(city);
    }

    @DeleteMapping("/remove")
    public List<WeatherResponse> removeCity(
            @RequestParam String city) {

        return watchlistService.removeCity(city);
    }
}