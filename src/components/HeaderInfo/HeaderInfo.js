import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "../SelectBox/SelectBox";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Button, Checkbox } from "@trussworks/react-uswds";
const HeaderInfo = ({
  facility,
  sectionHandler,
  monitoringPlans,
  locationHandler,
  configurationHandler,
  showInactiveHandler,

  hasActiveConfigs,

  selectedLocation,
  selectedSection,
  selectedConfiguration,
  inactiveCheck,
}) => {
  console.log(inactiveCheck,' got changed')
  // possiblely adding showinactive to redux state will fix this issue
  const [configurations, setConfigurations] = useState(
    hasActiveConfigs
      ? monitoringPlans
      : getInActiveConfigurations(monitoringPlans)
  );

  useEffect(() => {
    if (configurations.length > 1) {
      console.log('selectedLocation',selectedLocation,'monitoringplans',monitoringPlans[selectedConfiguration])
      locationHandler([
        0,
        monitoringPlans[selectedConfiguration].locations[selectedLocation[0]]["id"],
      ]);
      configurationHandler(selectedConfiguration);
    } else if (configurations.length === 1) {
      locationHandler([0, monitoringPlans[0].locations[0]["id"]]);
    }
  }, []);

  // by default is there are no active configs, show inactive (need to disable and check the 
  //show inactive checkbox )
  useEffect(() => {
    if (!hasActiveConfigs) {
      setConfigurations(getInActiveConfigurations(monitoringPlans));
      showInactiveHandler(false);
    }
  }, [hasActiveConfigs, monitoringPlans]);

  // by default only show active configs first 
  useEffect(() => {
    setConfigurations(
      inactiveCheck ? monitoringPlans : getActiveConfigurations(monitoringPlans)
    );
  }, [monitoringPlans, inactiveCheck]);

  const sections = [
    { name: "Loads" },
    { name: "Location Attributes" },
    { name: "Monitoring Defaults" },
    { name: "Monitoring Methods" },
    { name: "Monitoring Systems" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Reporting Frequency" },
    { name: "Span, Range, and Formulas" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
  ];

  // configuration is lagging behind one
  const mpHandler = (index) => {

    console.log('this is mp', monitoringPlans)
    configurationHandler(index);
    console.log('index',index)
    locationHandler([0, monitoringPlans[index].locations[0]["id"]]);
  };
  const mplHandler = (index) => {
    // locationHandler(configurations[configSelect].locations[index]["id"]);
    locationHandler([
      index,
      monitoringPlans[selectedConfiguration].locations[index]["id"],
    ]);
    console.log('this')
  };
  const mpsHandler = (index) => {
    // sectionHandler(sections[index].name);
    sectionHandler(index);
  };

  const checkBoxHandler = (evt) => {
    if (evt.target.checked) {
      showInactiveHandler(true);
      // setConfigurations(monitoringPlans);
    } else {
      showInactiveHandler(false);
      // setConfigurations(getActiveConfigurations(monitoringPlans));
    }
    configurationHandler(0);
  };

  return (
    <div className="header">
      <div className="display-inline-block">
        <h2>{facility.name}</h2>
      </div>
      <div className="float-right">
        <a href="#/">Comments</a>
        <a href="#/">Reports</a>|<Button className="ovalBTN">Evaluate</Button>
        <Button className="ovalBTN">Submit</Button>
      </div>
      {configurations.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <div className="configurations-container">
              <SelectBox
                caption="Configurations"
                options={configurations}
                selectionHandler={mpHandler}
                selectKey="name"
                showInactive={inactiveCheck}
                initialSelection={selectedConfiguration}
                monitoringPlans={monitoringPlans}
              />
              <div className="mpSelect showInactive">
                <Checkbox
                  id={`${"selected hovered" + facility}`}
                  name="checkbox"
                  label="Show Inactive"
                  defaultChecked={inactiveCheck}
                  disabled={!hasActiveConfigs}
                  onChange={checkBoxHandler}
                />
              </div>
            </div>
            <SelectBox
              caption="Locations"
              options={
                monitoringPlans[selectedConfiguration]
                  ? monitoringPlans[selectedConfiguration].locations
                  : [{ name: "test" }]
              }
              selectionHandler={mplHandler}
              selectKey="name"
              initialSelection={selectedLocation[0]}
            />
            <SelectBox
              caption="Sections"
              options={sections}
              selectionHandler={mpsHandler}
              selectKey="name"
              initialSelection={selectedSection}
            />
          </div>
          <div className="statuses column">
            <div className="eval">Evaluation Status: </div>
            <div className="font-body-2xs display-inline-block padding-105">
              {" Passed with no errors "}{" "}
            </div>
            <br />
            <div className="submission"> Submission Status: </div>
            <div className="font-body-2xs display-inline-block padding-105">
              {" Resubmission required "}{" "}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HeaderInfo;
