import React from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutCustomer } from "../../../store/customerSlice";
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.customer);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          MyStore
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fw-medium" to="/contact">
                Contact
              </Link>
            </li>

            {/* Mobile-only menu items */}
            <div className="d-lg-none mt-3 border-top pt-3">
              {isAuthenticated ? (
                <>
                  <li className="nav-item mb-2">
                    <Link to="/profile" className="nav-link">
                      <FaUser className="me-2" /> Profile
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/cart" className="nav-link">
                      <FaShoppingCart className="me-2" /> Cart
                      {totalQuantity > 0 && (
                        <span className="badge bg-danger ms-2">
                          {totalQuantity}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => dispatch(logoutCustomer())}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mb-2">
                    <Link to="/cart" className="nav-link">
                      <FaShoppingCart className="me-2" /> Cart
                      {totalQuantity > 0 && (
                        <span className="badge bg-danger ms-2">
                          {totalQuantity}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/login" className="btn btn-outline-primary w-100">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="btn btn-primary w-100">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>

          {/* Desktop buttons - visible only on large screens */}
          <div className="d-none d-lg-flex align-items-center">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="btn btn-outline-primary me-2">
                  <FaUser className="me-1" /> Profile
                </Link>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => dispatch(logoutCustomer())}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary me-2">
                  Signup
                </Link>
              </>
            )}
            <Link to="/cart" className="btn btn-success position-relative">
              <FaShoppingCart /> Cart
              {totalQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
