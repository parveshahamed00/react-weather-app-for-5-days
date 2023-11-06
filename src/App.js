import { useState,useEffect } from "react";
import NextFiveDays from "./components/NextFiveDays";
import Highlight from "./components/Highlights";

function App() {
  const [city, setCity] = useState("");
  const [inputBox, setInputBox] = useState("");
  const [weather, setWeather] = useState({
    today: {
      icon: "",
      celcius: "",
      date: "",
      weather: "",
    },
    day1: {
      date: "",
      icon: "",
      celcius: "",
    },
    day2: {
      date: "",
      icon: "",
      celcius: "",
    },
    day3: {
      date: "",
      icon: "",
      celcius: "",
    },
    day4: {
      date: "",
      icon: "",
      celcius: "",
    },
    day5: {
      date: "",
      icon: "",
      celcius: "",
    },
    windStatus: "",
    humidity: "",
    visibility: "",
    airPressure: "",
  });
  const [statPage, setStartPage] = useState(true);
  // console.log(city);

  let getData = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e254e72d1b2007525c7fc950da4ff4ad&units=metric`
    )
      .then((e) => e.json())
      .then((e) => {
        setWeather({
          today: {
            icon: e.list[0].weather[0].icon,
            date: e.list[0].dt_txt,
            celcius: e.list[0].main.temp,
            weather: e.list[0].weather[0].description,
          },
          day1: {
            date: "Tomorrow",
            icon: e.list[2].weather[0].icon,
            celcius: e.list[2].main.temp,
          },
          day2: {
            date: e.list[11].dt_txt.slice(0, 10),
            icon: e.list[11].weather[0].icon,
            celcius: e.list[11].main.temp,
          },
          day3: {
            date: e.list[21].dt_txt.slice(0, 10),
            icon: e.list[21].weather[0].icon,
            celcius: e.list[21].main.temp,
          },
          day4: {
            date: e.list[30].dt_txt.slice(0, 10),
            icon: e.list[30].weather[0].icon,
            celcius: e.list[30].main.temp,
          },
          day5: {
            date: e.list[39].dt_txt.slice(0, 10),
            icon: e.list[39].weather[0].icon,
            celcius: e.list[39].main.temp,
          },
          windStatus: e.list[0].wind.speed,
          humidity: e.list[0].main.humidity,
          visibility: e.list[0].visibility,
          airPressure: e.list[0].main.pressure,
        });

        console.log(e);
      });
    console.log(city);
  };
  //   useEffect(() => {
  // getData()
  //   }, []);
  return (
    <div className="App">
      <div className="header">
        <div className="location">
          <p>
            {" "}
            <span class="material-symbols-outlined">location_on</span>{" "}
            {city.toUpperCase()}
          </p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="city name"
            value={inputBox}
            onChange={(e) => {
              setCity(e.target.value);
              setInputBox(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              getData();
              setInputBox("");
              setStartPage(false);
            }}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
      {/* body */}
      {statPage ? (
      <div className="start-page">
        <div>
          <h1>
            Get weather using city name{" "}
            <span class="material-symbols-outlined">search</span>
          </h1>
        </div>
      </div>
      ) : (
      <div className="content">
        <div className="left-content">
          <div className="today">
            <div className="today-image">
              <img
                src={`https://openweathermap.org/img/wn/${weather.today.icon}@2x.png`}
              ></img>
              <h1 className="celcius">{weather.today.celcius} &deg;C</h1>
              <h2 className="weather">{weather.today.weather}</h2>
              <p className="date">Today - {weather.today.date.slice(0, 10)}</p>
            </div>
          </div>
        </div>
        <div className="right-content">
          <div className="nextFivedays" >
            <NextFiveDays 
              date={weather.day1.date}
              icon={weather.day1.icon}
              celcius={weather.day1.celcius}
            ></NextFiveDays>
            <NextFiveDays
              date={weather.day2.date}
              icon={weather.day2.icon}
              celcius={weather.day2.celcius}
            ></NextFiveDays>
            <NextFiveDays
              date={weather.day3.date}
              icon={weather.day3.icon}
              celcius={weather.day3.celcius}
            ></NextFiveDays>
            <NextFiveDays
              date={weather.day4.date}
              icon={weather.day4.icon}
              celcius={weather.day4.celcius}
            ></NextFiveDays>
            <NextFiveDays
              date={weather.day5.date}
              icon={weather.day5.icon}
              celcius={weather.day5.celcius}
            ></NextFiveDays>
          </div>
          <h2>Today's Highlights</h2>
          <div className="highlights">
            <Highlight
              highlight_measurement={weather.windStatus}
              highlight_text="Wind Speed"
              icon={<span class="material-symbols-outlined">air</span>}
            ></Highlight>
            <Highlight
              highlight_measurement={weather.humidity}
              highlight_text="Humidity"
              icon={<span class="material-symbols-outlined">
              humidity_percentage
              </span>}
            ></Highlight>
          </div>
          <div className="highlights">
            <Highlight
              highlight_measurement={weather.visibility}
              highlight_text="Visibility"
              icon={<span class="material-symbols-outlined">visibility</span>}
            ></Highlight>
            <Highlight
              highlight_measurement={weather.airPressure}
              highlight_text="Air Pressure"
              icon={<span class="material-symbols-outlined">
              cyclone
              </span>}
            ></Highlight>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
