const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Package = sequelize.define(
  "Package",
  {
    packageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    packageName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bedType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    packagePrice: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "packages",
    timestamps: false,
  }
);

module.exports = Package;
