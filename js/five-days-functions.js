import {
  fetchCityFiveDays
} from "./fetchApi.js";
import {
  sunnySvg,
  snowySvg,
  suniceSvg,
  sunCloudSvg,
  cloudySvg,
} from "./js-icons.js";
import {
  checkIfCityIsFavorite
} from "./favorite-five-cities.js";
import {
  getDataForMoreInfo
} from "./more-info-cards.js";

const searchInput = document.querySelector(".search-field__input");

const cityNameInside = document.getElementById("city-inside");
const cityNameOutside = document.getElementById("city-outside");

let foundCityTemperatures;
let minTemperatures = [0, 0, 0, 0, 0];
let maxTemperatures = [0, 0, 0, 0, 0];
let weatherCodes = [];

const containerForBoxes = document.querySelector(
  ".five-days-weather__box-for-five"
);

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
      currentDayOfMonthWithZero = "0" + currentDayOfMonth;
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
  .getElementById("details-1")
  .querySelector(".five-days-weather__details-min__down");
const dayOneMaxTemp = document
  .getElementById("details-1")
  .querySelector(".five-days-weather__details-max__down");

const dayTwoMinTemp = document
  .getElementById("details-2")
  .querySelector(".five-days-weather__details-min__down");
const dayTwoMaxTemp = document
  .getElementById("details-2")
  .querySelector(".five-days-weather__details-max__down");

const dayThreeMinTemp = document
  .getElementById("details-3")
  .querySelector(".five-days-weather__details-min__down");
const dayThreeMaxTemp = document
  .getElementById("details-3")
  .querySelector(".five-days-weather__details-max__down");

const dayFourMinTemp = document
  .getElementById("details-4")
  .querySelector(".five-days-weather__details-min__down");
const dayFourMaxTemp = document
  .getElementById("details-4")
  .querySelector(".five-days-weather__details-max__down");

const dayFiveMinTemp = document
  .getElementById("details-5")
  .querySelector(".five-days-weather__details-min__down");
const dayFiveMaxTemp = document
  .getElementById("details-5")
  .querySelector(".five-days-weather__details-max__down");

const dayFourCard = document.getElementById("details-4");
const dayFiveCard = document.getElementById("details-5");
const switchLink = document.querySelector(".five-days-weather__switch");

function setResolutionDependencies() {
  if (window.screen.width < 768) {
    dayFourCard.style.display = "none";
    dayFiveCard.style.display = "none";
    switchLink.style.display = "flex";
    cityNameOutside.style.display = "none";
    cityNameInside.style.display = "flex";
  } else if (window.screen.width >= 768) {
    dayFourCard.style.display = "block";
    dayFiveCard.style.display = "block";
    switchLink.style.display = "none";
    cityNameInside.style.display = "none";
    cityNameOutside.style.display = "flex";
  }
}

setResolutionDependencies();

window.addEventListener("resize", (then) => {
  setResolutionDependencies();
});

function updateWeatherIcons() {
  const sunnyCode = "01d";
  const fewCloudsCode = "02d";
  const cloudyCode1 = "03d";
  const cloudyCode2 = "04d";
  const snowyCode = "13d";

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
  dayOneMinTemp.innerHTML = minTemperatures[0] + "°";
  dayOneMaxTemp.innerHTML = maxTemperatures[0] + "°";

  dayTwoMinTemp.innerHTML = minTemperatures[1] + "°";
  dayTwoMaxTemp.innerHTML = maxTemperatures[1] + "°";

  dayThreeMinTemp.innerHTML = minTemperatures[2] + "°";
  dayThreeMaxTemp.innerHTML = maxTemperatures[2] + "°";

  dayFourMinTemp.innerHTML = minTemperatures[3] + "°";
  dayFourMaxTemp.innerHTML = maxTemperatures[3] + "°";

  dayFiveMinTemp.innerHTML = minTemperatures[4] + "°";
  dayFiveMaxTemp.innerHTML = maxTemperatures[4] + "°";
}

let minMaxTempAndIconsForAllDays = {}

