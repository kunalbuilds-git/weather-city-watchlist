# Title

 Weather City Watchlist — Frontend

## Overview
 
It currently implements the core UI for displaying weather information for a selected city using mock data.  
The goal at this stage is to establish a clean, styled, and modular foundation before integrating backend APIs.

This README documents **only the features implemented so far**.

## Tech Stack

- React
- React Router (for navigation)
- Custom Hooks (useWeather, useWatchlist)
- TypeScript
- Vite
- Tailwind CSS
- Custom Weather Icons Mapping
- Mock Weather Service

## Implemented Features

### Home Page

The main page of the application
It includes:

- A search input  
- Search + Reset buttons  
- Weather overview section  
- Weather details section  
- Tailwind‑styled layout  
- Centralized weather state object  

### CityCard Component

Displays:

- City  
- Country  
- Temperature  
- Condition  
- Weather icon (emoji‑based)

### WeatherDetails Component

Displays:

- Humidity  
- Wind speed + unit  
- Last updated timestamp  

###  Weather Icons System

An expanding mapping file supporting multiple weather conditions.

## Changelog

### 4/08/2026 - 16:52
- Added Routing
- Implemented the Loader component
- Implemented the WatchListItem component
- City Details page implemented and debugged
- Watchlist page implemented
- Added Navbar + Layout

## Author

Yoichi dev