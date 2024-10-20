const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./index");
const UserController = require("./controller/UserController");
const RoomController = require("./controller/RoomController");
const CustomerController = require("./controller/CustomersController");
const PackageController = require("./controller/PackageController");
const BookingController = require("./controller/BookingController");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User Routes
app.post("/user", UserController.createUser);
app.get("/user", UserController.getAllUsers);
app.get("/user/:id", UserController.getUserById);
app.put("/user/:id", UserController.updateUser);
app.delete("/user/:id", UserController.deleteUser);
app.post("/loginUser", UserController.loginUser);
app.get("/user/count", UserController.countUsers);

// Room Routes
app.post("/rooms", RoomController.createRoom);
app.get("/rooms", RoomController.getAllRooms);
app.get("/rooms/:id", RoomController.getRoomById);
app.put("/rooms/:id", RoomController.updateRoom);
app.delete("/rooms/:id", RoomController.deleteRoom);

// Room Routes
app.post("/customer", CustomerController.createCustomer);
app.get("/customer", CustomerController.getAllCustomers);
app.get("/customer/:id", CustomerController.getCustomerById);
app.put("/customer/:id", CustomerController.updateCustomer);
app.delete("/customer/:id", CustomerController.deleteCustomer);

//Package Routes
app.post("/packages", PackageController.createPackage);
app.get("/packages", PackageController.getAllPackages);
app.get("/packages/:id", PackageController.getPackageById);
app.put("/packages/:id", PackageController.updatePackage);
app.delete("/packages/:id", PackageController.deletePackage);

//Booking Routes
app.post("/booking", BookingController.createBooking);
app.get("/booking", BookingController.getAllBookings);
app.get("/booking/:id", BookingController.getBookingById);
app.put("/booking/:id", BookingController.updateBooking);
app.delete("/booking/:id", BookingController.deleteBooking);
app.get("booking/count", BookingController.countBookings);
app.post("/booking/calendar",BookingController.BookingCalendar);

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
