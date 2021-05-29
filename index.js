function showWeatherAtLocation(response) {
  let h1 = document.querySelector("h1");
  let definition = document.querySelector("#definition");
  let localTemp = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity-indicator");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feels-like");
  let feelsResult = Math.round(response.data.main.feels_like);
  let windResult = Math.round(response.data.wind.speed);

  let weatherDescrip = response.data.weather[0].description;

  let humAtLocation = response.data.main.humidity;
  h1.innerHTML = response.data.name;
  definition.innerHTML = `${weatherDescrip} ,`;
  localTemp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `Humidity: ${humAtLocation}%`;
  wind.innerHTML = `Wind: ${windResult}Km/h`;
  feelsLike.innerHTML = `Feels like: ${feelsResult} °C`;
}

function getPosition(position) {
  let yourLat = Math.round(position.coords.latitude);
  let yourLon = Math.round(position.coords.longitude);
  let apiKey = "86795cd1e54d46ec82adad776beccce9";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${yourLat}&lon=${yourLon}&appid=${apiKey}&units=metric`;
  axios.get(locationUrl).then(showWeatherAtLocation);
}

function getMyPosition(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let myLocation = document.querySelector("#current-location");
myLocation.addEventListener("click", getMyPosition);

function displayTemp(response) {
  let cityName = document.querySelector("h1");
  let localTemp = document.querySelector("#temperature");
  let definition = document.querySelector("#definition");
  let humidity = document.querySelector("#humidity-indicator");
  let wind = document.querySelector("#wind");
  let feelsLike = document.querySelector("#feels-like");
  let icon = document.querySelector("#changing-icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);

  let newHumidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let newFeelsLike = Math.round(response.data.main.feels_like);

  let weatherDef = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  cityName.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${newHumidity}%`;
  wind.innerHTML = `Wind: ${windSpeed} Km/h`;
  feelsLike.innerHTML = `Feels like: ${newFeelsLike}°C`;
  localTemp.innerHTML = Math.round(response.data.main.temp);
  definition.innerHTML = `${weatherDef}, `;
}

function search(city) {
  let apiKey = "86795cd1e54d46ec82adad776beccce9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;

  search(cityInput);
}

let form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

let now = new Date();

function getCurrentTime(Date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let month = months[now.getMonth()];

  let updatedTime = `${day}, ${date} ${month}, ${hour}:${minutes}`;
  return updatedTime;
}

getCurrentTime();

let dayTime = document.querySelector("#current-time");

dayTime.innerHTML = getCurrentTime();

function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let localTemp = document.querySelector("#temperature");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);

  localTemp.innerHTML = fahrenheitTemp;
}

let fahrenheit = document.querySelector("#fahrenheit-symbol");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let updatedTemp = document.querySelector("#temperature");

  updatedTemp.innerHTML = celsiusTemperature;
}

let celsius = document.querySelector("#celsius-symbol");
celsius.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastHTML = ` <div class="row"> `;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
        <img
          src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
          alt="icon"
          width="45"
        />
        <div class="forecast-temperature">
          <span class="forecast-max">22°/</span>
          <span class="forecast-min">15°</span>
        </div>
      </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

search("Naples");
