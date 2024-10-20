const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Room = sequelize.define(
  "Room",
  {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomNumber: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    bedType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    roomCapacity: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  }
);

module.exports = Room;
