const Table = require("../models/Table");

// Create Table
const createTable = async (req, res) => {
  try {
    const { restaurant, tableNumber, capacity } = req.body;

    if (!restaurant || !tableNumber || !capacity) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingTable = await Table.findOne({
      restaurant,
      tableNumber,
    });

    if (existingTable) {
      return res.status(400).json({
        message: "Table already exists for this restaurant",
      });
    }

    const table = await Table.create({
      restaurant,
      tableNumber,
      capacity,
    });

    res.status(201).json({
      message: "Table created successfully",
      table,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Tables
const getTables = async (req, res) => {
  try {
    const tables = await Table.find().populate(
      "restaurant",
      "name location"
    );

    res.json(tables);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get Tables By Restaurant
const getTablesByRestaurant = async (req, res) => {
  try {
    const tables = await Table.find({
      restaurant: req.params.restaurantId,
      status: "Available",
    });

    res.json(tables);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get Single Table
const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate(
      "restaurant",
      "name location"
    );

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    res.json(table);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete Table
const deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    await Table.findByIdAndDelete(req.params.id);

    res.json({
      message: "Table deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createTable,
  getTables,
  getTablesByRestaurant,
  getTableById,
  deleteTable,
};