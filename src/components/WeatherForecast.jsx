// WeatherForecast.jsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaWind } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherForecast = ({ forecast }) => {
    const [showGraph, setShowGraph] = useState(false);

    if (!forecast) return <div className="text-white">Loading forecast...</div>;

    // Weather icons for each condition
    const weatherIcons = {
        Clear: <FaSun className="text-yellow-500 text-3xl" />,
        Clouds: <FaCloud className="text-gray-500 text-3xl" />,
        Rain: <FaCloudRain className="text-blue-500 text-3xl" />,
        Snow: <FaSnowflake className="text-blue-300 text-3xl" />,
        Drizzle: <FaCloudRain className="text-blue-300 text-3xl" />,
        Mist: <FaCloud className="text-gray-400 text-3xl" />,
        Thunderstorm: <FaWind className="text-indigo-600 text-3xl" />,
    };

    // Prepare data for the chart
    const labels = forecast.list.map(forecastItem => {
        const date = new Date(forecastItem.dt * 1000);
        return `${date.getHours()}:${date.getMinutes()}`;
    });

    const temperatureData = forecast.list.map(forecastItem => forecastItem.main.temp);
    const humidityData = forecast.list.map(forecastItem => forecastItem.main.humidity);
    const pressureData = forecast.list.map(forecastItem => forecastItem.main.pressure);
    const windSpeedData = forecast.list.map(forecastItem => forecastItem.wind.speed);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Pressure (hPa)',
                data: pressureData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Wind Speed (m/s)',
                data: windSpeedData,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'gray',
                    font: {
                        size: 13,
                    }
                }
            },
            title: {
                display: true,
                text: ['Weather Forecast (Temperature, Humidity, Pressure, Wind Speed)', 'Hover over dots to see more info. The graph provides weather forecast for 5 days with data every 3 hours'],
                font: {
                    size: 17,
                },
                padding: {
                    bottom: 15,
                },
                align: 'center',
            },
            tooltip: {
                position: 'nearest',
                caretSize: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: 'white',
                bodyColor: 'white',
                boxPadding: 6,
                padding: 10,
                displayColors: false,
                callbacks: {
                    title: function (tooltipItem) {
                        const index = tooltipItem[0].dataIndex;
                        const forecastItem = forecast.list[index];
                        const date = new Date(forecastItem.dt * 1000);
                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                    },
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const forecastItem = forecast.list[index];
                        const temperature = `${forecastItem.main.temp}°C`;
                        const humidity = `${forecastItem.main.humidity}%`;
                        const pressure = `${forecastItem.main.pressure} hPa`;
                        const windSpeed = `${forecastItem.wind.speed} m/s`;

                        return `Temp: ${temperature} | Humidity: ${humidity} | Pressure: ${pressure} | Wind Speed: ${windSpeed}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (HH:MM)',
                    color: 'white',
                    font: {
                        size: 18,
                    }
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 14,
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                    color: 'white',
                    font: {
                        size: 18,
                    }
                },
                ticks: {
                    color: 'white',
                    font: {
                        size: 14,
                    }
                },
                beginAtZero: false,
            }
        }
    };

    // Render the forecast boxes
    const renderForecastBoxes = forecast.list.slice(0, 7).map((forecastItem, index) => {
        const weatherCondition = forecastItem.weather[0].main;
        const date = new Date(forecastItem.dt * 1000);
        const time = `${date.getHours()}:${date.getMinutes()}`;
        const temperature = forecastItem.main.temp;
        const humidity = forecastItem.main.humidity;
        const pressure = forecastItem.main.pressure;
        const windSpeed = forecastItem.wind.speed;

        return (
            <div key={index} className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="flex justify-center mb-4">
                    {weatherIcons[weatherCondition] || <FaSun className="text-yellow-400 text-4xl" />}
                </div>
                <p className="text-white text-xl font-semibold">{date.toLocaleDateString()} {time}</p>
                <p className="text-white text-md mt-2">{weatherCondition}</p>
                <div className="mt-3 text-white text-sm space-y-2">
                    <p>Temp: <span className="font-bold">{temperature}°C</span></p>
                    <p>Humidity: <span className="font-bold">{humidity}%</span></p>
                    <p>Pressure: <span className="font-bold">{pressure} hPa</span></p>
                    <p>Wind Speed: <span className="font-bold">{windSpeed} m/s</span></p>
                </div>
            </div>
        );
    });

    return (
        <div className="p-6 mt-10 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-white text-xl mb-4">Weather Forecast for the Next Few Hours</h2>

            {/* Forecast Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {renderForecastBoxes}
            </div>

            {/* Button to toggle between forecast boxes and graph */}
            <div className="mt-10 text-center">
                <button
                    onClick={() => setShowGraph(!showGraph)}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-semibold transition duration-200"
                >
                    {showGraph ? "Hide forecast" : "See more forecast"}
                </button>
            </div>

            {/* Weather Graph */}
            {showGraph && (
                <div className="mt-8">
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;
