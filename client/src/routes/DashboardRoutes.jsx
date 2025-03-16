import React from "react";
import { Routes, Route } from "react-router";
import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout";
import DashboardLanding from "../components/Dashboard/LandingPage/DashboardLanding";
import ManageUser from "../components/Dashboard/User/ManageUser";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<DashboardLanding />} />
      <Route path="users/manage" element={<ManageUser />} />
    </Route>
  </Routes>
);

export default DashboardRoutes;
