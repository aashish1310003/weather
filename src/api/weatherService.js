import { DateTime } from "luxon";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
  
    const { main: details, icon } = weather[0];
  
    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      country,
      sunrise,
      sunset,
      details,
      icon,
      speed,
      wind: { speed }, // Fix the destructuring here
      pressure, // Include pressure here
    };
  };
  
  

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    try {
      // Fetch current weather data
      const currentWeatherData = await getWeatherData("weather", searchParams);
  
      // Fetch additional data for the current location
      const { lat, lon } = currentWeatherData.coord;
      const additionalCurrentData = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "minutely,hourly,daily,alerts",
        units: searchParams.units,
      });
  
      // Extract relevant current weather information
      const {
        main: { temp, feels_like, humidity, pressure },
        wind: { speed, deg },
        weather,
        dt,
        sys: { country, sunrise, sunset },
      } = currentWeatherData;
  
      const { main: details, icon } = weather[0];
  
      // Combine all relevant data into a single object
      const formattedCurrentWeather = {
        lat,
        lon,
        temp,
        feels_like,
        humidity,
        pressure,
        name: currentWeatherData.name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
        wind_deg: deg,
      };
  
      return formattedCurrentWeather;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };
  

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
