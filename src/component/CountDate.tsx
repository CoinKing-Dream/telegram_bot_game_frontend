export default function CountDate({
  level,
}: {
  level: number
}) {
  return (
    <div className="CountDate flex justify-center gap-8 max-sm:gap-4 items-center w-full mt-4 max-sm:mt-2">
      <div className={`flex flex-col item-center justify-center ${level == 0 ? "scale-[120%] max-sm:scale-[110%]" : ""} ${level >= 0 ? "opacity-100" : "opacity-40"}`}>
        <img src="image/fire1.png" alt="" className="w-[25px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[19px]"/>
        <p className="text-md text-white">M</p>   
      </div>
      <div className={`flex flex-col item-center justify-center ${level == 1 ? "scale-[120%] max-sm:scale-[110%]" : ""} ${level >= 1 ? "opacity-100" : "opacity-40"}`}>
      <img src="image/fire2.png" alt="" className="w-[25px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[19px]"/>
        <p className="text-md text-white">T</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${level == 2 ? "scale-[120%] max-sm:scale-[110%]" : ""} ${level >= 2 ? "opacity-100" : "opacity-40"}`}>
      <img src="image/fire3.png" alt="" className="w-[25px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[19px]"/>
        <p className="text-md text-white">W</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${level == 3 ? "scale-[120%] max-sm:scale-[110%]" : ""} ${level >= 3 ? "opacity-100" : "opacity-40"}`}>
      <img src="image/fire4.png" alt="" className="w-[25px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[19px]"/>
        <p className="text-md text-white">T</p>
      </div>
      <div className={`flex flex-col item-center justify-center ${level == 4 ? "scale-[120%] max-sm:scale-[110%]" : ""} ${level >= 4 ? "opacity-100" : "opacity-40"}`}>
      <img src="image/fire5.png" alt="" className="w-[25px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[19px]"/>
        <p className="text-md text-white">F</p>
      </div>
      {/* <div className={`flex flex-col item-center justify-center ${level > 4 ? "opacity-100" : "opacity-50"}`}>
        {level <= 4 ? (
          <img src="/image/icon/lock.svg" alt="lock" className="w-6 h-6 mt-1" />
        ) : (
          <img
            src="/image/icon/unlock.svg"
            alt="unlock"
            className="w-6 h-6 mt-1"
          />
        )}

        <p className="text-md text-white">2X</p>
      </div> */}
    </div>
  );
}
