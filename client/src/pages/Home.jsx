import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/restaurants"
      );

      // Show only first 3 restaurants on Home page
      setRestaurants(res.data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Hero Section */}

      <section className="hero">
        <div>
          <h1>Welcome to DineReserve</h1>

          <p className="mt-3">
            Reserve your favourite restaurant in just a few clicks.
          </p>

          <div className="mt-4">
            <Link
              to="/restaurants"
              className="btn btn-orange me-3"
            >
              Explore Restaurants
            </Link>

            <Link
              to="/register"
              className="btn btn-outline-light"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="container mt-5">

        <h2 className="section-title">
          Why Choose DineReserve?
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaUtensils className="feature-icon" />
              <h4>Top Restaurants</h4>
              <p>Discover the best restaurants in your city.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaCalendarCheck className="feature-icon" />
              <h4>Instant Booking</h4>
              <p>Reserve your table instantly with no waiting.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <FaMapMarkerAlt className="feature-icon" />
              <h4>Multiple Locations</h4>
              <p>Restaurants available across different cities.</p>
            </div>
          </div>

        </div>

      </section>

      {/* How it Works */}

      <section className="container mt-5">

        <h2 className="section-title">
          How It Works
        </h2>

        <div className="row text-center">

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1>1️⃣</h1>
              <h5>Create Account</h5>
              <p>Register as a customer.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1>2️⃣</h1>
              <h5>Browse Restaurants</h5>
              <p>Explore available restaurants.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1>3️⃣</h1>
              <h5>Book Table</h5>
              <p>Select your table and reserve.</p>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow p-4">
              <h1>4️⃣</h1>
              <h5>Enjoy Food</h5>
              <p>Visit and enjoy your meal.</p>
            </div>
          </div>

        </div>

      </section>

      {/* Popular Restaurants */}

      <section className="container mt-5 mb-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="section-title mb-0">
            Popular Restaurants
          </h2>

          <Link
            to="/restaurants"
            className="btn btn-warning"
          >
            View All
          </Link>

        </div>

        <div className="row">

          {restaurants.map((restaurant) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={restaurant._id}
            >

              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >

                <img
                  src={
                    restaurant.image
                      ? restaurant.image
                      : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                  }
                  className="card-img-top"
                  alt={restaurant.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h4>{restaurant.name}</h4>

                  <p className="text-muted">
                    {restaurant.cuisine}
                  </p>

                  <p>
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {restaurant.location}
                  </p>

                  <div className="mb-3">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>

                  <Link
                    to="/restaurants"
                    className="btn btn-warning mt-auto"
                  >
                    View Restaurant
                    <FaArrowRight className="ms-2" />
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>
    </>
  );
}

export default Home;