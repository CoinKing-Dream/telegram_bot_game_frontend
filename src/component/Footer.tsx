import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clickSound from "../assets/sound/pong.wav";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div
      className="grid grid-cols-2 gap-10 justify-center items-center z-100"
    >
      <Link
        to="/ranking"
        onClick={() => {
            const audio = new Audio(clickSound);
            audio.play();
          }          
        }
        className={`hover:scale-y-[120%] flex transition duration-0 hover:duration-150 flex-col items-center justify-center cursor-pointer transform origin-bottom transition  hover:brightness-150 hover:drop-shadow-lg ${
          path === "/ranking"
            ? "-translate-y-2 scale-y-[125%] max-sm:scale-y-[110%] opacity-100"
            : "opacity-50 text-white"
        }`}
      >
        <img src="/image/ranking.png" alt="ranking" className="w-12 h-12 max-sm:w-8 max-sm:h-8" />
        <p className="text-sm max-sm:text-sm text-white">RANKING</p>
      </Link>
      <Link
        to=""
        onClick={() => {
          const audio = new Audio(clickSound);
          audio.play();
          }          
        }
        className={`  hover:scale-y-[120%] flex transition duration-0 hover:duration-150 flex-col items-center justify-center cursor-pointer transform origin-bottom transition hover:brightness-150 hover:drop-shadow-lg"> ${
          path === "/" ? "-translate-y-2 scale-y-[125%] max-sm:scale-y-[110%] opacity-100" : "opacity-50 text-white"
        }`}
      >
        <img src="/image/mining.png" alt="play" className="w-12 h-12 max-sm:w-8 max-sm:h-8" />
        <p className="text-sm max-sm:text-sm text-white">MINT</p>
      </Link>
      
    </div>
  );
}
