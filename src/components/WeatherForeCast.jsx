import Form from "./Form";
import Card from "./Card";
import AirQuality from "./AirQuality";
import Wind from "./Wind";
import OtherStats from "./OtherStats";
import Forecast from "./Forecast";
import searchIcon from "../assets/icons/search.png";
import { useEffect, useState } from "react";

function WeatherForecast(props) {
  const [currentData, setcurrentData] = useState({});
  const [forecastData, setforecastData] = useState({});
  const [address, setaddress] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(true);
  const coordinates = props.geolocation;
  const ip = props.iplocation;

  function filterAddress() {
    const raw = document.getElementById("cityinput");
    let st1 = raw.replace(/^\s+|\s+$|[\d\W_]+/g, "");
    let final = st1.replace(/([A-Z])/g, " $1").trim();
    if (final == "") {
      console.log("Please enter city name");
      return;
    }
    console.log(ns);
    console.log(nns);
    getData(final);
  }

  function getData(address = "") {
    const query = queryGenerator(address, coordinates, ip);
    getCurrentWeather(query);
    getForecastWeather(query);
  }

  function queryGenerator(address = "", coordinates = null, ip = null) {
    if (address !== "") {
      return address;
    } else if (coordinates) {
      return `${coordinates.x},${coordinates.y}`;
    } else if (ip) {
      return ip;
    } else {
      return "New Delhi";
    }
  }

  async function getCurrentWeather(query) {
    const url = `http://api.weatherapi.com/v1/current.json?key=67d2dd6485c540308ca65523240210&q=${query}7&aqi=yes`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setforecastData(result);
      console.log(result);
      setloading(false);
    } catch (error) {
      console.log("unable to fetch current weather");
      setloading(true);
      setStatus(error);
    }
  }
  async function getForecastWeather(query) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=67d2dd6485c540308ca65523240210&q=${query}&days=3&aqi=yes&alerts=yes`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setcurrentData(result);
      setloading(false);
    } catch (error) {
      console.log("unable to fetch current weather");
      setloading(true);
      setStatus(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <h1>Fetching</h1>
  ) : (
    <>
      <section className="relative flex flex flex-col justify-center items-center w-full h-[55rem] pl-4 pr-4 rounded-xl bg-[url('./assets/rain1.jpg')] bg-cover bg-no-repeat bg-fixed overflow-hidden text-white  max-md:flex-col">
        <nav className="relative top-0 max-lg:w-64 w-80 h-10 max-md:h-8 relative rounded-2xl flex justify-center items-center glass px-2">
          <div className="flex justify-center items-center w-full">
            <span className="grow text-sm max-lg:text-xs h-full flex justify-center items-center rounded-s-xl">
              Today
            </span>
            <span className="grow text-sm max-lg:text-xs h-full flex justify-center items-center border-x">
              Tomorrow
            </span>
            <span className="grow text-sm max-lg:text-xs h-full flex justify-center items-center rounded-e-lg">
              Overmorrow
            </span>
          </div>
        </nav>
        <div className=" relative w-full h-[30rem] flex justify-center items-center max-md:flex-col ">
          <form
            className="flex flex-col justify-center h-full w-full gap-4 max-md:h-20 max-lg:pl-4 pl-12 "
            id="CurrentForm"
            onSubmit={filterAddress}
          >
            <h1 className="text-5xl font-bold row-span-2 max-md:w-0 max-md:h-0 max-md:hidden max-full">
              Welcome to WeatherNow
            </h1>
            <p className="w-4/5 text-sm pl-4 max-md:w-0 max-md:h-0 max-md:hidden">
              Get Real-Time Updates, Anytime, Anywhere Global Forecasts, Local
              Precision Weather Alerts for you loaction Weather History
            </p>

            <div className="max-md:w-64 h-12 mt-2 pl-2 max-w-sm relative">
              <input
                type="text"
                className=" w-full h-full rounded-3xl pl-5 pr-10 text-base glass"
                placeholder="Search for loaction"
                id="cityinput"
              />
              <img
                src={searchIcon}
                className="h-8 absolute top-1 right-2 invert border-0"
                onClick={filterAddress}
              />
            </div>
          </form>
          <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
            <Card data={currentData} curr={true} />
          </div>
        </div>
        <div className="relative flex items-center w-full max-w-[900px] max-lg:w-full h-[20rem] pl-4 pr-4 rounded-xl overflow-scroll gap-4 lg:gap-8">
          <AirQuality data={currentData.current.air_quality} />
          <OtherStats data={currentData.current} />
          <Wind data={currentData.current} />
        </div>
      </section>
      <Forecast data={forecastData} />
    </>
  );
}
export default WeatherForecast;
