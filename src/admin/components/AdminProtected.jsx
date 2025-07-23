"use client";
import { useState, useEffect } from "react";
import { authUtils } from "@/lib/authUtils";
import AdminLogin from "./AdminLogin";

const AdminProtected = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const authenticated = authUtils.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authUtils.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-authenticated">
      {children}
      <button 
        onClick={handleLogout}
        className="admin-logout-btn"
        title="Logout"
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};

export default AdminProtected;
