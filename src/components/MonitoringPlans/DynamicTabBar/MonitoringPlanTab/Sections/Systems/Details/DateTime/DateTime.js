import React, { useEffect, useState } from "react";
import { Label , DatePicker } from "@trussworks/react-uswds";

import "../Details.css";
import SelectBox from "../SelectBox/SelectBox";
import "./DateTime.css";
const DateTime = ({ time, hour, required, start }) => {
  const [startDate, setStartDate] = useState(time);
console.log('time',time);

let [day, month, year] = [];

useEffect(() => {
  if(time != null){
    [day, month, year] =  time.split('/');}
    console.log([day,month,year])
    setStartDate(`${year}-${day}-${month}`)
}, [time])
  return (
    <div className="dateLabels">
      <Label id={start ? "Start" : "End"} >
        {start ? " Start Date and Time (Required)" : "End Date and Time"}
      </Label>

      <div className="modalColumnDate dateLabels">
        <Label id="date-label">mm/dd/yyyy</Label>
        {/* <div className="datePicker"> */}
        <DatePicker id="birthdate" name="birthdate" defaultValue={startDate} />
          {/* <FaCalendarAlt size={32} className="datePickerCal" /> */}
        {/* </div> */}
      </div>
      <div className="modalColumnRightDate dateLabels">
        <SelectBox
          caption="hh"
          options={[
            { time: null },
            { time: 0 },
            { time: 1 },
            { time: 2 },
            { time: 3 },
            { time: 4 },
            { time: 5 },
            { time: 6 },
            { time: 7 },
            { time: 8 },
            { time: 9 },
            { time: 10 },
            { time: 11 },
            { time: 12 },
            { time: 13 },
            { time: 14 },
            { time: 15 },
            { time: 16 },
            { time: 17 },
            { time: 18 },
            { time: 19 },
            { time: 20 },
            { time: 21 },
            { time: 22 },
            { time: 23 },
          ]}
          initialSelection={hour}
          selectKey="time"
          required={required}
        />
      </div>
    </div>
  );
};

export default React.memo(DateTime);
