import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Riple } from 'react-loading-indicators';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Optional: check localStorage for token on mount
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchCurrentUser(savedToken);
    } else {
      setChecking(false);
    }
  }, []);

  async function fetchCurrentUser(jwtToken) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.moomap.app/api";
    try {
      const res = await fetch(`${apiBaseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.warn(err);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setChecking(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  if (checking) return <div className="flex h-screen justify-center items-center"><Riple color="#1e4568ff" size="medium" text="" textColor="" /></div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLogin={(userData, jwtToken) => {
                  setUser(userData);
                  setToken(jwtToken);
                  localStorage.setItem("token", jwtToken);
                }}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} token={token} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
