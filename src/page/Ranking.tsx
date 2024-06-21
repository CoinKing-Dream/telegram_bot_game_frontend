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

        {/* <div className="relative group">
          <button className="rounded-lg shadow-lg overflow-hidden flex justify-center items-center w-full px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <img src="/image/ranking_select.png" alt="ranking" className="h-10 w-10 max-sm:h-7 max-sm:w-7 opacity-90 cursor-pointer w-8 h-8 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
          </button>
          <ul className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <li>
              <button className={`block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedOption === 'Recently'? 'bg-gray-100 text-gray-900' : ''}`} onClick={() => setSelectedOption('Recently')}>
                Recently
              </button>
            </li>
            <li>
              <button className={`block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedOption === 'Weekly'? 'bg-gray-100 text-gray-900' : ''}`} onClick={() => setSelectedOption('Weekly')}>
                Weekly
              </button>
            </li>
            <li>
              <button className={`block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedOption === 'Monthly'? 'bg-gray-100 text-gray-900' : ''}`} onClick={() => setSelectedOption('Monthly')}>
                Monthly
              </button>
            </li>
          </ul>
        </div> */}

        </div>
      </div>
      <RankingList selectedOption={"Recently"}/>
    </div>
  )
}
