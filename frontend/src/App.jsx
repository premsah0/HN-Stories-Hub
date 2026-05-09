import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Bookmarks from './pages/Bookmarks';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="loader"></div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/bookmarks" 
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default App;
