function OtherStats(props) {
  const cl1 =
    "relative grid grid-row-3 grid-cols-1 place-items-center h-[15rem] min-w-64 rounded-xl gap-4 wiggle";
  const cl2 =
    "relative grid grid-row-3 grid-cols-1 place-items-center h-[15rem] min-w-64 rounded-xl gap-4";
  return (
    <div className={props.wiggle == true ? cl1 : cl2}>
      <div className="grid grid-row-2 grid-cols-3 w-full h-full place-items-center glass rounded-xl ">
        <h1 className="text-xl col-span-2">Precipitation :</h1>
        <p>{props.data.pressure_in + " in"}</p>
        <h1 className="text-xl col-span-2">Dew Point :</h1>
        <p>{props.data.dewpoint_c + "° C"}</p>
      </div>
      <div className="grid place-items-center grid-row-1 grid-cols-3 glass w-full h-full rounded-xl">
        <h1 className="text-xl col-span-2">Heat Index :</h1>
        <p>{props.data.heatindex_c + "° C"}</p>
      </div>
    </div>
  );
}
export default OtherStats;
