import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const LocationDrop = ({
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

  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));

    selectionHandler(getIndex(val.target.value));
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
      setSelectionState(initialSelection);

      selectionHandler(initialSelection);
      console.log('this got called in locations')
    } else {
      setSelectionState(0);
      selectionHandler(0);
      console.log('this got called in locationsss')
    }
  }, []);

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
            {populateOptions(options)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default LocationDrop;
