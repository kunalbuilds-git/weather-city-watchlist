# Title

 Weather City Watchlist — Frontend

## Overview
 
It provides a clean, modular UI for searching cities, viewing weather data, and managing a personal watchlist.

The current implementation includes:
- Fully functional weather search flow
- Watchlist UI with add/remove actions
- Routing and page structure
- Custom hooks for state management
- Tailwind‑styled components
- Integration-ready architecture for backend APIs

This README documents **only the features implemented so far**.

## Tech Stack

- React
- React Router (for navigation)
- Custom Hooks (useWeather, useWatchlist)
- TypeScript
- Vite
- Tailwind CSS
- Custom Weather Icons Mapping
- Mock Weather Service (until backend integration is finalized)

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
- Disabled "Add to Watchlist" button until a valid city is loaded 

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

An expanding mapping file supporting multiple weather condition returning emoji based on strings.

### City Details Page

Shows detailed weather information for a selected city.  
Includes layout, loader, and routing integration.

### Watchlist Page

Displays all saved cities and their current weather:

- Loads watchlist from backend (via custom hook)
- Fetches weather for each saved city
- Renders city + temperature + country
- Allows removing cities from the watchlist
- Shows loading states for both watchlist and weather

## Changelog

### 4/08/2026 - 16:52
- Added Routing
- Implemented the Loader component
- Implemented the WatchListItem component
- City Details page implemented and debugged
- Watchlist page implemented
- Added Navbar + Layout

### 12/08/2026 — Frontend Watchlist Flow
- Added “Add to Watchlist” button to Home page  
- Integrated button with useWatchlist hook  
- Implemented addCity() logic  
- Updated Watchlist page to load weather for each saved city  
- Updated City TypeScript model  
- Added disabled state to prevent empty-city submissions  
- Cleaned UI interactions and loading states

## Author

Yoichi dev