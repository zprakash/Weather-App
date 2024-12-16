import React, { useEffect } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherWidget = ({ cityId }) => {
  useEffect(() => {
    if (!cityId) return;

    const loadD3 = new Promise((resolve) => {
      const d3Script = document.createElement("script");
      d3Script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js";
      d3Script.async = true;
      d3Script.onload = resolve;
      document.body.appendChild(d3Script);
    });

    loadD3.then(() => {
      window.myWidgetParam = window.myWidgetParam || [];
      window.myWidgetParam.push({
        id: 1,
        cityid: cityId,
        appid: apiKey,
        units: "metric",
        containerid: "openweathermap-widget-1",
        showfeelslike: true,
        showpressure: true,
        showhumidity: true,
        showwind: true,
        showforecast: true,
        showsun: true,
        theme: "light",
      });

      const widgetScript = document.createElement("script");
      widgetScript.src =
        "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      widgetScript.async = true;
      document.body.appendChild(widgetScript);
    });
  }, [cityId]);

  return <div id="openweathermap-widget-1"
    className="w-full max-w-full h-auto">
  </div>;
};

export default WeatherWidget;
