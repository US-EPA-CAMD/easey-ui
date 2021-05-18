import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import AccordionItemTitle from "../AccordionItemTitle/AccordionItemTitle";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import Tables from "../Tables/Tables";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";

import "./MonitoringPlanTabRender.scss";

export const MonitoringPlanTabRender = ({
  facility,
  monitoringPlans,
  hasActiveConfigs,

  settingStateConfiguration,
  settingStateLocation,
  settingStateSection,
  settingInactiveToggle,

  sectionSelect,
  locationSelect,
  configurationSelect,
  inactiveCheck,
  activeTab
}) => {

  const [matsTableFlag, setMatsTableFlag] = useState(false);

  // MONITORING METHODS

  const matsTableHandler = (flag) => {
    // setMatsTableFlag(flag);
    // setTimeout(() => {
    //   setMatsTableFlag(flag);
    // });
  };

  const supItems = [];
  const methodItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Methods" />,
      expanded: true,
      id: "5",
      content: (
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelectValue={parseInt(locationSelect[1])}
          // showActiveOnly={!showInactive}
        />
      ),
    },
  ];
  if (matsTableFlag) {
    supItems.push({
      title: <AccordionItemTitle title="Supplemental Methods" />,
      expanded: true,
      id: "7",
      content: <DataTableMats locationSelect={locationSelect[1]} />,
    });
  }
  //---------------
  // MONITORING SYSTEMS

  const systemsItems = [
    {
      // title in the comp name should change when selectbox handler is changed as well
      title: <AccordionItemTitle title="Systems" />,
      expanded: true,
      id: "2",
      content: <DataTableSystems locationSelect={locationSelect[1]} />,
    },
  ];
  const [tableHandler, setTableHandler] = useState(
    <Tables
      sectionSelect={sectionSelect}
      methodItems={methodItems}
      systemsItems={systemsItems}
      supItems={supItems}
      matsTableFlag={matsTableFlag}
    />
  );
  return (
    <div className="selectedMPTab padding-top-4 ">
      {/* on change of select box, it should modify the accordion items */}
      {/* pass back the values to send to the datatable, current is sending back index  */}

      <HeaderInfo
        facility={facility}
        monitoringPlans={monitoringPlans}
        locationHandler={settingStateLocation}
        sectionHandler={settingStateSection}
        configurationHandler={settingStateConfiguration}

        showInactiveHandler={settingInactiveToggle}
        hasActiveConfigs={hasActiveConfigs}

        selectedLocation={locationSelect}
        selectedConfiguration={configurationSelect}
        selectedSection={sectionSelect}
        
        inactiveCheck={inactiveCheck}
        activeTab={activeTab}
      />
      <Tables
        sectionSelect={sectionSelect}
        methodItems={methodItems}
        systemsItems={systemsItems}
        supItems={supItems}
        matsTableFlag={matsTableFlag}
      />
      {/* {tableHandler} */}
      <hr width="100%" align="center" />
    </div>
  );
};

export default MonitoringPlanTabRender;
