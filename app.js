if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById(
      "location"
    ).textContent = `Latitude: ${lat} °, Longitude: ${lon} °`;
    // to fetch weather data here
  });
} else {
  alert("Geolocation is not supported by your browser.");
}
