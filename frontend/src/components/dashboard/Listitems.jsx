import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { IoHomeOutline } from "react-icons/io5";

import Home from "../../assets/menu-icons/home.svg";
import Bolt from "../../assets/menu-icons/bolt.svg";
import MapR from "../../assets/menu-icons/map.svg";
import Settings from "../../assets/menu-icons/settings.svg";

const menuData = [
  {
    icon: Home,
    text: "Home",
  },
  {
    icon: Bolt,
    text: "Activity",
  },
  {
    icon: MapR,
    text: "Discover",
  },
  {
    icon: Settings,
    text: "Settings",
  },
];

export const mainListItems = (
  <div className="flex items-center flex-col">
    {menuData.map((_, i) => {
      return (
        <li
          className="inline-flex gap-3 text-[1.05rem] justify-between items-center w-full max-w-[200px] my-6"
          key={_.text}
        >
          <span className="w-[20px]">
            <img src={_.icon} alt="" />
          </span>
          <span
            className={`flex-auto  ${
              i == 1 ? "text-[#3579DC]" : "text-[#A9ADB1]"
            }`}
          >
            {_.text}
          </span>
        </li>
      );
    })}
  </div>
);
