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
  viewOnly,
  required,
  monitoringPlans,
  inactiveCheck,
  showInactiveHandler,
  configurationHandler,
  hasActiveConfigs,
}) => {
  const getIndex = (val) => {
    return options.findIndex((obj) => obj.id === val);
  };

  console.log('initial',initialSelection)
  const getMPIndex = (val) => {
    if (monitoringPlans) {
      // console.log('this is mpindex function',monitoringPlans.findIndex((obj) => obj.id === val) )
      return monitoringPlans.findIndex((obj) => obj.id === val);
    }
  };

  const [selectionState, setSelectionState] = useState(
    initialSelection ? options.indexOf(monitoringPlans[initialSelection]) : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));

    selectionHandler(
      monitoringPlans
        ? getMPIndex(val.target.value)
        : getIndex(val.target.value)
    );
  };

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
    if (initialSelection >= 0) {
      setSelectionState(options.indexOf(monitoringPlans[initialSelection]));
      selectionHandler(initialSelection);
    } else {
      setSelectionState(0);
      selectionHandler(0);
    }
  }, [initialSelection]);

  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      showInactiveHandler(true);
      console.log('sowactivehandler called')
    } else {
      showInactiveHandler(false);

    //   console.log(getActiveConfigurations(monitoringPlans).findIndex((val)=>
    //     monitoringPlans[initialSelection].id === val.id))
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
