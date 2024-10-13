import Slider from "./Slider";
import leftArw from "../assets/icons/left-arrow.png";
import rightArw from "../assets/icons/right-arrow.png";
import Wind from "./Wind";
import OtherStats from "./OtherStats";
import CardH from "./CardH";
import { useState, useEffect } from "react";
function History(props) {
  const nowDate = new Date();
  const nowHours = nowDate.getHours();

  const leftMove = () => {
    let slider = document.getElementById("Historyscroller");
    slider.scrollLeft = slider.scrollLeft - 160;
  };
  const rightMove = () => {
    let slider = document.getElementById("Historyscroller");
    slider.scrollLeft = slider.scrollLeft + 160;
  };

  return (
    <>
      <div className=" relative w-full h-[30rem] flex  items-center overflow-scroll">
        <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
          <CardH
            data={props.data.forecastday[0].hour[nowHours]}
            dte={props.data.forecastday[0].date}
          />
        </div>
        <div className="relative flex items-center w-full h-[20rem] pl-4 pr-4 rounded-xl  gap-4  lg:gap-8">
          <Wind data={props.data.forecastday[0].hour[nowHours]} Id="HisWind" />
          <OtherStats data={props.data.forecastday[0].hour[nowHours]} />
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
          id="Historyscroller"
          data={props.data.forecastday[0].hour}
          nowPoint={nowHours}
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
export default History;
