// routes/PublicRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import Signup from "../components/Dashboard/Auth/Signup";
import Login from "../components/Dashboard/Auth/Login";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin/signup" element={<Signup />} />
    <Route path="/admin/login" element={<Login />} />
  </Routes>
);

export default PublicRoutes;
