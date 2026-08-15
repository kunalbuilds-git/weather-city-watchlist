package com.weatherwatchlist.backend;

import org.junit.jupiter.api.Test;

import com.weatherwatchlist.backend.external.OpenMeteoResponse;
import com.weatherwatchlist.backend.client.WeatherApiClient;

public class WeatherApiClientTest {

    @Test
    void testWeatherApiCall() {

        WeatherApiClient client = new WeatherApiClient(
                new com.fasterxml.jackson.databind.ObjectMapper()
        );

        OpenMeteoResponse response = client.getWeather(
                35.6895,
                139.69171
        );

        System.out.println("Latitude: " + response.getLatitude());
        System.out.println("Longitude: " + response.getLongitude());
        System.out.println("Temperature: "
                + response.getCurrent().getTemperature());
        System.out.println("Humidity: "
                + response.getCurrent().getHumidity());
        System.out.println("Weather code: "
                + response.getCurrent().getWeatherCode());
        System.out.println("Wind speed: "
                + response.getCurrent().getWindSpeed());
    }
}
