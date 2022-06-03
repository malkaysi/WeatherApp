// This app searches a users inputted location
// For the weather using the openweathermap API
import { apiid } from './env.js';

let buttonElement = document.getElementById('submitData');
let showButton = document.getElementById('showData');

let searchObj = {
  cityName,
  state,
  zipCode,
}

let geoLocationData = {};
let weatherData = {};

// Store the submitted data for searching
function storeSubmissionData() {
  searchObj.cityName = document.getElementById('cityName').value;
  searchObj.state = document.getElementById('state').value;
  searchObj.zipCode = document.getElementById('zipCode').value;
}

const getGeoLocation = async () => {
  const { cityName, state, zipCode } = searchObj

  // Get data if zip inputted
  if (zipCode) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiid}`)
    geoLocationData = await response.json();
  }

  // Get data if city name and state inputted
  if ((cityName && state) && !zipCode) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},1&limit=5&appid=${apiid}`)
    geoLocationData = await response.json();
  }

  if ((!cityName || !state) && !zipCode) {
    console.log('Please input a city and state or zip code')
  }

  console.log(geoLocationData);
  getWeather();
};

const getWeather = async () => {
  const { lat, lon } = geoLocationData;
  console.log('test')

  if (lat && lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiid}`)
    weatherData = await response.json();
  }

  console.log(weatherData);
}


// Search for the weather of the location

buttonElement.addEventListener('click', storeSubmissionData);
showButton.addEventListener('click', getGeoLocation);



