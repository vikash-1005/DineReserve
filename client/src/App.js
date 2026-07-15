import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Reservation from "./pages/Reservation";
import MyReservations from "./pages/MyReservations";
import Dashboard from "./pages/Dashboard";
import ManageRestaurants from "./pages/ManageRestaurants";
import ManageTables from "./pages/ManageTables";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4 mb-5">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/restaurants" element={<Restaurants />} />

  <Route
    path="/restaurants/:id"
    element={<RestaurantDetails />}
  />

  <Route
    path="/reservation/:id"
    element={<Reservation />}
  />

  <Route
    path="/my-reservations"
    element={<MyReservations />}
  />

  <Route path="/dashboard" element={<Dashboard />} />

  <Route
    path="/dashboard/restaurants"
    element={<ManageRestaurants />}
  />

  <Route
    path="/dashboard/tables"
    element={<ManageTables />}
  />
</Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;