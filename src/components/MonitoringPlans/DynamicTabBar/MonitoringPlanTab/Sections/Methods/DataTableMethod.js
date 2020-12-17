import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadMonitoringMethods } from "../../../../../../store/actions/monitoringMethods";
import * as fs from "../../../../../../utils/selectors/monitoringPlanMethods";
import DataTableMethodRender from "./DataTableMethodRender";

export const DataTableMethod = ({
  monitoringMethods,
  loadMonitoringMethodsData,
  loading,

}) => {
  useEffect(() => {
    if (monitoringMethods.length === 0) {
      loadMonitoringMethodsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Parameter",
        accessor: "col1",
        width: "240px",
      },
      {
        Header: "Methodology",
        accessor: "col2",
        width: "210px",
      },
      {
        Header: "Substitude Data Approach",
        accessor: "col3",
        width: "610px",
      },
      {
        Header: "Bypass Approach",
        accessor: "col4",
        width: "210px",
      },
      {
        Header: "Begin Date and Time",
        accessor: "col5",
        width: "210px",
      },
      {
        Header: "End Date and Time",
        accessor: "col6",
        width: "210px",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (monitoringMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMethodsTableRecords(monitoringMethods);
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [loading, monitoringMethods]);


  
  // const data = useMemo(() => {
  //   if ( loading === false) {
  //     return monitoringMethods;
  //   } else {
  //     return [{ col2: "Loading list of facilities..." }];
  //   }
  // }, [loading]);


  return (
    <div className="tabsBox">
      <DataTableMethodRender
        columns={columns}
        data={data}
        // selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monitoringMethods: state.monitoringMethods,
    loading: state.apiCallsInProgress.monitoringMethods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMonitoringMethodsData: () => dispatch(loadMonitoringMethods()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTableMethod);
