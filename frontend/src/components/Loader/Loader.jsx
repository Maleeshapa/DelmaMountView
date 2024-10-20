import React from "react";
import "./Loader.css";
import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={logo} alt="Loading" className="loading-image" />
    </div>
  );
};

export default Loader;
