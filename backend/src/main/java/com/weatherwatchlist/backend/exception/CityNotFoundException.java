package com.weatherwatchlist.backend.exception;

public class CityNotFoundException extends RuntimeException {

    public CityNotFoundException(String city) {
        super("City '" + city + "' not found. Please check the spelling and try again.");
    }
}