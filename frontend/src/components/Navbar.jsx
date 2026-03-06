import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../services/auth.js';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Full Stack App</div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;

