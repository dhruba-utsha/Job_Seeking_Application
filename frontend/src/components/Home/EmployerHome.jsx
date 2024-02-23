import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const EmployerHome = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Redirect to login page if user is not authorized
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Employer Home</h1>
    </div>
  );
};

export default EmployerHome
