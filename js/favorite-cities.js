import Notiflix from "notiflix";

Notiflix.Notify.init({
  position: "left-top",
  borderRadius: "28px",
});

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
