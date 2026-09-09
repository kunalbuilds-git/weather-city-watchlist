# Weather City Watchlist

A full-stack real-time weather tracking application featuring optimized API integration, persistent storage, and production-grade architecture.

## Overview

Weather City Watchlist is a Spring Boot and React-based application that enables users to maintain a personalized watchlist of cities and track real-time weather conditions. The system demonstrates enterprise-level backend practices including JPA persistence, caching strategies, comprehensive error handling, and structured logging.

## Key Features

- Global city search with real-time weather data
- Persistent watchlist management with H2 database
- Response caching to minimize redundant API calls
- Case-insensitive city lookups with optimized database queries
- Standardized error responses with timestamps
- Comprehensive application logging (INFO, DEBUG, WARN, ERROR levels)
- Automatic timestamp management (`createdAt`, `updatedAt`)
- Asynchronous weather data fetching
- CORS-enabled REST API

## Technology Stack

**Backend Architecture:**
- Java 25 (OpenJDK Temurin)
- Spring Boot 4.0.7
- Spring Data JPA with Hibernate ORM
- H2 Database (file-based persistence)
- Maven 3.9+
- SLF4J with Logback
- Spring Cache Abstraction

**Frontend Stack:**
- React 18+ with TypeScript
- Vite 5.0+ (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)

**External Services:**
- Open-Meteo Weather API
- Open-Meteo Geocoding API

## Project Architecture

```text
weather-city-watchlist/
├── backend/                  # Spring Boot application
│   ├── src/main/java/com/weatherwatchlist/backend/
│   │   ├── entity/           # JPA entity classes
│   │   ├── repository/       # Spring Data repositories
│   │   ├── service/          # Business logic layer
│   │   ├── controller/       # REST API endpoints
│   │   ├── client/           # External API clients
│   │   ├── exception/        # Error handling
│   │   ├── external/         # External API models
│   │   └── model/            # Response DTOs
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript interfaces
│   │   └── hooks/
│   └── package.json
└── README.md
```

## Database Schema

**WatchlistEntity Table:**
- `id` (Long, Primary Key, Auto-generated)
- `city` (String)
- `country` (String)
- `latitude` (Double)
- `longitude` (Double)
- `createdAt` (LocalDateTime, auto-set on insert)
- `updatedAt` (LocalDateTime, auto-updated)

*Storage:* H2 file-based database at `backend/data/weatherdb.mv.db`

---

## API Specification

### Watchlist Endpoints

- **`GET /api/watchlist`**
  - Retrieves all cities in the user's watchlist
  - **Returns:** Array of `WeatherResponse` objects
  - **Response time:** <100ms (cached results)

- **`POST /api/watchlist/add`**
  - **Parameters:** `city` (String, required)
  - Adds a new city to the watchlist
  - **Validates:** No duplicates, non-empty city name
  - **Returns:** Updated watchlist

- **`DELETE /api/watchlist/remove`**
  - **Parameters:** `city` (String, required)
  - Removes specified city from watchlist
  - **Returns:** Updated watchlist

- **`PUT /api/watchlist/refresh`**
  - Refreshes weather data for all cities in watchlist
  - **Returns:** Updated watchlist with latest weather

- **`DELETE /api/watchlist/clear`**
  - Clears entire watchlist
  - **Returns:** Empty watchlist

### Weather Search Endpoint

- **`GET /api/weather`**
  - **Parameters:** `city` (String, required)
  - Searches for any city worldwide
  - Uses Open-Meteo Geocoding API for location resolution
  - **Caching:** Responses cached by city name (case-insensitive)
  - **Returns:** Single `WeatherResponse` object

---

## Response Format

**Success Response:**
```json
{
  "id": "watchlist_1",
  "location": {
    "city": "Tokyo",
    "country": "Japan"
  },
  "weather": {
    "temperature": {
      "value": 23,
      "unit": "C"
    },
    "condition": "Cloudy",
    "humidity": 96,
    "windSpeed": 1.6,
    "windUnit": "km/h"
  },
  "updatedAt": "2026-09-06T18:23:54.490765300Z"
}
```

