let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
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
  "December"
];
let year = now.getFullYear();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let formattedToday = `Today - ${day}, ${date}. ${month} ${year} - ${hour}:${minute}`;

document.getElementById("today").innerHTML = formattedToday;

function showWeather(response) {
  let cityElement = document.querySelector(".currentCity");
  let temperatureElement = document.querySelector(".degreeNumber");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  cityElement.innerHTML = `Check the weather in ${city} now`;
  temperatureElement.innerHTML = temperature;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".enterCity").value;
  let apiKey = "8de71ce80574e8c891f7d9a2621bf356";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", searchCity);

function updatePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "8de71ce80574e8c891f7d9a2621bf356";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updatePosition);
}

let locationButton = document.querySelector(".locationButton");
locationButton.addEventListener("click", retrievePosition);
