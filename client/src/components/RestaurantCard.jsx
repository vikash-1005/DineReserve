import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={
          restaurant.image ||
          "https://via.placeholder.com/400x250?text=Restaurant"
        }
        className="card-img-top"
        alt={restaurant.name}
      />

      <div className="card-body">
        <h5>{restaurant.name}</h5>

        <p>
          <strong>Cuisine:</strong> {restaurant.cuisine}
        </p>

        <p>
          <strong>Location:</strong> {restaurant.location}
        </p>

        <p>
          ⭐ {restaurant.rating}
        </p>

        <Link
          className="btn btn-primary"
          to={`/restaurants/${restaurant._id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;