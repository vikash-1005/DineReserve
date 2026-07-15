import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function Reservation() {
  const { id } = useParams(); // Restaurant ID
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);

  const [formData, setFormData] = useState({
    restaurant: id,
    table: "",
    reservationDate: "",
    reservationTime: "",
    guests: 1,
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await API.get(`/tables/restaurant/${id}`);
      setTables(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reservations", formData);

      alert(res.data.message);

      navigate("/my-reservations");
    } catch (error) {
      alert(error.response?.data?.message || "Reservation Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Book Table</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Select Table</label>

          <select
            className="form-select"
            name="table"
            onChange={handleChange}
            required
          >
            <option value="">Choose Table</option>

            {tables.map((table) => (
              <option key={table._id} value={table._id}>
                Table {table.tableNumber} (Capacity {table.capacity})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Date</label>

          <input
            className="form-control"
            type="date"
            name="reservationDate"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Time</label>

          <input
            className="form-control"
            type="time"
            name="reservationTime"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Guests</label>

          <input
            className="form-control"
            type="number"
            name="guests"
            min="1"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100">
          Book Reservation
        </button>

      </form>
    </div>
  );
}

export default Reservation;