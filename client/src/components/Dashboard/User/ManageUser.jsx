import React, { useState } from "react";
import DataTable from "../../UI/Table/DataTable";
import { getUsers, deleteUser, updateUser } from "../../../api/dashboard/user";
import User from "./User";

const ManageUser = () => {
  const [columns, setColumns] = useState([
    { value: "user_id", label: "User ID", visible: true },
    { value: "user_name", label: "Name", visible: true },
    { value: "user_email", label: "Email", visible: true },
  ]);
  const defaultVisibleColumns = ["user_id", "user_name", "user_email"];

  const columnsConfig = [
    {
      header: "User Information",
      columns: [
        {
          accessorKey: "user_id",
          header: "User ID",
        },
        {
          accessorKey: "user_name",
          header: "Name",
        },
        {
          accessorKey: "user_email",
          header: "Email",
        },
      ],
    },
  ];

  return (
    <DataTable
      tag="user"
      fetchData={getUsers}
      columnsConfig={columnsConfig}
      columns={columns}
      setColumns={setColumns}
      onDelete={deleteUser}
      onEdit={updateUser}
      defaultVisibleColumns={defaultVisibleColumns}
      title="Manage Users"
      EditComponent={User}
    />
  );
};

export default ManageUser;
