package com.weatherwatchlist.backend.controller;

import java.util.HashMap;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weatherwatchlist.backend.service.WatchlistService;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping
    public HashMap<String, String> getWatchlist() {
        return watchlistService.getWatchlist();
    }

    @PostMapping("/{city}")
    public HashMap<String, String> addCity(@PathVariable String city) {
        return watchlistService.addCity(city);
    }

    @DeleteMapping("/{city}")
    public HashMap<String, String> removeCity(@PathVariable String city) {
        return watchlistService.removeCity(city);
    }
}