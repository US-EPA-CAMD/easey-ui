import React, { useEffect, useMemo, useState } from "react";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import { Preloader } from "../../Preloader/Preloader";
import { Button } from "@trussworks/react-uswds";
import Modal from "../../Modal/Modal";
import MethodModal from "../../MethodModal/MethodModal";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import log from "loglevel";
export const DataTableMethod = ({
  monitoringMethods,
  monitoringMatsMethods,

  locationSelectValue,

  matsTableHandler,
  showActiveOnly,
  user,
  checkout,
}) => {

  const [methods,setMethods] = useState([])
  
  const [matsMethods,setMatsMethods] = useState([])

  useEffect(() => {
    mpApi
      .getMonitoringMethods(locationSelectValue)
      .then((res) => {
        setMethods(res.data);
      })
      .catch((err) => {
        log(err);
      });
      mpApi
      .getMonitoringMatsMethods(locationSelectValue)
      .then((res) => {
        setMatsMethods(res.data);
      })
      .catch((err) => {
        log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue, showActiveOnly]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [];
  columnNames.push("Parameter");
  columnNames.push("Methodology");
  columnNames.push("Substitute Data Approach");
  columnNames.push("Bypass Approach");
  columnNames.push("Begin Date and Time");
  columnNames.push("End Date and Time");

  // *** generate columns array of object based on columnNames array above
  const columns = [];

  columnNames.forEach((name, index) => {
    columns.push({
      name,
      selector: `col${index + 1}`,
      sortable: true,
    });
  });
  columns.push({
    name: "Actions",
    button: true,
    width: "25%",
    cell: (row) => {
      // *** normalize the row object to be in the format expected by DynamicTabs
      // const normalizedRow = normalizeRowObjectFormat(row, columnNames);
      return (
        <div>
          {!(user && checkout) ? (
            <Button
              type="button"
              unstyled="true"
              epa-testid="btnOpenMethod"
              className="cursor-pointer"
              id="btnOpenMethod"
              // onClick={() => openConfig(row)}
              onClick={() => openMonitoringMethodsModal(row.col1, row.col2,row.col7)}
              aria-label={`open method ${row.col1} `}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  // openConfig(row);
                }
              }}
            >
              View
            </Button>
          ) : (
            <Button
              type="button"
              unstyled="true"
              epa-testid="btnEditMethod"
              className="cursor-pointer margin-left-2"
              onClick={() =>
                openMonitoringMethodsModal(row.col1, row.col2, row.col7)
              }
              aria-label={`edit method ${row.col1} `}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  // openConfig(row);
                }
              }}
            >
              {"View/Edit"}
            </Button>
          )}
        </div>
      );
    },
  });

  const openMonitoringMethodsModal = (parameterCode, methodCode, methodId) => {
    if (methods.length > 0 ) {
      setSelectedMonitoringMethod(
        methods.filter(
          (element) =>
            element.parameterCode === parameterCode &&
            element.methodCode === methodCode &&
            element.id === methodId
        )[0]
      );

      openModal(true);
    }
  };

  const data = useMemo(() => {
    if (methods.length > 0) {
      return fs.getMonitoringPlansMethodsTableRecords(
        showActiveOnly
          ? fs.getActiveMethods(methods)
          : methods
      );
    } else {
      return [{ col3: <Preloader /> }];
    }
  }, [ methods, showActiveOnly]);

  useMemo(() => {
    if (matsTableHandler) {
      if (matsMethods.length < 1) {
        matsTableHandler(false);
      } else {
        matsTableHandler(true);
      }
    }
  }, [matsMethods.length, matsTableHandler]);

  const [show, setShow] = useState(false);
  const [selectedMonitoringMethod, setSelectedMonitoringMethod] = useState(
    null
  );

  const closeModalHandler = () => setShow(false);

  const openModal = (value) => {
    setShow(value);
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <DataTableRender columns={columns} data={data} />
      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          showCancel
          showSave
          children={
            <div>
              <MethodModal
                modalData={selectedMonitoringMethod}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};


export default (DataTableMethod);
