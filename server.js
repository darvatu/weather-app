require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let fetch;

(async () => {
  if (!fetch) {
    fetch = (await import("node-fetch")).default;
  }

  app.get("/weather", async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).send("Server error fetching weather data");
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
