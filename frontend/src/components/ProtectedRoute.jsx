import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (token && allowedRoles.includes(userType)) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
