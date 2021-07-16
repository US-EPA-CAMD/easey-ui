import React from "react";
import "./Home.scss";

export const Home = () => {
  return (
    <div className="home-container react-transition fade-in">
      <div className="text-center text-bold text-primary-dark minh-tablet-lg font-heading-xl padding-top-9">
        <h1>UNDER CONSTRUCTION</h1>
        <p>This will eventually be the home of the EASEY Baby/EASEY Suite for the Clear Air Markets Division (CAMD) of the EPA</p>
        <div className="padding-9">
          <img
            title="Home Screen Coming Soon"
            alt="Home Screen Coming Soon"
            src={`${process.env.PUBLIC_URL}/images/icons/maintenance.gif`}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
