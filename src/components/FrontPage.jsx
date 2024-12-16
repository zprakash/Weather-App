import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather, fetchWeatherByCoords, fetchForecastByCoords, fetchWeatherMapTile } from "../api/weatherApi";
import backgroundVid from '../assets/bg.mp4';
import { FaSearch } from 'react-icons/fa';

const FrontPage = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const { setWeatherData, setForecastData, setMapUrl, setCityId, setLoading, loading } = useWeather();


  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city name before searching.");
      return;
    }

    setLoading(true);

    try {
      // Fetch weather data
      const weatherd = await fetchWeather(city);

      setWeatherData(weatherd);
      setCityId(weatherd.id);

      // Fetch the forecast data
      const forecast = await fetchForecastByCoords(weatherd.coord.lat, weatherd.coord.lon);
      setForecastData(forecast);

      // Fetch map tile
      const mapTile = await fetchWeatherMapTile();
      const mapUrl = URL.createObjectURL(mapTile);
      setMapUrl(mapUrl);

      setLoading(false);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (error.message === "City not found") {
        alert("Oops! Something went wrong. Possible solutions: \nTry entering a valid city.\nMake sure the API key is correct!");

      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLocationDetect = async () => {
    if (navigator.geolocation) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Fetch weather data based on latitude and longitude
            const weather = await fetchWeatherByCoords(lat, lon);

            // Check if the weather response contains an error related to the API key
            if (weather && weather.cod === "401") {
              // API key is invalid or missing
              alert("Oops! API key is missing or invalid. Please check your API key.");
              setLoading(false);
              return;
            }

            setWeatherData(weather);
            setCityId(weather.id);

            // Fetch forecast data using coordinates
            const forecast = await fetchForecastByCoords(lat, lon);
            setForecastData(forecast);

            // Fetch map tile
            const mapTile = await fetchWeatherMapTile();
            const mapUrl = URL.createObjectURL(mapTile);
            setMapUrl(mapUrl);

            setLoading(false);
            navigate("/dashboard");

          } catch (error) {
            console.error("Error fetching location-based data:", error);
            alert("Oops! API key is missing or invalid. Please check your API key.");
            setLoading(false);
          }
        },
        (error) => {
          // Handle location access denial or other errors
          if (error.code === error.PERMISSION_DENIED) {
            alert("Oops! Location access denied. Please allow location access to get weather data.");
          } else {
            alert("Oops! Something went wrong while trying to detect your location.");
          }
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <video className="absolute top-0 left-0 w-full h-full object-cover opacity-70" autoPlay loop muted >
        <source src={backgroundVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className=" rounded-lg bg-transparent shadow-xl w-full max-w-md z-10">
        <div className="p-6 rounded-lg shadow-lg border border-gray-300 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent">
          <h1 className="text-white text-3xl mb-6 text-center">Weather Search</h1>
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none w-3/4"
              required
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-semibold transition duration-200 w-1/4 flex items-center justify-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>

          {/* OR Divider */}
          <div className="my-4 text-center text-white">
            <p>OR</p>
          </div>

          {/* Use Current Location Button */}
          <div className="text-center">
            <button
              onClick={handleLocationDetect}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Use Current Location
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
            <div className="text-white font-semibold">Loading...</div>
          </div>
        )}

      </div>
    </div >
  );
};

export default FrontPage;
