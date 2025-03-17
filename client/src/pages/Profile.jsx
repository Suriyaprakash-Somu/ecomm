import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import customerInstance from "../api/customerInstance";
import { setCustomer, logoutCustomer } from "../store/customerSlice";
import toast from "react-hot-toast";
import DataTable from "./../components/UI/Table/DataTable";
import { getOrders } from "../api/public/order";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer.customer);
  const columnsConfig = [
    {
      header: "Order Information",
      columns: [
        { accessorKey: "order_id", header: "Order ID" },
        {
          accessorKey: "total_price",
          header: "Total Price",
          cell: ({ getValue }) => `₹${getValue()}`,
        },
        { accessorKey: "order_status", header: "Status" },
        { accessorKey: "created_at", header: "Order Date" },
      ],
    },
  ];
  const [columns, setColumns] = useState([
    { value: "order_id", label: "Order ID", visible: true },
    { value: "customer_name", label: "Customer", visible: true },
    { value: "total_price", label: "Total Price", visible: true },
    { value: "order_status", label: "Status", visible: true },
    { value: "created_at", label: "Order Date", visible: false },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("customer");

      if (!token) {
        toast.error("Login to Continue");
        navigate("/login");
        return;
      }

      try {
        const response = await customerInstance.post("/verify-token");
        if (response.status === 200) {
          dispatch(setCustomer(response.data.decoded));
        }
      } catch (error) {
        localStorage.removeItem("customer");
        dispatch(logoutCustomer());
        toast.error("Login to Continue");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Customer Profile</h1>
      <div className="card p-4 mb-4">
        <p>
          <strong>Name:</strong> {customer?.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {customer?.customer_email}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("customer");
            dispatch(logoutCustomer());
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <h2>Order History</h2>
      <DataTable
        tag="orders"
        fetchData={getOrders}
        columnsConfig={columnsConfig}
        columns={columns}
        setColumns={setColumns}
        title="Your Orders"
      />
    </div>
  );
};

export default Profile;
