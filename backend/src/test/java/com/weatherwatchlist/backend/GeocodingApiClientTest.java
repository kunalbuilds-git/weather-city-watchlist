package com.weatherwatchlist.backend;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.weatherwatchlist.backend.client.GeocodingApiClient;
import com.weatherwatchlist.backend.client.GeocodingApiClient.LocationResult;

public class GeocodingApiClientTest {

    @Test
    void testFindCity() {

        GeocodingApiClient client =
                new GeocodingApiClient(new ObjectMapper());

        LocationResult result = client.findCity("Tokyo");

        System.out.println("City: " + result.getCity());
        System.out.println("Country: " + result.getCountry());
        System.out.println("Latitude: " + result.getLatitude());
        System.out.println("Longitude: " + result.getLongitude());
    }
}