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

  const BACKEND_URL = "https://googlegeminiuem.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, form);
      const token = res.data.token;

      // Store token for protected routes
      localStorage.setItem("adminToken", token);
      setError("");

      // Connect to WebSocket with token
      const socket = io(BACKEND_URL, {
        auth: { token },
      });

      // Optional: Listen for confirmation or errors
      socket.on("connect", () => {
        console.log("🟢 Admin socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("⚠️ Socket connection failed:", err.message);
      });

      // Redirect to admin event panel
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <main className={`px-4 pt-36 pb-20 min-h-screen relative transition-colors duration-500
      ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
        : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
    `}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl"
      >
        <h2
          className={`text-2xl sm:text-3xl font-bold text-center mb-6
            ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "text-indigo-300"
              : "text-indigo-700"}
          `}
          style={{ textShadow: theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "0 0 12px rgba(99,102,241,0.7)" : "none" }}
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
              ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "bg-white/10 text-white placeholder-gray-400"
                : "bg-white/80 text-black placeholder-black/50"}
            `}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500
              ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "bg-white/10 text-white placeholder-gray-400"
                : "bg-white/80 text-black placeholder-black/50"}
            `}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition"
          >
            Login
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>
      </motion.div>
    </main>
  );
}