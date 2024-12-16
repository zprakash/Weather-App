import React from 'react';

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast-container mt-6">
      <h2 className="text-white text-2xl text-center mb-4">Weather Forecast</h2>
      <div className="grid grid-cols-3 gap-4">
        {forecastData.list.slice(0, 5).map((forecast, index) => (
          <div
            key={index}
            className="forecast-item bg-gray-800 rounded-lg p-4 text-white text-center"
          >
            <h3 className="text-xl">{new Date(forecast.dt * 1000).toLocaleString()}</h3>
            <p className="text-lg">{forecast.main.temp}°C</p>
            <p className="text-sm">{forecast.weather[0].description}</p>
            <p className="text-sm">Humidity: {forecast.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
