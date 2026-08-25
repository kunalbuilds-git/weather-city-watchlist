# Weather & City Watchlist

A collaborative full-stack weather application built with React and Spring Boot.

The project allows users to search for cities, view live weather data, and maintain a personal watchlist of saved cities.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Java
- Spring Boot
- Maven
- REST APIs
- Jackson
- Java HttpClient

### External APIs
- Open-Meteo Geocoding API
- Open-Meteo Weather API

## Features

- Search weather by city
- Convert city names into geographic coordinates
- Fetch current weather data using latitude and longitude
- Display temperature, humidity, weather code and wind speed
- Add cities to a watchlist
- Remove cities from a watchlist
- Prevent duplicate cities
- REST API communication between frontend and backend
- CORS support for frontend-backend communication
- JSON response mapping using Jackson
- Backend API testing

## Backend API

### Weather

```text
GET /api/weather?city={city}