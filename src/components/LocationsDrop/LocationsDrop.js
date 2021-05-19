import React, { useState, useEffect } from "react";

import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";
import { connect } from "react-redux";
import { setLocationSelectionState } from "../../store/actions/dynamicFacilityTab";
import { setActiveTab } from "../../store/actions/activeTab";
const LocationDrop = ({
  orisCode,
  caption,
  options,
  selectKey,
  showInactive = false,
  initialSelection,
  monitoringPlans,
  setLocation,
  tabs,
  activeTab,
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };

  const [selectionState, setSelectionState] = useState(
    tabs[activeTab[0]].location[0]
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
    setLocation([getIndex(val.target.value), val.target.value], orisCode);
  };

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  useEffect(() => {
    if (initialSelection >= 0 && tabs[activeTab[0]].locations.length >= 1) {
      // setSelectionState(
      //   options.findIndex(function (obj) {
      //     return obj.id === initialSelection.id;
      //   })
      // );

      // selectionHandler(
      //   options.findIndex(function (obj) {
      //     return obj.id === initialSelection.id;
      //   })
      // );

      // setLocation(
      //   [
      //     options.findIndex(function (obj) {
      //       return obj.id === initialSelection.id;
      //     }),
      //     initialSelection.id,
      //   ],
      //   orisCode
      // );

      setSelectionState(tabs[activeTab[0]].location[0]);
      setLocation(
        [
          tabs[activeTab[0]].location[0],
          tabs[activeTab[0]].locations[
            // index of selected location
            tabs[activeTab[0]].location[0]
          ].id,
        ],
        orisCode
      );
      console.log("got called");
    } else {
      setSelectionState(0);
    }
  }, []);

  return (
    <div>
      {" "}
      {tabs[activeTab[0]].locations.length > 0 ? (
        <div>
          {/* need to add default value later */}
          <FormGroup className="margin-right-2 margin-bottom-1">
            <Label htmlFor={caption + initialSelection}>{caption}</Label>
            <Dropdown
              name="optionList"
              id={selectionState}
              value={
                tabs[activeTab[0]].locations[tabs[activeTab[0]].location[0]].id
              }
              onChange={(e) => handleChange(e)}
            >
              {/* // this i getting changed */}
              {populateOptions(tabs[activeTab[0]].locations)}
            </Dropdown>
          </FormGroup>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tabs: state.openedFacilityTabs,
    activeTab: state.activeTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location, orisCode) =>
      dispatch(setLocationSelectionState(location, orisCode)),
    setActiveTab: (orisCode, value) => dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationDrop);
