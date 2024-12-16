import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WeatherProvider } from "./context/WeatherContext";

createRoot(document.getElementById('root')).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>,
)
