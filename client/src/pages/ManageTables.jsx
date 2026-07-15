import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaChair,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";

function ManageTables() {
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);

  const [form, setForm] = useState({
    restaurant: "",
    tableNumber: "",
    capacity: "",
  });

  useEffect(() => {
    fetchRestaurants();
    fetchTables();
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

  const fetchTables = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tables"
      );

      setTables(res.data);
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

  const addTable = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tables",
        form
      );

      alert("Table Added Successfully");

      setForm({
        restaurant: "",
        tableNumber: "",
        capacity: "",
      });

      fetchTables();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to add table"
      );
    }
  };

  const deleteTable = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tables/${id}`
      );

      alert("Table deleted successfully");

      fetchTables();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete table"
      );
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center fw-bold mb-4">
        🪑 Manage Tables
      </h2>

      {/* Add Table */}

      <div className="card shadow-lg border-0 mb-5">

        <div className="card-header bg-primary text-white">
          <h4>
            <FaPlus className="me-2" />
            Add New Table
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={addTable}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <select
                  className="form-select"
                  name="restaurant"
                  value={form.restaurant}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Restaurant
                  </option>

                  {restaurants.map((restaurant) => (
                    <option
                      key={restaurant._id}
                      value={restaurant._id}
                    >
                      {restaurant.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="col-md-4 mb-3">

                <input
                  type="number"
                  className="form-control"
                  placeholder="Table Number"
                  name="tableNumber"
                  value={form.tableNumber}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <input
                  type="number"
                  className="form-control"
                  placeholder="Capacity"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button className="btn btn-success">
              <FaPlus className="me-2" />
              Add Table
            </button>

          </form>

        </div>

      </div>

      {/* Tables */}

      <div className="row">

        {tables.length === 0 ? (
          <div className="text-center">
            <h4>No Tables Available</h4>
          </div>
        ) : (
          tables.map((table) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={table._id}
            >

              <div
                className="card shadow border-0 h-100"
                style={{
                  borderRadius: "20px",
                }}
              >

                <div className="card-body">

                  <div className="text-center mb-3">
                    <FaChair
                      size={55}
                      className="text-primary"
                    />
                  </div>

                  <h4 className="text-center">
                    Table {table.tableNumber}
                  </h4>

                  <hr />

                  <p>
                    <strong>Restaurant:</strong>
                    <br />
                    {table.restaurant?.name}
                  </p>

                  <p>
                    <strong>Capacity:</strong>
                    <br />
                    {table.capacity} Guests
                  </p>

                  <p>
                    <strong>Status:</strong>
                  </p>

                  {table.status === "Available" ? (
                    <span className="badge bg-success">
                      <FaCheckCircle className="me-1" />
                      Available
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      <FaTimesCircle className="me-1" />
                      Reserved
                    </span>
                  )}

                  <div className="mt-4">

                    <button
                      className="btn btn-danger w-100"
                      onClick={() =>
                        deleteTable(table._id)
                      }
                    >
                      <FaTrash className="me-2" />
                      Delete Table
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default ManageTables;