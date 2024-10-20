const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Customer = sequelize.define(
  "Customer",
  {
    customersId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cusFullName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cusNIC: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cusTP: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cusEmail: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cusAddress: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
  }
);

module.exports = Customer;
