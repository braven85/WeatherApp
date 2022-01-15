import { fetchCity } from "./fetchApi.js";
import {
  sunnySvg,
  snowySvg,
  suniceSvg,
  windSvg,
  humiditySvg,
  barometerSvg,
  sunriseSvg,
  sunsetSvg,
  sunCloudSvg,
  cloudySvg,
} from './js-icons.js';

/*
dane dotyczące ikonki pogody
01d - sunnySvg
02d - sunCloudSvg
03d, 04d - cloudySvg
13d - snowySvg
else - suniceSvg */

const searchInput = document.querySelector('.search-field__input');
const favoriteStar = document.querySelector('.search-field__icon-star');

favoriteStar.addEventListener('click', then => {
  console.log('kliknales gwiazdke');
  localStorage.setItem("miasto", searchInput.value);
})

const weatherSvg = document.getElementById('weather-box-icon').style;

const sunnyCode = '01d';
const fewCloudsCode = '02d';
const cloudyCode1 = '03d';
const cloudyCode2 = '04d';
const snowyCode = '13d';

function getWeatherIcon(res) {
  let currentWeather = res.weather[0].icon;
  if (currentWeather == sunnyCode) {
    weatherSvg.backgroundImage = sunnySvg;
  } else if (currentWeather == fewCloudsCode) {
    weatherSvg.backgroundImage = sunCloudSvg;
  } else if (currentWeather == cloudyCode1 || currentWeather == cloudyCode2) {
    weatherSvg.backgroundImage = cloudySvg;
  } else if (currentWeather == snowyCode) {
    weatherSvg.backgroundImage = snowySvg;
  } else {
    weatherSvg.backgroundImage = suniceSvg;
  }
}

const foundCityName = document.getElementById('weather-box-city-name');

function getCityName(res) {
  foundCityName.innerHTML = res.name;
}

const mainTemp = document.getElementById('weather-box-main-temp');
const minTemp = document.getElementById('weather-min__down');
const maxTemp = document.getElementById('weather-max__down');

function getTemperatures(res) {
  mainTemp.innerHTML = `${Math.floor(res.main.temp)}°`;
  minTemp.innerHTML = `${Math.floor(res.main.temp_min)}°`;
  maxTemp.innerHTML = `${Math.floor(res.main.temp_max)}°`;
}

const sunrise = document.querySelector('.date-box-sun-rise-text');
const sunset = document.querySelector('.date-box-sun-set-text');

function getSunriseAndsunSet(res) {
  const sunriseUNIX = new Date(Number(res.sys.sunrise + '000'));
  sunrise.innerHTML = sunriseUNIX.toTimeString().slice(0, 5);
  const sunsetUNIX = new Date(Number(res.sys.sunset + '000'));
  sunset.innerHTML = sunsetUNIX.toTimeString().slice(0, 5);
}

function buildResponse(res) {
  getWeatherIcon(res);
  getCityName(res);
  getTemperatures(res);
  getSunriseAndsunSet(res);
}

function defaultCity() {
  fetchCity('Skarżysko-Kamienna').then(res => {
    buildResponse(res);
  });
}

defaultCity();

searchInput.addEventListener('change', event => {
  event.preventDefault();
  if (searchInput.value === "") {
    defaultCity();
  } else {
    fetchCity(searchInput.value).then(res => {
      buildResponse(res);
    })
  }
})