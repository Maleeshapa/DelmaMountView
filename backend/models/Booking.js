const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index"); // Adjust the path as needed
const Customer = require("./Customers");

const Booking = sequelize.define(
  "Booking",
  {
    bookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cusFullName: {
      type: DataTypes.STRING(150),
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
    cusCheckIn: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cusCheckOut: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    numberOfPersons: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    payMethod: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    payStatus: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "Pending",
    },
    status:{
      type:DataTypes.STRING(45),
      allowNull:false,
      defaultValue: "Pending",
    },
    // Foreign key to the customer table
    customers_customersId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customersId",
      },
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

// Define relationship with Customer model
Booking.belongsTo(Customer, {
  foreignKey: "customers_customersId",
  as: "customer",
});

module.exports = Booking;
