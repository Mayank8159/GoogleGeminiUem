import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`px-4 pt-32 pb-16 min-h-screen overflow-x-hidden relative transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }`}
    >
      {/* Cosmic SVG Glow */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-80 h-80 blur-3xl"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="#ec4899" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-96 h-96 blur-3xl"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" fill="#8b5cf6" />
        </svg>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* 👤 Admin Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" // Replace with actual admin avatar
            alt="Admin Avatar"
            className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Welcome back, <span className="text-indigo-500">Admin</span>
            </h2>
            <p className="text-sm text-gray-400">
              Manage your community with cosmic precision
            </p>
          </div>
        </motion.div>

        {/* 🚀 Dashboard Card */}
        <div
          className={`backdrop-blur-md rounded-2xl p-8 shadow-xl text-center ${
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-white/80 border border-gray-300"
          }`}
        >
          <h1
            className={`text-2xl sm:text-4xl font-bold mb-8 ${
              isDark ? "text-indigo-300" : "text-indigo-700"
            }`}
            style={{
              textShadow: isDark ? "0 0 12px rgba(99,102,241,0.7)" : "none",
            }}
          >
            Admin Dashboard
          </h1>

          <div className="space-y-6">
            {/* Events Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(99,102,241,0.6)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate("/admin/events")}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg transition"
            >
              <CalendarDaysIcon className="h-6 w-6" />
              Manage Events
            </motion.button>

            {/* Teams Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(236,72,153,0.6)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate("/admin/teams")}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg transition"
            >
              <UsersIcon className="h-6 w-6" />
              Manage Teams
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
