package com.weatherwatchlist.backend;

import org.junit.jupiter.api.Test;

import com.weatherwatchlist.backend.client.WeatherApiClient;

public class WeatherApiClientTest {

    @Test
    void testWeatherApiCall() {

        WeatherApiClient client = new WeatherApiClient();

        String response = client.getWeather(35.6895, 139.69171);

        System.out.println(response);
    }
}