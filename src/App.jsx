import React, { useEffect, useRef, useState } from "react";
import loader from "./assets/loader.gif";
import menu from "./assets/icons/menu.png";
import logo from "./assets/icons/weathernowlogo.png";

import fog from "./assets/backgrounds/fog.jpg";

import place from "./assets/icons/place.png";
import plus from "./assets/icons/plus.png";
import Card from "./components/Card";
import Wind from "./components/Wind";
import AirQuality from "./components/AirQuality";
import OtherStats from "./components/OtherStats";
import searchIcon from "./assets/icons/search.png";
import Forecast from "./components/Forecast";
import History from "./components/History";
import Map from "./components/Map";
import Footer from "./components/Footer";

import clear from "./assets/backgrounds/0/1000.jpg";
import mistnight from "./assets/backgrounds/0/1030.jpg";
import partlycloudynight from "./assets/backgrounds/0/1003.jpg";
import overcastnight from "./assets/backgrounds/0/1009.jpg";
import drizzlenight from "./assets/backgrounds/0/1153.jpg";
import lightrainnight from "./assets/backgrounds/0/1183.jpg";
import heavyrainnight from "./assets/backgrounds/0/1195.jpg";
import snowHeavynight from "./assets/backgrounds/1/snow.jpg";
import snowlightnight from "./assets/backgrounds/1/snow1.jpg";
import thundernight from "./assets/backgrounds/1/thunder.jpg";

import sunny from "./assets/backgrounds/1/1000.jpg";
import mistday from "./assets/backgrounds/1/1030.jpg";
import partlycloudyday from "./assets/backgrounds/1/1003.jpg";
import overcastday from "./assets/backgrounds/1/1009.jpg";
import drizzleday from "./assets/backgrounds/1/1153.jpg";
import lightrainday from "./assets/backgrounds/1/1183.jpg";
import heavyrainday from "./assets/backgrounds/1/1195.jpg";
import snowHeavyday from "./assets/backgrounds/1/snow.jpg";
import snowlightday from "./assets/backgrounds/1/snow1.jpg";
import thunderday from "./assets/backgrounds/1/thunder.jpg";

