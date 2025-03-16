import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import axios from "axios";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const verify = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/verify-token`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        localStorage.removeItem("user");
        navigate("/admin/login");
      }
    };
    verify();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar>
        <Menu iconShape="square">
          <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
          <MenuItem onClick={() => navigate("/dashboard/users")}>
            Users
          </MenuItem>
          <MenuItem onClick={() => navigate("/dashboard/settings")}>
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
      <div style={{ flex: 1 }}>
        <header
          style={{
            background: "#f1f1f1",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={handleLogout}>Logout</button>
        </header>
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
