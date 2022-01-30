import {
  windSvg,
  humiditySvg,
  barometerSvg,
  sunnySvg,
  sunCloudSvg,
  cloudySvg,
  suniceSvg,
} from "./js-icons.js";


const moreInfoCardsContainer = document.querySelector(".five-days__more-cards");
const moreInfoLine = document.querySelector(".five-days__more-line");

for (let i = 1; i <= 7; i++) {
  moreInfoCardsContainer.innerHTML += `<div class="five-days__more-card" id="more-${i}">

                    <div class="five-days__more-card-inside">
                      <div class="five-days__more-card-inside-hour" id="more-hour${i}"></div>
                      <div class="five-days__more-card-inside-icon-con">
                        <svg class="five-days__more-card-inside-icon" id="more-icon${i}"></svg>
                      </div>
                      <div class="five-days__more-card-inside-temp" id="more-temp${i}"></div>
                      <div class="five-days__more-spec">
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}1"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}1"></div>
                        </div>
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}2"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}2"></div>
                        </div>
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}3"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}3"></div>
                        </div>
                      </div>
                    </div>

                  </div>`;
}

function moreInfoCardsRules() {
  if (window.screen.width < 768) {
    for (let i = 1; i <= 2; i++) {
      document.getElementById(`more-${i}`).style.display = "flex";
    }
    for (let i = 3; i <= 7; i++) {
      document.getElementById(`more-${i}`).style.display = "none";
    }
    moreInfoLine.style.display = "flex";
  } else if (window.screen.width < 1280) {
    for (let i = 1; i <= 3; i++) {
      document.getElementById(`more-${i}`).style.display = "flex";
    }
    for (let i = 4; i <= 7; i++) {
      document.getElementById(`more-${i}`).style.display = "none";
    }
    moreInfoLine.style.display = "none";
  } else {
    for (let i = 1; i <= 7; i++) {
      document.getElementById(`more-${i}`).style.display = "flex";
    }
    moreInfoLine.style.display = "none";
  }
}

addEventListener("resize", (then) => {
  moreInfoCardsRules();
});

moreInfoCardsRules();

const specIconsAll = document.querySelectorAll('.five-days__more-spec-field-icon');

// generowanie ikonek barometr, wilgotność oraz wiatr w kartach
specIconsAll.forEach(icon => {
  const iconId = icon.getAttribute('id').slice(10, 11);
  if (iconId == 1) {
    icon.style.backgroundImage = barometerSvg;
  } else if (iconId == 2) {
    icon.style.backgroundImage = humiditySvg;
  } else if (iconId == 3) {
    icon.style.backgroundImage = windSvg;
  }
})

const moreInfoContainer = document.querySelector(".five-days__more");
const moreInfoButtons = document.querySelectorAll(
  ".five-days-weather__details-more"
);

moreInfoButtons.forEach(button => {
  button.addEventListener('click', then => {
    moreInfoContainer.style.display = 'flex';
  })
})

let foundData;
let moreWeatherData = {
  hour: [],
  icon: [],
  temperature: [],
  pressure: [],
  humidity: [],
  wind: []
};
let foundDataLength = 0;


function getDataForMoreInfo(res, day) {
  moreWeatherData = {
    hour: [],
    icon: [],
    temperature: [],
    pressure: [],
    humidity: [],
    wind: []
  };
  foundData = res.list;
  foundDataLength = 0;

  for (let data of foundData) {
    if (data.dt_txt.slice(8, 10) == day) {
      moreWeatherData.hour.push(data.dt_txt.slice(11, 19));
      moreWeatherData.icon.push(data.weather[0].icon);
      moreWeatherData.temperature.push(data.main.temp);
      moreWeatherData.pressure.push(data.main.pressure);
      moreWeatherData.humidity.push(data.main.humidity);
      moreWeatherData.wind.push(data.wind.speed);
      foundDataLength++;
    }
  }

  for (let i = 1; i <= foundDataLength - 1; i++) {
    let hourID = `more-hour${i}`;
    let hourOnCard = document.getElementById(`${hourID}`);
    let hourFromApi = moreWeatherData.hour[i].slice(0, 5);
    hourOnCard.innerHTML = hourFromApi;

    let iconID = `more-icon${i}`;
    let iconOnCard = document.getElementById(`${iconID}`);
    let iconFromApi = moreWeatherData.icon[i];

    if (iconFromApi == "01d") {
      iconOnCard.style.backgroundImage = `${sunnySvg}`;
    } else if (iconFromApi == "02d") {
      iconOnCard.style.backgroundImage = `${sunCloudSvg}`;
    } else if (iconFromApi == "03d" || iconFromApi == "04d") {
      iconOnCard.style.backgroundImage = `${cloudySvg}`;
    } else if (iconFromApi == "13d") {
      iconOnCard.style.backgroundImage = `${suniceSvg}`;
    } else {
      iconOnCard.style.backgroundImage = `${suniceSvg}`;
    }

    let tempID = `more-temp${i}`;
    let tempInCard = document.getElementById(`${tempID}`);
    let tempFromApi = Math.round(moreWeatherData.temperature[i]);
    tempInCard.innerHTML = `${tempFromApi}°`;

    let pressureID = `spec-data${i}1`;
    let pressureInCard = document.getElementById(`${pressureID}`);
    let pressureFromApi = moreWeatherData.pressure[i];
    pressureInCard.innerHTML = `${pressureFromApi} hPa`;

    let humidityID = `spec-data${i}2`;
    let humidityInCard = document.getElementById(`${humidityID}`);
    let humidityFromApi = moreWeatherData.humidity[i];
    humidityInCard.innerHTML = `${humidityFromApi} %`;

    let windID = `spec-data${i}3`;
    let windInCard = document.getElementById(`${windID}`);
    let windFromApi = moreWeatherData.wind[i];
    windInCard.innerHTML = `${windFromApi} m/s`;

  }

  checkFoundDataLength();

}

// checking which "more info cards" actually get data from API and hiding cards that don't get any data
function checkFoundDataLength() {
  if (foundDataLength === 8) {
    for (let i = 1; i < foundDataLength; i++) {
      document.getElementById(`more-${i}`).style.display = 'flex';
    }
  } else if (foundDataLength < 8) {
    for (let i = 7; i >= foundDataLength; i--) {
      document.getElementById(`more-${i}`).style.display = 'none';
    }
  } else {
    console.error("foundDataLength ma nieprawidłową wartość");
  }
}

export {
  getDataForMoreInfo
};