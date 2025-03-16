import React, { useState } from "react";
import DataTable from "../../UI/Table/DataTable";
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../../api/dashboard/category";
import Category from "./Category";

const ManageCategory = () => {
  const [columns, setColumns] = useState([
    { value: "category_id", label: "Category ID", visible: true },
    { value: "category_name", label: "Category Name", visible: true },
    { value: "isActive", label: "Active", visible: true },
  ]);
  const defaultVisibleColumns = ["category_id", "category_name", "isActive"];

  const columnsConfig = [
    {
      header: "Category Information",
      columns: [
        {
          accessorKey: "category_id",
          header: "Category ID",
        },
        {
          accessorKey: "category_name",
          header: "Category Name",
        },
        {
          accessorKey: "isActive",
          header: "Active",
          cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
        },
      ],
    },
  ];

  return (
    <DataTable
      tag="category"
      fetchData={getCategories}
      columnsConfig={columnsConfig}
      columns={columns}
      setColumns={setColumns}
      onDelete={deleteCategory}
      onEdit={updateCategory}
      defaultVisibleColumns={defaultVisibleColumns}
      title="Manage Categories"
      EditComponent={Category}
      AddComponent={Category}
      addButtonText={"Add Category"}
    />
  );
};

export default ManageCategory;
