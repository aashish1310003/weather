import React, { useEffect, useState } from "react";
import getFormattedWeatherData, { iconUrlFromCode } from "../api/weatherService"; // Adjust the path accordingly

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add the required search parameters here
        // For example: city name, zip code, etc.
        const searchParams = { q: "Erode" ,units:"metric"};
        const data = await getFormattedWeatherData(searchParams);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detailsGrid">
      <div className="details1">
      <img src={iconUrlFromCode(weatherData.icon)} alt="Weather Icon" />
      </div>
      <div className="details2">
        {/* Add additional details or components as needed */}
        <p>Feels like</p>
        <h1>{weatherData.feels_like}</h1>
      </div>
      <div className="details3">
        <p>Pressure</p>
        <h1>{weatherData.pressure}</h1><p>hpa</p>
      </div>
      <div className="details4">
        {/* Add additional details or components as needed */}
      </div>
    </div>
  );
};

export default WeatherComponent;
