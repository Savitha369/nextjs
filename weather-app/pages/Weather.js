import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState();
  const [cityName, setCityName] = useState("hamburg");
  const [searchCityName, setSearchCityName] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=P532CR7FFXTU9TYY7HGK7VLC5`
        );
        const data = await response.json();
        console.log("data");
        console.log(data);
        console.log("data-end");
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCityName(searchCityName);
  };

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }
  // Function to convert Fahrenheit to Celsius
  const convertToFahrenheit = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };
  const temperatureCelsius = convertToFahrenheit(weatherData.days[0].temp);
  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/e/e0/Grass_at_a_lawn_with_morning_dew_02.jpg")`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center text-stone-950">
        Weather Information
      </h1>
      <form onSubmit={handleSearch} className="mb-4 text-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={searchCityName}
          onChange={(event) => setSearchCityName(event.target.value)}
          className="border border-gray-300 py-2 px-4 rounded  text-center text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 text-center"
        >
          Search
        </button>
      </form>
      <div className="box-border   text-center">
        <p className="text-xl mb-2 text-center">City: {weatherData.address}</p>
        <p className="text-xl mb-2 text-center">
          Temperature: {temperatureCelsius}°C
        </p>

        <p className="text-xl mb-2 text-center">{weatherData.days[0].icon}</p>
        <p className="text-xl mb-2 text-center">
          Weather: {weatherData.description}
        </p>
      </div>
    </div>
  );
};

export default Weather;
