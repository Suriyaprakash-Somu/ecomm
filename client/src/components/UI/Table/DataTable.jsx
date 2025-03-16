import React, { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import { FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import "./Table.css";

const DataTable = ({
  tag,
  fetchData,
  columnsConfig = [],
  addButtonText,
  AddComponent = null,
  onDelete = false,
  EditComponent = null,
  columns,
  setColumns,
  filters,
  title,
  dontShowColumnSelect = false,
}) => {
  const [showPagination, setShowPagination] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      tag,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      filters,
    ],
    queryFn: () =>
      fetchData({
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        sorting: sorting,
        filters: filters,
      }),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchInterval: 60000,
    staleTime: 0,
    cacheTime: 5 * 60 * 1000,
  });

  const defaultColumn = {
    cell: ({ getValue }) => <span>{getValue()}</span>,
    enableSorting: false,
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await onDelete(id);
        queryClient.invalidateQueries([tag]);
      } catch (error) {}
    }
  };

  const handleEditClick = (row) => {
    setSelectedRowData(row.original);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedRowData(null);
    setModalType("add");
    setModalOpen(true);
  };

  let actionsColumn = null;
  if (onDelete || EditComponent) {
    actionsColumn = {
      header: "Action",
      id: "actions",
      cell: ({ row }) => (
        <div className="table-action">
          {EditComponent && (
            <span className="icon editIcon" title="Edit">
              <BsPencilSquare onClick={() => handleEditClick(row)} />
            </span>
          )}
          {onDelete && (
            <span className="icon deleteIcon" title="Delete">
              <FaTrashAlt onClick={() => handleDeleteClick(row.original.id)} />
            </span>
          )}
        </div>
      ),
      className: "table-action",
    };
  }

  const finalColumnsConfig = actionsColumn
    ? [...columnsConfig, actionsColumn]
    : [...columnsConfig];

  const table = useReactTable({
    data: data ? data.rows : [],
    columns: finalColumnsConfig,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: data ? data.rowCount : 0,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    enableSorting: true,
    columnResizeMode: "onChange",
    state: {
      pagination,
      sorting,
      columnVisibility: columns.reduce((acc, col) => {
        acc[col.value] = col.visible;
        return acc;
      }, {}),
    },
    defaultColumn,
  });

  const handleCheckboxChange = (e, colValue) => {
    const newColumns = columns.map((col) =>
      col.value === colValue ? { ...col, visible: e.target.checked } : col
    );
    setColumns(newColumns);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-between card-header">
          <h2 className="text-capitalize">{title}</h2>
          {addButtonText && AddComponent && (
            <div className="d-flex justify-content-start mb-2">
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={handleAddClick}
              >
                <FaPlus />
                {addButtonText}
              </button>
            </div>
          )}
        </div>
        <div className="card-body">
          <div className={`mb-2 ${dontShowColumnSelect ? "d-none" : ""}`}>
            {columns.map((col) => (
              <label key={col.value} className="me-2">
                <input
                  type="checkbox"
                  checked={col.visible}
                  onChange={(e) => handleCheckboxChange(e, col.value)}
                  className="me-1"
                />
                {col.label}
              </label>
            ))}
          </div>
          <div className="custom-table-wrapper">
            <div className="table table-responsive-md">
              <table className="table table-striped custom-table table-bordered">
                <TableHeader table={table} />
                <TableBody table={table} />
              </table>
            </div>
          </div>
          <TablePagination table={table} showPagination={showPagination} />
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setModalOpen(false)}
            >
              <FaTimes />
            </button>
            {modalType === "edit" && EditComponent && (
              <EditComponent
                type="edit"
                editData={selectedRowData}
                onClose={() => setModalOpen(false)}
              />
            )}
            {modalType === "add" && AddComponent && (
              <AddComponent type="add" onClose={() => setModalOpen(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
