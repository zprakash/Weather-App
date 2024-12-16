
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const checkApiKey = () => {
  if (!API_KEY) {
    alert("API key is missing. Please provide a valid API key.");
    throw new Error("API key is missing.");
  }
};

export const fetchWeather = async (city) => {

  checkApiKey();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("City not found");

  return await response.json();
};

export const fetchWeatherByCoords = async (lat, lon) => {

  checkApiKey();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  return await response.json();
};


export const fetchForecastByCoords = async (lat, lon) => {

  checkApiKey();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Error fetching forecast data");
  }

  return await response.json();
};


export const fetchWeatherMapTile = async (layer = 'temp', z = 5, x = 10, y = 10) => {

  checkApiKey();

  const url = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error('Error fetching map tile data');
  return await response.blob();
};
