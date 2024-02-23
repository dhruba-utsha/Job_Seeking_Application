import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobSeekerHome = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Redirect to login page if user is not authorized
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Job Seeker Home</h1>
    </div>
  );
};

export default JobSeekerHome;
