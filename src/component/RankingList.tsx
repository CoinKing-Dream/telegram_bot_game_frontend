import { useEffect } from "react";
import { useSelector } from "react-redux";
import {RootState} from "../store";
import { dispatch } from "../store";
import { getAllWallets } from "../store/reducers/wallet.tsx";
// import io from "socket.io-client";

export default function RankingList() {
  
  const user = useSelector((state: RootState) => state.wallet.user);
  const users = useSelector((state: RootState) => state.wallet.users);
  
  useEffect(() => {
    dispatch(getAllWallets(user));
    console.log("users", users);
    
  }, []);

  // const [rankings, setRankings] = useState([]);

  // useEffect(() => {
  //   const socket = io('http://localhost:5000');
  //   socket.on('ranking-update', (data) => {
  //     // setRankings(data.rankings);
  //     console.log("success");
      
      
  // });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number) ;
  }
  return (
    <div className="md:w-full h-[50vh] mx-auto ">
      <div className="max-h-[60vh] max-sm:max-h-[65vh] overflow-auto">
        <div className="flex px-3 py-1 text-white text-lg max-sm:text-base font-bold justify-center align-middle overflow-y-hidden">
          <div className="text-start w-[20%] flex justify-center">Rank</div>
          <div className="text-start w-[60%] flex justify-center">User</div>
          <div className="text-start w-[20%] flex justify-center">RFP</div>
        </div>
        {users.map((data, index) => (
          
          <div
            key={index}
            className={`flex ${
              index > 0 && "my-2"
            } px-3 items-center bg-[#363636] rounded-lg`}
          >
            <div className="text-xl max-sm:text-base text-start ml-3 pl-2 max-sm:ml-2 max-sm:ml-1 w-[20%] text-white flex justify-center align-middle">
              {index == 0 ? (
                <img src="image/crown.png" alt="" className="w-[30px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[15px] max-sm:h-[15px]"/>
              ) : index == 1 ? (
                <img src="image/trophy.png" alt="" className="w-[30px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[15px] max-sm:h-[15px]"/>
              ) : index == 2 ? (
                <img src="image/star.png" alt=""  className="w-[30px] h-[25px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[15px] max-sm:h-[15px]"/>
              ) : (
                index + 1
              )}
            </div>
            <div className="relative h-10 max-md:h-9 max-sm:h-7 overflow-hidden w-[60%] flex ml-10 pl-12 items-center  max-sm:pl-1 max-sm:ml-2">
              <img src="/image/mikeT.png" alt="avatar" className="w-10 h-10 max-md:w-9 max-md:h-9 max-sm:h-7 max-sm:w-7 mx-3 max-sm:mx-1" />
              <p className="text-xl max-sm:text-base text-start pl-2 text-white">{data.wallet_address}</p>
            </div>

            <p className="text-2xl max-sm:text-xl text-start ml-12 pl-12 w-[30%] text-white max-sm:pl-4 max-sm:ml-2 ">
              {formatNumberWithCommas(data.balance)}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-1 border-[#363636] border-2" />
      <div
        className={`flex pl-12 my-3 px-3 max-sm:pl-6 items-center bg-[#5A4C3B] rounded-lg`}
      >
        <div className="text-xl max-sm:text-base text-start pl-6 w-[20%] text-white">
          {user.ranking}
        </div>
        <div className="relative h-11 max-md:h-10 max-sm:h-8 pl-11 ml-4 overflow-hidden w-[60%] flex items-center  max-sm:pl-1 max-sm:ml-1">
          <img src="/image/mikeT.png" alt="avatar" className="w-11 h-11 max-md:w-10 max-md:h-10 max-sm:h-8 max-sm:w-8 mx-3 max-sm:mx-3" />
          <p className="text-xl max-sm:text-base text-start pl-2 text-white">{user.wallet_address}</p>
        </div>

        <p className="text-xl max-sm:text-base text-start ml-12 pl-12 w-[30%] text-white max-sm:pl-1">
          {formatNumberWithCommas(user.balance)}
        </p>
      </div>
    </div>
  );
}
