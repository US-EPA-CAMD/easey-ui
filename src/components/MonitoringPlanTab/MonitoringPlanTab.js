import React, { useState, useEffect } from "react";
import * as fs from "../../utils/selectors/facilities";
import { loadMonitoringPlans } from "../../store/actions/monitoringPlans";
import {
  setConfigurationSelectionState,
  setSectionSelectionState,
  setLocationSelectionState,
  setInactiveToggle,
} from "../../store/actions/dynamicFacilityTab";
import { connect } from "react-redux";
import MonitoringPlanTabRender from "../MonitoringPlanTabRender/MonitoringPlanTabRender";
import { getActiveConfigurations } from "../../utils/selectors/monitoringConfigurations";
import { BreadcrumbLink } from "@trussworks/react-uswds";
import { setActiveTab } from "../../store/actions/activeTab";

export const MonitoringPlanTab = ({
  orisCode,
  facilities,
  loadMonitoringPlansData,
  setConfiguration,
  setLocation,
  setSection,
  setInactive,
  monitoringPlans,
  loading,
  tabs,
  setActiveTab,
  activeTab,
}) => {
  const [facility] = useState(fs.getSelectedFacility(orisCode, facilities));
  // // const [activeTab, setActiveTab] = useState(0);
  // const [locationSelect, setLocationSelect] = useState([
  //   // tabs[activeTab].location[0],
  //   // tabs[activeTab].location[1],
  // ]);
  // const [configurationSelect, setConfigurationSelect] = useState(
  //   ""
  //   // tabs[activeTab].configuration
  // );
  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);

  const [hasActiveConfigs, setHasActiveConfigs] = useState(true);

  // const [inactiveCheck, setInactiveCheck] = useState(tabs[activeTab].inactive);
  useEffect(() => {
    loadMonitoringPlansData(orisCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    for (let x of tabs) {
      if (x.orisCode === orisCode) {
        setActiveTab(orisCode, tabs.indexOf(x));
        // settingStateConfiguration(tabs[activeTab].configuration);
        // settingStateLocation([0, tabs[activeTab].location[1]]);
        // settingStateSection(tabs[activeTab].section);
        // setInactiveCheck(tabs[activeTab].inactive);
        break;
      }
    }
  }, []);
  // useEffect(() => {
  //   for (let x of monitoringPlans) {
  //     if (x.active && hasActiveConfigs) {
  //       settingStateConfiguration(monitoringPlans.indexOf(x));
  //     }
  //     break;
  //   }
  //   settingStateSection(tabs[activeTab].section);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [monitoringPlans]);

  // const [showInactive, setShowInactive] = useState(!hasActiveConfigs);

  // const settingStateConfiguration = (index) => {
  //   setConfiguration(index, orisCode);
  //   setConfigurationSelect(index);
  //   console.log("configuration is updated", index);
  // };

  // const settingStateLocation = (index) => {
  //   setLocation(index, orisCode);
  //   setLocationSelect(index);
  // };

  // const settingStateSection = (index) => {
  //   setSection(index, orisCode);
  //   setSectionSelect(index);
  // };

  // const settingInactiveToggle = (value) => {
  //   setInactive(orisCode, value);

  // if (value === inactiveCheck) {
  //   setInactiveCheck(!inactiveCheck);
  // } else {
  //   setInactiveCheck(value);
  // }
  //   setInactiveCheck(value);
  // };
  useEffect(() => {
    if (monitoringPlans.length > 0) {
      setHasActiveConfigs(
        getActiveConfigurations(monitoringPlans).length > 0 ? true : false
      );
      if (getActiveConfigurations(monitoringPlans).length <= 0) {
        setInactive(
          orisCode,
          true
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  return (
    <div>
      <MonitoringPlanTabRender
        facility={facility}
        monitoringPlans={monitoringPlans}
        hasActiveConfigs={hasActiveConfigs}
        activeTab={activeTab}
        orisCode={orisCode}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
    tabs: state.openedFacilityTabs,
    loading: state.apiCallsInProgress.facilities,
    monitoringPlans: state.monitoringPlans,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringPlansData: (orisCode) =>
      dispatch(loadMonitoringPlans(orisCode)),
    setConfiguration: (configuration, orisCode) =>
      dispatch(setConfigurationSelectionState(configuration, orisCode)),
    setLocation: (location, orisCode) =>
      dispatch(setLocationSelectionState(location, orisCode)),
    setSection: (section, orisCode) =>
      dispatch(setSectionSelectionState(section, orisCode)),
    setInactive: (orisCode, value) =>
      dispatch(setInactiveToggle(orisCode, value)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
