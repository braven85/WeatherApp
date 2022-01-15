async function fetchCity(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=545d928337d0eef5983b466f17ed3bc8`,
    );

    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  } catch (err) {
    return console.log(err);
  }
}

async function fetchCityFiveDays(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=545d928337d0eef5983b466f17ed3bc8`,
    );

    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  } catch (err) {
    return console.log(err);
  }
}

export { fetchCity, fetchCityFiveDays };
