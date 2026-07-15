const Reservation = require("../models/Reservation");

// Create Reservation
const createReservation = async (req, res) => {
  try {
    const {
      restaurant,
      table,
      reservationDate,
      reservationTime,
      guests,
    } = req.body;

    const customer = req.user._id;

    // Check if table is already booked
    const existingReservation = await Reservation.findOne({
      table,
      reservationDate,
      reservationTime,
      status: "Booked",
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "This table is already booked for the selected date and time.",
      });
    }

    const reservation = await Reservation.create({
      customer,
      restaurant,
      table,
      reservationDate,
      reservationTime,
      guests,
    });

    res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Logged-in User Reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      customer: req.user._id,
    })
      .populate("restaurant", "name location")
      .populate("table", "tableNumber capacity");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Cancel Reservation
// Cancel Reservation
const cancelReservation = async (req, res) => {
  try {
    // Find reservation by ID
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    // Debug logs
    console.log("Reservation Customer:", reservation.customer.toString());
    console.log("Logged In User:", req.user._id.toString());

    // Check ownership
    if (reservation.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Delete reservation
    await Reservation.findByIdAndDelete(req.params.id);

    res.json({
      message: "Reservation cancelled successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getReservations,
  cancelReservation,
};