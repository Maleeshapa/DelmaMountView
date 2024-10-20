const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userTP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userNIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      userStatus: "Active",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
