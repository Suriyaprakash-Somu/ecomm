import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      Home 
      <Link to="/admin/signup">Admin Signup</Link>
      <Link to="/admin/login">Admin Login</Link>

    </div>
  );
};

export default Home;
