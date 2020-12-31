import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadMonitoringMatsMethods } from "../../../../../../store/actions/monitoringMethods";
import * as fs from "../../../../../../utils/selectors/monitoringPlanMethods";

export const MatsCheck = ({
  monitoringMatsMethods,
  loadMonitoringMatsMethodsData,
  loading,
  locationSelect

}) => {
  useEffect(() => {
    if (monitoringMatsMethods.length === 0 || loading === false) {
      loadMonitoringMatsMethods(locationSelect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);
 

  const data = useMemo(() => {
    if(monitoringMatsMethods == -1  && loading === true){
      return -1;
    }
    if (monitoringMatsMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMatsMethodsTableRecords(monitoringMatsMethods);
    } else {
      return [{ col2: "Loading list of Supplemental Methods" }];
    }
  }, [loading, monitoringMatsMethods]);
};

const mapStateToProps = (state) => {
  return {
    monitoringMatsMethods: state.monitoringMethods.matsMethods,
    loading: state.apiCallsInProgress.monitoringMethods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringMatsMethodsData: (monitoringPlanLocationSelect) => dispatch(loadMonitoringMatsMethods(monitoringPlanLocationSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatsCheck);
