import { fetchCityFiveDays } from './fetchApi.js';
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
  cloudySvg
} from './js-icons.js';

const searchInput = document.querySelector('.search-field__input');

const cityNameInside = document.getElementById('city-inside');
const cityNameOutside = document.getElementById('city-outside');

let foundCityTemperatures;
const hourToCheckMin = '06:00:00';
const hourToCheckMax = '12:00:00';
let minTemperatures = [0, 0, 0, 0, 0];
let maxTemperatures = [0, 0, 0, 0, 0];
let weatherCodes = [];

const containerForBoxes = document.querySelector('.five-days-weather__box-for-three');

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let datatoday = new Date();
// ustawienie zmiennej na następny dzień po dniu dzisiejszym
// w celu rozpoczęcia renderowania kart 5-ciu następnych dni od dnia jutrzejszego
let datatodays = datatoday.setDate(new Date(datatoday).getDate() + 1);
let currentDayOfMonthWithZero = 0;

// rendering five days
function renderContainers() {
  for (let i = 1; i <= 5; i++) {
    let currentDayOfWeek = new Date(datatodays).getDay();
    let currentDayOfMonth = new Date(datatodays).getDate();
    let currentMonth = new Date(datatodays).getMonth();

    if (currentDayOfMonth >= 1 && currentDayOfMonth <= 9) {
      currentDayOfMonthWithZero = '0' + currentDayOfMonth;
    } else if (currentDayOfMonth >= 10 && currentDayOfMonth <= 31) {
      currentDayOfMonthWithZero = currentDayOfMonth;
    }

    containerForBoxes.innerHTML += `<div class="five-days-weather__details" id="details-${i}">
                <div class="five-days-weather__details-day">${weekDays[currentDayOfWeek]}</div>
                <div class="five-days-weather__details-month">${currentDayOfMonthWithZero} ${months[currentMonth]}</div>
                <div class="five-days-weather__details-image-box">
                  <svg class="five-days-weather__details-image"></svg>
                </div>
                <div class="five-days-weather__details-min-max-box">
                  <div class="five-days-weather__details-min-max">
                    <div class="five-days-weather__details-min">
                      <div class="five-days-weather__details-min__up">min</div>
                      <div class="five-days-weather__details-min__down"></div>
                    </div>
                    <div class="five-days-weather__details-line"></div>
                    <div class="five-days-weather__details-max">
                      <div class="five-days-weather__details-max__up">max</div>
                      <div class="five-days-weather__details-max__down"></div>
                    </div>
                  </div>
                  <div class="five-days-weather__details-more">more info</div>
                </div>
              </div>`;

    // zmiana daty o dzień do przodu
    datatodays = datatoday.setDate(new Date(datatoday).getDate() + 1);
  }
}

renderContainers();

const dayOneMinTemp = document
  .getElementById('details-1')
  .querySelector('.five-days-weather__details-min__down');
const dayOneMaxTemp = document
  .getElementById('details-1')
  .querySelector('.five-days-weather__details-max__down');

const dayTwoMinTemp = document
  .getElementById('details-2')
  .querySelector('.five-days-weather__details-min__down');
const dayTwoMaxTemp = document
  .getElementById('details-2')
  .querySelector('.five-days-weather__details-max__down');

const dayThreeMinTemp = document
  .getElementById('details-3')
  .querySelector('.five-days-weather__details-min__down');
const dayThreeMaxTemp = document
  .getElementById('details-3')
  .querySelector('.five-days-weather__details-max__down');

const dayFourMinTemp = document
  .getElementById('details-4')
  .querySelector('.five-days-weather__details-min__down');
const dayFourMaxTemp = document
  .getElementById('details-4')
  .querySelector('.five-days-weather__details-max__down');

const dayFiveMinTemp = document
  .getElementById('details-5')
  .querySelector('.five-days-weather__details-min__down');
const dayFiveMaxTemp = document
  .getElementById('details-5')
  .querySelector('.five-days-weather__details-max__down');


const dayFourCard = document.getElementById('details-4');
const dayFiveCard = document.getElementById('details-5');
const switchLink = document.querySelector('.five-days-weather__switch');

function setResolutionDependencies() {
  if (window.screen.width < 768) {
    dayFourCard.style.display = 'none';
    dayFiveCard.style.display = 'none';
    switchLink.style.display = 'flex';
    cityNameOutside.style.display = 'none';
    cityNameInside.style.display = 'flex';
  } else if (window.screen.width >= 768) {
    dayFourCard.style.display = 'block';
    dayFiveCard.style.display = 'block';
    switchLink.style.display = 'none';
    cityNameInside.style.display = 'none';
    cityNameOutside.style.display = 'flex';
  }
}

