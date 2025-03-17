import React, { useState } from "react";
import DataTable from "../../UI/Table/DataTable";
import { getOrders, updateOrder } from "../../../api/dashboard/orders";
import ViewOrder from "./ViewOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const orderStatusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const StatusDropdown = ({ row }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries("orders");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });

  const handleChange = (e) => {
    const newStatus = e.target.value;
    const order_id = row.original.order_id;

    mutation.mutate({ order_id, order_status: newStatus });
  };

  return (
    <select
      className="form-select"
      defaultValue={row.original.order_status}
      onChange={handleChange}
    >
      {orderStatusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

const ManageOrders = () => {
  const [columns, setColumns] = useState([
    { value: "order_id", label: "Order ID", visible: true },
    { value: "customer_name", label: "Customer", visible: true },
    { value: "total_price", label: "Total Price", visible: true },
    { value: "order_status", label: "Status", visible: true },
    { value: "created_at", label: "Order Date", visible: false },
  ]);

  const columnsConfig = [
    {
      header: "Order Information",
      columns: [
        {
          accessorKey: "order_id",
          header: "Order ID",
        },
        {
          accessorKey: "customer_name",
          header: "Customer",
        },
        {
          accessorKey: "total_price",
          header: "Total Price",
          cell: ({ getValue }) => `₹${getValue()}`,
        },
        {
          accessorKey: "order_status",
          header: "Status",
          cell: StatusDropdown,
        },
        {
          accessorKey: "created_at",
          header: "Order Date",
        },
      ],
    },
  ];

  return (
    <DataTable
      tag="orders"
      fetchData={getOrders}
      columnsConfig={columnsConfig}
      columns={columns}
      setColumns={setColumns}
      title="Manage Orders"
      ViewComponent={ViewOrder}
    />
  );
};

export default ManageOrders;
