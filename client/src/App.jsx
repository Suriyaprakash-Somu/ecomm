import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router";
import PublicRoutes from "./routes/PublicRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import { Toaster } from "react-hot-toast";
import customerInstance from "./api/customerInstance";
import { setCustomer, logoutCustomer } from "./store/customerSlice";
import { useDispatch } from "react-redux";

export const verifyCustomerToken = async (dispatch) => {
  const token = localStorage.getItem("customer");

  if (!token) {
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
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    verifyCustomerToken(dispatch);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
