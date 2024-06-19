import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {RootState} from "../store";
import { dispatch } from "../store";
import { getAllWallets } from "../store/reducers/wallet.tsx";

// import io from "socket.io-client";

export default function RankingList({selectedOption}: any) {
  
  const user = useSelector((state: RootState) => state.wallet.user);
  const [ranking, setRanking] = useState<Number>(1);
  const users = useSelector((state: RootState) => state.wallet.users);
  
  useEffect(() => {
    if (selectedOption == "Recently"){
      dispatch(getAllWallets());
      if (user.wallet_address){
        setRanking(users.findIndex((_user: any) => _user.wallet_address == user.wallet_address) + 1);
      }
    } else if (selectedOption == "Weekly") {

    } else {
      
    }
   
  }, [user, users]);
  // const [rankings, setRankings] = useState([]);

  // useEffect(() => {
  //   const socket = io('http://localhost:5000');
  //   socket.emit("helo", "world");
  //   console.log(socket.active);
  //   socket.on('ranking-update', (data) => {
  //     // setRankings(data.rankings);
  //     console.log("success");
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
    <div className="ms:w-full h-[55vh] mx-3">
        <div className="flex px-1 py-3 max-sm:py-1 text-white text-2xl max-sm:text-base font-bold justify-center align-middle overflow-y-hidden">
          <div className="text-start w-[10%] flex justify-center">Rank</div>
          <div className="text-start w-[75%] flex justify-center">User</div>
          <div className="text-start w-[15%] flex justify-center">RFP</div>
        </div>
      <div className="max-h-[52vh] max-sm:max-h-[65vh] overflow-auto">
        {users.map((data, index) => (
          
          <div
            key={index}
            className={`flex ${
              index > 0 && "my-2"
            } px-3 max-sm:px-1 items-center bg-[#363636] rounded-lg py-1`}
          >
            <div className="text-xl max-sm:text-base text-start w-[10%] text-white flex justify-center align-middle">
              {index == 0 ? (
                <img src="image/crown.png" alt="" className="w-[30px] h-[30px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[20px]"/>
              ) : index == 1 ? (
                <img src="image/trophy.png" alt="" className="w-[30px] h-[30px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[20px]"/>
              ) : index == 2 ? (
                <img src="image/star.png" alt=""  className="w-[30px] h-[30px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[19px] max-sm:h-[20px]"/>
              ) : (
                index + 1
              )}
            </div>
            <div className="relative h-10 max-md:h-9 max-sm:h-7 overflow-hidden w-[80%] flex items-center">
              <img src="/image/mikeT.png" alt="avatar" className="w-8 h-8 max-md:w-7 max-md:h-7 max-sm:h-5 max-sm:w-5 mx-3 max-sm:mx-1" />
              <p className="text-md max-sm:text-[10px] text-start text-white break-all">{data.wallet_address}</p>
            </div>

            <p className="text-xl text-bold text-white w-[10%] flex items-center justify-center ml-2 max-sm:text-base max-sm:ml-0">
              {formatNumberWithCommas(data.balance)}
            </p>
          </div>
        ))}
      </div>
      <hr className="border-[#363636] border-2 max-sm:border-1" />
      {
      user.wallet_address?
      <div
        className={`flex px-2 max-sm:px-1 my-4 items-center bg-[#5A4C3B] rounded-lg py-1`}
      >
        <div className="text-xl max-sm:text-base text-start w-[10%] text-white flex justify-center align-middle">
          {ranking.toString()}
        </div>
        <div className="relative h-10 max-md:h-9 max-sm:h-9 overflow-hidden w-[80%] flex items-center">
          <img src="/image/mikeT.png" alt="avatar" className="w-9 h-9 max-md:w-8 max-md:h-8 max-sm:h-6 max-sm:w-6 mx-3 max-sm:mx-1" />
          <p className="text-base font-bold max-sm:text-sm text-start text-white break-all">{user.wallet_address}</p>
        </div>

        <p className="text-2xl max-sm:text-base text-bold w-[10%] text-white flex items-center justify-center">
          {formatNumberWithCommas(user.balance)}
        </p>
      </div>
      :''
      }
    </div>
  );
}
