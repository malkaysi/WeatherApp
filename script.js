// This app searches a users inputted location
// For the weather using the openweathermap API
import { apiid } from './env.js';

let buttonElement = document.getElementById('submitData');
let showButton = document.getElementById('showData');
let body = document.getElementById('body');

let radioForm = document.createElement("form");
radioForm.setAttribute('id', 'radioForm');

let locationSelectionButton = document.createElement('button');
locationSelectionButton.setAttribute('id', 'locationSelectionButton');
locationSelectionButton.textContent = 'Select this location';

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

    if (geoLocationData.length > 1) {
      body.appendChild(radioForm);
      let i;
      for (i = 0; i < geoLocationData.length; i++) {
        displayMultipleLocations(geoLocationData[i], i);
      }

      body.appendChild(locationSelectionButton)
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
const displayMultipleLocations = (locationData, selectedLocation) => {
  const { name, country } = locationData;
  console.log(locationData)

  let input = document.createElement("input");
  input.setAttribute('type', 'radio');
  input.setAttribute('id', `${name}`);
  input.setAttribute('name', 'locationSelection')
  input.setAttribute('value', `${selectedLocation}`);

  let label = document.createElement("label");
  label.setAttribute('type', 'radio');
  label.setAttribute('for', `${name}`)
  label.textContent = `${name}, ${country}`;

  radioForm.appendChild(input);
  radioForm.appendChild(label);
}

const getSelectedLocation = () => {
  let selectedLocation = document.querySelector('input[name="locationSelection"]:checked').value;
  getWeather(geoLocationData[selectedLocation])

}

// Allow users to submit their data
buttonElement.addEventListener('click', storeSubmissionData);
showButton.addEventListener('click', getGeoLocation);
locationSelectionButton.addEventListener('click', getSelectedLocation);



