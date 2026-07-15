const express = require("express");

const {
  createReservation,
  getReservations,
  cancelReservation,
} = require("../controllers/reservationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createReservation);

router.get("/", protect, getReservations);

router.delete("/:id", protect, cancelReservation);

module.exports = router;