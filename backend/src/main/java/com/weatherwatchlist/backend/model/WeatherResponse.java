package com.weatherwatchlist.backend.model;

public class WeatherResponse {

    private String id;
    private Location location;
    private Weather weather;
    private String updatedAt;

    public WeatherResponse(String id, Location location, Weather weather, String updatedAt) {
        this.id = id;
        this.location = location;
        this.weather = weather;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public Location getLocation() {
        return location;
    }

    public Weather getWeather() {
        return weather;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }
}