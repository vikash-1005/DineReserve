const express = require("express");

const {
  createTable,
  getTables,
  getTableById,
  getTablesByRestaurant,
  deleteTable,
} = require("../controllers/tableController");

const router = express.Router();

// Create Table
router.post("/", createTable);

// Get All Tables
router.get("/", getTables);

// IMPORTANT: This route MUST come before "/:id"
router.get("/restaurant/:restaurantId", getTablesByRestaurant);

// Get Single Table
router.get("/:id", getTableById);

// Delete Table
router.delete("/:id", deleteTable);

module.exports = router;