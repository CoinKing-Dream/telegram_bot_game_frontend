import { useState } from "react";
import RankingList from "../component/RankingList";

export default function Ranking() {
  const [selectedOption, setSelectedOption] = useState<string>("Recently");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="Ranking max-w-full mx-auto text-white h-[75vh] max-sm:h-[85vh] max-sm:mt-2 mt-10">
      <div className="flex">
        <h1 className="text-4xl text-bold max-sm:text-2xl mb-3 max-sm:mb-1 max-w-[500px] mx-auto text-start text-white flex justify-center font-bold">Ranking</h1>
        <div className="h-10 w-32 text-center flex">
          <img
            src="/image/ranking_select.png"
            alt="ranking_select"
            className={`w-8 h-8 inline`}
          />
          <select  
                value={selectedOption} 
                onChange={handleChange}
                className="mt-2 p-2 border rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
            <option value="recently" selected>Recently</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>
      <RankingList selectedOption={selectedOption}/>
    </div>
  )
}
