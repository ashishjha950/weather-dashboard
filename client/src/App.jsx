import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);
    setError("");

    try {
      const res = await axios.get(`https://weather-dashboard-gppx.onrender.com/api/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (unix) => {
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString();
  };

  const getBackgroundImage = () => {
    if (!weather) return "/backgrounds/default.jpg";

    switch (weather.weather_main) {
      case "Clear":
        return "/backgrounds/clear.jpg";
      case "Clouds":
        return "/backgrounds/clouds.jpg";
      case "Rain":
        return "/backgrounds/rain.jpg";
      case "Thunderstorm":
        return "/backgrounds/thunderstorm.jpg";
      case "Snow":
        return "/backgrounds/snow.jpg";
      case "Mist":
      case "Haze":
      case "Fog":
        return "/backgrounds/fog.jpg";
      default:
        return "/backgrounds/default.jpg";
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 transition-all duration-500"
      style={{
        backgroundImage: `url('${getBackgroundImage()}')`,
      }}
    >
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🌦️ Weather Dashboard</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchWeather}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

        {weather && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{weather.city}, {weather.country}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
                className="mx-auto"
              />
              <p className="text-lg font-medium">{weather.weather_main} - {weather.description}</p>
              <p className="text-4xl font-bold mt-2">{weather.temperature}°C</p>
              <p className="text-sm text-gray-600">(Feels like {weather.feels_like}°C)</p>
            </div>

            <div className="space-y-2">
              <p><strong>🌡️ Min/Max:</strong> {weather.temp_min}°C / {weather.temp_max}°C</p>
              <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
              <p><strong>📊 Pressure:</strong> {weather.pressure} hPa</p>
              <p><strong>👁️ Visibility:</strong> {weather.visibility} m</p>
              <p><strong>☁️ Clouds:</strong> {weather.clouds}%</p>
              <p><strong>💨 Wind:</strong> {weather.wind_speed} m/s at {weather.wind_deg}°</p>
              <p><strong>🌅 Sunrise:</strong> {formatTime(weather.sunrise)}</p>
              <p><strong>🌇 Sunset:</strong> {formatTime(weather.sunset)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
