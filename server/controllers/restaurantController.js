const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      cuisine,
      location,
      address,
      openingTime,
      closingTime,
      description,
      image,
    } = req.body;

    if (
      !name ||
      !cuisine ||
      !location ||
      !address ||
      !openingTime ||
      !closingTime
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const restaurant = await Restaurant.create({
      name,
      cuisine,
      location,
      address,
      openingTime,
      closingTime,
      description,
      image,
    });

    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Restaurant
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    await Restaurant.findByIdAndDelete(req.params.id);

    res.json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
};