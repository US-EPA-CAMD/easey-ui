import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup, Checkbox } from "@trussworks/react-uswds";

const ConfigurationsDrop = ({
  caption,
  options,
  selectKey,
  selectionHandler,
  showInactive = false,
  initialSelection,
  monitoringPlans,
  inactiveCheck,
  showInactiveHandler,
  configurationHandler,
  hasActiveConfigs,
  orisCode,
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
    initialSelection ? initialSelection : 0
    // options.indexOf(monitoringPlans[initialSelection]) : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));
    selectionHandler(getMPIndex(val.target.value), orisCode);
  };

  for (let x of monitoringPlans) {
    if (x.active && hasActiveConfigs) {
      setSelectionState(monitoringPlans.indexOf(x));
    }
    break;
  }

  const populateOptions = (optionsList) => {
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.id}>
          {info[selectKey]}
        </option>
      );
    });
  };

  // selectionstate update is lagging behind one causing it to not update immediately. cant figureout
  // the different in sectiondrop and this 
  useEffect(() => {
    setSelectionState(options.indexOf(monitoringPlans[initialSelection]));
  }, [initialSelection]);

  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      showInactiveHandler(orisCode,true);
    } else {
      showInactiveHandler(orisCode,false);
    }
  };

  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            id="optionList"
            name="optionList"
            // weird bug without this
            value={
              options[selectionState] !== undefined
                ? options[selectionState].id
                : options[0].id
            }
            id={selectionState}
            onChange={(e) => handleChange(e)}
          >
            {getActiveConfigurations(options).length > 0 && (
              <optgroup label="Active" role="optGroup">
                {populateOptions(getActiveConfigurations(options))}
              </optgroup>
            )}
            {showInactive && getInActiveConfigurations(options).length > 0 && (
              <optgroup label="Inactive" role="optGroup">
                {populateOptions(getInActiveConfigurations(options))}
              </optgroup>
            )}
            {/* {showInactive === false && populateOptions(options)} */}
          </Dropdown>
        </FormGroup>

        <div className="mpSelect showInactive">
          <Checkbox
            id={options[0].id}
            name="checkbox"
            label="Show Inactive"
            checked={inactiveCheck}
            disabled={!hasActiveConfigs}
            onChange={checkBoxHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigurationsDrop;
