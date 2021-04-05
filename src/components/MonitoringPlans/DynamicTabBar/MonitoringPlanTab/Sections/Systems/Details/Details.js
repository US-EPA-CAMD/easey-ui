import React, { useEffect, useState } from "react";
import {
  Button,
  Label,
  FormGroup,
  Form,
  TextInput,
} from "@trussworks/react-uswds";

import "./Details.css";

import SelectBox from "./SelectBox/SelectBox";
import { types, fuels, designations } from "./SystemDescriptions";

import DateTime from "./DateTime/DateTime";
const Details = ({ modalData, viewOnly }) => {
  console.log("this is modata details", modalData);
  // const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [modalState, setModalSet] = useState([]);
  let startDate = null;
  let startHour = null;
  // input.split(/[ ,]+/);

  const startDateHandler = (date) => {
    // setStartDate(date);
  };
  const endDateHandler = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    console.log(modalData);
    if (modalData.length > 1) {
      setModalSet([
        modalData[0].value,
        modalData[1].value,
        modalData[2].value,
        modalData[3].value,
        modalData[4].value,
        modalData[5].value,
      ]);
      const startDateString = modalData[4].value.split(/[ ,]+/);
      // setStartDate(new Date(startDateString[0]));
      // setStartHour(startDateString[1]);
      startDate = new Date(startDateString[0]);
      startHour = startDateString[1];
      console.log("this is hour", startDate);
      if (modalData[5] !== "") {
        const endDateString = modalData[5].value.split(/[ ,]+/);
        setEndDate(new Date(endDateString[0]));
        setEndHour(endDateString[1]);
      }
    }
    console.log("this is testing the new state modal", modalState, modalData);
  }, [modalData]);

  return (
    <div>
      {
        <div className="modalDetails">
          <h2>
            Monitoring Systems: {modalData.length >= 1 ? modalState[0] : ""}{" "}
          </h2>
          <Form onSubmit={function noRefCheck() {}}>
            {" "}
            <div className="modalRow">
              <div className="modalColumn">
                <FormGroup className="dateLabels">
                  <Label htmlFor="otherInput" hint={<span className="requiredItalics"> (Required)</span>}>
                    System ID{" "}
                  </Label>
                  <TextInput
                    className="modalInput"
                    id="otherInput"
                    name="otherInput"
                    type="text"
                    // disabled={viewOnly}
                    defaultValue={modalData.length >= 1 ? modalState[0] : ""}
                  />
                </FormGroup>
              </div>
              <div className="modalColumnRight">
                <SelectBox
                  caption="System Designation"
                  options={designations}
                  selectKey="code"
                  required
                  viewOnly={viewOnly}
                  initialSelection={modalData.length >= 1 ? modalState[2] : ""}
                />
              </div>
            </div>
            <div className="modalRow">
              <div className="modalColumn">
                <SelectBox
                  caption="System Type"
                  options={types}
                  initialSelection={modalData.length >= 1 ? modalState[1] : ""}
                  selectKey="code"
                  // viewOnly={viewOnly}
                  required
                />
              </div>
              <div className="modalColumnRight">
                <SelectBox
                  caption="Fuel Type"
                  options={fuels}
                  initialSelection={modalData.length >= 1 ? modalState[3] : ""}
                  selectKey="code"
                  // viewOnly={viewOnly}
                  required
                />
              </div>
            </div>
            <div className="modalRow">
              <div className="modalColumn">
                <DateTime time={startDate} hour={startHour} start />
              </div>
              <div className="modalColumnRight">
                {/* <DateTime
                  time={modalState[6] ? modalState[6] : null}
                  hour={modalState[7] ? modalState[7] : ''}
                  start={false}
                /> */}
              </div>
              {/* <div className="modalRow">
                <div className="modalColumn"></div>
                <div className="modalColumnRight"> </div>
              </div> */}
            </div>
          </Form>
        </div>
      }
    </div>
  );
};

export default Details;
