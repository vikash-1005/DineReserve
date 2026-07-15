import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FaUtensils,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import AuthContext from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <FaUtensils className="me-2" />
          DineReserve
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/restaurants">
                Restaurants
              </Link>
            </li>

            {/* Customer Menu */}
            {token && user?.role === "customer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-reservations">
                  My Reservations
                </Link>
              </li>
            )}

            {/* Admin Menu */}
            {token && user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard/restaurants"
                  >
                    Restaurants
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard/tables"
                  >
                    Tables
                  </Link>
                </li>
              </>
            )}

            {/* Not Logged In */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Logged In */}
            {token && (
              <>
                <li className="nav-item me-3">
                  <span className="nav-link">
                    <FaUserCircle className="me-1" />
                    {user?.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-orange"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;