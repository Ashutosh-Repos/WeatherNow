function AirQuality(props) {
  const Data = Object.entries(props.data);
  const airData = [
    ["C0", Data[0][1] + " μg/m³"],
    ["NO₂", Data[1][1] + " μg/m³"],
    ["O₃", Data[2][1] + " μg/m³"],
    ["SO₂", Data[3][1] + " μg/m³"],
    ["PM2.5", Data[4][1] + " μg/m³"],
    ["PM10", Data[5][1] + " μg/m³"],
    ["US AQI", Data[6][1]],
    ["UK AQI", Data[7][1]],
  ];
  const cl1 =
    "relative flex flex-col justify-center items-center h-full min-w-64 rounded-xl glass py-3 wiggle";
  const cl2 =
    "relative flex flex-col justify-center items-center h-full min-w-64 rounded-xl glass py-3";
  return (
    <div className={props.wiggle == true ? cl1 : cl2}>
      <h1 className="text-xl">Air Pollution</h1>
      <div className="grid grid-row-4 grid-cols-2 place-items-center h-full w-full">
        {airData.map((e, i) => (
          <div key={i}>
            <h1 className="text-lg text-center">{e[0]}</h1>
            <p className="text-xs text-center">{e[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AirQuality;
