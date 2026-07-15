import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await API.get(`/restaurants/${id}`);
      setRestaurant(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!restaurant) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2>{restaurant.name}</h2>

        <p>
          <strong>Cuisine:</strong> {restaurant.cuisine}
        </p>

        <p>
          <strong>Location:</strong> {restaurant.location}
        </p>

        <p>
          <strong>Address:</strong> {restaurant.address}
        </p>

        <p>
          <strong>Opening Time:</strong> {restaurant.openingTime}
        </p>

        <p>
          <strong>Closing Time:</strong> {restaurant.closingTime}
        </p>

        <p>{restaurant.description}</p>

        <h5>⭐ {restaurant.rating}</h5>

        <Link
          className="btn btn-success mt-3"
          to={`/reservation/${restaurant._id}`}
        >
          Book Table
        </Link>

      </div>
    </div>
  );
}

export default RestaurantDetails;