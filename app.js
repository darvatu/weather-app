if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById(
        "location"
      ).textContent = `Latitude: ${lat} °, Longitude: ${lon} °`;

      const apiKey = "a30e528370497f31ec126e19be3c1a3e";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("Failed to fetch weather data:", errorDetails);
          throw new Error(
            "Weather data could not be fetched. Details: " + errorDetails
          );
        }
        const weatherData = await response.json();
        document.getElementById(
          "weather"
        ).textContent = `Temperature: ${weatherData.main.temp} °C, Weather: ${weatherData.weather[0].main}`;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather").textContent =
          "Error fetching weather data. Check console for more details.";
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Error getting your location. Details: " + error.message);
    }
  );
} else {
  alert("Geolocation is not supported by your browser.");
}
