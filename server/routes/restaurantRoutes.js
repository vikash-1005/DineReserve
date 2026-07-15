const express = require("express");

const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/", createRestaurant);

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

router.delete("/:id", deleteRestaurant);

module.exports = router;