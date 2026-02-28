import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
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
    } finally {
      setLoading(false);
    }
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`px-4 pt-36 pb-20 min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530]"
          : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef]"
      }`}
    >
      {/* Animated Radial Gradient Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.3), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(244, 180, 0, 0.3), transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(15, 157, 88, 0.3), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.3), transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Gradient Accent Orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #4285F4, #F4B400)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Logo/Icon */}
        <motion.div
          className={`w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center ${
            isDark ? "bg-white/10" : "bg-white/60"
          } backdrop-blur-xl border-2 ${
            isDark ? "border-white/20" : "border-gray-300"
          }`}
          animate={{
            boxShadow: [
              "0 0 20px rgba(66, 133, 244, 0.5)",
              "0 0 30px rgba(244, 180, 0, 0.5)",
              "0 0 25px rgba(15, 157, 88, 0.5)",
              "0 0 20px rgba(66, 133, 244, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-10 h-10" style={{ color: "#4285F4" }} />
        </motion.div>

        {/* Admin Login Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-4xl sm:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] bg-clip-text text-transparent`}
        >
          Admin Portal
        </motion.h1>

        <p
          className={`text-center mb-8 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Access your administrative dashboard
        </p>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`rounded-3xl p-8 backdrop-blur-xl border shadow-2xl ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "#4285F4" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#4285F4] focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 outline-none transition-all ${
                  isDark
                    ? "bg-white/5 text-white placeholder-gray-400"
                    : "bg-white/80 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "#DB4437" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 border-[#DB4437] focus:border-[#DB4437] focus:ring-2 focus:ring-[#DB4437]/20 outline-none transition-all ${
                  isDark
                    ? "bg-white/5 text-white placeholder-gray-400"
                    : "bg-white/80 text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-[0_0_30px_rgba(66,133,244,0.5)]"
              }`}
              style={{
                background: "linear-gradient(135deg, #4285F4, #F4B400)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </motion.button>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  isDark
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                <p className="text-sm text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {error}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
