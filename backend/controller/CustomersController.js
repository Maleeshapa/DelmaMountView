const { Op } = require("sequelize");
const Customer = require("../models/Customers.js");

// Create a new customer
const createCustomer = async (req, res = null) => {
  try {
    const { cusFullName, cusNIC, cusTP, cusEmail, cusAddress } = req.body;

    // Check if all required fields are provided
    if (!cusFullName || !cusNIC || !cusTP || !cusEmail || !cusAddress) {
      const errorMsg = "All fields are required.";
      if (res) {
        return res.status(400).json({ error: errorMsg });
      } else {
        throw new Error(errorMsg);
      }
    }

    // Check if the customer already exists based on email and NIC
    const existingCustomer = await Customer.findOne({
      where: { cusEmail, cusNIC },
    });

    // If the customer exists, return their customersId
    if (existingCustomer && existingCustomer.customersId) {
      return { customersId: existingCustomer.customersId };
    }

    // Create a new customer
    const newCustomer = await Customer.create({
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
    });

    // Ensure the new customer object has the customersId
    if (newCustomer && newCustomer.customersId) {
      return { customersId: newCustomer.customersId };
    }

    // If customersId is still not available, return an error
    const errorMsg = "Customer ID could not be retrieved.";
    if (res) {
      return res.status(500).json({ error: errorMsg });
    } else {
      throw new Error(errorMsg);
    }
  } catch (error) {
    // Handle known Sequelize validation errors
    if (res) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: "Validation error: Please check the provided data.",
        });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          error:
            "Duplicate field value: A customer with this email or NIC already exists.",
        });
      }
      // Handle other unexpected errors
      return res
        .status(500)
        .json({ error: `An error occurred: ${error.message}` });
    } else {
      throw error;
    }
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { cusFullName, cusNIC, cusTP, cusEmail, cusAddress } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.update({
      cusFullName,
      cusNIC,
      cusTP,
      cusEmail,
      cusAddress,
    });

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.destroy();
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
