import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function AdminLogin() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, form);
      const token = res.data.token;

      // ✅ Store admin details & token
      localStorage.setItem("adminToken", token);
      localStorage.setItem("token", token); // for universal checks in Navbar
      localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));

      setError("");

      // ✅ Connect to WebSocket using token
      const socket = io(BACKEND_URL, {
        auth: { token },
      });

      socket.on("connect", () => {
        console.log("🟢 Admin socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("⚠️ Socket connection failed:", err.message);
      });

      // ✅ Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`px-4 pt-36 pb-20 min-h-screen relative transition-colors duration-500
      ${
        isDark
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }
    `}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`max-w-md mx-auto rounded-2xl p-6 sm:p-8 border shadow-xl backdrop-blur-md ${
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold text-center mb-6 ${
            isDark ? "text-indigo-300" : "text-indigo-700"
          }`}
          style={{
            textShadow: isDark
              ? "0 0 12px rgba(99,102,241,0.7)"
              : "none",
          }}
        >
          Admin Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${
                isDark
                  ? "bg-white/10 text-white placeholder-gray-400"
                  : "bg-white/80 text-black placeholder-black/50"
              }`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${
                isDark
                  ? "bg-white/10 text-white placeholder-gray-400"
                  : "bg-white/80 text-black placeholder-black/50"
              }`}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition"
          >
            Login
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </div>
      </motion.div>
    </main>
  );
}
