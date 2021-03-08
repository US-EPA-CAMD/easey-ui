import {
  NavDropDownButton,
  MegaMenu,
  Link
} from "@trussworks/react-uswds";
import React, { useState } from "react";
import "./Workspace.css";
import { HiDesktopComputer } from "react-icons/hi";
const Workspace = () => {
  const [open, setOpen] = useState(false);
  const subMenu = [
    <Link
      href="monitoring-plans"
      key={"monitoring-plans"}
      title={"monitoring-plans"}
    >
       - Monitoring Plans
    </Link>,
    <Link
      href="qa_certifications"
      key={"qa_certifications"}
      title={"qa_certifications"}
    >
      {"- QA & Certifications"}
    </Link>,
     <Link href="emissions" key={"Emissions"} title={"Emissions"}>
      - Emissions
    </Link>,
  ];
  const testing = (news) => {
    setOpen(!news);
  };
  const workSpace = (
    <>
      <div className="test">
        <NavDropDownButton
          onToggle={(): void => {
            testing(open);
          }}
          menuId="MenuDropDown"
          isOpen={open}
          label={<div className="workspace"> Workspace</div>}
          isCurrent={open}
        />
        <MegaMenu key="1" items={[subMenu]} isOpen={open} id={"MenuDropDown"} />
      </div>
    </>
  );

  return (
    <div className="dropDownWorkspace">
      <div className="iconLine iconDiv">
        <HiDesktopComputer size={32} style={{ fill: "white" }}/>
      </div>
      <div className="test">{workSpace}</div>
    </div>
  );
};

export default Workspace;
