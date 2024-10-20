const Package = require("../models/Package");

// Create a new package
const createPackage = async (req, res) => {
  try {
    const { packageName, bedType, packagePrice } = req.body;

    if (!packageName || !bedType || !packagePrice) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if a package with the same name already exists
    const existingPackage = await Package.findOne({
      where: { packageName },
    });

    if (existingPackage) {
      return res
        .status(400)
        .json({ error: "A package with this name already exists." });
    }

    // Create the new package
    const newPackage = await Package.create({
      packageName,
      bedType,
      packagePrice,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    // Handle validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation error: Please check the provided data.",
      });
    }

    // Handle unique constraint errors
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error:
          "Duplicate field value: A package with this name already exists.",
      });
    }

    // General error handling
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving packages: ${error.message}`,
    });
  }
};

// Get a single package by ID
const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving the package: ${error.message}`,
    });
  }
};

// Update a package
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName, bedType, packagePrice } = req.body;

    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    await package.update({
      packageName,
      bedType,
      packagePrice,
    });

    res.status(200).json(package);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation error: Please check the provided data.",
      });
    }
    res.status(500).json({
      error: `An error occurred while updating the package: ${error.message}`,
    });
  }
};

// Delete a package
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    await package.destroy();
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while deleting the package: ${error.message}`,
    });
  }
};



module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage, 
};