function App() {
  const bg = {
    0: {
      1000: clear,
      1003: partlycloudynight,
      1006: clear,
      1009: overcastnight,
      1030: mistnight,
      1063: drizzlenight,
      1066: snowlightnight,
      1069: snowlightnight,
      1072: snowlightnight,
      1087: thundernight,
      1114: snowlightnight,
      1117: snowlightnight,
      1135: fog,
      1147: fog,
      1150: clear,
      1153: drizzlenight,
      1168: drizzlenight,
      1171: drizzlenight,
      1180: drizzlenight,
      1183: lightrainnight,
      1186: lightrainnight,
      1189: lightrainnight,
      1192: heavyrainnight,
      1195: heavyrainnight,
      1198: lightrainnight,
      1201: heavyrainnight,
      1204: snowlightnight,
      1207: snowlightnight,
      1210: snowlightnight,
      1213: snowlightnight,
      1216: snowlightnight,
      1219: snowlightnight,
      1222: snowHeavynight,
      1225: snowHeavynight,
      1237: snowHeavynight,
      1240: lightrainnight,
      1243: lightrainnight,
      1246: lightrainnight,
      1249: snowlightnight,
      1252: snowlightnight,
      1255: snowlightnight,
      1258: snowHeavynight,
      1261: snowlightnight,
      1264: snowHeavynight,
      1273: thundernight,
      1276: thundernight,
      1279: thundernight,
      1282: snowHeavynight,
    },
    1: {
      1000: sunny,
      1003: partlycloudyday,
      1006: clear,
      1009: overcastday,
      1030: mistday,
      1063: drizzleday,
      1066: snowlightday,
      1069: snowlightday,
      1072: snowlightday,
      1087: thunderday,
      1114: snowlightday,
      1117: snowlightday,
      1135: fog,
      1147: fog,
      1150: clear,
      1153: drizzleday,
      1168: drizzleday,
      1171: drizzleday,
      1180: drizzleday,
      1183: lightrainday,
      1186: lightrainday,
      1189: lightrainday,
      1192: heavyrainday,
      1195: heavyrainday,
      1198: lightrainday,
      1201: heavyrainday,
      1204: snowlightday,
      1207: snowlightday,
      1210: snowlightday,
      1213: snowlightday,
      1216: snowlightday,
      1219: snowlightday,
      1222: snowHeavyday,
      1225: snowHeavyday,
      1237: snowHeavyday,
      1240: lightrainday,
      1243: lightrainday,
      1246: lightrainday,
      1249: snowlightday,
      1252: snowlightday,
      1255: snowlightday,
      1258: snowHeavyday,
      1261: snowlightday,
      1264: snowHeavyday,
      1273: thunderday,
      1276: thunderday,
      1279: thunderday,
      1282: snowHeavyday,
    },
  };

  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setstatus] = useState("fetching location");
  const [currentData, setcurrentData] = useState(null);
  const [forecastData, setforecastData] = useState(null);
  const [historyData, sethistoryData] = useState(null);
  const [saved, setsaved] = useState([]);
  const [coords, setcoords] = useState(null);
  const [wiggle, setwiggle] = useState(false);
  const [currQuery, setcurrQuery] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const liveRef = useRef(0);
  const forecastRef = useRef(0);
  const weathermapRef = useRef(0);
  const historyRef = useRef(0);

  const currDate = new Date();
  const onedayAgo = new Date();
  onedayAgo.setDate(currDate.getDate() - 1);
  const defaultDate = `${onedayAgo.getFullYear()}-${
    onedayAgo.getMonth() + 1
  }-${onedayAgo.getDate()}`;

  const scrollToSection = (Ref) => {
    window.scrollTo({
      top: Ref.current.offsetTop - 80,
      behavior: "smooth",
    });
    console.log(Ref.current.offsetTop);
  };

  window.addEventListener("scroll", () => {
    if (
      window.scrollY >= liveRef.current.offsetTop - 80 &&
      window.scrollY <= forecastRef.current.offsetTop - 80
    ) {
      document.getElementById("span1").style.width = `75%`;
      document.getElementById("span1").style.transition = `200ms`;
      document.getElementById("span2").style.width = `0%`;
      document.getElementById("span3").style.width = `0%`;
      document.getElementById("span4").style.width = `0%`;
    }

    if (
      window.scrollY >= forecastRef.current.offsetTop - 80 &&
      window.scrollY <= weathermapRef.current.offsetTop - 80
    ) {
      document.getElementById("span1").style.width = `0%`;
      document.getElementById("span2").style.width = `75%`;
      document.getElementById("span2").style.transition = `200ms`;
      document.getElementById("span3").style.width = `0%`;
      document.getElementById("span4").style.width = `0%`;
    }
    if (
      window.scrollY >= weathermapRef.current.offsetTop - 80 &&
      window.scrollY <= historyRef.current.offsetTop - 80
    ) {
      document.getElementById("span1").style.width = `0%`;
      document.getElementById("span2").style.width = `0%`;
      document.getElementById("span3").style.width = `75%`;
      document.getElementById("span3").style.transition = `200ms`;
      document.getElementById("span4").style.width = `0%`;
    }
    if (window.scrollY >= historyRef.current.offsetTop - 80) {
      document.getElementById("span1").style.width = `0%`;
      document.getElementById("span2").style.width = `0%`;
      document.getElementById("span3").style.width = `0%`;
      document.getElementById("span4").style.width = `75%`;
      document.getElementById("span4").style.transition = `200ms`;
    }
  });

  useEffect(() => {
    fechingdata();
    getlocalKeys();
    chooseDate();
  }, []);

  function chooseDate() {
    const nowDate = new Date();
    const lastDate = new Date();
    lastDate.setDate(nowDate.getDate() - 7);

    setMinDate(lastDate.toISOString().split("T")[0]);
    setMaxDate(nowDate.toISOString().split("T")[0]);

    console.log(minDate);
    console.log(maxDate);
  }

  const getIp = async () => {
    return new Promise((resolve, reject) => {
      try {
        setstatus("fetching IP");
        const response = fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then((result) => {
            // const ipd = result.ip;
            setstatus("IP fetched");
            console.log(result.ip);
            resolve(result.ip);
          });
        console.log("IP called");
      } catch (error) {
        setstatus("unable to get IP");
        reject(null);
      }
    });
  };

  const getcoord = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setstatus("loaction fetched");
            setcoords({ x: pos.coords.latitude, y: pos.coords.longitude });
            console.log({ x: pos.coords.latitude, y: pos.coords.longitude });
            resolve({ x: pos.coords.latitude, y: pos.coords.longitude });
          },
          (error) => {
            setstatus("unable to fetch coordinates");
            reject(null);
          }
        );
      } else {
        setstatus("gps unavailable");
        reject(null);
      }
    });
  };

  const fechingdata = async (city = "", date = defaultDate) => {
    setwiggle(true);
    if (city != "") {
      setcurrQuery(city);
      await currentFetch(city);
      await forecastFetch(city);
      if (date) await historyFetch(city, date);
    } else {
      try {
        const coord = await getcoord();
        if (coord != null) {
          const query = `${coord.x},${coord.y}`;
          setcurrQuery(query);
          await currentFetch(query);
          await forecastFetch(query);
          await historyFetch(query, date);
        }
      } catch {
        const ipadd = await getIp();
        if (ipadd != null) {
          const query = ipadd;
          setcurrQuery(query);
          await currentFetch(query);
          await forecastFetch(query);
          await historyFetch(query, date);
        } else {
          setwiggle(false);
          setstatus("unable to get loaction retry");
        }
      }
    }
  };

  const currentFetch = async (query) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=67d2dd6485c540308ca65523240210&q=${query}&aqi=yes`;
    try {
      setstatus("fetching current data");
      setwiggle(true);
      const response = await fetch(url);
      const result = await response.json();
      setstatus("current data fetched");
      console.log(result);
      setcurrentData(result);
      setwiggle(false);
    } catch (error) {
      setwiggle(false);
      console.log(error);
      setstatus("unable to fetch data");
    }
  };

  const forecastFetch = async (query) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=67d2dd6485c540308ca65523240210&q=${query}&days=3&aqi=yes&alerts=yes`;
    try {
      setwiggle(true);
      setstatus("fetching forecast data");
      const response = await fetch(url);
      const result = await response.json();
      setstatus("forecast data fetched");
      console.log(result);
      setforecastData(result);
      setstatus("data fetched");
      setwiggle(false);
    } catch (error) {
      setwiggle(false);
      console.log(error);
      setstatus("unable to fetch data");
    }
  };

  const historyFetch = async (query, dt) => {
    const url = `https://api.weatherapi.com/v1/history.json?key=67d2dd6485c540308ca65523240210&q=${query}&dt=${dt}`;
    try {
      setwiggle(true);
      setstatus("fetching History data");
      const response = await fetch(url);
      const result = await response.json();
      setstatus("forecast History fetched");
      console.log(result);
      sethistoryData(result);
      setstatus("data fetched");
      setwiggle(false);
      setloading(false);
    } catch (error) {
      setwiggle(false);
      console.log(error);
      setstatus("unable to History fetch data");
    }
  };

  const fetchByInput = (e) => {
    e.preventDefault();
    const raw = document.getElementById("cityinput").value;
    let st1 = raw.replace(/^\s+|\s+$|[\d\W_]+/g, "");
    let final = st1.replace(/([A-Z])/g, " $1").trim();
    if (final == "" || final == " " || final.length < 2) {
      alert("Enter valid name of city");
      return;
    } else {
      fechingdata(final);
    }
  };

  // const fetchHis = async (date = defaultDate) => {
  //   date = document.getElementById("hisdateinput").value;
  //   try {
  //     const coord = await getcoord();
  //     if (coord != null) {
  //       const query = `${coord.x},${coord.y}`;
  //       await historyFetch(query, date);
  //     }
  //   } catch {
  //     const ipadd = await getIp();
  //     if (ipadd != null) {
  //       const query = ipadd;
  //       await historyFetch(query, date);
  //     } else {
  //       setstatus("unable to get loaction retry");
  //       console.log(status);
  //     }
  //   }
  // };
  const fetchHis = async (date = defaultDate) => {
    date = document.getElementById("hisdateinput").value;
    try {
      console.log(currQuery);
      console.log(date);
      await historyFetch(currQuery, date);
    } catch {
      setstatus("Unable to fetch history for this date");
      console.log("Unable to fetch history for this date");
    }
  };

  const saveLocal = () => {
    if (localStorage.length < 3) {
      const val = `${currentData.location.lat},${currentData.location.lon}`;
      const key = prompt("Enter name by which we save that location");
      if (key != null) {
        localStorage.setItem(key, val);
      }
    } else {
      alert("You can't save more than 3 locations");
    }
    getlocalKeys();
  };

  const getlocalKeys = () => {
    console.log("local called");
    let keys = [];
    if (localStorage !== null) {
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
    }
    setsaved(keys);
  };

  const deleteLocal = (key) => {
    localStorage.removeItem(key);
    getlocalKeys();
  };

  const fetchSaved = (key) => {
    let q = localStorage.getItem(key);
    console.log(typeof q);
    console.log(q);
    fechingdata(q);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center flex-col">
          <img src={loader} className="w-24 invert" alt="" />
          <div className="flex justify-center items-center custom_bounce w-full h-4">
            <h1 className="text-center text-white text-sm">{status}</h1>
          </div>
          <div className="flex justify-center items-center custom_bounce mt-3 w-full">
            <span className="w-1 h-1 rounded bg-white ml-2 transition-all animate-[pulse_2s_ease-in-out_infinite]"></span>
            <span className="w-1 h-1 rounded bg-white ml-2 transition-all animate-[pulse_1.5s_ease-in-out_infinite]"></span>
            <span className="w-1 h-1 rounded bg-white ml-2 transition-all animate-[pulse_1s_ease-in-out_infinite]"></span>
            <span className="w-1 h-1 rounded bg-white ml-2 transition-all animate-[pulse_0.7s_ease-in-out_infinite]"></span>
          </div>
        </div>
      ) : (
        <>
          <nav className="w-full font-sans text-slate-100 font-light h-14 flex justify-between items-center sticky top-0 pl-4 pr-4 bg-black z-10 ">
            <div className="h-full flex items-center justify-center gap-2 max-sm:w-full">
              <img src={logo} alt="#" className="h-8 invert max-sm:h-10" />
              <h1 className="text-center text-3xl font-extrabold max-md:text-2xl">
                Weather Now
              </h1>
            </div>

            <ul className="flex justify-between h-10 items-center list-none gap-2 text-sm max-sm:hidden ">
              <li
                className="relative flex justify-center items-center duration-500 transition-all px-1 h-full cursor-pointer rounded-lg"
                onClick={() => {
                  document.getElementById("span1").style.width = `75%`;
                  document.getElementById("span1").style.transition = `200ms`;
                  document.getElementById("span2").style.width = `0%`;
                  document.getElementById("span3").style.width = `0%`;
                  document.getElementById("span4").style.width = `0%`;
                  scrollToSection(liveRef);
                }}
              >
                Current
                <span
                  className=" w-9/12 rounded h-0.5 bg-white absolute bottom-1"
                  id="span1"
                ></span>
              </li>
              <li
                className="relative flex justify-center items-center transition-all px-1 h-full cursor-pointer rounded-lg"
                onClick={() => {
                  document.getElementById("span1").style.width = `0%`;
                  document.getElementById("span2").style.width = `75%`;
                  document.getElementById("span2").style.transition = `200ms`;
                  document.getElementById("span3").style.width = `0%`;
                  document.getElementById("span4").style.width = `0%`;
                  scrollToSection(forecastRef);
                }}
              >
                Forecast
                <span
                  className=" w-0 rounded h-0.5 bg-white absolute bottom-1"
                  id="span2"
                ></span>
              </li>
              <li
                className="relative flex justify-center items-center transition-all px-1 h-full cursor-pointer rounded-lg"
                onClick={() => {
                  scrollToSection(weathermapRef);
                  document.getElementById("span1").style.width = `0%`;
                  document.getElementById("span2").style.width = `0%`;
                  document.getElementById("span3").style.width = `75%`;
                  document.getElementById("span3").style.transition = `200ms`;
                  document.getElementById("span4").style.width = `0%`;
                }}
              >
                Weather Map
                <span
                  className=" w-0 rounded h-0.5 bg-white absolute bottom-1"
                  id="span3"
                ></span>
              </li>
              <li
                className="relative flex justify-center items-center transition-all px-1 h-full cursor-pointer rounded-lg"
                onClick={() => {
                  scrollToSection(historyRef);
                  document.getElementById("span1").style.width = `0%`;
                  document.getElementById("span2").style.width = `0%`;
                  document.getElementById("span3").style.width = `0%`;
                  document.getElementById("span4").style.width = `75%`;
                  document.getElementById("span4").style.transition = `200ms`;
                }}
              >
                History
                <span
                  className=" w-0 rounded h-0.5 bg-white absolute bottom-1"
                  id="span4"
                ></span>
              </li>
            </ul>
          </nav>
          <section
            ref={liveRef}
            className="relative flex flex flex-col justify-center items-center w-full h-[55rem] pl-4 pr-4 rounded-xl overflow-hidden text-white  max-md:flex-col opacity-75"
          >
            <img
              src={
                bg[currentData.current.is_day][
                  currentData.current.condition.code
                ]
              }
              className="absolute h-[120%] object-cover object-center brightness-75"
            />
            <nav className="relative top-0 w-max h-10  relative rounded-2xl flex justify-center items-center glass px-2">
              <div className="flex justify-center items-center w-full h-full py-2">
                <img
                  src={place}
                  alt="current"
                  className="h-5 invert px-1 cursor-pointer"
                  onClick={() => {
                    fechingdata();
                  }}
                />
                {saved.map((e, index) => (
                  <span
                    key={index}
                    className=" relative grow text-sm max-lg:text-xs h-full flex cursor-default justify-center items-center rounded-md px-1 hover:bg-gray-300/[0.2] group"
                    onClick={() => {
                      fetchSaved(e);
                    }}
                  >
                    {e}
                    <div
                      className="absolute top-[-10px] right-0 w-4 h-4 rounded-full text-white bg-gray-300/[0.2] inline-block opacity-0 text-center text-md p-0 transition-all cursor-pointer group-hover:opacity-100"
                      onClick={() => {
                        deleteLocal(e);
                      }}
                    >
                      -
                    </div>
                  </span>
                ))}
                <div className="w-6 h-6 rounded-full flex justify-center items-center overflow-hidden hover:bg-gray-300/[0.2] cursor-pointer ml-1">
                  <img
                    src={plus}
                    alt="current"
                    className="invert py-1 px-1"
                    onClick={saveLocal}
                  />
                </div>
              </div>
            </nav>
            <div className=" relative w-full h-[30rem] flex justify-center items-center max-md:flex-col ">
              <form
                className="flex flex-col justify-center h-full w-full gap-4 max-md:h-20 max-lg:pl-4 pl-12 "
                id="CurrentForm"
                onSubmit={fetchByInput}
              >
                <h1 className="text-5xl font-bold row-span-2 max-md:w-0 max-md:h-0 max-md:hidden max-full">
                  Welcome to WeatherNow
                </h1>
                <p className="w-4/5 text-sm pl-4 max-md:w-0 max-md:h-0 max-md:hidden">
                  Get Real-Time Updates, Anytime, Anywhere Global Forecasts,
                  Local Precision Weather Alerts for you loaction Weather
                  History
                </p>

                <div className="max-md:w-64 h-12 mt-2 pl-2 max-w-sm relative">
                  <input
                    type="text"
                    className=" w-full h-full rounded-3xl pl-5 pr-10 text-base glass outline-0"
                    placeholder="Search for loaction"
                    id="cityinput"
                  />
                  <img
                    src={searchIcon}
                    className="h-8 absolute top-1.5 right-2 invert border-0"
                    onClick={fetchByInput}
                  />
                </div>
              </form>
              <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
                <Card data={currentData} curr={true} wiggle={wiggle} />
              </div>
            </div>
            <div className="relative flex items-center w-full max-w-[900px] max-lg:w-full h-[20rem] pl-4 pr-4 rounded-xl overflow-scroll gap-4 lg:gap-8">
              <AirQuality
                data={currentData.current.air_quality}
                wiggle={wiggle}
              />
              <OtherStats data={currentData.current} wiggle={wiggle} />
              <Wind data={currentData.current} wiggle={wiggle} />
            </div>
          </section>
          <section
            ref={forecastRef}
            className="relative flex flex-col justify-between items-center w-full h-[55rem] mx-4 pt-4 mt-2 pl-4 pr-4 rounded-xl bg-zinc-900 overflow-hidden text-white"
          >
            <Forecast data={forecastData.forecast} wiggle={wiggle} />
          </section>
          <section
            ref={weathermapRef}
            className="relative flex flex-col justify-evenly items-center w-full mx-4 pt-4 pb-4 pl-4 pr-4 rounded-xl text-white max-md:flex-col aspect-square"
          >
            <Map />
          </section>
          <section
            className="relative flex flex-col justify-between items-center w-full h-[55rem] mx-4 pt-4 mt-2 pl-4 pr-4 rounded-xl bg-zinc-900 overflow-hidden text-white"
            ref={historyRef}
          >
            <form
              className="w-full h-10 flex justify-center items-center gap-8 max-md:gap-1 max-sm:flex-col max-sm:h-20"
              name="historyForm"
            >
              <label htmlFor="fromdate">
                <span>Select Date: </span>
                <input
                  className="rounded-lg glass pl-4"
                  type="date"
                  name="fromDate"
                  id="hisdateinput"
                  min={minDate}
                  max={maxDate}
                  onChange={fetchHis}
                />
              </label>
            </form>
            <History data={historyData.forecast} wiggle={wiggle} />
          </section>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
