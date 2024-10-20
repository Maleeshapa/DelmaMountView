const User = require("../models/User");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// Create a new user
const createUser = async (req, res) => {
  try {
    const {
      userName,
      userType,
      userPassword,
      userTP,
      userNIC,
      userEmail,
      userAddress,
    } = req.body;

    if (
      !userName ||
      !userType ||
      !userPassword ||
      !userTP ||
      !userNIC ||
      !userEmail ||
      !userAddress
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if a user with the same NIC already exists
    const existingUser = await User.findOne({ where: { userNIC } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with this NIC already exists." });
    }

    const newUser = await User.create({
      userName,
      userType,
      userPassword,
      userTP,
      userNIC,
      userEmail,
      userAddress,
      userStatus: "Active",
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error: Please check the provided data." });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error:
          "Duplicate field value: A user with this email or username already exists.",
      });
    }

    res.status(400).json({ error: `An error occurred: ${error.message}` });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userName,
      userType,
      userPassword,
      userTP,
      userNIC,
      userEmail,
      userAddress,
      userStatus,
    } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({
      userName,
      userType,
      userPassword,
      userTP,
      userNIC,
      userEmail,
      userAddress,
      userStatus,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;

    if (!userName || !userPassword) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.userPassword !== userPassword) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        userType: user.userType,
      },
      secretKey,
      { expiresIn: "6h" }
    );

    // Respond with the token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        userName: user.userName,
        userType: user.userType,
        userEmail: user.userEmail,
      },
    });
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

const countUsers = async (req, res) => {
  try {
    const count = await User.count();
    console.log("Total users:", count);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  countUsers,
};
