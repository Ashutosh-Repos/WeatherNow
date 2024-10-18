import CardO from "./CardO";
import Slider from "./Slider";
import leftArw from "../assets/icons/left-arrow.png";
import rightArw from "../assets/icons/right-arrow.png";
import Wind from "./Wind";
import AirQuality from "./AirQuality";
import OtherStats from "./OtherStats";
import { useEffect, useState } from "react";
function Forecast(props) {
  const [active, setactive] = useState(props.data.forecast.forecastday[0]);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  useEffect(() => {
    setactive(props.data.forecast.forecastday[0]);
  }, [props.data]);

  const nowDate = new Date();
  const nowHours = nowDate.getHours();

  const changeOne = () => {
    setactive(props.data.forecast.forecastday[0]);
    setOne(true);
    setTwo(false);
    setThree(false);
  };
  const changeTwo = () => {
    setactive(props.data.forecast.forecastday[1]);
    setOne(false);
    setTwo(true);
    setThree(false);
  };
  const changeThree = () => {
    setactive(props.data.forecast.forecastday[2]);
    setOne(false);
    setTwo(false);
    setThree(true);
  };

  const leftMove = () => {
    let slider = document.getElementById("scroller");
    slider.scrollLeft = slider.scrollLeft - 160;
  };
  const rightMove = () => {
    let slider = document.getElementById("scroller");
    slider.scrollLeft = slider.scrollLeft + 160;
  };

  const classOne =
    "grow h-full flex justify-center items-center cursor-pointer text-white px-2 py-2";
  const classOneActive =
    "grow h-full flex justify-center items-center cursor-pointer text-black bg-white px-2 py-2";
  const classTwo =
    "grow h-full flex justify-center items-center cursor-pointer text-white px-2 py-2";
  const classTwoActive =
    "grow h-full flex justify-center items-center cursor-pointer text-black bg-white px-2 py-2";
  const classThree =
    "grow h-full flex justify-center items-center cursor-pointer text-white px-2 py-2";
  const classThreeActive =
    "grow h-full flex justify-center items-center cursor-pointer text-black bg-white px-2 py-2";
  return (
    <>
      <nav className="max-lg:w-64 w-max  relative rounded-2xl flex justify-center items-center glass rounded-xl">
        <div className="flex justify-center items-center w-full h-full text-lg rounded-xl max-lg:text-sm max-md:text-xs overflow-hidden">
          <span
            className={!one ? classOne : classOneActive}
            id="day1"
            onClick={changeOne}
          >
            Today
          </span>
          <span
            className={!two ? classTwo : classTwoActive}
            id="day2"
            onClick={changeTwo}
          >
            Tomorrow
          </span>
          <span
            className={!three ? classThree : classThreeActive}
            id="day3"
            onClick={changeThree}
          >
            Overmorrow
          </span>
        </div>
      </nav>
      <div className=" relative w-full h-[30rem] flex  items-center overflow-scroll">
        <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
          <CardO
            data={active.hour[nowHours]}
            dte={active.date}
            wiggle={props.wiggle}
            wdata={props.data.current}
          />
        </div>
        <div className="relative flex items-center w-full h-[20rem] pl-4 pr-4 rounded-xl  gap-4  lg:gap-8">
          <AirQuality
            data={props.data.current.air_quality}
            wiggle={props.wiggle}
          />
          <Wind
            data={active.hour[nowHours]}
            Id="foreWind"
            wiggle={props.wiggle}
          />
          <OtherStats data={active.hour[nowHours]} wiggle={props.wiggle} />
        </div>
      </div>
      <div className=" relative grow w-full h-64 max-w-6xl flex flex-col justify-center items-center max-md:pl-4 max-md:pr-4 pl-8 pr-8 glass rounded-xl mb-4">
        <h1 className="text-xl h-10">Hourly Forecast</h1>

        <img
          src={leftArw}
          className="absolute left-0 w-7 h-7 cursor-pointer invert"
          onClick={leftMove}
        />
        <Slider
          id="scroller"
          data={active.hour}
          nowPoint={nowHours}
          wiggle={props.wiggle}
        />
        <img
          src={rightArw}
          className="absolute right-0 w-7 h-7 cursor-pointer invert"
          onClick={rightMove}
        />
      </div>
    </>
  );
}
export default Forecast;
