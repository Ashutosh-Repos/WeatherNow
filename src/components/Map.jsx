import React, { Component, useEffect, useState } from "react";

import newmap from "../assets/weatherworldMap.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Map = () => {
  const [layer, setLayer] = useState("");
  if (layer === "") {
    setLayer("clouds_new");
  }

  useEffect(() => {
    updateLayer();
  }, []);

  function updateLayer() {
    const lyrname = document.forms.layerForm.elements["layer"].value;
    if (lyrname === "" || lyrname === null || lyrname === undefined) {
      setLayer("clouds_new");
    } else {
      setLayer(lyrname);
      console.log(layer);
    }
  }
  return (
    <>
      <form
        className=" w-full h-4 flex justify-center items-center gap-2 max-md:gap-1"
        name="layerForm"
        onChange={updateLayer}
      >
        <input type="radio" id="Clouds" name="layer" value="clouds_new" />
        <label htmlFor="Clouds" className="text-xs max-sm:text-[6px]">
          Clouds
        </label>
        <input
          type="radio"
          id="Precipitation"
          name="layer"
          value="precipitation_new"
        />
        <label
          htmlFor="Precipitation"
          className="text-xs max-sm:text-[6px] filter"
        >
          Precipitation
        </label>
        <input
          type="radio"
          id="Sealevelpressure"
          name="layer"
          value="pressure_new"
        />
        <label htmlFor="Sealevelpressure" className="text-xs max-sm:text-[6px]">
          Sea level pressure
        </label>
        <input type="radio" id="Windspeed" name="layer" value="wind_new" />
        <label htmlFor="Windspeed" className="text-xs max-sm:text-[6px]">
          Wind speed
        </label>
        <input type="radio" id="Temperature" name="layer" value="temp_new" />
        <label htmlFor="Temperature" className="text-xs max-sm:text-[6px]">
          Temperature
        </label>
      </form>
      <div className="relative  w-full max-md:w-[90%] overflow-hidden aspect-square flex justify-center items-center rounded-4xl overflow-hidden">
        <TransformWrapper>
          <TransformComponent>
            <div
              id="over"
              className="w-full h-full absolute z-[4] flex justify-center items-center rounded-xl overflow-hidden"
            >
              <img
                src={`https://tile.openweathermap.org/map/${layer}/0/0/0.png?appid=6bddb1f5dd01a3c383f5528091f7e12b`}
                className="pointer-events-none h-full "
              />
            </div>
            <img src={newmap} alt="test" className="rounded-xl"/>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
};

export default Map;
