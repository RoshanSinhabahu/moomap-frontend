import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/cowhead-logo.png";
import { HiArrowRight } from "react-icons/hi";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const mobile = e.target.username.value.trim(); // your API uses mobile
    const password = e.target.password.value.trim();

    try {
      const res = await fetch("http://213.199.51.193:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Check Mobile or Password");

      // Save user and token
      onLogin(data.user, data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f253a] to-[#0f3147] p-4">
      <div className="flex w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
        {/* LEFT PANEL */}
        <div className="relative w-1/2 bg-[#1b3e66] text-white p-10 flex flex-col justify-center overflow-hidden">
          {/* Circle Effects */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="flex flex-col z-10 mb-6 items-start">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <img src={Logo} className="p-1"></img>
            </div>
            <div className="text-3xl font-semibold">
              Intelligent Cattle Monitoring System
            </div>
            <div className="flex text-sm opacity-70 mt-2">
              By Devfox <br />
              University of Vavuniya
            </div>
          </div>
          <div className="flex w-full justify-center z-10 gap-4">
            <a href="https://moomap.app/" target="_blank">
              <div className="flex bg-white/10 w-full h-14 rounded-full items-center px-5 cursor-pointer hover:bg-white/20 transition duration-200 gap-4">
                <span className="flex-1 text-sm font-medium hover:underline">
                  Learn more about MooMap
                </span>

                <div className="flex h-10 w-10 bg-white/10 rounded-full items-center justify-center transition duration-200">
                  <HiArrowRight className="text-2xl" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 bg-white p-10">
          <h2 className="text-4xl font-semibold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">Login to continue</p>

          <form onSubmit={handleSubmit} className="h-full flex flex-col gap-3">
            <input
              name="username"
              placeholder="Mobile Number"
              defaultValue="0771234567"
              className="pl-6 border-2 rounded-full w-full h-10 focus:outline-none focus:ring-2 focus:ring-[#1b3e66]-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              defaultValue="12345678"
              className="pl-6 border-2 rounded-full w-full h-10 focus:outline-none focus:ring-2 focus:ring-[#1b3e66]-400"
            />

            <button className="text-[#1b3e66] hover:bg-[#1b3e66]/10 active:bg-[#1b3e66] active:text-white transition font-medium border-2 border-[#1b3e66] rounded-full w-full h-10 top-6 relative">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
