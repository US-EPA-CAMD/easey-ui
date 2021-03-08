import React from "react";
import "./Accessories.css";
import { Link } from "@trussworks/react-uswds";
import { CgMenuGridR} from 'react-icons/cg';
import { BsGear,BsPerson} from 'react-icons/bs';
import { VscQuestion} from 'react-icons/vsc';

// import { IoPersonOutline } from 'react-icons/io';
const Accessories = () => {
  return (
    <div className="accessoriesLinks">
      <div className="accessoryLink">
        {" "}
        <CgMenuGridR  style={{ fill: "white" }}/>
        <Link href="apps"  key={1}>
          CAMD Apps
        </Link>
      </div>
      <div className="accessoryLink">
        <BsPerson  style={{ fill: "white" }}/>
        <Link href="profile"  key={1}>
          Profile
        </Link>
      </div>
      <div className="accessoryLink">
          <BsGear  style={{ fill: "white" }}/>
        <Link href="account_manage" key={1}>
          Account Management
        </Link>
      </div>
      <div className="accessoryLink">
          <VscQuestion  style={{ fill: "white" }}/>
        <Link href="help"  key={1}>
          {"Help & Contact"}
        </Link>
      </div>
    </div>
  );
};

export default Accessories;
