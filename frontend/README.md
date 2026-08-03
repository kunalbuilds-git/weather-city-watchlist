# Title

 Weather City Watchlist — Frontend

## Overview
 
It currently implements the core UI for displaying weather information for a selected city using mock data.  
The goal at this stage is to establish a clean, styled, and modular foundation before integrating routing or backend APIs.

This README documents **only the features implemented so far**.

## Tech Stack

- React
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

A simple mapping file (`weatherIcons.ts`) that returns the correct emoji based on the weather condition string.

## Changelog

A changelog will be added after the next commit + push.
Backend, routing, watchlist, animations, and global documentation will be added later once implemented.

## Author

Yoichi dev