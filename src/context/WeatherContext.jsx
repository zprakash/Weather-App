import React, { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [municipalityDescription, setMunicipalityDescription] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        municipalityDescription,
        setMunicipalityDescription,
        forecastData,
        setForecastData,
        mapUrl,
        setMapUrl,
        cityId,
        setCityId ,
        loading,
        setLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
