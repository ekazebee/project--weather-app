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
  let now = `${day} ${hours}:${minutes}`;
  return now;
  // get forecast for next 5 days; use getDay + next ones??
}

let showCurrentTime = document.querySelector("#current-time");
let currentDate = new Date();
showCurrentTime.innerHTML = formatDate(currentDate);

//function showRealForecast(response) {
//  console.log(response.data);
//}

function showRealWeather(response) {
  console.log(response);

  let currentCity = document.querySelector("#current-city");
  city = response.data.name;
  currentCity.innerHTML = city;

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
  units = "imperial";
  apiKey = "0ec90f7c009a99f423602e64344f4416";
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}`;
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(showRealForecast);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-display");
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  temperatureElement.innerHTML = celsiusTemperature;
  convertToCelsius.called = true; // since inital value is in F; can run this function right away
  celsiusLink.innerHTML = "<strong>°C</strong>";
  fahrenheitLink.innerHTML = "°F";
}

function convertToFahrenheit(event) {
  event.preventDefault();
  if (convertToCelsius.called) {
    // can only run if temp has been converted to C
    let currentTempDisplay = document.querySelector("#current-temp-display"); // give C display temp instead of using display on load below
    let temperature = currentTempDisplay.innerHTML;
    temperature = Number(temperature);
    currentTempDisplay.innerHTML = Math.round((temperature * 9) / 5 + 32);
    fahrenheitLink.innerHTML = "<strong>°F</strong>";
    celsiusLink.innerHTML = "°C";
  }
  convertToCelsius.called = false; // will return false next time so it can't run again
}

function search(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = citySearchInput.value;
  let city = citySearchInput.value;

  let apiKey = "0ec90f7c009a99f423602e64344f4416";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showRealWeather);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", search);

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

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
