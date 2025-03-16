import React, { useState } from "react";
import DataTable from "../../UI/Table/DataTable";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../../api/dashboard/product";
import Product from "./Product";

const ManageProduct = () => {
  const [columns, setColumns] = useState([
    { value: "product_id", label: "Product ID", visible: true },
    { value: "product_name", label: "Product Name", visible: true },
    { value: "category_id", label: "Category ID", visible: true },
    { value: "price", label: "Price", visible: true },
    { value: "isActive", label: "Active", visible: true },
    { value: "isFeatured", label: "Featured", visible: true },
    { value: "isRecent", label: "Recent", visible: true },
  ]);

  const defaultVisibleColumns = [
    "product_id",
    "product_name",
    "category_id",
    "price",
    "isActive",
  ];

  const columnsConfig = [
    {
      header: "Product Information",
      columns: [
        {
          accessorKey: "product_id",
          header: "Product ID",
        },
        {
          accessorKey: "product_name",
          header: "Product Name",
        },
        {
          accessorKey: "category_id",
          header: "Category ID",
        },
        {
          accessorKey: "price",
          header: "Price",
        },
        {
          accessorKey: "isActive",
          header: "Active",
          cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
        },
        {
          accessorKey: "isFeatured",
          header: "Featured",
          cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
        },
        {
          accessorKey: "isRecent",
          header: "Recent",
          cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
        },
      ],
    },
  ];

  return (
    <DataTable
      tag="product"
      fetchData={getProducts}
      columnsConfig={columnsConfig}
      columns={columns}
      setColumns={setColumns}
      onDelete={deleteProduct}
      onEdit={updateProduct}
      defaultVisibleColumns={defaultVisibleColumns}
      title="Manage Products"
      EditComponent={Product}
      addButtonText={"Add Product"}
      AddComponent={Product}
    />
  );
};

export default ManageProduct;
