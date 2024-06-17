import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDate from "../component/CountDate";
import ProgressBar from "../component/ProgressBar";
import { dispatch } from "../store";
import { insertWallet, updateUserInfo, updateOnlyUserStore, getCurrentTime } from "../store/reducers/wallet";
import { TonConnectButton, /*useTonWallet, useTonAddress*/ } from "@tonconnect/ui-react";
import variable_Comp from "../types/variable";
import { useSelector } from "react-redux";
import { RootState } from "../store";
// import { walletProfile } from "../types/wallet";
// import axios from "../utils/api";

function Home() {
  
  const [tempTab, setTempTab] = useState<number>(0);
  const [randomTab, setRandomTab] = useState<number>(Math.floor(Math.random() * 10) + 1)
  const userAddress = useSelector((state: RootState) => state.wallet.user);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<number>(variable_Comp.Earnings_Per_Tap);

  // const address = useTonAddress();
  const address = "45436434"
  // const wallet = useTonWallet();
  // console.log("--------->", wallet?.device, address);
  // dispatch(insertWallet(address));   
  // console.log("start" + `${JSON.stringify(userAddress)}`);
  if (address != null && userAddress.wallet_address != address){
    dispatch(insertWallet(address));
  }

  
  useEffect(() => {

    switch (userAddress.level) {
      case 0:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_1);
        break;
      case 1:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_2);
        break;
      case 2:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_3);
        break;
      case 3:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_4);
        break;
      case 4:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_5);
        break;
    }
   
  }, [])
 
  useEffect(() => {
    const intervalID = setInterval(() => {
      if (userAddress && userAddress.wallet_address) {
        dispatch(updateUserInfo(userAddress.wallet_address, userAddress.balance, userAddress.energy));
      }

      if (userAddress.energy) {
         dispatch((getCurrentTime(userAddress)));
  
          let date_1 = new Date(Date.parse(userAddress.createdDate));
          let date_2 = new Date(Date.parse(userAddress.recoveryEnergyTime));
          let diff = Math.abs(date_1.getTime() - date_2.getTime()) ;
          
          if (diff && diff > 1000 * 60 * 60 * 24)
            dispatch(updateUserInfo(userAddress.wallet_address, userAddress.balance, 500));
  
      }

      console.log(userAddress);
      
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalID);
  }, [userAddress]); // Dependency array includes userAddress to rerun the effect if it changes

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
 
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `+${score}`;
    newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "35px";
    newDiv.style.paddingLeft = "35px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = score == variable_Comp.Earnings_Per_Tap ? "yellow" : "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (!address) {
  //    toast.error("Please connect your wallet first");
  //    return;
  //  }
  if (userAddress.energy < 1) return;
   
    switch (userAddress.level) {
      case 0:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_1);
        break;
      case 1:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_2);
        break;
      case 2:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_3);
        break;
      case 3:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_4);
        break;
      case 4:
        setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_5);
        break;
    }
      
    setTempTab(tempTab + 1);

    if (randomTab == tempTab){
      setScore(variable_Comp.Earnings_Per_Tap + variable_Comp.StreaksRFP_5);
    } 

    if (tempTab == 10) {
      setRandomTab(Math.floor(Math.random() * 10) + 1);
      setTempTab(0);
    }
    
    dispatch(updateOnlyUserStore({
            ranking: 1, 
            wallet_address: userAddress.wallet_address, 
            balance: userAddress.balance + score, 
            energy: userAddress.energy - 1, 
            level: userAddress.level,
            recoveryEnergyTime: userAddress.recoveryEnergyTime, 
            createdDate: userAddress.createdDate,
      }));

    handleClick(event);
  };


  const [imgStatus, setImgStatus] = useState(false);
  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  // console.log("imgStatus", imgStatus);

  // const updateStatus = () => {
  //   // const nowDate = new Date().toISOString("YYYY-MM-DD")
  //   console.log(new Date().getDate());
    
  // }

  return (
    <div className="mt-8 mb-5 max-sm:mt-3">
      <ToastContainer />
      <div className="w-full flex justify-center">
        <TonConnectButton />
      </div>
      <div className={`relative flex flex-col items-center justify-center `}>

      <CountDate level={userAddress.level} />
      </div>
      <div
        id="mainWindow"
        className={`relative mt-5 flex flex-col items-center justify-center h-[60vh] mb-9 `}
      >
       
        <div className="flex flex-col justify-center items-center mb-2">
          <h3 className="text-3xl font-bold text-[#939392] max-md:text-2xl max-sm:text-xl">Rune Force Point</h3>
          <h1 className="text-5xl text-white max-md:text-2xl max-sm:text-3xl">
            {formatNumberWithCommas(userAddress.balance)}
          </h1>
        </div>
        <div>
          <img
            src="/image/shape.png"
            alt=""
            className="absolute z-10 left-0 h-[95%] w-[95%]"
          />
          <div
            className={` relative bg-[url('/image/main.png')] rounded-full bg-cover z-50 w-[400px] h-[400px] max-md:w-[300px] max-md:h-[300px] max-sm:w-[250px] max-sm:h-[250px] max-xm:w-[200px] max-xm:h-[200px] z-10 ${
              userAddress.energy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <h3 className="text-2xl mb-2 text-white max-sm:text-xl max-sm:mb-1">
            <span className="text-3xl max-sm:text-2xl">
              <img
                src="/image/icon/lightning.svg"
                alt="lightning"
                className="w-8 h-8 inline"
              />
            </span>
            <span className="text-3xl text-white max-sm:text-2xl">{userAddress.energy}</span> {`/${variable_Comp.Daily_Tap_Limit}`}
          </h3>
          
        </div>
        <ProgressBar value={userAddress.energy / 5} />
      </div>
    </div>
  );
}

export default Home;
