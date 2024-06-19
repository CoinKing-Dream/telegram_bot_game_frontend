import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDate from "../component/CountDate";
import ProgressBar from "../component/ProgressBar";
import { dispatch } from "../store";
import { insertWallet, updateUserInfo, getCurrentTime, updateUserInforDB } from "../store/reducers/wallet";
import { TonConnectButton, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
import variable_Comp from "../types/variable";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import coinSound from "../assets/sound/coin_hit.wav";
import errorSond from "../assets/sound/error.wav"

// import { walletProfile } from "../types/wallet";
// import axios from "../utils/api";

function Home() {
  const [tempTab, setTempTab] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [randomTab, setRandomTab] = useState<number>(Math.floor(Math.random() * 10) + 1)
  const [score, setScore] = useState<number>(variable_Comp.Earnings_Per_Tap);

  const userAddress = useSelector((state: RootState) => state.wallet.user);
  const currentDate = useSelector((state: RootState) => state.wallet.currentDate);
  const userAddressRef = useRef(userAddress);
  const bodyRef = useRef<HTMLDivElement>(null);

  const address = useTonAddress();
  //  address = "UQCaAcIsJkFnCME9Au9PWIo1OBnnzaJREbm-YJDt3Zx9c0Z#";
  const wallet = useTonWallet();
  console.log("--------->", wallet?.device, address);
  // console.log("start" + `${JSON.stringify(userAddress)}`);
  useEffect(() => {
    if (address != null && userAddress.wallet_address != address ){
      dispatch(insertWallet(address));
    } 
  }, [address]);

  
  useEffect(() => {

    switch (level) {
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
   
  }, [level])

  useEffect(() => {
    userAddressRef.current = userAddress;
  }, [userAddress]);
 
  useEffect(() => {
    const intervalID = setInterval(() => {
      const currentUserAddress = userAddressRef.current;
      const tempUser = {
            wallet_address: currentUserAddress.wallet_address,
            balance: currentUserAddress.balance,
            weekBalance: currentUserAddress.weekBalance,
            monthBalance: currentUserAddress.monthBalance,
            energy: currentUserAddress.energy,
            recoveryDate: currentUserAddress.recoveryDate,
            createdDate: currentUserAddress.createdDate
      }
      dispatch(getCurrentTime(tempUser));
      
      if (!currentUserAddress.energy) {
        if (currentUserAddress.recoveryDate != '') {
          let date_1 = new Date(Date.parse(currentUserAddress.createdDate));
          let date_2 = new Date(Date.parse(currentUserAddress.recoveryDate));
          let diff = date_1.getTime() - date_2.getTime();
          
          if (diff > 1000 * 60 * 60 * 24)
            dispatch(updateUserInfo(Object.assign({}, tempUser, {energy: 500, recoveryDate: ''})));
        } else {
          dispatch(updateUserInfo(Object.assign({}, tempUser, {recoveryDate: currentDate})));
        }
      }

      // Update level of current user
      if (currentUserAddress) {
        let date_1 = new Date(Date.parse(currentUserAddress.createdDate));

        const ageDifference = Math.floor(Math.abs(date_1.getTime() - new Date(Date.parse(currentDate)).getTime()) / 1000 );

        const secondInday = 60 * 60 * 24;

        if (ageDifference < 1 * secondInday) {
          setLevel(0);
        } else if (ageDifference >= 1 * secondInday && ageDifference < 2 * secondInday ) {
          setLevel(1);
        } else if (ageDifference >= 2 * secondInday  && ageDifference < 3 * secondInday ) {
          setLevel(2);
        } else if (ageDifference >= 3 * secondInday  && ageDifference < 4 * secondInday ) {
          setLevel(3);
        } else if (ageDifference >= 4 * secondInday ) {
          setLevel(4);
        }
      }

      // Update weekly and monthly balance of current user.
      if (currentUserAddress) {
        // const now = new Date(Date.parse(currentDate));
        
        // dispatch(updateUserInfo(Object.assign({}, tempUser, {weekBalance: 0})));

        // dispatch(updateUserInfo(Object.assign({}, tempUser, {monthBalance: 0})));
      }

    }, 800);
  
    return () => clearInterval(intervalID);
  }, []); 

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
    newDiv.textContent = `+1`;
    newDiv.style.backgroundImage = "url('image/dollar.svg')";
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
    newDiv.style.color = "yellow"; //score == variable_Comp.Earnings_Per_Tap ? "yellow" : "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!userAddress.wallet_address) {
     toast.error("Please connect your wallet first");
     const audio = new Audio(errorSond);
     audio.play();
     return;
    }

    if (userAddress.energy < 1) {
      toast.info("Please try after 24hr.", {autoClose: 1000});
      return
    };
   
    switch (level) {
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

    const updateUser = {
      wallet_address: userAddress.wallet_address, 
      balance: userAddress.balance + score, 
      weekBalance: userAddress.weekBalance + score, 
      monthBalance: userAddress.monthBalance + score, 
      energy: userAddress.energy - 1, 
      recoveryDate: userAddress.recoveryDate, 
      createdDate: userAddress.createdDate,
    }
    
    dispatch(updateUserInfo(updateUser));

    setTimeout(() => {
      dispatch(updateUserInforDB(updateUser));
      console.log("200ms", updateUser);
    }, 100);

    const audio = new Audio(coinSound);
    audio.play();

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
    <div className="bg-blend-exclusion mt-10 max-md:mt-5 max-sm:mt-2">
      <ToastContainer />
      <div className="my-3 max-md:my-2 max-sm:mt-1 w-full flex justify-center">
        <TonConnectButton />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <CountDate level={level} />
      </div>
      <div
        id="mainWindow"
        className={`relative flex flex-col items-center justify-center h-[60vh] max-md:h-[65vh] max-sm:h-[65vh] mb-9 max-md:mb-7 max-sm:mb-4`}
      >
       
        <div className="flex flex-col justify-center items-center mb-2">
          <h3 className="text-2xl font-bold text-[yellow] max-sm:text-xl">Force Points</h3>
          <h1 className="text-3xl text-white max-md:text-4xl max-sm:text-2xl">
            {formatNumberWithCommas(userAddress.balance)}
          </h1>
        </div>
        <div>
          <img
            src="/image/shape.png"
            alt=""
            className="absolute z-1 fixed left-0 h-[30vh] w-[100vw] "
          />
          <img
            src="/image/shape.png"
            alt=""
            className="absolute z-3 fixed top-0 left-0 h-[40vh] w-[100vw] "
          />
          <div id="rippleButton"
            className={`relative bg-[url('/image/main.png')] bg-yellow-500 hover:bg-yellow-600 animate-wave-animation rounded-full bg-cover z-50 w-[40vh] h-[40vh] max-width-[85vw] ${
              userAddress.energy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? "scale-[95%] border-[10px]" : "border-0"}`}
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
                className={`w-8 h-8 inline ${imgStatus? "scale-[115%]":"scale-[100%]"}`}
              />
            </span>
            <span className={`text-3xl ${(userAddress.energy>10)?"text-white text-bold":"text-[#FF0000] text-bold"} red max-sm:text-2xl`}>{userAddress.energy}</span> {`/${variable_Comp.Daily_Tap_Limit}`}
          </h3>
          
        </div>
        <ProgressBar value={userAddress.energy / 5} />
      </div>
    </div>
  );
}

export default Home;
