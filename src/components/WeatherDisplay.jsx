import { useWeather } from "../context/WeatherContext";

export default function WeatherDisplay() {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { name, main, weather } = weatherData;

  return (
    <div className="text-center mt-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
      <p className="text-5xl text-blue-500 mt-2">{main.temp}°C</p>
      <p className="text-xl text-gray-600 capitalize">{weather[0].description}</p>
    </div>
  );
}
