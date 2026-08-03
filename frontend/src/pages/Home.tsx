import React, { useState } from 'react';

import CityCard from '../components/CityCard';
import WeatherDetails from '../components/WeatherDetails';
import { getWeatherByCity } from '../services/weatherService';

export default function Home() {

    const [weather, setWeather] = useState({
        city: "",
        country: "",
        temperature: 0,
        condition: "",
        humidity: 0,
        windSpeed: 0,
        windUnit: "",
        updatedAt: ""
    });

    const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(prev => ({
            ...prev,
            city: e.target.value
        }));
    };

    const handleSearch = async () => {
        const data = await getWeatherByCity(weather.city);
        setWeather(data);
    };

    const handleReset = () => {
        setWeather({
            city: "",
            country: "",
            temperature: 0,
            condition: "",
            humidity: 0,
            windSpeed: 0,
            windUnit: "",
            updatedAt: ""
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">

            <h1 className="text-3xl font-bold mb-8 text-center">
                Weather Overview
            </h1>

            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 space-y-6">

                <CityCard
                    city={weather.city}
                    country={weather.country}
                    temperature={weather.temperature}
                    condition={weather.condition}
                />

                <WeatherDetails
                    humidity={weather.humidity}
                    windSpeed={weather.windSpeed}
                    windUnit={weather.windUnit}
                    updatedAt={weather.updatedAt}
                />

                <div className="space-y-4">
                    <input
                        type="text"
                        value={weather.city}
                        onChange={inputHandleChange}
                        placeholder="Enter city name"
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-4">
                        <button
                            onClick={handleSearch}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Search
                        </button>

                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}