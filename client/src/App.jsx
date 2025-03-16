import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { Routes, Route } from "react-router";
import PublicRoutes from "./routes/PublicRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

import { Toaster } from "react-hot-toast";

const App = () => (
  <>
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
    <Toaster position="top-right" />
  </>
);

export default App;
