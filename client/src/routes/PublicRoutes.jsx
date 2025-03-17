import React from "react";
import { Routes, Route, Outlet } from "react-router";
import Home from "../pages/Home";
import Signup from "../components/Dashboard/Auth/Signup";
import Login from "../components/Dashboard/Auth/Login";
import Category from "../pages/Category";
import Product from "../pages/Product";

import Navbar from "../components/Public/Layout/Navbar";
import Footer from "../components/Public/Layout/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CustomerSignup from "../components/Public/Auth/CustomerSignup";
import CustomerLogin from "../components/Public/Auth/CustomerLogin";
import Cart from "../components/Public/Cart/Cart";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const PublicRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<CustomerSignup />} />
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Product />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/admin/login" element={<Login />} />
    </Route>
  </Routes>
);

export default PublicRoutes;
