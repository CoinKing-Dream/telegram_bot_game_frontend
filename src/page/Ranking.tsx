import { useState } from "react";
import RankingList from "../component/RankingList";
// import { Menu, MenuHandler,MenuList,MenuItem, Avatar} from "@material-tailwind/react";


export default function Ranking() {
  const [selectedOption] = useState<string>("Recently");//setSelectedOption
  console.log(selectedOption);
  

  return (
    <div className="Ranking max-w-full mx-auto text-white h-[75vh] max-sm:h-[85vh] max-sm:mt-1 mt-6">
      <div className="flex justify-center items-center">
        <h1 className="z-1 text-4xl text-bold max-sm:text-2xl mb-3 max-sm:mb-1 max-w-[500px] mx-auto text-start text-white flex justify-center font-bold">Ranking</h1>
        <div className="w-12 max-sm:w-10 text-center  flex justify-center items-center z-10">
          {/* <Menu className={"rounded-lg shadow-lg overflow-hidden"}>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt="ranking"
                className="h-10 w-10 max-sm:h-7 max-sm:w-7 opacity-90 cursor-pointer w-8 h-8 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                src="/image/ranking_select.png"

              />
            </MenuHandler>
            <MenuList className="divide-y divide-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <MenuItem className="flex items-center gap-2 bg-white text-black font-bold border-b border-gray-200 p-2 hover:bg-gray-50" onClick={() => setSelectedOption("Recently")}>
                Recently
              </MenuItem>
              <MenuItem className="flex items-center gap-2 bg-white text-black font-bold border-b border-gray-200 p-2 hover:bg-gray-50" onClick={() => setSelectedOption("Weekly")}>
                Weekly
              </MenuItem>
              <MenuItem className="flex items-center gap-2 bg-white text-black font-bold p-2 hover:bg-gray-50" onClick={() => setSelectedOption("Monthly")}>
                Monthly
              </MenuItem>
            </MenuList>
         </Menu> */}
        </div>
      </div>
      <RankingList selectedOption={selectedOption}/>
    </div>
  )
}
