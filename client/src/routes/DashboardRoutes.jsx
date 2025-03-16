import React from "react";
import { Routes, Route } from "react-router";
import DashboardLayout from "../components/Dashboard/Layout/DashboardLayout";
import DashboardLanding from "../components/Dashboard/LandingPage/DashboardLanding";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<DashboardLanding />} />
    </Route>
  </Routes>
);

export default DashboardRoutes;
