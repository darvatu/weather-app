async function fetchWeather(lat, lon) {
  const serverUrl = `http://localhost:3000/weather?lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(serverUrl);
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        "Weather data could not be fetched from server. Details: " +
          errorDetails
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data from server:", error);
    throw error;
  }
}

function displayWeatherData(weatherData) {
  const sunriseTime = new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString();
  const sunsetTime = new Date(
    weatherData.sys.sunset * 1000
  ).toLocaleTimeString();
  document.getElementById(
    "weather"
  ).textContent = `Nearest City: ${weatherData.name}, Temperature: ${weatherData.main.temp} °C, Weather: ${weatherData.weather[0].main}, Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;
}

function handleError(error) {
  console.error("Geolocation error:", error);
  alert("Error getting your location. Details: " + error.message);
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    document.getElementById(
      "location"
    ).textContent = `GPS Coordinates: Latitude: ${lat} °, Longitude: ${lon} °`;

    try {
      const weatherData = await fetchWeather(lat, lon);
      displayWeatherData(weatherData);
    } catch (error) {
      document.getElementById("weather").textContent =
        "Error fetching weather data. Check console for more details.";
    }
  }, handleError);
} else {
  alert("Geolocation is not supported by your browser.");
}
