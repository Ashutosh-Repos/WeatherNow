import weatherStatusIcon from "../assets/icons/weather_status.png";
function Slider(props) {
  //   function wheelScroll() {
  //     let scrollElement = document.getElementById("scroller");
  //     scrollElement.addEventListener("wheel", (event) => {
  //       scrollElement.preventDefault();

  //       scrollElement.scrollBy({
  //         left: event.deltaY < 0 ? -30 : 30,
  //       });
  //     });
  //   }

  //   const wheelScroll = (event) => {
  //     let scrollContainer = document.getElementById("scroller");
  //     if (event.deltaY !== 0) {
  //       event.preventDefault();
  //       // Scroll horizontally by the deltaY value (to convert vertical movement into horizontal)
  //       scrollContainer.scrollLeft += event.deltaY;
  //     }
  //   };
  const now = "h-full  w-40 min-w-40 flex justify-center items-center rounded-xl bg-gray-300/[0.05]";
  const notnow = "h-full w-40 min-w-40 flex justify-center items-center rounded-xl";
  return (
    <div
      className="w-full h-64 overflow-x-scroll relative flex items-center scroll-smooth"
      id={props.id}
      //   onWheel={wheelScroll}
    >
      {props.data.map((e,i) => (
        <div className={props.nowPoint == i ? now:notnow} key={i}>
          <div
            className="h-full w-40 min-w-40 flex flex-col justify-center items-center rounded-2xl overflow-x-hidden mx-2.5"
            
          >
            <div className="w-full h-3/5 border-b flex flex-col justify-center items-center">
              <img
                src={e.condition.icon}
                alt="#"
                className="h-16 w-16"
              />
              <h3 className="text-xl">{e.feelslike_c}°c</h3>
              <h3 className="text-sm text-center font-semibold">{e.condition.text}</h3>
            </div>
            <div className="w-full h-2/5 flex flex-col justify-center items-center">
              <span className="flex flex-row justify-center items-center w-full">
                <p className="w-full text-center text-base">
                  {e.chance_of_rain}%
                </p>
                <p className="w-full text-center text-base border-l">
                  {e.wind_kph}Kph
                </p>
              </span>{
                props.nowPoint == i ? <h2 className="text-2xl">Now</h2>:<h2 className="text-2xl">{i < 10 ? `0${i}` : i}:00</h2>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Slider;
