import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import FrontPage from "./FrontPage";
import DashboardPage from "./DashBoardPage";
import { useWeather } from "../context/WeatherContext";
import { fetchWeather, fetchWeatherByCoords } from "../api/weatherApi";

function WeatherRoutes() {
  const { setWeatherData, setLoading } = useWeather();
  const navigate = useNavigate();

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      navigate("/dashboard");
    } catch (error) {
      alert("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationDetect = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(data);
          navigate("/dashboard");
        } catch (error) {
          alert("Unable to fetch weather for your location.");
        }
        setLoading(false);
      },
      () => {
        alert("Location access denied.");
        setLoading(false);
      }
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<FrontPage onSearch={handleSearch} onLocationDetect={handleLocationDetect} />}
      />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default WeatherRoutes;
