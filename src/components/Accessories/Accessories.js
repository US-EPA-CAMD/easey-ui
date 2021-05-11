import React from "react";
import {
  BsFillGearFill,
  BsFillPersonFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosHelpCircle } from "react-icons/io";
const Accessories = () => {
  return (
    <div className="accessoriesLinks">
      <div className="accessoryLink">
        <BsFillGrid3X3GapFill style={{ fill: "white" }} />
        <Link
          to="./apps"
          rel=" CAMD Apps"
          title="Go to the  CAMD Apps page"
          className="text-white"
        >
          CAMD Apps
        </Link>
      </div>
      <div className="accessoryLink">
        <BsFillPersonFill style={{ fill: "white" }} />
        <Link
          to="./profile"
          rel="Profile"
          title="Go to the Profile page"
          className="text-white"
        >
          Profile
        </Link>
      </div>
      <div className="text-white">
        <BsFillGearFill style={{ fill: "white" }} />
        <Link
          className="text-white"
          to="./account_manage"
          rel=" Account Management"
          title="Go to the Account Management page"
        >
          Account Management
        </Link>
      </div>
      <div className="accessoryLink">
        <IoIosHelpCircle style={{ fill: "white" }} />
        <Link
          to="./help"
          rel="help"
          title="Go to the help page"
          className="text-white"
        >
          {"Help & Contact"}
        </Link>
      </div>
    </div>
  );
};

export default Accessories;
