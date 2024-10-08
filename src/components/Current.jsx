import Form from "./Form";
import Card from "./Card";
import AirQuality from "./AirQuality";
import Wind from "./Wind";
import OtherStats from "./OtherStats";
function Current() {
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
  return (
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
        <Form />
        <div className="relative flex justify-center items-center w-full h-full min-h-[26rem]">
          <Card />
        </div>
      </div>
      <div className="relative flex items-center w-full max-w-[900px] max-lg:w-full h-[20rem] pl-4 pr-4 rounded-xl overflow-scroll gap-4 lg:gap-8">
        <AirQuality data={PropData} />
        <OtherStats />
        <Wind />
      </div>
    </section>
  );
}
export default Current;
