import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useWeather } from "./context/WeatherContext";
import WeatherRoutes from "./components/WeatherRoutes";
import Footer from "./components/Footer";

function App() {
  const { loading } = useWeather();

  return (
    <>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/*" element={<WeatherRoutes />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
