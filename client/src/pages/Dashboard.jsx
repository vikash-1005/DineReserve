import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaChair,
  FaCalendarCheck,
  FaArrowRight,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="container mt-4">

      <h2 className="fw-bold text-center mb-5">
        👨‍💼 Admin Dashboard
      </h2>

      <div className="row g-4">

        {/* Restaurants */}

        <div className="col-md-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{
              background: "linear-gradient(135deg,#ff9966,#ff5e62)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body text-center">

              <FaUtensils size={50} />

              <h3 className="mt-3">Restaurants</h3>

              <p>
                Add and manage restaurants.
              </p>

              <Link
                to="/dashboard/restaurants"
                className="btn btn-light"
              >
                Manage
                <FaArrowRight className="ms-2" />
              </Link>

            </div>
          </div>
        </div>

        {/* Tables */}

        <div className="col-md-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{
              background: "linear-gradient(135deg,#36d1dc,#5b86e5)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body text-center">

              <FaChair size={50} />

              <h3 className="mt-3">Tables</h3>

              <p>
                Manage restaurant tables.
              </p>

              <Link
                to="/dashboard/tables"
                className="btn btn-light"
              >
                Manage
                <FaArrowRight className="ms-2" />
              </Link>

            </div>
          </div>
        </div>

        {/* Reservations */}

        <div className="col-md-4">
          <div
            className="card text-white shadow-lg border-0"
            style={{
              background: "linear-gradient(135deg,#11998e,#38ef7d)",
              borderRadius: "20px",
            }}
          >
            <div className="card-body text-center">

              <FaCalendarCheck size={50} />

              <h3 className="mt-3">Reservations</h3>

              <p>
                Monitor customer bookings.
              </p>

              <button
                className="btn btn-light"
                disabled
              >
                Coming Soon
              </button>

            </div>
          </div>
        </div>

      </div>

      {/* Welcome */}

      <div className="card shadow-lg border-0 mt-5">
        <div className="card-body">

          <h4>Welcome Admin 👋</h4>

          <p className="text-muted mb-0">
            Use the dashboard to manage restaurants,
            tables and monitor reservations. This panel
            gives you complete control over the
            DineReserve system.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;