import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import RestaurantCard from "../components/RestaurantCard";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaSortAlphaDown,
} from "react-icons/fa";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");
      setRestaurants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Unique Cuisine List
  const cuisines = [...new Set(restaurants.map(r => r.cuisine).filter(Boolean))];

  // Unique Location List
  const locations = [...new Set(restaurants.map(r => r.location).filter(Boolean))];

  // Apply Filters
  const filteredRestaurants = useMemo(() => {
    let data = [...restaurants];

    // Search
    if (search) {
      data = data.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Cuisine
    if (cuisine) {
      data = data.filter(
        (restaurant) => restaurant.cuisine === cuisine
      );
    }

    // Location
    if (location) {
      data = data.filter(
        (restaurant) => restaurant.location === location
      );
    }

    // Sorting
    if (sort === "az") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "za") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [restaurants, search, cuisine, location, sort]);

  const clearFilters = () => {
    setSearch("");
    setCuisine("");
    setLocation("");
    setSort("");
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center fw-bold mb-4">
        🍽 Restaurants
      </h2>

      {/* Filter Section */}

      <div className="card shadow-lg border-0 mb-5">

        <div className="card-body">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-4">

              <div className="input-group">

                <span className="input-group-text bg-warning text-dark">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Restaurant..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            {/* Cuisine */}

            <div className="col-md-2">

              <select
                className="form-select"
                value={cuisine}
                onChange={(e) =>
                  setCuisine(e.target.value)
                }
              >
                <option value="">Cuisine</option>

                {cuisines.map((item) => (
                  <option key={item}>{item}</option>
                ))}

              </select>

            </div>

            {/* Location */}

            <div className="col-md-2">

              <select
                className="form-select"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >
                <option value="">Location</option>

                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}

              </select>

            </div>

            {/* Sort */}

            <div className="col-md-2">

              <select
                className="form-select"
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="">Sort</option>
                <option value="az">
                  A - Z
                </option>
                <option value="za">
                  Z - A
                </option>
              </select>

            </div>

            {/* Clear */}

            <div className="col-md-2">

              <button
                className="btn btn-danger w-100"
                onClick={clearFilters}
              >
                <FaTimes className="me-2" />
                Clear
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Results */}

      <div className="mb-3">

        <h5>
          Showing{" "}
          <span className="text-primary">
            {filteredRestaurants.length}
          </span>{" "}
          Restaurants
        </h5>

      </div>

      {/* Restaurant Cards */}

      <div className="row">

        {filteredRestaurants.length > 0 ? (

          filteredRestaurants.map((restaurant) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={restaurant._id}
            >

              <RestaurantCard
                restaurant={restaurant}
              />

            </div>

          ))

        ) : (

          <div className="text-center mt-5">

            <FaFilter
              size={70}
              className="text-secondary mb-3"
            />

            <h3>No Restaurants Found</h3>

            <p className="text-muted">
              Try changing the search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Restaurants;