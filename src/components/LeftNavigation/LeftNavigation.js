import React, { useEffect, useState } from "react";
import Accessories from "../Accessories/Accessories";
import Workspace from "../Workspace/Workspace";
import { Button, SideNav } from "@trussworks/react-uswds";
import Modal from "../Modal/Modal";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";
import "./LeftNavigation.css";
const cdxUser = sessionStorage.getItem("cdx_user")
  ? JSON.parse(sessionStorage.getItem("cdx_user"))
  : false;
const firstName = cdxUser && cdxUser.firstName ? cdxUser.firstName : false;

const LeftNavigation = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const checkLoggedIn = () => {
    if (cdxUser && firstName) {
      setUserLoggedIn(true);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("cdx_user");
    window.location = "/login";
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);
  const openModal = (value) => {
    setShow(value);
  };

  const items = [
    <NavLink
      className="text-no-underline text-white"
      activeClassName=" usa-current"
      to="/"
      exact={true}
      rel="Home"
      title="Go to the home page"
    >
      Home
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      to="/monitoring-plans"
      strict
      exact={true}
      rel="Monitoring Plans"
      activeClassName=" usa-current"
      title="Go to the Monitoring Plans page"
    >
      Monitoring Plans
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      to="/qa_certifications"
      strict
      exact={true}
      activeClassName=" usa-current"
      rel={"QA & Certifications"}
      title={"Go to the QA & Certifications page"}
    >
      {" QA & Certifications"}
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      activeClassName=" usa-current"
      strict
      exact={true}
      to="/emissions"
      rel="Emissions"
      title="Go to the Emissions page"
    >
      Emissions
    </NavLink>,
    <NavLink
      className="text-no-underline text-white"
      activeClassName=" usa-current"
      to="/workspace"
      rel="workspace"
      title="Go to the workspace page"
    >
      Workspace
    </NavLink>,
    [
      <SideNav
        items={[
          <NavLink
            className="text-no-underline text-white"
            to="/workspace/monitoring-plans"
            rel="Monitoring Plans"
            activeClassName=" usa-current"
            title="Go to the Monitoring Plans page"
          >
            Monitoring Plans
          </NavLink>,
          <NavLink
            className="text-no-underline text-white usa-current"
            to="/workspace/qa_certifications"
            activeClassName=" usa-current"
            rel={"QA & Certifications"}
            title={"Go to the QA & Certifications page"}
          >
            {" QA & Certifications"}
          </NavLink>,
          <NavLink
            className="text-no-underline text-white"
            activeClassName=" usa-current"

            to="/workspace/emissions"
            rel="Emissions"
            title="Go to the Emissions page"
          >
            Emissions
          </NavLink>,
        ]}
        isSubnav
      />,
    ],
  ];
  return (
    <div className="bg-base width-full height-full font-body-sm padding-3">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`}></div>
      <SideNav items={items} />

      {/* {userLoggedIn ? <Workspace /> : ""} */}
      <div className="padding-bottom-4 position-absolute bottom-0">
        {!cdxUser ? (
          <Button onClick={() => openModal(true)}> Log In</Button>
        ) : (
          ""
        )}

        <Accessories />
      </div>
      {show ? (
        <Modal show={show} close={closeModalHandler} children={<Login />} />
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftNavigation;
