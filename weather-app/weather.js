import axios from 'axios';

const API_KEY = 'process.env.API_KEY'; // Replace with your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = ({ weatherData }) => {
  const { name, main, weather } = weatherData;

  return (
    <div>
      <h1>Weather App</h1>
      {name && (
        <>
          <h2>City: {name}</h2>
          <h3>Temperature: {main.temp}°C</h3>
          <h3>Weather: {weather[0].description}</h3>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?q=London&appid=${API_KEY}&units=metric`
    );
    const weatherData = response.data;
    return {
      props: { weatherData }
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return {
      props: { weatherData: null }
    };
  }
}

export default Weather;
