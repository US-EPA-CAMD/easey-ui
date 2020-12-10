import React from "react";
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import Method from "./Method/Method";
import "./SelectedFacilityTab.css";
const SelectedFacilityTabRender = ({facility, monitoringPlans }) => {
  return (
    <div className='selectedMPTab'>
      <HeaderInfo facility={facility} monitoringPlans={monitoringPlans}/>
      <hr width="100%" align="center" />
      <Method title="Method" />
      <hr width="100%" align="center" />
      <Method title="Supplemental Method" />
      <hr width="100%" align="center" />
    </div>
  );
};

export default SelectedFacilityTabRender;
