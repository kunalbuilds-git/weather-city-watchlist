package com.weatherwatchlist.backend.client;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class GeocodingApiClient {

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GeocodingApiClient(ObjectMapper objectMapper) {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = objectMapper;
    }

    public LocationResult findCity(String city) {

        String url = "https://geocoding-api.open-meteo.com/v1/search"
                + "?name=" + city
                + "&count=1"
                + "&language=en"
                + "&format=json";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        try {
            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            JsonNode root = objectMapper.readTree(response.body());

            JsonNode results = root.get("results");

            if (results == null || results.isEmpty()) {
                throw new IllegalArgumentException(
                        "City not found: " + city
                );
            }

            JsonNode result = results.get(0);

            String name = result.get("name").asText();
            String country = result.get("country").asText();
            double latitude = result.get("latitude").asDouble();
            double longitude = result.get("longitude").asDouble();

            return new LocationResult(
                    name,
                    country,
                    latitude,
                    longitude
            );

        } catch (IllegalArgumentException e) {
            throw e;

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to fetch location data",
                    e
            );
        }
    }

    public static class LocationResult {

        private final String city;
        private final String country;
        private final double latitude;
        private final double longitude;

        public LocationResult(
                String city,
                String country,
                double latitude,
                double longitude
        ) {
            this.city = city;
            this.country = country;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public String getCity() {
            return city;
        }

        public String getCountry() {
            return country;
        }

        public double getLatitude() {
            return latitude;
        }

        public double getLongitude() {
            return longitude;
        }
    }
}
