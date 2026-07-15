import { useEffect, useState } from "react";
import axios from "axios";

function MyReservations() {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem("token");

  // Load reservations
  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservations(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Cancel reservation
  const cancelReservation = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmCancel) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/reservations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Reservation cancelled successfully");

      fetchReservations();
    } catch (error) {
      console.log(error);
      alert("Unable to cancel reservation");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Reservations</h2>

      {reservations.length === 0 ? (
        <h4 className="text-center">No Reservations Found</h4>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="card shadow mb-3"
          >
            <div className="card-body">
              <h4>{reservation.restaurant.name}</h4>

              <p>
                <strong>Location:</strong>{" "}
                {reservation.restaurant.location}
              </p>

              <p>
                <strong>Table:</strong>{" "}
                {reservation.table.tableNumber}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {reservation.table.capacity}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {reservation.reservationDate.substring(0, 10)}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {reservation.reservationTime}
              </p>

              <p>
                <strong>Guests:</strong>{" "}
                {reservation.guests}
              </p>

              <button
                className="btn btn-danger"
                onClick={() =>
                  cancelReservation(reservation._id)
                }
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyReservations;