//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

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

//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form

//function search(event) {
//event.preventDefault();
//let citySearchInput = document.querySelector("#city-search-input");

//let currentCity = document.querySelector("#current-city");
//currentCity.innerHTML = citySearchInput.value;
//}

//let citySearchForm = document.querySelector("#city-search-form");
//citySearchForm.addEventListener("submit", search);

//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertToCelsius(event) {
  currentTempDisplay.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  convertToCelsius.called = true; // since inital value is in F; can run this function right away
  celsiusLink.innerHTML = "<strong>°C</strong>";
  fahrenheitLink.innerHTML = "°F";
}

function convertToFahrenheit(event) {
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

let currentTempDisplay = document.querySelector("#current-temp-display"); // will have F temp on load; ready to convert to C
let temperature = currentTempDisplay.innerHTML;
temperature = Number(temperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

// when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the current temperature of the city.

//function showRealForecast(response) {
//  console.log(response.data);
//}

function showRealWeather(response) {
  console.log(response);

  let currentCity = document.querySelector("#current-city");
  city = response.data.name;
  currentCity.innerHTML = city;

  let realTemperature = Math.round(response.data.main.temp);
  let realWind = response.data.wind.speed;
  let realHighTemp = Math.round(response.data.main.temp_max);
  let realLowTemp = Math.round(response.data.main.temp_min);
  let realWeatherDescription = response.data.weather[0].description;
  let realHumidity = response.data.main.humidity;
  let iconCode = response.data.weather[0].icon;

  let temperatureElement = document.querySelector("#current-temp-display");
  temperatureElement.innerHTML = `${realTemperature}`;
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
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showRealForecast);
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

// When clicking current location, it uses the Geolocation API to get your GPS coordinates
// and display and the city and current temperature using the OpenWeather API.

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
