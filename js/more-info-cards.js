import {
  windSvg,
  humiditySvg,
  barometerSvg,
} from "./js-icons.js";

const moreInfoCardsContainer = document.querySelector(".five-days__more-cards");
const moreInfoLine = document.querySelector(".five-days__more-line");

for (let i = 1; i <= 7; i++) {
    moreInfoCardsContainer.innerHTML += `<div class="five-days__more-card" id="more-${i}">

                    <div class="five-days__more-card-inside">
                      <div class="five-days__more-card-inside-hour">00:00</div>
                      <div class="five-days__more-card-inside-icon-con">
                        <svg class="five-days__more-card-inside-icon"></svg>
                      </div>
                      <div class="five-days__more-card-inside-temp">-2°</div>
                      <div class="five-days__more-spec">
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}1"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}1">772 mm</div>
                        </div>
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}2"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}2">54%</div>
                        </div>
                        <div class="five-days__more-spec-field">
                          <svg class="five-days__more-spec-field-icon" id="spec-icon${i}3"></svg>
                          <div class="five-days__more-spec-field-data" id="spec-data${i}3">3.7 m/s</div>
                        </div>
                      </div>
                    </div>

                  </div>`;
}

const moreInfoCard1 = document.getElementById("more-1").style;
const moreInfoCard2 = document.getElementById("more-2").style;
const moreInfoCard3 = document.getElementById("more-3").style;
const moreInfoCard4 = document.getElementById("more-4").style;
const moreInfoCard5 = document.getElementById("more-5").style;
const moreInfoCard6 = document.getElementById("more-6").style;
const moreInfoCard7 = document.getElementById("more-7").style;

function moreInfoCardsRules() {
  if (window.screen.width < 768) {
    moreInfoCard1.display = "flex";
    moreInfoCard2.display = "flex";
    moreInfoCard3.display = "none";
    moreInfoCard4.display = "none";
    moreInfoCard5.display = "none";
    moreInfoCard6.display = "none";
    moreInfoCard7.display = "none";
    moreInfoLine.style.display = "flex";
  } else if (window.screen.width < 1280) {
    moreInfoCard1.display = "flex";
    moreInfoCard2.display = "flex";
    moreInfoCard3.display = "flex";
    moreInfoCard4.display = "none";
    moreInfoCard5.display = "none";
    moreInfoCard6.display = "none";
    moreInfoCard7.display = "none";
    moreInfoLine.style.display = "none";
  } else {
    moreInfoCard1.display = "flex";
    moreInfoCard2.display = "flex";
    moreInfoCard3.display = "flex";
    moreInfoCard4.display = "flex";
    moreInfoCard5.display = "flex";
    moreInfoCard6.display = "flex";
    moreInfoCard7.display = "flex";
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
  const iconId = icon.getAttribute('id').slice(10,11);
  if (iconId == 1) {
    icon.style.backgroundImage = barometerSvg;
  } else if (iconId == 2) {
    icon.style.backgroundImage = humiditySvg;
  } else if (iconId == 3) {
    icon.style.backgroundImage = windSvg;
  }
})

// const specDataAll = document.querySelectorAll('.five-days__more-spec-field-data');

// specDataAll.forEach(data => {
//   const dataFieldId = data.getAttribute('id').slice(10,11);
//   console.log(dataFieldId);
//   if (dataFieldId == 1) {
//     data.innerHTML = "45 mm";
//   }
// })