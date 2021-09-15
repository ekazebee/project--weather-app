function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let now = `last updated ${day} ${hours}:${minutes}`;
  return now;
}

let showCurrentTime = document.querySelector("#current-time");
let currentDate = new Date();
showCurrentTime.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let upcomingDay = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[upcomingDay];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img class="forecast-icons"
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}</span> /
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}</span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  apiKey = "0ec90f7c009a99f423602e64344f4416";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showRealWeather(response) {
  console.log(response);

  let currentCity = document.querySelector("#current-city");
  city = response.data.name;
  let country = response.data.sys.country;
  currentCity.innerHTML = `${city}, ${country}`;

  fahrenheitTemperature = Math.round(response.data.main.temp);
  let realWind = response.data.wind.speed;
  let realHighTemp = Math.round(response.data.main.temp_max);
  let realLowTemp = Math.round(response.data.main.temp_min);
  let realWeatherDescription = response.data.weather[0].description;
  let realHumidity = response.data.main.humidity;
  let iconCode = response.data.weather[0].icon;

  let temperatureElement = document.querySelector("#current-temp-display");
  temperatureElement.innerHTML = `${fahrenheitTemperature}`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${realWind} mph`;
  let highTempElement = document.querySelector("#current-high-temp");
  highTempElement.innerHTML = realHighTemp;
  let lowTempElement = document.querySelector("#current-low-temp");
  lowTempElement.innerHTML = realLowTemp;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = realWeatherDescription;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${realHumidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  apiKey = "0ec90f7c009a99f423602e64344f4416";
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial`;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0ec90f7c009a99f423602e64344f4416";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showRealWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = citySearchInput.value;
  let city = citySearchInput.value;
  search(city);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showRealWeather);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationLink = document.querySelector("#find-current-location");
currentLocationLink.addEventListener("click", findCurrentLocation);

search("Seattle");
