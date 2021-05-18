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
  inactiveCheck
}) => {

  const [matsTableFlag, setMatsTableFlag] = useState(false);
  // // const [showInactive, setShowInactive] = useState(!hasActiveConfigs);
  // useEffect(() => {
  //   console.log("thjis is mp",monitoringPlans)
  //   for(let x of monitoringPlans){
  //     if(x.active && hasActiveConfigs) {
  //       console.log('yesyes')
  //       // here
  //       settingStateConfiguration(monitoringPlans.indexOf(x));
  //       console.log('configurationSelect',monitoringPlans.indexOf(x))
  //       break;
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [monitoringPlans]);

  // useEffect(() => {
  //   setShowInactive(!hasActiveConfigs);
  //   // setSectionSelect("Monitoring Methods");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [facility]);

  // const showInactiveHandler = (value) => {
  //   setShowInactive(value);
  // };

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
      expanded: !matsTableFlag,
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
      content: <DataTableSystems locationSelect={locationSelect} />,
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
        // showInactive={showInactive}
        hasActiveConfigs={hasActiveConfigs}

        selectedLocation={locationSelect}
        selectedConfiguration={configurationSelect}
        selectedSection={sectionSelect}
        
        inactiveCheck={inactiveCheck}
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
