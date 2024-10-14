//importing icons......................
import windIcon from "../assets/icons/windy.png";
import humidityIcon from "../assets/icons/humidity.png";
import pressureIcon from "../assets/icons/pressure.png";
import uv_raysIcon from "../assets/icons/rays.png";
import visibilityIcon from "../assets/icons/visibility.png";
function CardO(props) {
  const cardData = [
    { source: windIcon, val: props.data.wind_kph + " kmph" },
    { source: humidityIcon, val: props.data.humidity },
    { source: pressureIcon, val: props.data.pressure_in + " in" },
    { source: visibilityIcon, val: props.data.vis_km + " km" },
    { source: uv_raysIcon, val: props.data.uv },
  ];
  const cl1 =
    "flex w-80 h-[26rem] glass rounded-xl transition-all flex-col justify-between items-center pt-8 max-md:w-72 max-md:h-96 wiggle";
  const cl2 =
    "flex w-80 h-[26rem] glass rounded-xl transition-all flex-col justify-between items-center pt-8 max-md:w-72 max-md:h-96";
  return (
    <div className={props.wiggle == true ? cl1 : cl2}>
      <img src={props.data.condition.icon} alt="#" className="h-20" />
      <p>{props.data.condition.text}</p>
      <h1 className="text-7xl">{props.data.feelslike_c}°c</h1>

      <h3>{props.dte} </h3>

      <div className=" grid grid-rows-3 grid-cols-3 place-items-center w-full h-2/5 gap-4">
        {cardData.map((e, index) => (
          <span key={index}>
            <img className="w-8 invert" src={e.source} alt="#" />
            <p className="text-xs text-center">{e.val}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
export default CardO;
