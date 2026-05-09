import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <Link to="/"><span>HN</span> Stories Hub</Link>
        </div>
        <div className="navbar-nav">
          {user ? (
            <>
              <Link to="/bookmarks" className="nav-link">Bookmarks</Link>
              <span className="nav-link" style={{ fontSize: '0.875rem' }}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
