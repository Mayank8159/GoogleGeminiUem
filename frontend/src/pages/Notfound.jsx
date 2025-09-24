import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Inline Icon component with glow
const Icon = ({ name, color = "currentColor", size = 24, strokeWidth = 2, glow = true }) => {
  const glowStyle = glow
    ? {
        filter: `drop-shadow(0 0 6px ${color})`,
        transition: "filter 0.3s ease",
      }
    : {};

  const icons = {
    info: (
      <div style={glowStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </div>
    ),
  };

  return icons[name] || null;
};

export default function NotFound() {
  const { theme } = useTheme();
  return (
    <main className={`px-6 py-20 sm:py-32 overflow-hidden relative h-screen flex items-center justify-center transition-colors duration-500
      ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
        : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
    `}>
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-red-500 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-yellow-500 blur-3xl -bottom-20 -right-20"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
          className="mb-6"
        >
          <div className="inline-block p-4 rounded-full bg-white/10 border border-white/20">
            <Icon name="info" color="#F4B400" glow />
          </div>
        </motion.div>

        <h1 className={`text-4xl sm:text-5xl font-bold font-outfit mb-4
          ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white" : "text-black"}`}
          style={{ textShadow: theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "0 0 15px rgba(255,255,255,0.8)" : "none" }}
        >
          404: Lost in the Cosmos
        </h1>
        <p className={`text-sm sm:text-base mb-6 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}>
          The page you're looking for isn't here. Maybe it drifted into a black hole or never existed at all.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg bg-[#4285F4] text-white font-medium shadow-md hover:bg-[#F4B400] transition"
          >
            Return to Earth
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}