import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../pages/Navigation Bar/Navbar';
import LogIn from '../pages/Log In/LogIn';

function Home() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  // Redirect if logged in
  if (isLoggedIn) {
    return <Navigate to={`/SIS/${sessionStorage.getItem('role').toLowerCase()}`} />;
  }

  return (
    <div>
      <Navbar />
      <LogIn />
    </div>
  );
}

export default Home;