setResolutionDependencies();

window.addEventListener('resize', then => {
  setResolutionDependencies();
})

function updateWeatherIcons() {
  const sunnyCode = '01d';
  const fewCloudsCode = '02d';
  const cloudyCode1 = '03d';
  const cloudyCode2 = '04d';
  const snowyCode = '13d';

  let weatherName = [];

  for (let i = 0; i <= 4; i++) {
    let currentWeather = weatherCodes[i];
    if (currentWeather == sunnyCode) {
      weatherName[i] = `${sunnySvg}`;
    } else if (currentWeather == fewCloudsCode) {
      weatherName[i] = `${sunCloudSvg}`;
    } else if (currentWeather == cloudyCode1 || currentWeather == cloudyCode2) {
      weatherName[i] = `${cloudySvg}`;
    } else if (currentWeather == snowyCode) {
      weatherName[i] = `${snowySvg}`;
    } else {
      weatherName[i] = `${suniceSvg}`;
    }
  }

  dayOneIcon.backgroundImage = weatherName[0];
  dayTwoIcon.backgroundImage = weatherName[1];
  dayThreeIcon.backgroundImage = weatherName[2];
  dayFourIcon.backgroundImage = weatherName[3];
  dayFiveIcon.backgroundImage = weatherName[4];
}



function updateTemperatures() {
  dayOneMinTemp.innerHTML = minTemperatures[0] + '°';
  dayOneMaxTemp.innerHTML = maxTemperatures[0] + '°';

  dayTwoMinTemp.innerHTML = minTemperatures[1] + '°';
  dayTwoMaxTemp.innerHTML = maxTemperatures[1] + '°';

  dayThreeMinTemp.innerHTML = minTemperatures[2] + '°';
  dayThreeMaxTemp.innerHTML = maxTemperatures[2] + '°';

  dayFourMinTemp.innerHTML = minTemperatures[3] + '°';
  dayFourMaxTemp.innerHTML = maxTemperatures[3] + '°';

  dayFiveMinTemp.innerHTML = minTemperatures[4] + '°';
  dayFiveMaxTemp.innerHTML = maxTemperatures[4] + '°';
}

function getTemperatures(res) {
  cityNameInside.innerHTML = res.city.name;
  cityNameOutside.innerHTML = res.city.name;
  foundCityTemperatures = res.list;

  let dateBeforeLoop = new Date();
  let dateBeforeLoopTomorrow = dateBeforeLoop.setDate(new Date(dateBeforeLoop).getDate() + 1);
  let dateForLoop = new Date(dateBeforeLoopTomorrow).getDate();

  for (let i = 0; i <= 4; i++) {
    for (let temp of foundCityTemperatures) {
      if (temp.dt_txt.slice(8, 10) == dateForLoop && temp.dt_txt.slice(11, 19) == hourToCheckMin) {
        minTemperatures[i] = Math.round(temp.main.temp_min);
      } else if (
        temp.dt_txt.slice(8, 10) == dateForLoop &&
        temp.dt_txt.slice(11, 19) == hourToCheckMax
      ) {
        maxTemperatures[i] = Math.round(temp.main.temp_max);
        weatherCodes[i] = temp.weather[0].icon;
      } else {
        continue;
      }
    }

    dateBeforeLoopTomorrow = dateBeforeLoop.setDate(new Date(dateBeforeLoop).getDate() + 1);
    dateForLoop = new Date(dateBeforeLoopTomorrow).getDate();
  }
}

function buildResponse(res) {
  getTemperatures(res);
  updateWeatherIcons();
  updateTemperatures();
}

function defaultCity() {
  fetchCityFiveDays('Skarżysko-Kamienna').then(res => {
    buildResponse(res);
  });
}

defaultCity();

searchInput.addEventListener('change', event => {
  event.preventDefault();
  if (searchInput.value === '') {
    defaultCity();
  } else {
    fetchCityFiveDays(searchInput.value).then(res => {
      buildResponse(res);
    });
  }
});

// https://codepen.io/shshaw/pen/rrOZQQ

let dayOneIcon = document
  .getElementById('details-1')
  .querySelector('.five-days-weather__details-image').style;

let dayTwoIcon = document
  .getElementById('details-2')
  .querySelector('.five-days-weather__details-image').style;

let dayThreeIcon = document
  .getElementById('details-3')
  .querySelector('.five-days-weather__details-image').style;

let dayFourIcon = document
  .getElementById('details-4')
  .querySelector('.five-days-weather__details-image').style;

let dayFiveIcon = document
  .getElementById('details-5')
  .querySelector('.five-days-weather__details-image').style;