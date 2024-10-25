// PrivateRoute.jsx
import React from 'react'; // Make sure to import React
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Optional but recommended

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  
  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the protected component
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;