import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Quick check: token exists → show panel
      // The server will reject expired tokens on actual requests
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <AdminPanel onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default AdminPage;