function getTemperatures(res) {
  cityNameInside.innerHTML = res.city.name;
  cityNameOutside.innerHTML = res.city.name;
  foundCityTemperatures = res.list;

  let dateBeforeLoop = new Date();
  let dateBeforeLoopTomorrow = dateBeforeLoop.setDate(
    new Date(dateBeforeLoop).getDate() + 1
  );
  let dateForLoop = new Date(dateBeforeLoopTomorrow).getDate();

  minMaxTempAndIconsForAllDays = {}
  weatherCodes = [];
  let tempTableLength = 0;
  let minTemp = 0;
  let maxTemp = 0;

  for (let i = 0; i <= 4; i++) {
    minMaxTempAndIconsForAllDays[i] = {hour: [], tempMin: [], tempMax: [], icon: []};
    for (let temp of foundCityTemperatures) {
      if (
        temp.dt_txt.slice(8, 10) == dateForLoop
      ) {
        minMaxTempAndIconsForAllDays[i].hour.push((temp.dt_txt).slice(11, 16));
        minMaxTempAndIconsForAllDays[i].tempMin.push(temp.main.temp_min);
        minMaxTempAndIconsForAllDays[i].tempMax.push(temp.main.temp_max);
        minMaxTempAndIconsForAllDays[i].icon.push(temp.weather[0].icon);
      }
    }

    dateBeforeLoopTomorrow = dateBeforeLoop.setDate(
      new Date(dateBeforeLoop).getDate() + 1
    );
    dateForLoop = new Date(dateBeforeLoopTomorrow).getDate();

    weatherCodes[i] = minMaxTempAndIconsForAllDays[i].icon[4];

    tempTableLength = (minMaxTempAndIconsForAllDays[i].tempMin).length;

    minTemp = minMaxTempAndIconsForAllDays[i].tempMin[0];
    maxTemp = minMaxTempAndIconsForAllDays[i].tempMax[0];
    
    for (let j = 0; j < tempTableLength; j++) {
      if (minMaxTempAndIconsForAllDays[i].tempMin[j] < minTemp) {
        minTemp = minMaxTempAndIconsForAllDays[i].tempMin[j];
      }
      if (minMaxTempAndIconsForAllDays[i].tempMax[j] > maxTemp) {
        maxTemp = minMaxTempAndIconsForAllDays[i].tempMax[j];
      }
    }
    
    minTemperatures[i] = Math.round(minTemp);
    maxTemperatures[i] = Math.round(maxTemp);

  }

}


let dayOfMonthForMoreInfo = [];
const daysOfMonth = document.querySelectorAll('.five-days-weather__details-month');
daysOfMonth.forEach(day => {
  dayOfMonthForMoreInfo.push(day.innerHTML.slice(0, 2));
})

const allFiveDaysCards = document.querySelectorAll('.five-days-weather__details');
const allFiveDaysOfWeek = document.querySelectorAll('.five-days-weather__details-day');
const allFiveDaysMoreInfo = document.querySelectorAll('.five-days-weather__details-more');
const fiveDaysDetailsContainer = document.querySelector('.five-days-weather__main');
const fiveDaysMoreInfoContainer = document.querySelector('.five-days__more');

function checkSelectedCardsClasses(card) {
  if (card.children[0].classList.contains('active-details-card')) {
    card.children[0].classList.remove('active-details-card');
    card.children[3].children[1].classList.remove('active-more-info');
    fiveDaysDetailsContainer.classList.remove("active-more-info-container");
    fiveDaysMoreInfoContainer.classList.add("hidden");
  } else {
    allFiveDaysOfWeek.forEach(dayOfWeek => {
      dayOfWeek.classList.remove('active-details-card');
    })
    allFiveDaysMoreInfo.forEach(moreInfo => {
      moreInfo.classList.remove('active-more-info');
    })
    fiveDaysDetailsContainer.classList.add("active-more-info-container");
    fiveDaysMoreInfoContainer.classList.remove("hidden");
    card.children[0].classList.add('active-details-card');
    card.children[3].children[1].classList.add('active-more-info');
  }
}

allFiveDaysCards.forEach(card => {
  card.addEventListener('click', then => {
    let selectedDay = 0;
    let selectedCardID = card.getAttribute('id');
    if (selectedCardID.slice(8, 9) === "1") {
      selectedDay = 0;
      checkSelectedCardsClasses(card);
    } else if (selectedCardID.slice(8, 9) === "2") {
      selectedDay = 1;
      checkSelectedCardsClasses(card);
    } else if (selectedCardID.slice(8, 9) === "3") {
      selectedDay = 2;
      checkSelectedCardsClasses(card);
    } else if (selectedCardID.slice(8, 9) === "4") {
      selectedDay = 3;
      checkSelectedCardsClasses(card);
    } else if (selectedCardID.slice(8, 9) === "5") {
      selectedDay = 4;
      checkSelectedCardsClasses(card);
    }
    fetchCityFiveDays(searchInput.value).then((res) => {
      getDataForMoreInfo(res, dayOfMonthForMoreInfo[selectedDay]);
    });
  })
})

function buildResponseFiveDays(res) {
  getTemperatures(res);
  updateWeatherIcons();
  updateTemperatures();
  getDataForMoreInfo(res, dayOfMonthForMoreInfo[0]);
}

function defaultCity() {
  searchInput.value = "Skarżysko-Kamienna";
  fetchCityFiveDays("Skarżysko-Kamienna").then((res) => {
    buildResponseFiveDays(res);
  });
}

defaultCity();

searchInput.addEventListener("change", (event) => {
  event.preventDefault();
  if (searchInput.value === "") {
    checkIfCityIsFavorite();
    defaultCity();
  } else {
    fetchCityFiveDays(searchInput.value).then((res) => {
      checkIfCityIsFavorite();
      buildResponseFiveDays(res);
    });
  }
});

let dayOneIcon = document
  .getElementById("details-1")
  .querySelector(".five-days-weather__details-image").style;

let dayTwoIcon = document
  .getElementById("details-2")
  .querySelector(".five-days-weather__details-image").style;

let dayThreeIcon = document
  .getElementById("details-3")
  .querySelector(".five-days-weather__details-image").style;

let dayFourIcon = document
  .getElementById("details-4")
  .querySelector(".five-days-weather__details-image").style;

let dayFiveIcon = document
  .getElementById("details-5")
  .querySelector(".five-days-weather__details-image").style;


export {
  buildResponseFiveDays
};