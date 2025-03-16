import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TablePagination = ({ table, showPagination }) => (
  <div className={`d-${showPagination ? "flex" : "none"} my-3`}>
    <div className="w-100 d-flex justify-content-between align-items-center">
      <div>
        Items Per Page:{" "}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 15, 20, 25, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <FaChevronLeft />
        </button>
        <strong>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </strong>
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  </div>
);

export default TablePagination;
