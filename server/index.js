const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    res.status(200).json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      weather_main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      clouds: data.clouds.all,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    });

  } catch (error) {
    res.status(500).json({ error: "Weather not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
