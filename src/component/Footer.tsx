import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clickSound from "../assets/sound/button.wav";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div
      className="absolute bottom-[2vh] left-1/2 transform -translate-x-1/2 grid grid-cols-2 gap-[20vw] justify-center items-center"
    >
      <Link
        to="/ranking"
        onClick={() => {
            const audio = new Audio(clickSound);
            audio.play();
          }          
        }
        className={`hover:scale-[120%] flex transition duration-0 hover:duration-150 flex-col items-center justify-center cursor-pointer transform origin-bottom transition  hover:brightness-150 hover:drop-shadow-lg ${
          path === "/ranking"
            ? "-translate-y-2 scale-[125%] opacity-100"
            : "opacity-50 text-white"
        }`}
      >
        <img src="/image/ranking.png" alt="ranking" className="w-[8vh] h-[8vh]" />
        <p className="text-sm max-sm:text-sm text-white">RANKING</p>
      </Link>
      <Link
        to=""
        onClick={() => {
          const audio = new Audio(clickSound);
          audio.play();
          }          
        }
        className={`  hover:scale-[120%] flex transition duration-0 hover:duration-150 flex-col items-center justify-center cursor-pointer transform origin-bottom transition hover:brightness-150 hover:drop-shadow-lg"> ${
          path === "/" ? "-translate-y-2 scale-[125%] opacity-100" : "opacity-50 text-white"
        }`}
      >
        <img src="/image/mining.png" alt="play" className="w-[8vh] h-[8vh]" />
        <p className="text-sm max-sm:text-sm text-white">MINT</p>
      </Link>
      
    </div>
  );
}
