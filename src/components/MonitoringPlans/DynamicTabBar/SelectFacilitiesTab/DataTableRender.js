import React from "react";
import UswdsTable from "../../../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({ columns, data, selectedRowHandler }) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        paginate
<<<<<<< HEAD
        showEntries={[100, 250, 500]}
=======
        showEntries={[10, 250, 500]}
>>>>>>> f3252748b6924dbb881cc2e2578b2f3a0072b6a1
        search
        //editable
        viewDataColumn
        title="Facilities"
        selectedRowHandler={selectedRowHandler}
      />
    </div>
  );
};

export default DataTableRender;
