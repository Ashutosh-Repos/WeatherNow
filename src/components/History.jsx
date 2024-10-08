import Form from "./Form";
import Card from "./Card";
import Slider from "./Slider";
import leftArw from "../assets/icons/left-arrow.png";
import rightArw from "../assets/icons/right-arrow.png";
import Wind from "./Wind";
import AirQuality from "./AirQuality";
import OtherStats from "./OtherStats";
import locationIcon from "../assets/icons/place.png";
import CardO from "./CardO";
function History() {
  const PropData = {
    co: 331.15,
    no2: 12.765,
    o3: 81.0,
    so2: 3.145,
    pm2_5: 11.285,
    pm10: 15.355,
    "us-epa-index": 1,
    "gb-defra-index": 1,
  };
  const leftMove = () => {
    let slider = document.getElementById("Historyscroller");
    slider.scrollLeft = slider.scrollLeft - 160;
  };
  const rightMove = () => {
    let slider = document.getElementById("Historyscroller");
    slider.scrollLeft = slider.scrollLeft + 160;
  };

  return (
    <section className="relative flex flex-col justify-between items-center w-full h-[55rem] mx-4 pt-4 mt-2 pl-4 pr-4 rounded-xl bg-zinc-900 overflow-hidden text-white">
      <form
        className="w-full h-10 flex justify-center items-center gap-8 max-md:gap-1 max-sm:flex-col max-sm:h-20"
        name="historyForm"
      >
        <label htmlFor="fromdate">
          <span>From Date : </span>
          <input
            className="rounded-lg glass pl-4"
            type="date"
            name="fromDate"
            id="fromdate"
            min="2017-04-01"
            max="2017-04-30"
          />
        </label>

        <label
          htmlFor="historylocation"
          className="flex justify-center items-center"
        >
          Location :
          <img src={locationIcon} alt="#" className="w-5 h-5 invert-[0.25]" />
          or
          <input
            type="text"
            name="historylocation"
            id="historylocation"
            className="rounded-xl glass border-0"
          />
        </label>
      </form>
      <div className=" relative w-full h-[30rem] flex  items-center overflow-scroll">
        <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
          <CardO />
        </div>
        <div className="relative flex items-center w-full h-[20rem] pl-4 pr-4 rounded-xl  gap-4  lg:gap-8">
          <Wind />
          <OtherStats />
          <AirQuality data={PropData} />
        </div>
      </div>
      <div className=" relative grow w-full h-64 max-w-6xl flex flex-col justify-center items-center max-md:pl-4 max-md:pr-4 pl-8 pr-8 glass rounded-xl mb-4">
        <h1 className="text-xl h-10">Hourly Forecast</h1>

        <img
          src={leftArw}
          className="absolute left-0 w-7 h-7 cursor-pointer invert"
          onClick={leftMove}
        />
        <Slider id="Historyscroller" />
        <img
          src={rightArw}
          className="absolute right-0 w-7 h-7 cursor-pointer invert"
          onClick={rightMove}
        />
      </div>
    </section>
  );
}
export default History;
