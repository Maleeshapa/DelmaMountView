import React, { useState, useEffect } from "react";
import config from "../../config";

function AddUsers({ onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    userName: "",
    userType: "",
    userPassword: "",
    userTP: "",
    userNIC: "",
    userEmail: "",
    userAddress: "",
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form if editing an existing user
  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        userType: user.userType || "",
        userPassword: "",
        userTP: user.userTP || "",
        userNIC: user.userNIC || "",
        userEmail: user.userEmail || "",
        userAddress: user.userAddress || "",
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userName) {
      newErrors.userName = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.userName)) {
      newErrors.userName = "Full Name must contain only letters and spaces.";
    }

    if (!formData.userType) {
      newErrors.userType = "User Type is required.";
    }

    // Only validate password if creating a new user or changing password
    if (!user && !formData.userPassword) {
      newErrors.userPassword = "Password is required.";
    } else if (formData.userPassword && !passwordRegex.test(formData.userPassword)) {
      newErrors.userPassword =
        "Password must have at least 8 characters, including upper/lowercase letters, numbers, and special characters.";
    }

    if (!formData.userTP) {
      newErrors.userTP = "Mobile Number is required.";
    } else if (!mobileRegex.test(formData.userTP)) {
      newErrors.userTP = "Mobile Number must be exactly 10 digits.";
    }

    if (!formData.userNIC) {
      newErrors.userNIC = "NIC is required.";
    }

    if (!formData.userEmail) {
      newErrors.userEmail = "Email is required.";
    } else if (!emailRegex.test(formData.userEmail)) {
      newErrors.userEmail = "Invalid email format.";
    }

    if (!formData.userAddress) {
      newErrors.userAddress = "Address is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const method = user ? "PUT" : "POST";
        const url = user
          ? `${config.BASE_URL}/user/${user.userId}`
          : `${config.BASE_URL}/user`;

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          console.error("Error from API:", data);
          setErrors({ form: data.error || "Error occurred" });
        } else {
          const data = await response.json();
          setErrors({});
          onSave(data);
          onClose();
        }
      } catch (err) {
        console.error("Request failed with error:", err);
        setErrors({ form: "Failed to submit form. Check the console for more details." });
      }
    }
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userName">Full Name</h5>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              placeholder="Full Name"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && <small className="text-danger">{errors.userName}</small>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userType">User Type</h5>
            <select
              id="userType"
              name="userType"
              className="form-control"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            {errors.userType && <small className="text-danger">{errors.userType}</small>}
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="form-group">
          <h5 htmlFor="userPassword">Password</h5>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="form-control"
            placeholder="Enter Password"
            value={formData.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && <small className="text-danger">{errors.userPassword}</small>}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userTP">Mobile Number</h5>
            <input
              type="text"
              id="userTP"
              name="userTP"
              className="form-control"
              placeholder="Mobile Number"
              value={formData.userTP}
              onChange={handleChange}
            />
            {errors.userTP && <small className="text-danger">{errors.userTP}</small>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userNIC">NIC</h5>
            <input
              type="text"
              id="userNIC"
              name="userNIC"
              className="form-control"
              placeholder="NIC"
              value={formData.userNIC}
              onChange={handleChange}
            />
            {errors.userNIC && <small className="text-danger">{errors.userNIC}</small>}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userEmail">Email</h5>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="form-control"
              placeholder="Email"
              value={formData.userEmail}
              onChange={handleChange}
            />
            {errors.userEmail && <small className="text-danger">{errors.userEmail}</small>}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <h5 htmlFor="userAddress">Address</h5>
            <textarea
              id="userAddress"
              name="userAddress"
              className="form-control"
              rows="1"
              placeholder="Address"
              value={formData.userAddress}
              onChange={handleChange}
            ></textarea>
            {errors.userAddress && <small className="text-danger">{errors.userAddress}</small>}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
          Close
        </button>
        <button type="submit" className="btn btn-success">
          {user ? 'Update' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default AddUsers;
