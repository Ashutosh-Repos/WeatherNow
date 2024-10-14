import arrow from "../assets/icons/newarrow.png";
function Wind(props) {
  const cl1 =
    "relative flex flex-col justify-center items-center h-full min-w-64 rounded-xl glass pt-4 wiggle";
  const cl2 =
    "relative flex flex-col justify-center items-center h-full min-w-64 rounded-xl glass pt-4";
  return (
    <div className={props.wiggle == true ? cl1 : cl2}>
      <div className="w-full h-1/2  grid place-items-center">
        <div className=" relative h-[8.5rem] w-[8.5rem] flex justify-center items-center">
          <p className="absolute h-max w-max text-xs text-center p-0 font-semibold top-0">
            N
          </p>
          <p className="absolute h-max w-max text-xs text-center p-0 font-semibold left-0">
            W
          </p>
          <p className="absolute h-max w-max text-xs text-center p-0 font-semibold bottom-0">
            E
          </p>
          <p className="absolute h-max w-max text-xs text-center p-0 font-semibold right-0 pr-1.5">
            S
          </p>
          <img
            src={arrow}
            className="w-[6.5rem] invert transition-all duration-[2000ms]"
            style={{ transform: `rotate(${props.data.wind_degree}deg)` }}
            id={props.Id}
          />
        </div>
        <p className="text-lg text-center">{props.data.wind_degree}°</p>
      </div>
      <div className="w-full h-1/2 grid grid-row-2 grid-cols-2 place-items-center">
        <div>
          <h1 className="text-base text-center">Speed</h1>
          <p className="text-sm text-center">{props.data.wind_kph} Kmph</p>
        </div>
        <div>
          <h1 className="text-base text-center">Direction</h1>
          <p className="text-sm text-center">{props.data.wind_dir}</p>
        </div>
        <div>
          <h1 className="text-base text-center">Chill</h1>
          <p className="text-sm text-center">
            {props.data.windchill_c + "° C"}
          </p>
        </div>
        <div>
          <h1 className="text-base text-center">Gust</h1>
          <p className="text-sm text-center">{props.data.gust_kph} Kmph</p>
        </div>
      </div>
    </div>
  );
}
export default Wind;
