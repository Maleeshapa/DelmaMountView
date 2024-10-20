const Booking = require("../models/Booking");
const Customer = require("../models/Customers");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
      cusCheckIn,
      cusCheckOut,
      numberOfPersons,
      roomType,
      payMethod,
    } = req.body;

    if (!cusFullName || !cusNIC || !cusTP || !cusEmail || !cusAddress) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if a customer with the same NIC already exists
    const existingCustomer = await Customer.findOne({ where: { cusNIC } });
    let customerId;
    if (existingCustomer) {
      customerId = existingCustomer.customersId;
    } else {
      // If customer doesn't exist, create a new one
      const newCustomer = await Customer.create({
        cusFullName,
        cusNIC,
        cusTP,
        cusEmail,
        cusAddress,
      });
      customerId = newCustomer.customersId;
    }

    // Create a new booking without roomNumber and payStatus
    const newBooking = await Booking.create({
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
      cusCheckIn,
      cusCheckOut,
      numberOfPersons,
      roomType,
      payMethod,
      customers_customersId: customerId,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Detailed validation error:", error);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: Please check the provided data." });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error:
          "Duplicate field value: A user with this email or NIC already exists.",
      });
    }

    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: Customer, as: "customer" }],
    });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, {
      include: [{ model: Customer, as: "customer" }],
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Booking (Booking details only)
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
      cusCheckIn,
      cusCheckOut,
      numberOfPersons,
      roomType,
      roomNumber,
      payMethod,
      payStatus,
    } = req.body;

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update only the booking-specific fields
    await booking.update({
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
      cusCheckIn,
      cusCheckOut,
      numberOfPersons,
      roomType,
      roomNumber,
      payMethod,
      payStatus,
    });

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete a Booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await booking.destroy();
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Count total bookings
const countBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.count();
    console.log(`Total bookings: ${totalBookings}`);
    return res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error counting bookings:", error);
    return res.status(500).json({ error: error.message });
  }
};

const BookingCalendar = async (req, res) => {
  try {
    // Fetch all bookings from the database
    const bookings = await Booking.findAll(); 

    // Check if there are no bookings
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Create calendar events for all bookings
    const calendarEvents = bookings.map((booking) => ({
      title: `Reservation for ${booking.cusFullName}`,
      start: booking.cusCheckIn,
      end: booking.cusCheckOut,
    }));

    console.log("Passing to calendar:", calendarEvents);

    // Respond with the events
    res.status(200).json({
      message: "All bookings successfully passed to calendar",
      events: calendarEvents,
    });
  } catch (error) {
    console.error("Error passing bookings to calendar:", error);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  countBookings,
  BookingCalendar,
};
