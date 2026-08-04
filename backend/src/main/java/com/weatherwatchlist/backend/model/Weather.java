package com.weatherwatchlist.backend.model;

public class Weather {

    private Temperature temperature;
    private String condition;
    private int humidity;
    private double windSpeed;
    private String windUnit;

    public Weather(Temperature temperature,
                   String condition,
                   int humidity,
                   double windSpeed,
                   String windUnit) {

        this.temperature = temperature;
        this.condition = condition;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.windUnit = windUnit;
    }

    public Temperature getTemperature() {
        return temperature;
    }

    public String getCondition() {
        return condition;
    }

    public int getHumidity() {
        return humidity;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public String getWindUnit() {
        return windUnit;
    }
}