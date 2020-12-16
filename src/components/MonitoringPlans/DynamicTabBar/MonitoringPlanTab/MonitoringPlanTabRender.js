import React from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import AccordionItemTitle from "./AccordionItemTitle/AccordionItemTitle";
import "./MonitoringPlanTab.css";
import { Accordion, } from "@trussworks/react-uswds";
import DataTableMethod  from "./Sections/Methods/DataTableMethod";
const MonitoringPlanTabRender = ({facility, monitoringPlans }) => {

  const items = [{
    // title in the comp name should change when selectbox handler is changed as well 
    title:<AccordionItemTitle title="Method" />,
    expanded:true,
    id:'5',
    content: <DataTableMethod/>,
    handleToggle: true }];
   

  return (
    <div className='selectedMPTab'>
      {/* on change of select box, it should modify the accordion items */}
      <HeaderInfo facility={facility} monitoringPlans={monitoringPlans}/>
      <hr width="100%" align="center" />
      <Accordion bordered={true} items={items} />
      <hr width="100%" align="center" />
      {/* <AccordionItemTitle title="Supplemental Method" /> */}
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
