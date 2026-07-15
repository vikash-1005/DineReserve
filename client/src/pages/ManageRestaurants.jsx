import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaMapMarkerAlt,
  FaUtensils,
  FaTrash,
  FaClock,
} from "react-icons/fa";

function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    cuisine: "",
    address: "",
    openingTime: "",
    closingTime: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/restaurants"
      );
      setRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addRestaurant = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/restaurants",
        form
      );

      alert("Restaurant Added Successfully");

      setForm({
        name: "",
        location: "",
        cuisine: "",
        address: "",
        openingTime: "",
        closingTime: "",
        image: "",
        description: "",
      });

      fetchRestaurants();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Failed to add restaurant"
      );
    }
  };

  const deleteRestaurant = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/restaurants/${id}`
      );

      alert("Restaurant Deleted Successfully");

      fetchRestaurants();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete restaurant"
      );
    }
  };

  return (
    <div className="container py-4">

      <h2 className="text-center fw-bold mb-4">
        🍽 Manage Restaurants
      </h2>

      {/* Add Restaurant */}

      <div className="card shadow-lg border-0 mb-5">
        <div className="card-header bg-warning">
          <h4 className="mb-0">
            <FaPlus className="me-2" />
            Add Restaurant
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={addRestaurant}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Restaurant Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="cuisine"
                  placeholder="Cuisine"
                  value={form.cuisine}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaClock className="me-2" />
                  Opening Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  name="openingTime"
                  value={form.openingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaClock className="me-2" />
                  Closing Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  name="closingTime"
                  value={form.closingTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  placeholder="Restaurant Image URL"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mb-3">
                <textarea
                  rows="3"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              <FaPlus className="me-2" />
              Add Restaurant
            </button>

          </form>

        </div>
      </div>

      {/* Restaurant List */}

      <h3 className="mb-4">
        Available Restaurants
      </h3>

      <div className="row">

        {restaurants.length === 0 ? (
          <div className="text-center">
            <h5>No Restaurants Found</h5>
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={restaurant._id}
            >
              <div
                className="card h-100 shadow border-0"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={
                    restaurant.image
                      ? restaurant.image
                      : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                  }
                  alt={restaurant.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h4 className="fw-bold">
                    {restaurant.name}
                  </h4>

                  <p>
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {restaurant.location}
                  </p>

                  <p>
                    <FaUtensils className="text-warning me-2" />
                    {restaurant.cuisine}
                  </p>

                  <p>
                    <strong>Address:</strong><br />
                    {restaurant.address}
                  </p>

                  <p>
                    <strong>Opening Hours:</strong><br />
                    {restaurant.openingTime} - {restaurant.closingTime}
                  </p>

                  <p className="text-muted flex-grow-1">
                    {restaurant.description}
                  </p>

                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() =>
                      deleteRestaurant(restaurant._id)
                    }
                  >
                    <FaTrash className="me-2" />
                    Delete Restaurant
                  </button>

                </div>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default ManageRestaurants;