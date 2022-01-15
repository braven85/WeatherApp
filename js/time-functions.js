const date = new Date();

const currentDay = document.querySelector('.date-box-day');

// pobranie numeru bieżącego dnia
let currentDayDate = date.getDate();
const currentDayForChecking = currentDayDate;

// zamiana bieżącego dnia na stringa z dodaniem odpowiedniej końcówki
if (currentDayDate === 1 || currentDayDate === 21 || currentDayDate === 31) {
  currentDayDate = currentDayDate + 'st';
} else if (currentDayDate === 2 || currentDayDate === 22) {
  currentDayDate = currentDayDate + 'nd';
} else if (currentDayDate === 3) {
  currentDayDate = currentDayDate + 'rd';
} else {
  currentDayDate = currentDayDate + 'th';
}

// skrócone nazwy dni
const currentDayOfWeek = date.getDay();
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const dayWithoutSlice = `${currentDayDate} ${weekDays[currentDayOfWeek]}`;
const dayWithSliceShort = `${currentDayDate.slice(0, 1)}${currentDayDate.slice(1, 4).sup()}&nbsp;${
  weekDays[currentDayOfWeek]
}`;
const dayWithSliceLong = `${currentDayDate.slice(0, 2)}${currentDayDate.slice(2, 5).sup()}&nbsp;${
  weekDays[currentDayOfWeek]
}`;

// funkcja wstawiająca końcówkę stringa dnia do górnego indeksu w zależności od rozdzielczości ekranu
function setDayIndexUp() {
  if (window.screen.width < 768) {
    currentDay.innerHTML = dayWithoutSlice;
  } else if (window.screen.width >= 768) {
    if (currentDayForChecking >= 1 && currentDayForChecking <= 9) {
      currentDay.innerHTML = dayWithSliceShort;
    } else {
      currentDay.innerHTML = dayWithSliceLong;
    }
  }
}

setDayIndexUp();

window.addEventListener('resize', then => {
  setDayIndexUp();
});

const currentMonth = document.querySelector('.date-box-month-name');
// pobranie numeru bieżącego miesiąca
const currentMonthDate = date.getMonth();
const monthsInYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
currentMonth.innerHTML = `${monthsInYear[currentMonthDate]}`;

const currentHour = document.querySelector('.date-box-month-hour');
// wyświetlenie aktualnej godziny zaraz po załadowaniu strony
currentHour.innerHTML = date.toTimeString().slice(0, 8);

// odświeżanie aktualnej godziny na stronie co sekundę
setInterval(() => {
  /* nowa godzina musi być pobierana co sekundę - nie można wykorzystać zmiennej "date",
  ponieważ wtedy co sekundę będzie pobierana godzina,
  która została pobrana przy załadowaniu strony */
  const actualDate = new Date();
  currentHour.innerHTML = actualDate.toTimeString().slice(0, 8);
}, 1000);
