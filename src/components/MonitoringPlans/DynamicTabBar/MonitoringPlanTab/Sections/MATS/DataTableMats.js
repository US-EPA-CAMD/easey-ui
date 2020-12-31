import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadMonitoringMatsMethods } from "../../../../../../store/actions/monitoringMethods";
import * as fs from "../../../../../../utils/selectors/monitoringPlanMethods";
import DataTableMatsRender from "./DataTableMatsRender";

export const DataTableMats = ({
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
        Header: "Substitute Data Approach",
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
    if (monitoringMatsMethods.length > 0 || loading === false) {
      return fs.getMonitoringPlansMatsMethodsTableRecords(monitoringMatsMethods);
    } else {
      return [{ col2: "Loading list of facilities..." }];
    }
  }, [loading, monitoringMatsMethods]);


  return (
    <div className="methodTable">
      <DataTableMatsRender
        columns={columns}
        data={data}
        // selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(DataTableMats);
