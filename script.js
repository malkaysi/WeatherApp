// This app searches a users inputted location
// For the weather using the openweathermap API
import { apiid } from './env.js';

let buttonElement = document.getElementById('submitData');
let showButton = document.getElementById('showData');
let body = document.getElementById('body');

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

// Get users current location
const getGeoLocation = async () => {
  const { cityName, state, zipCode } = searchObj

  // Get data if zip inputted
  if (zipCode) {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiid}`)
      geoLocationData = await response.json();
      console.log(geoLocationData);
      getWeather(geoLocationData);

      if (geoLocationData.length > 1) {
        console.log('test')
      }

    } catch {
      console.log(error)
    }
  }

  // Get data if city name and state inputted
  if ((cityName && state) && !zipCode) {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},1&limit=5&appid=${apiid}`)
      geoLocationData = await response.json();
      // getWeather(geoLocationData);
    } catch {
      console.log(error)
    }

    let i;
    if (geoLocationData.length > 1) {
      for (i = 0; i < geoLocationData.length; i++) {
        displayMultipleLocations(geoLocationData[i]);
      }
    }
  }

  if ((!cityName || !state) && !zipCode) {
    console.log('Please input a city and state or zip code')
  }
};

// Get weather info for submitted locations
const getWeather = async (geoLocationData) => {
  const { lat, lon } = geoLocationData;

  if (lat && lon) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiid}`)
      weatherData = await response.json();
    } catch {
      console.log(error)
    }
  }

  console.log(weatherData);
}

// Display results
// If there are more than one location let's show them radio buttons of the city, country
const displayMultipleLocations = (location) => {
  const {name, country} = location;
  console.log(location)
  let input = document.createElement("input");
  input.setAttribute('type', 'radio');
  input.setAttribute('id', `${name}`);

  let label = document.createElement("label");
  label.setAttribute('type', 'radio');
  label.setAttribute('for', `${name}`)
  label.textContent = `${name}, ${country}`;

  body.appendChild(input);
  body.appendChild(label);
}

// Allow users to submit their data
buttonElement.addEventListener('click', storeSubmissionData);
showButton.addEventListener('click', getGeoLocation);



