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
}) => {
  const [facility] = useState(fs.getSelectedFacility(orisCode, facilities));
  const [activeTab, setActiveTab] = useState(0);
  const [locationSelect, setLocationSelect] = useState([
    tabs[activeTab].location[0],
    tabs[activeTab].location[1],
  ]);
  const [configurationSelect, setConfigurationSelect] = useState(
    tabs[activeTab].configuration
  );
  const [sectionSelect, setSectionSelect] = useState(tabs[activeTab].section);

  const [hasActiveConfigs, setHasActiveConfigs] = useState(true);

  const [inactiveCheck, setInactiveCheck] = useState(tabs[activeTab].inactive);
  useEffect(() => {
    loadMonitoringPlansData(orisCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    for (let x of tabs) {
      if (x.orisCode === orisCode) {
        setActiveTab(tabs.indexOf(x));
        settingStateSection(tabs[activeTab].configuration);
        settingStateLocation([0, tabs[activeTab].location[1]]);
        settingStateSection(tabs[activeTab].section);
        setInactiveCheck(tabs[activeTab].inactive);
        break;
      }
    }
  }, []);
  useEffect(() => {
    for (let x of monitoringPlans) {
      if (x.active && hasActiveConfigs) {
        settingStateConfiguration(monitoringPlans.indexOf(x));
      }
      break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  const [showInactive, setShowInactive] = useState(!hasActiveConfigs);

  const settingStateConfiguration = (index) => {
    setConfiguration(index, orisCode);
    setConfigurationSelect(index);
  };

  const settingStateLocation = (index) => {
    setLocation(index, orisCode);
    setLocationSelect(index);
  };

  const settingStateSection = (index) => {
    setSection(index, orisCode);
    setSectionSelect(index);
  };

  const settingInactiveToggle = (value) => {
    setInactive(value, orisCode);

    if (value === inactiveCheck) {
      setInactiveCheck(!inactiveCheck);
    } else {
      setInactiveCheck(value);
    }
  };
  useEffect(() => {
    if (monitoringPlans.length > 0) {
      setHasActiveConfigs(
        getActiveConfigurations(monitoringPlans).length > 0 ? true : false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringPlans]);

  return (
    <div>
      <MonitoringPlanTabRender
        facility={facility}
        monitoringPlans={monitoringPlans}
        hasActiveConfigs={hasActiveConfigs}
        settingStateLocation={settingStateLocation}
        settingStateConfiguration={settingStateConfiguration}
        settingStateSection={settingStateSection}
        settingInactiveToggle={settingInactiveToggle}
        sectionSelect={sectionSelect}
        locationSelect={locationSelect}
        configurationSelect={configurationSelect}
        inactiveCheck={inactiveCheck}
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
    setInactive: (value, orisCode) =>
      dispatch(setInactiveToggle(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MonitoringPlanTab);
