package com.weatherwatchlist.backend.client;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Component;

@Component
public class WeatherApiClient {

    private final HttpClient httpClient;

    public WeatherApiClient() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public String getWeather(double latitude, double longitude) {

        String url = "https://api.open-meteo.com/v1/forecast"
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            return response.body();

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch weather data", e);
        }
    }
}