import React from 'react';
import { Outlet , Navigate } from 'react-router-dom';
import { isAuthenticated } from './authh';


const PrivateRoute = () => {
    console.log(isAuthenticated)
    if (isAuthenticated()) {
      return <Outlet />;  // renders the child route component
    } else {
      return <Navigate to="/login" replace />;  // redirects to login
    }
  };

export default PrivateRoute;