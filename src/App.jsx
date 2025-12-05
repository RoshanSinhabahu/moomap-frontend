import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return loggedIn ? (
    <Dashboard
      user={user}
      onLogout={() => {
        setLoggedIn(false);
        setUser(null);
      }}
    />
  ) : (
    <Login
      onLogin={(userData) => {
        setUser(userData);
        setLoggedIn(true);
      }}
    />
  );
}
