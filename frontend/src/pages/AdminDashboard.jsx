import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`px-4 pt-36 pb-16 min-h-screen overflow-x-hidden relative transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0B1519] via-[#1A2F37] to-[#25424D] text-white"
          : "bg-gradient-to-br from-[#f0f3f6] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }`}
    >
      {/* Professional Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(244, 180, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-5xl sm:text-6xl font-extrabold mb-3 tracking-tight ${
            isDark ? "" : "text-black"
          }`}
            style={
              isDark
                ? {
                    background: "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
                : { color: "#222" }
            }
          >
            Admin Dashboard
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? "text-white/80" : "text-black/80"}`}>
            Manage your community with precision and ease
          </p>
        </motion.div>

        {/* Admin Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 border-t border-l ${
            isDark
              ? "bg-gradient-to-br from-white/8 to-white/3 border-white/20"
              : "bg-gradient-to-br from-white/90 to-white/70 border-gray-200/60"
          }`}
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4"
            >
              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-[#4285F4] to-[#F4B400] flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">A</span>
              </div>
            </motion.div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              Welcome back!
            </h2>
            <p className={`text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
              You have full access to community management tools
            </p>
          </div>
        </motion.div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Events Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <button
              onClick={() => navigate("/admin/events")}
              className={`w-full backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t border-l ${
                isDark
                  ? "bg-gradient-to-br from-white/8 to-white/3 border-white/20 hover:bg-white/12"
                  : "bg-gradient-to-br from-white/80 to-white/60 border-gray-200/60 hover:bg-white/90"
              }`}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="inline-block mb-4 p-3 rounded-lg bg-gradient-to-br from-[#4285F4] to-[#F4B400] shadow-lg"
              >
                <Calendar size={32} color="white" strokeWidth={2} />
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Manage Events
              </h3>
              <p className={`text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
                Create, edit, and delete community events
              </p>
            </button>
          </motion.div>

          {/* Teams Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <button
              onClick={() => navigate("/admin/teams")}
              className={`w-full backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-t border-l ${
                isDark
                  ? "bg-gradient-to-br from-white/8 to-white/3 border-white/20 hover:bg-white/12"
                  : "bg-gradient-to-br from-white/80 to-white/60 border-gray-200/60 hover:bg-white/90"
              }`}
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="inline-block mb-4 p-3 rounded-lg bg-gradient-to-br from-[#0F9D58] to-[#4285F4] shadow-lg"
              >
                <Users size={32} color="white" strokeWidth={2} />
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Manage Teams
              </h3>
              <p className={`text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
                Oversee team members and roles
              </p>
            </button>
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
            className={`w-full backdrop-blur-md rounded-xl p-4 border-2 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isDark
                ? "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                : "bg-white/70 text-gray-900 border-gray-300 hover:bg-white hover:border-gray-400"
            }`}
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>
      </div>
    </main>
  );
}
