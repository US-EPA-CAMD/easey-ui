import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const SelectBox = ({
  caption,
  options,
  selectKey,
  selectionHandler,
  showInactive = false,
  initialSelection,
  viewOnly,
  required,
  monitoringPlans,
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };

  const getMPIndex = (val) => {
    if (monitoringPlans) {
      // console.log('this is mpindex function',monitoringPlans.findIndex((obj) => obj.id === val) )
      return monitoringPlans.findIndex((obj) => obj.id === val);
    }
  };

  const [selectionState, setSelectionState] = useState(
    initialSelection
      ? monitoringPlans
        ? options.indexOf(monitoringPlans[initialSelection])
        : initialSelection
      : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
    
    selectionHandler(monitoringPlans?getMPIndex(val.target.value): getIndex(val.target.value));
  };
  // useEffect(() => {
  //   console.log("changed", options[selectionState].id);
  // }, [selectionState]);
  const populateOptions = (optionsList) => {
    // console.log('this is options',optionsList)
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  useEffect(() => {
    if (initialSelection>=0) {
      if (monitoringPlans) {
        setSelectionState(options.indexOf(monitoringPlans[initialSelection]));
        // console.log('checking ',options.indexOf(
        //   monitoringPlans[
        //     monitoringPlans.indexOf(monitoringPlans[initialSelection])
        //   ]
        // ));
      }else{
        setSelectionState(initialSelection);
      }
if(caption==="Locations"){
  console.log('USEFFECT LOCATIONS GOT ALLED')
}
      selectionHandler(initialSelection);
    } else {
      setSelectionState(0);
      selectionHandler(0);

        console.log("THIS WAS CALLED");}
   
  }, []);
  // useEffect(() => {
  //   if (monitoringPlans) {
  //     console.log(
  //       "this is initial mp",
  //       monitoringPlans[
  //         monitoringPlans.indexOf(monitoringPlans[initialSelection])
  //       ]
  //     );
  //   }
  // }, []);

  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            id="optionList"
            name="optionList"
            // weird bug without this
            defaultValue={
              options[selectionState] !== undefined
                ? caption === "Configurations"
                  ? options[selectionState].id
                  : options[selectionState][selectKey]
                : options[0].id
            }
            disabled={viewOnly}
            id={selectionState}
            onChange={(e) => handleChange(e)}
          >
            {showInactive &&
              caption === "Configurations" &&
              getActiveConfigurations(options).length > 0 && (
                <optgroup label="Active" role="optGroup">
                  {populateOptions(getActiveConfigurations(options))}
                </optgroup>
              )}
            {showInactive &&
              caption === "Configurations" &&
              getInActiveConfigurations(options).length > 0 && (
                <optgroup label="Inactive" role="optGroup">
                  {populateOptions(getInActiveConfigurations(options))}
                </optgroup>
              )}
            {showInactive === false && populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default SelectBox;
