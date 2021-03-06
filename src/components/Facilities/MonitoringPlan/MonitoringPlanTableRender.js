import React from "react";
import UswdsTable from "../../Common/Table/UswdsTable";
import "./MonitoringPlanTableRender.css";
import { Checkbox } from "@trussworks/react-uswds";

const MonitoringPlanTableRender = ({ columns, data, checkBoxHandler }) => {
  return (
    <div className="tableContainer">
      <p>
        <strong>Instructions:</strong> click on a unit/stack name in the table to open a monitoring plan.
      </p>
      <Checkbox
        id="active"
        name="active"
        label="Show active plans only"
        defaultChecked
        onChange={checkBoxHandler}
      />
      <UswdsTable columns={columns} data={data} bordered={false} />
    </div>
  );
};

export default MonitoringPlanTableRender;
