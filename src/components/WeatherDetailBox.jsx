import React from "react";

// Function to convert Unix timestamp to standard time
export function convertToStandardTime(timestamp) {
  const date = new Date(timestamp * 1000); 
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', options); // Format time to 12-hour standard
}

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);  
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  return {
    date: `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`,
    time: formattedTime
  };
};

const WeatherDetailBox = ({ icon, label, value }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-500 to-blue-600 bg-opacity-60 rounded-lg p-6 text-center shadow-xl ring-2 ring-blue-500 ring-opacity-70 transition-all hover:scale-105 hover:shadow-2xl">
      <div className="text-3xl">{icon}</div>
      <p className="text-md text-white mt-2">{label}</p>
      <p className="font-semibold text-lg text-white">{value}</p>
    </div>
  );
};

export default WeatherDetailBox;
