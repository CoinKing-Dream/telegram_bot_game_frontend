import { useState } from "react";
import RankingList from "../component/RankingList";
// import { Menu, MenuHandler,MenuList,MenuItem, Avatar} from "@material-tailwind/react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";

const options = [
  'Recently',
  'Weekly',
  'Monthly'
];

const ITEM_HEIGHT = 48;

export default function Ranking() {
  const [selectedOption, setSelectedOption] = useState<string>("Recently");//
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    const menuItemValue = (event.target as HTMLElement).getAttribute("value") || "Recently";
    setSelectedOption(menuItemValue);
  };
  
  return (
    <div className="Ranking max-w-full mx-auto text-white h-[75vh] max-sm:mt-3 mt-6">
      <div className="flex justify-center items-center">
        <h1 className="z-1 text-4xl text-bold max-sm:text-2xl mb-[2vh] max-w-[500px] mx-auto text-start text-white flex justify-center font-bold">🚀 Ranking</h1>
        <div className="w-12 max-sm:w-10 text-center  flex justify-center items-center z-10">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="white"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option} selected={option === 'Recently'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <RankingList selectedOption={selectedOption}/>
    </div>
  )
}
