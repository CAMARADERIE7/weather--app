const apiKey = "71d59e29d18967f4e3fe7d5f3ab1583a"; 
function getWeather() {
  const city = document.getElementById("city").value.trim();
  const weatherBox = document.getElementById("weather-info");

  if (!city) {
    weatherBox.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found. Try again!");
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      weatherBox.innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("weather-info").innerHTML = `
    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon" />
    <p><strong>City:</strong> ${data.name}, ${data.sys.country}</p>
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  `;
}
