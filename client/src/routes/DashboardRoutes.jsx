import React from "react";
import { Routes, Route } from "react-router";
import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout";
import DashboardLanding from "../components/Dashboard/LandingPage/DashboardLanding";
import ManageUser from "../components/Dashboard/User/ManageUser";
import ManageCategory from "../components/Dashboard/Category/ManageCategory";
import ManageProduct from "../components/Dashboard/Product/ManageProduct";
import ManageOrder from "../components/Dashboard/Order/ManageOrder";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<DashboardLanding />} />
      <Route path="users/manage" element={<ManageUser />} />
      <Route path="category/manage" element={<ManageCategory />} />
      <Route path="product/manage" element={<ManageProduct />} />
      <Route path="order/manage" element={<ManageOrder />} />
    </Route>
  </Routes>
);

export default DashboardRoutes;
