function AirQuality(props) {
  //   const PropData = {
  //     co: 331.15,
  //     no2: 12.765,
  //     o3: 81.0,
  //     so2: 3.145,
  //     pm2_5: 11.285,
  //     pm10: 15.355,
  //     "us-epa-index": 1,
  //     "gb-defra-index": 1,
  //   };
  const Data = Object.entries(props.data);
  const airData = [
    ["C0", Data[0][1]],
    ["NO₂", Data[1][1]],
    ["O₃", Data[2][1]],
    ["SO₂", Data[3][1]],
    ["PM2.5", Data[4][1]],
    ["PM10", Data[5][1]],
    ["US AQI", Data[6][1]],
    ["UK AQI", Data[7][1]],
  ];
  return (
    <div className="relative flex flex-col justify-center items-center h-full min-w-64 rounded-xl glass py-3">
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
