package com.weatherwatchlist.backend.model;

public class Temperature {

    private int value;
    private String unit;

    public Temperature(int value, String unit) {
        this.value = value;
        this.unit = unit;
    }

    public int getValue() {
        return value;
    }

    public String getUnit() {
        return unit;
    }
}
