import React, { useEffect, useRef, useState } from "react";
import loader from "./assets/loader.gif";
import logo from "./assets/icons/logo.png";
import place from "./assets/icons/place.png";
import plus from "./assets/icons/plus.png";

import Form from "./components/Form";
import Card from "./components/Card";
import Wind from "./components/Wind";
import AirQuality from "./components/AirQuality";
import OtherStats from "./components/OtherStats";
import searchIcon from "./assets/icons/search.png";
import Forecast from "./components/Forecast";
import History from "./components/History";
import Map from "./components/Map";
function App() {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setstatus] = useState("fetching location");
  const [currentData, setcurrentData] = useState(null);
  const [forecastData, setforecastData] = useState(null);
  const [historyData, sethistoryData] = useState(null);
  const [saved, setsaved] = useState([]);
  const [coords, setcoords] = useState(null);

  const liveRef = useRef(null);
  const forecastRef = useRef(null);
  const weathermapRef = useRef(null);

  const scrollToSection = (Ref) => {
    window.scrollTo({
      top: Ref.current.offsetTop-60,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fechingdata();
    getlocalKeys();
  }, []);


  const getIp = async () => {
    return new Promise((resolve, reject) => {
      try {
        setstatus("fetching IP");
        const response = fetch("https://api.ipify.org?format=json")
          .then((reponse) => reponse.json())
          .then((result) => {
            // const ipd = result.ip;
            setstatus("IP fetched");
            console.log(result.ip);
            resolve(result.ip);
          });
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
            console.log({ x: pos.coords.latitude, y: pos.coords.longitude })
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

  const fechingdata = async (city = "") => {
    if (city != "") {
      await currentFetch(city);
      await forecastFetch(city);
    } else {
      try {
        const coord = await getcoord();
        if (coord != null) {
          const query = `${coord.x},${coord.y}`;
          await currentFetch(query);
          await forecastFetch(query);
        }
      } catch {
        const ipadd = await getIp();
        if (ipadd != null) {
          const query = ipadd;
          await currentFetch(query);
          await forecastFetch(query);
        } else {
          setstatus("unable to get loaction retry");
        }
      }
    }
  };

  const currentFetch = async (query) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=67d2dd6485c540308ca65523240210&q=${query}&aqi=yes`;
    try {
      setstatus("fetching current data");
      const response = await fetch(url);
      const result = await response.json();
      setstatus("current data fetched");
      console.log(result);
      setcurrentData(result);
    } catch (error) {
      console.log(error);
      setstatus("unable to fetch data");
    }
  };

  const forecastFetch = async (query) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=67d2dd6485c540308ca65523240210&q=${query}&days=3&aqi=yes&alerts=yes`;
    try {
      setstatus("fetching forecast data");
      const response = await fetch(url);
      const result = await response.json();
      setstatus("forecast data fetched");
      console.log(result);
      setforecastData(result);
      setstatus("data fetched");
      setloading(false);
    } catch (error) {
      console.log(error);
      setstatus("unable to fetch data");
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

  const saveLocal = ()=>{
    if(localStorage.length<3){
      const val = `${currentData.location.lat},${currentData.location.lon}`;
      const key = prompt("Enter name by which we save that location");
      if(key != null){
        localStorage.setItem(key,val);
      }
    }else{
      alert("You can't save more than 3 locations");
    }
    getlocalKeys();
  }

  const getlocalKeys = ()=>{
    console.log("local called")
    let keys= []
    if(localStorage !== null){
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
    }
    setsaved(keys);
  }

  const deleteLocal = (key)=>{
    localStorage.removeItem(key);
    getlocalKeys();
  }

  const fetchSaved = (key)=>{
    let q = localStorage.getItem(key);
    console.log(typeof q)
    console.log(q);
    fechingdata(q);
  }

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
          <nav className="w-full font-sans text-slate-100 font-light h-16 flex justify-between items-center sticky top-0 pl-4 pr-4 bg-black z-10 ">
            <h1 className="text-center text-4xl font-extrabold">Weather Now</h1>
            <ul className="flex justify-between h-10 items-center list-none gap-4 text-base max-sm:hidden ">
              <li className="flex justify-between items-center border-2 px-2 h-full cursor-pointer rounded-lg" onClick={()=>{scrollToSection(liveRef)}}>Current</li>
              <li className="flex justify-between items-center border-2 px-2 h-full cursor-pointer rounded-lg" onClick={()=>{scrollToSection(forecastRef)}}>Forecast</li>
              <li className="flex justify-between items-center border-2 px-2 h-full cursor-pointer rounded-lg" onClick={()=>{scrollToSection(weathermapRef)}}>Weather Map</li>
            </ul>
          </nav>
          <section ref={liveRef} className="relative flex flex flex-col justify-center items-center w-full h-[55rem] pl-4 pr-4 rounded-xl bg-[url('./assets/rain1.jpg')] bg-cover bg-no-repeat bg-fixed overflow-hidden text-white  max-md:flex-col">
            <nav className="relative top-0 w-max h-10  relative rounded-2xl flex justify-center items-center glass px-2">
              <div className="flex justify-center items-center w-full h-full py-2">
              <img src={place} alt="current" className="h-5 invert px-1 cursor-pointer"/>
              {saved.map((e,index)=>
              (
                <span key={index} className=" relative grow text-sm max-lg:text-xs h-full flex cursor-default justify-center items-center rounded-md px-1 hover:bg-gray-300/[0.2] group" onClick={()=>{fetchSaved(e)}}>
                  {e}
                  <div className="absolute top-[-10px] right-0 w-4 h-4 rounded-full text-white bg-gray-300/[0.2] inline-block opacity-0 text-center text-md p-0 transition-all cursor-pointer group-hover:opacity-100" onClick={()=>{deleteLocal(e)}}>-</div>
                </span>
              ))}
              <div className="w-6 h-6 rounded-full flex justify-center items-center overflow-hidden hover:bg-gray-300/[0.2] cursor-pointer ml-1">
                <img src={plus} alt="current" className="invert py-1 px-1" onClick={saveLocal}/>
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
                    className=" w-full h-full rounded-3xl pl-5 pr-10 text-base glass"
                    placeholder="Search for loaction"
                    id="cityinput"
                  />
                  <img
                    src={searchIcon}
                    className="h-8 absolute top-1 right-2 invert border-0"
                    onClick={fetchByInput}
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
          <section ref={forecastRef} className="relative flex flex-col justify-between items-center w-full h-[55rem] mx-4 pt-4 mt-2 pl-4 pr-4 rounded-xl bg-zinc-900 overflow-hidden text-white">
            <Forecast data={forecastData.forecast} />
          </section>
          <section ref={weathermapRef} className="relative flex flex-col justify-evenly items-center w-full mx-4 pt-4 pb-4 pl-4 pr-4 rounded-xl text-white max-md:flex-col aspect-square">
            <Map/>
          </section>
          
      
        </>
      )}
    </>
  );
}

export default App;
