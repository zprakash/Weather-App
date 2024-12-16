import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";
import { fetchMunicipalityDescription } from "../api/geminiApi";

import WeatherDetailBox, { convertToStandardTime } from "./WeatherDetailBox";
import WeatherForecast from "./WeatherForecast";
import DynamicWeatherWidget from "./DynamicWeatherWidget";

// Importing videos from the assets folder
import clearSkyVideo from "../assets/clear-sky.mp4";
import cloudySkyVideo from "../assets/cloudy-sky.mp4";
import rainVideo from "../assets/rainy.mp4";
import snowVideo from "../assets/snow.mp4";
import thunderstormVideo from "../assets/thunderstrom.mp4";
import drizzleVideo from "../assets/drizzle.mp4";
import mistVideo from "../assets/mist.mp4";

const DashboardPage = () => {
    const navigate = useNavigate();
    const { weatherData, municipalityDescription, forecastData, mapUrl, cityId } = useWeather();

    const [showGraph, setShowGraph] = useState(false);
    const [fetchedDescription, setFetchedDescription] = useState(null); // State to store the fetched description
    const [loadingDescription, setLoadingDescription] = useState(false);


    // Show alert after reload if weatherData is not available
    useEffect(() => {
        if (!weatherData) {
            const userConfirmed = window.confirm(
                "Refreshing will require you to re-enter the city name..!!!"
            );
            if (userConfirmed) {
                navigate("/");
            }
        }
    }, [weatherData, navigate]);

    if (!weatherData) {
        return <div className="text-center text-red-500">No weather data available. Please search for a city first.</div>;
    }

    // Fetch the municipality description when the component is mounted or city changes
    useEffect(() => {
        if (weatherData && fetchedDescription === null) {
            setLoadingDescription(true);
            fetchMunicipalityDescription(weatherData.name)
                .then((description) => {
                    setFetchedDescription(description);
                    setLoadingDescription(false);
                })
                .catch((error) => {
                    setLoadingDescription(false);
                    console.error("Error fetching description:", error);
                });
        }
    }, [weatherData, fetchedDescription, fetchMunicipalityDescription]);

    const toggleView = () => {
        setShowGraph(prev => !prev);
    };

    const handleToggleDescription = () => {
        setShowDescription((prevState) => !prevState);
    };

    // Weather-based video sources
    const weatherVideos = {
        Clear: clearSkyVideo,
        Clouds: cloudySkyVideo,
        Rain: rainVideo,
        Snow: snowVideo,
        Thunderstorm: thunderstormVideo,
        Drizzle: drizzleVideo,
        Mist: mistVideo
    };

    // Select the appropriate video based on the weather condition
    const weatherCondition = weatherData.weather[0].main;
    const videoSource = weatherVideos[weatherCondition] || clearSkyVideo; // Default to clear sky video

    const formattedSunrise = convertToStandardTime(weatherData.sys.sunrise);
    const formattedSunset = convertToStandardTime(weatherData.sys.sunset);

    return (
        <div className="relative min-h-screen bg-black text-white opacity=0">
            {/* Background video */}
            <div className="absolute top-0 left-0 w-full h-full ">
                <video autoPlay loop muted className="w-full h-full object-cover opacity-50">
                    <source src={videoSource} type="video/mp4" />
                </video>
            </div>

            {/* Back to Search Button */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 z-20 
               text-sm sm:text-base md:text-lg lg:text-xl 
               sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-4"
            >
                ← Back to Search
            </button>

            <div className="relative  z-10 max-w-4xl mx-auto p-6 ">
                {/* Big Box for Current Temperature */}
                <div className="bg-transparent bg-opacity-60 p-8 rounded-lg shadow-xl ring-2 ring-blue-500 ring-opacity-60  ">

                    <div className="absolute top-6  left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 text-5xl p-4 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" color="red" fill="none">
                            <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M18.2222 17C19.6167 18.9885 20.2838 20.0475 19.8865 20.8999C19.8466 20.9854 19.7999 21.0679 19.7469 21.1467C19.1724 22 17.6875 22 14.7178 22H9.28223C6.31251 22 4.82765 22 4.25311 21.1467C4.20005 21.0679 4.15339 20.9854 4.11355 20.8999C3.71619 20.0475 4.38326 18.9885 5.77778 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <span>{weatherData.name}</span>
                    </div>
                    {/* Weather icon */}
                    <div className="text-center ">
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt="weather-icon"
                            className="mx-auto w-24 h-24  filter invert  mt-10"
                        />
                    </div>

                    {/* Current temperature and description */}
                    <p className="text-4xl font-bold text-center mb-2">{weatherData.main.temp}°C </p>
                    <p className="text-4xl font-bold text-center " > {weatherData.weather[0].description}</p>


                    {/* Additional weather details below */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        <WeatherDetailBox
                            icon="🌡️"
                            label="Feels Like"
                            value={`${weatherData.main.feels_like}°C`}
                        />
                        <WeatherDetailBox
                            icon="💧"
                            label="Humidity"
                            value={`${weatherData.main.humidity}%`}
                        />
                        <WeatherDetailBox
                            icon="💨"
                            label="Wind Speed"
                            value={`${weatherData.wind.speed} m/s`}
                        />
                        <WeatherDetailBox
                            icon="⚖️"
                            label="Pressure"
                            value={`${weatherData.main.pressure} hPa`}
                        />
                        <WeatherDetailBox
                            icon="👀"
                            label="Visibility"
                            value={`${weatherData.visibility / 1000} km`}
                        />
                        <WeatherDetailBox
                            icon="♨️"
                            label="Temp: min/max"
                            value={`${weatherData.main.temp_min} / ${weatherData.main.temp_max} °C`}
                        />
                        <WeatherDetailBox
                            icon="🌄"
                            label="Sunrise"
                            value={formattedSunrise}
                        />
                        <WeatherDetailBox
                            icon="🌇"
                            label="Sunset"
                            value={formattedSunset}
                        />
                    </div>

                    <div className="mt-10 flex flex-col md:flex-col items-start">
                        {/* Heading on the left side */}
                        <h3 className="text-3xl font-bold text-white mb-4 md:mb-0 md:w-2/3">
                            Municipality Description
                        </h3>

                        {/* Municipality description box */}
                        {loadingDescription && !fetchedDescription ? (
                            <div className="bg-gray-800 text-white mt-6 w-full p-4">Hang on! Generating description...</div>
                        ) : (
                            fetchedDescription && (
                                <div
                                    className="bg-gray-800 bg-opacity-70 mt-6 rounded-lg shadow-lg p-4 w-full"
                                    style={{ backdropFilter: "blur(8px)" }}
                                >
                                    <p className="text-white text-lg leading-relaxed">
                                        {fetchedDescription}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Weather Forecast will be rendered here */}
                    <div className="mt-10">
                        <h3 className="text-3xl font-bold text-white mb-4 md:mb-0 md:w-2/3">
                            Weather Forecast
                        </h3>
                        <WeatherForecast forecast={forecastData} />
                    </div>
                    <div className="mt-10">
                        {mapUrl && (
                            <div className="mt-8">
                                <h3 className="text-3xl font-bold text-white mb-4  md:mb-7 md:w-2/3">
                                    Weather Map
                                </h3>
                                <img src={mapUrl} alt="Weather map" className="w-full h-auto rounded-lg" />
                            </div>
                        )}
                    </div>

                    <h3 className="text-3xl font-bold text-white mt-10 md:mb-0 md:w-2/3">
                        Weather Widget
                    </h3>

                    <div className="widget-container mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <DynamicWeatherWidget cityId={cityId} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
