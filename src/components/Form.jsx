import searchIcon from "../assets/icons/search.png";
function Form() {
  return (
    <form
      className="flex flex-col justify-center h-full w-full gap-4 max-md:h-20 max-lg:pl-4 pl-12 "
      id="CurrentForm"
      // onSubmit={filterAddress}
    >
      <h1 className="text-5xl font-bold row-span-2 max-md:w-0 max-md:h-0 max-md:hidden max-full">
        Welcome to WeatherNow
      </h1>
      <p className="w-4/5 text-sm pl-4 max-md:w-0 max-md:h-0 max-md:hidden">
        Get Real-Time Updates, Anytime, Anywhere Global Forecasts, Local
        Precision Weather Alerts for you loaction Weather History
      </p>

      <div className="max-md:w-64 h-12 mt-2 pl-2 max-w-sm relative">
        <input
          type="text"
          className=" w-full h-full rounded-3xl pl-5 pr-10 text-base glass"
          placeholder="Search for loaction"
          id="cityinput"
        />
        <img
          src={searchIcon}
          className="h-8 absolute top-1 right-2 invert border-0"
          // onClick={filterAddress}
        />
      </div>
    </form>
  );
}
export default Form;
