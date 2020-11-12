import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination/TablePagination";
import TablePaginationFilter from "./TablePaginationFilter/TablePaginationFilter";
import TableSearch from "./TableSearch/TableSearch";
import "./UswdsTable.css";

// if showEntries is not supplied, by default will have show entries of only [100 and all data]
// first page will default to all data if BOTH pagination and showentries are not supplied
const UswdsTable = ({
  columns,
  data,
  bordered = false,
  caption,
  paginate,
  search,
  showEntries,
  disabledColumnFilters,
  selectedRowHandler,
  dataSelector,
  defaultSelect,
  editable,
}) => {
  if (disabledColumnFilters) {
    if (disabledColumnFilters.length >= 1) {
      disabledColumnFilters.map((column) => {
        columns[column] = { ...columns[column], disableGlobalFilter: true };
      });
    }
  }
  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
  }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return editable ? (
      <input
        value={value || ""}
        style={id == "col1" ? { width: "30px" } : { width: "90px" }}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <div>{initialValue}</div>
    );
  };
  const [editableData, setEditableData] = useState(data);
  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const updateMyData = (rowIndex, columnId, value) => {
    setEditableData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    console.log("this is new data", editableData);
    data = editableData;
    console.log("testing data", data);
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  // Use the state and functions returned from useTable to build UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    toggleRowSelected,
    toggleAllRowsSelected,
    // try to reduce consts in uswds component and put them in respective component via useTable();
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      initialState: {
        sortBy: [
          {
            id: "col1",
            desc: false,
          },
        ],
        pageIndex: 0,
        //9999 is bad practice, -1 works to show all data, but removes 1 data row for some reason
        pageSize: paginate && showEntries ? showEntries[0] : 9999,
      },
      defaultColumn,
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const variant = bordered ? "usa-table" : "usa-table usa-table--borderless";

  return (
    <div className="container">
      <div className="filterAndSearch">
        {paginate ? (
          <span className="filter">
            <TablePaginationFilter
              setPageSize={setPageSize}
              pageSize={pageSize}
              paginationFiltering={
                showEntries ? [...showEntries, rows.length] : [100, rows.length]
              }
            />
          </span>
        ) : (
          ""
        )}
        {search ? (
          <div className="search">
            <TableSearch setGlobalFilter={setGlobalFilter} />
          </div>
        ) : (
          ""
        )}
      </div>
      <table className={variant} {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          selectedRowHandler={selectedRowHandler}
          dataSelector={dataSelector}
          defaultSelect={defaultSelect}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          page={page}
          prepareRow={prepareRow}
          toggleRowSelected={toggleRowSelected}
          toggleAllRowsSelected={toggleAllRowsSelected}
        />
      </table>
      <span> {caption} </span>
      <div className="paginateBar">
        {paginate ? (
          <TablePagination
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            pageCount={pageCount}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
            paginationFiltering={
              showEntries ? [...showEntries, rows.length] : [100, rows.length]
            }
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UswdsTable;
