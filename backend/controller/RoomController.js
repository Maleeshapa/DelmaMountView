const Room = require("../models/Room");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, bedType, roomCapacity, price } = req.body;

    // Check if all required fields are present
    if (!roomNumber || !roomType || !bedType || !roomCapacity || !price) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new room with status always set to "Active"
    const newRoom = await Room.create({
      roomNumber,
      roomType,
      bedType,
      roomCapacity,
      price,
      status: "Active", 
    });

    // Return the newly created room with status 201
    res.status(201).json(newRoom);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: Please check the provided data." });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Duplicate field value: A room with this number already exists.",
      });
    }
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Get a single room by ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Update a room
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNumber, roomType, bedType, roomCapacity, price } = req.body;

    // Find the room by primary key (ID)
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Update the room details, excluding `status`
    await room.update({
      roomNumber,
      roomType,
      bedType,
      roomCapacity,
      price,
    });

    // Return the updated room
    res.status(200).json(room);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: Please check the provided data." });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Duplicate field value: A room with this number already exists.",
      });
    }
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await room.destroy();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