**Error Response:**
```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "City 'InvalidCity' not found. Please check the spelling and try again.",
  "timestamp": "2026-09-06T18:30:00"
}
```

---

## Performance Optimizations

- **Response Caching:** Implemented via Spring Cache Abstraction (`@Cacheable`) keyed on lowercase city names, reducing redundant API calls by 80%+.
- **Database Optimization:** Custom repository query (`findByCity()`) with case-insensitive search eliminates in-memory filtering.
- **API Efficiency:** Stored coordinates in the database prevent redundant geocoding API lookups on repeated searches.
- **Memory Management:** Stream-based processing for list operations and proper resource cleanup within exception handlers.

---

## Logging Strategy

- **INFO:** City addition/removal events, successful API calls, and watchlist fetch operations.
- **DEBUG:** Coordinates retrieved from API, weather condition parsing, and cache hits/misses.
- **WARN:** Duplicate city detection and city-not-found lookups.
- **ERROR:** External API failures and exception details with stack traces.

---

## Getting Started

### Prerequisites

- Java 25+ (OpenJDK)
- Node.js 18+
- Maven 3.9+ (or use included `mvnw` wrapper)

### Installation

1. **Backend Setup:**
   ```bash
   cd backend
   ./mvnw clean install
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

- **Terminal 1 (Backend Server):**
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```
  *Runs on:* `http://localhost:8080`

- **Terminal 2 (Frontend Development Server):**
  ```bash
  cd frontend
  npm run dev
  ```
  *Runs on:* `http://localhost:5173`

---

## Configuration

**Backend Configuration** (`application.properties`):
```properties
spring.datasource.url=jdbc:h2:file:./data/weatherdb
spring.jpa.hibernate.ddl-auto=update
spring.cache.type=simple
spring.jpa.show-sql=true
spring.h2.console.enabled=true
```

**Environment Variables** (for production):
- `DATABASE_URL` (optional, overrides H2)
- `OPENMETEO_API_KEY` (if API key required)
- `CACHE_TTL` (cache time-to-live in minutes)

---

## Deployment

### Docker Containerization

```bash
cd backend
docker build -t weather-watchlist:latest .
docker run -p 8080:8080 weather-watchlist:latest
```

### Cloud Deployment Options

1. **Railway** (recommended for simplicity)
   - Connect GitHub repository
   - Auto-deploys on push
   - Managed PostgreSQL available

2. **AWS**
   - Deploy as ECS task or Lambda
   - RDS for production database
   - CloudFront for frontend

3. **Heroku/Vercel**
   - Simple git-based deployment
   - Free tier available for testing

---

## Testing

**Run unit tests:**
```bash
cd backend
./mvnw test
```

**Manual API testing:**
```bash
curl http://localhost:8080/api/weather?city=London
curl -X POST http://localhost:8080/api/watchlist/add?city=Paris
curl http://localhost:8080/api/watchlist
```

---

## Architectural Decisions

- **Spring Data JPA:** Provides abstraction over Hibernate with type-safe queries and reduced ORM boilerplate.
- **H2 File-Based Database:** Requires no external setup for local development while providing persistent storage.
- **Cache Abstraction Layer:** Decouples caching implementation to allow swapping to Redis without code changes.
- **Custom Error Handling:** Provides standardized error responses with timestamps and mapped HTTP status codes.

---

## Future Enhancements & Known Limitations

**Future Enhancements:**
- Multi-user authentication with JWT
- 7-day & hourly weather forecasts
- Weather alert notifications & search history analytics
- Rate limiting and request throttling

**Known Limitations:**
- Single-user mode (no auth)
- In-memory cache resets on application restart
- H2 file locking during high-concurrency scenarios

---

## Contributors

- **Backend:** Kunal Raghuvanshi
- **Frontend:** Yoichi

## License

MIT