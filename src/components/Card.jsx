//importing icons......................
import windIcon from "../assets/icons/windy.png";
import humidityIcon from "../assets/icons/humidity.png";
import airQualityIcon from "../assets/icons/air_pollution.png";
import pressureIcon from "../assets/icons/pressure.png";
import uv_raysIcon from "../assets/icons/rays.png";
import visibilityIcon from "../assets/icons/visibility.png";
function Card(props) {
  const Data = Object.entries(props.data.current.air_quality);
  const cardData = [
    { source: windIcon, val: props.data.current.wind_kph + " kmph" },
    { source: humidityIcon, val: props.data.current.humidity },
    { source: pressureIcon, val: props.data.current.pressure_in + " in" },
    { source: visibilityIcon, val: props.data.current.vis_km + " km" },
    { source: uv_raysIcon, val: props.data.current.uv },
    { source: airQualityIcon, val: Data[6][1] },
  ];

  const cl1 =
    "flex w-80 h-[26rem] glass rounded-xl transition-all flex-col justify-between items-center pt-8 max-md:w-72 max-md:h-96 wiggle";
  const cl2 =
    "flex w-80 h-[26rem] glass rounded-xl transition-all flex-col justify-between items-center pt-8 max-md:w-72 max-md:h-96 ";

  return (
    <div className={props.wiggle == true ? cl1 : cl2}>
      <img src={props.data.current.condition.icon} alt="#" className="h-20" />
      <p>{props.data.current.condition.text}</p>
      <h1 className="text-7xl">{props.data.current.feelslike_c}°c</h1>
      <h3>{props.data.location.name}</h3>

      <div className=" grid grid-rows-3 grid-cols-3 place-items-center w-full h-2/5 gap-4">
        {cardData.map((e, index) => (
          <span
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <img className="w-8 invert grayscale" src={e.source} alt="#" />
            <p className="text-xs text-center">{e.val}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
export default Card;
