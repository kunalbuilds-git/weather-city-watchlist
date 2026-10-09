import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CityCard from "../components/CityCard";
import WeatherDetails from "../components/WeatherDetails";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useWeather } from "../hooks/useWeather";

export default function CityDetails() {
  const { city } = useParams<{ city: string }>(); // route: /city/:city
  const { weather, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city, fetchWeather]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <Link to="/watchlist" className="text-blue-700 hover:underline">
        ← Back to watchlist
      </Link>

      {loading && <Loader label="Loading weather..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && weather && (
        <>
          <CityCard weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </div>
  );
}