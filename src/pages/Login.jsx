import React from 'react';

export default function Login({ onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (name === 'admin' && password === 'admin') {
      onLogin({
        name: 'Admin User',
        initials: 'AU',
        email: 'admin@moomap.local',
      });
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-8 rounded w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">MooMap — Login</h1>
        <input
          name="username"
          placeholder="Username"
          defaultValue="admin"
          className="border p-2 rounded w-full mb-3"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          defaultValue="admin"
          className="border p-2 rounded w-full mb-3"
        />
        <button className="bg-sky-600 text-white p-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
}
