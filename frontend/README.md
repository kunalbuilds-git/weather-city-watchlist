# Title

 Weather City Watchlist — Frontend

## Overview
 
It provides a clean, modular UI for searching cities, viewing weather data, and managing a personal watchlist.

The current implementation includes:
- Fully functional weather search flow
- Watchlist UI with add/remove/refresh/clear actions
- Routing and page structure
- Custom hooks for state management
- Tailwind‑styled components
- Full integration with the Spring Boot backend API

This README documents **only the features implemented so far**.

## Tech Stack

- React
- React Router (for navigation)
- Custom Hooks (useWeather, useWatchlist, useSearchHistory)
- TypeScript
- Vite
- Tailwind CSS
- Custom Weather Icons Mapping
- Fetch API (service layer in `src/services`, proxied to the backend through Vite)

## Implemented Features

### Home Page

The main page of the application
It includes:

- A search input (Enter key supported)
- Search + Reset buttons  
- Recent searches shown as quick-select chips
- Weather overview section  
- Weather details section  
- Loading state and backend error messages
- Tailwind‑styled layout  
- Weather state managed by the useWeather hook
- "Add to Watchlist" button only appears once a valid city is loaded, and is disabled if the city is already saved

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
Matches the conditions returned by the backend (Clear, Cloudy, Rainy, Snowy, Thunderstorm, Unknown).

### City Details Page

Shows detailed weather information for a selected city (route: `/city/:city`).  
Includes layout, loader, error handling, a back link to the watchlist, and routing integration.

### Watchlist Page

Displays all saved cities and their current weather:

- Loads watchlist from backend (via custom hook)
- Weather comes with the watchlist response, no extra request per city
- Renders city + temperature + condition + country
- Each city links to its City Details page
- Allows removing cities from the watchlist
- Refresh button to update the weather of every saved city
- Clear all button (with confirmation)
- Shows loading and error states

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

### 08/10/2026 — Backend Integration
- Aligned types and mapping with the backend response (wind, temperature, condition)
- Added a shared API client with backend error messages shown in the UI
- Services now use relative `/api` paths (Vite proxy) instead of a hardcoded URL
- Watchlist page uses the weather returned by the backend instead of one request per city
- Added Refresh and Clear all to the Watchlist page
- Added Recent searches on the Home page (useSearchHistory)
- Fixed City Details routing (`/city/:city`) and added a 404 page
- Home page: Enter key search, loading state, error state, duplicate check on "Add to Watchlist"
- Removed the mock service files and unused components

## Author

Yoichi dev#