import {
  fetchCityFiveDays
} from "./fetchApi.js";
import {
  buildResponseFiveDays
} from "./five-days-functions.js";

if (window.screen.width < 1280) {
  Notiflix.Notify.init({
    position: "center-center",
    borderRadius: "28px",
  });
} else if (window.screen.width >= 1280) {
  Notiflix.Notify.init({
    position: "left-top",
    borderRadius: "28px",
  });
}

const searchInput = document.querySelector(".search-field__input");
const favoriteStar = document.querySelector(".search-field__icon-star");
let favoriteCity = JSON.parse(localStorage.getItem("Favorite cities"));

favoriteStar.addEventListener("click", addFavoriteCity);

export function checkIfCityIsFavorite() {
  checkIfFavListIsEmpty();
  let newFavoriteCity = searchInput.value;
  for (let city of favoriteCity) {
    if (newFavoriteCity === city) {
      favoriteStar.style.stroke = "#e0e000";
      favoriteStar.onmouseover = favoriteStarGolden;
      favoriteStar.onmouseout = favoriteStarGolden;
      favoriteStar.style.cursor = "default";
      favoriteStar.removeEventListener("click", addFavoriteCity);
      favoriteStar.addEventListener("click", cityIsAlreadyFavorite);
      break;
    } else {
      favoriteStar.removeEventListener("click", cityIsAlreadyFavorite);
      favoriteStar.addEventListener("click", addFavoriteCity);
      favoriteStar.style.stroke = "#000000";
      favoriteStar.onmouseover = favoriteStarGolden;
      favoriteStar.onmouseout = favoriteStarBlack;
      favoriteStar.style.cursor = "pointer";
    }
  }
}

function favoriteStarGolden() {
  favoriteStar.style.stroke = "#e0e000";
}

function favoriteStarBlack() {
  favoriteStar.style.stroke = "#000000";
}

function cityIsAlreadyFavorite() {
  Notiflix.Notify.warning("This is already your favorite city!");
}

function addFavoriteCity() {
  checkIfFavListIsEmpty();

  let newFavoriteCity = searchInput.value;

  for (let city of favoriteCity) {
    if (newFavoriteCity === city) {
      newFavoriteCity = "";
      break;
    }
  }

  if (newFavoriteCity === "") {
    Notiflix.Notify.failure("Enter city name in search field!");
  } else {
    favoriteCity.push(newFavoriteCity);
    localStorage.setItem("Favorite cities", JSON.stringify(favoriteCity));
    Notiflix.Notify.success("You have successfully added a new favorite city!");
    createFavCityCapsules();
    favoriteStar.onmouseover = favoriteStarGolden;
    favoriteStar.onmouseout = favoriteStarGolden;
    favoriteStar.style.cursor = "default";
    favoriteStar.removeEventListener("click", addFavoriteCity);
    favoriteStar.addEventListener("click", cityIsAlreadyFavorite);
    const favCitiesNamesInAddFunction = document.querySelectorAll(
      ".fav-city__capsule-text"
    );
    favCitiesNamesInAddFunction.forEach((city) => {
      favCityNameResponsive(city);
    });
    const favCitiesAllCrossesInAddFunction = document.querySelectorAll(
      ".fav-city__capsule-cross"
    );

    favCitiesAllCrossesInAddFunction.forEach((cross) => {
      removeFavCity(cross);
    });
  }

}

function checkIfFavListIsEmpty() {
  if (favoriteCity == null) {
    favoriteCity = [];
  }
}

const favoriteCityCapsule = document.querySelector(".fav-city__boxes");

function createFavCityCapsules() {
  favoriteCityCapsule.innerHTML = "";
  if (favoriteCity !== null) {
    for (let city of favoriteCity) {
      favoriteCityCapsule.innerHTML += `<div class="fav-city__capsule">
              <div class="fav-city__capsule-text">${city}</div>
              <div class="fav-city__capsule-cross">
                <div class="fav-city__capsule-cross-line1"></div>
                <div class="fav-city__capsule-cross-line2"></div>
              </div>
            </div>`;
    }
  }
}

createFavCityCapsules();

const favCitiesNumber = favoriteCityCapsule.children.length;
const favCitiesAllCrosses = document.querySelectorAll(
  ".fav-city__capsule-cross"
);

favCitiesAllCrosses.forEach((cross) => {
  removeFavCity(cross);
});

function removeFavCity(cross) {
  const cityNameInRemoveFunction = cross.parentElement.children[0].innerHTML;
  cross.addEventListener("click", (then) => {
    let cityIndex = favoriteCity.indexOf(cityNameInRemoveFunction);
    for (let city of favoriteCity) {
      if (city === cityNameInRemoveFunction) {
        cross.parentElement.remove();
        favoriteCity.splice(cityIndex, 1);
        localStorage.setItem("Favorite cities", JSON.stringify(favoriteCity));
        checkIfCityIsFavorite();
      }
    }
  });
}

const fiveDaysDetailsContainer = document.querySelector('.five-days-weather__main');
const fiveDaysMoreInfoContainer = document.querySelector('.five-days__more');

const favCitiesNamesInCapsules = document.querySelectorAll(
  ".fav-city__capsule-text"
);

favCitiesNamesInCapsules.forEach((city) => {
  favCityNameResponsive(city);
});

function favCityNameResponsive(city) {
  city.addEventListener("click", (then) => {
    fiveDaysDetailsContainer.classList.remove("active-more-info-container");
    fiveDaysMoreInfoContainer.classList.add("hidden");
    for (let i = 0; i < 5; i++) {
      if (fiveDaysDetailsContainer.children[1].children[i].children[0].classList.contains("active-details-card")) {
        fiveDaysDetailsContainer.children[1].children[i].children[0].classList.remove("active-details-card");
        fiveDaysDetailsContainer.children[1].children[i].children[3].children[1].classList.remove("active-more-info");
      }
    }
    searchInput.value = city.innerHTML;
    fetchCityFiveDays(searchInput.value).then((res) => {
      checkIfCityIsFavorite();
      buildResponseFiveDays(res);
    });
  });
}

let scrollAmount = 0;

const favCityArrowButtonRight = document.querySelector('.fav-city__arrow-button-right');
favCityArrowButtonRight.onclick = function () {
  scrollAmount = 0;
  favoriteCityCapsule.scrollBy({
    left: +200,
    behavior: 'smooth'
  })
}

const favCityArrowButtonLeft = document.querySelector('.fav-city__arrow-button-left');
favCityArrowButtonLeft.onclick = function () {
  scrollAmount = 0;
  favoriteCityCapsule.scrollBy({
    left: -200,
    behavior: 'smooth'
  })
}