import weatherStatusIcon from "../assets/icons/weather_status.png";

//importing icons......................
import windIcon from "../assets/icons/windy.png";
import humidityIcon from "../assets/icons/humidity.png";
import airQualityIcon from "../assets/icons/air_quality.png";
import precipitationIcon from "../assets/icons/precipitation.png";
import pressureIcon from "../assets/icons/pressure.png";
import uv_raysIcon from "../assets/icons/rays.png";
import visibilityIcon from "../assets/icons/visibility.png";
function Card(props) {
  // const cardData = [
  //   { source: windIcon, val: props.data.wind_kph },
  //   { source: humidityIcon, val: props.data.humidity },
  //   { source: pressureIcon, val: props.data.pressure_in },
  //   { source: visibilityIcon, val: props.data.vis_km },
  //   { source: airQualityIcon, val: props.data.air_quality.us - epa - index },
  //   { source: uv_raysIcon, val: props.data.uv },
  // ];
  const Data = Object.entries(props.data.current.air_quality);
  const cardData = [
    { source: windIcon, val: props.data.current.wind_kph },
    { source: humidityIcon, val: props.data.current.humidity },
    { source: pressureIcon, val: props.data.current.pressure_in },
    { source: visibilityIcon, val: props.data.current.vis_km },
    { source: uv_raysIcon, val: props.data.current.uv },
    { source: airQualityIcon, val: Data[6][1] },
  ];
  return (
    <div className="flex w-80 h-[26rem] glass rounded-xl transition-all flex-col justify-between items-center pt-8 max-md:w-72 max-md:h-96">
      <img src={props.data.current.condition.icon} alt="#" className="h-20" />
      <p>{props.data.current.condition.text}</p>
      <h1 className="text-7xl">{props.data.current.feelslike_c}°c</h1>
      <h3>{props.data.location.name}</h3>

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
export default Card;
