import React from "react";
import "./MonitoringPlanHome.css";
import DynamicTabs from "../Common/Tabs/DynamicTabs";
import DataTable from "./DynamicTabBar/SelectFacilitiesTab/DataTable";
/////////////remove later
import DataTableMethods from "./DynamicTabBar/MonitoringPlanTab/Sections/Methods/DataTableMethod";
import { Accordion } from "@trussworks/react-uswds";
import AccordionItemTitle from "./DynamicTabBar/MonitoringPlanTab/AccordionItemTitle/AccordionItemTitle";
// import { Accordion,AccordionItem } from "@trussworks/react-uswds/lib/components/Accordion/Accordion";
///////////////////

const MonitoringPlanHome = () => {
  //remove later
  const testItems = [
    {
      title: <AccordionItemTitle title={"test"} />,
      expanded: false,
      id: "5",
      content: <DataTableMethods />,  // this datatable works when called in this component, but not when we select a monitorplan table 
      handleToggle: true,
    },
  ];
  ///////////////////
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="title">Monitoring Plans</h1>
        <button className="ovalBTN">Import</button>
      </div>
      <div>
        {/* //remove later */}
        <Accordion bordered={true} items={testItems} />
      </div>
      <div className="tabsBar">
        <DynamicTabs
          tabsProps={[
            {
              title: "Select Facility",
              component: <DataTable />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanHome;
