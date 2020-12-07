import React from "react";
import UswdsTable from "../../../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({ columns, data, dataSelector, viewDataHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        //paginate
        //showEntries={[100, 250, 500]}
        search
        //disabledColumnFilters={[0]}
        selectedRowHandler={(facId) => {
          //console.log(facId);
        }}
        dataSelector={dataSelector}
        //editable
        viewDataColumn
        title="Facilities"
        viewDataHandler={viewDataHandler}
      />
    </div>
  );
};

export default DataTableRender;
