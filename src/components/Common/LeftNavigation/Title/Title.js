import React from "react";
import './Title.css'
import { RiDashboardFill } from "react-icons/ri";
const Title = () => {
  return (
    <div className="navTitle">
      <RiDashboardFill size={32} style={{ fill: "white" }} />
      <h4> EASEY-In Dashboard</h4>
    </div>
  );
};

export default Title;
