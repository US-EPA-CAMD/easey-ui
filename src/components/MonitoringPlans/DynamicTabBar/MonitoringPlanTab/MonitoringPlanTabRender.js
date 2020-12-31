import React, { useState, useEffect } from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import AccordionItemTitle from "./AccordionItemTitle/AccordionItemTitle";
import "./MonitoringPlanTab.css";
import { Accordion } from "@trussworks/react-uswds";
import DataTableMethod from "./Sections/Methods/DataTableMethod";
import DataTableMats from "./Sections/MATS/DataTableMats";
const MonitoringPlanTabRender = ({ facility, monitoringPlans }) => {
  const [locationSelect, setLocationSelect] = useState(0);
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  const sections = [
    { name: "Monitoring Methods" },
    { name: "Location Attributes" },
    { name: "Reporting Frequency" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
    { name: "Monitoring Systems" },
    { name: "Monitoring Defaults" },
    { name: "Span, Range, and Formulas" },
    { name: "Rectangular Duct WAFs" },
    { name: "Loads" },
    { name: "Qualifications" },
  ];
  const methodLocationHandler = (location) => {
    setLocationSelect(location);
  };

  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);
    console.log(flag);
  };

  const supItems = [];
  let matsAccordion = "";
  useEffect(() => {
    console.log("this is is in main page", matsTableFlag);
    if (matsTableFlag) {
      console.log('testing')
      const matsItems = {
        // title in the comp name should change when selectbox handler is changed as well
        title: <AccordionItemTitle title="Supplemental Methods" />,
        expanded: true,
        id: "7",
        // content: <DataTableMats locationSelect={locationSelect} />,
        content: <DataTableMethod locationSelect={locationSelect} />,
        handleToggle: true,
        // content: ,
      };
      supItems.push(matsItems);
      methodItems[0].expanded = false;
      matsAccordion = (
        <Accordion bordered={true} items={supItems} className="accordions" />
      );
    }
  }, [matsTableFlag]);
  const flag = true;
  const methodItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Methods" />,
      expanded: true,
      id: "5",
      content: (
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelect={locationSelect}
        />
      ),
      handleToggle: true,
    },
  ];

  // if (matsTableFlag) {
  //   // supItems.push({
  //   //   // title in the comp name should change when selectbox handler is changed as well
  //   //   title: <AccordionItemTitle title="Supplemental Methods" />,
  //   //   expanded: true,
  //   //   id: "7",
  //   //   // content: <DataTableMats locationSelect={locationSelect} />,
  //   //   // content: <DataTableMethod locationSelect={locationSelect} />,
  //   //   handleToggle: true,
  //   //   // content: ,
  //   // });
  //   supItems.push(matsAccordion);
  //   methodItems[0].expanded = false;
  // }

  return (
    <div className="selectedMPTab">
      {/* on change of select box, it should modify the accordion items */}
      <HeaderInfo
        facility={facility}
        monitoringPlans={monitoringPlans}
        sections={sections}
        methodLocationHandler={methodLocationHandler}
      />
      <hr width="100%" align="center" />
      <Accordion bordered={false} items={methodItems} className="accordions" />
      <hr width="100%" align="center" />
      {/* <AccordionItemTitle title="Supplemental Method" /> */}
      {/* {matsTableFlag ? <Accordion bordered={true} items={supItems} className="accordions" /> :'' } */}
      {matsAccordion}
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
