import { useState, useEffect } from "react";
import {
  Home,
  MessageSquare,
  CalendarDays,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "Home", href: "/", icon: Home, color: "#4285F4" },
  { name: "Discussion", href: "/discussion", icon: MessageSquare, color: "#DB4437" },
  { name: "Events", href: "/events", icon: CalendarDays, color: "#F4B400" },
  { name: "Team", href: "/team", icon: Users, color: "#0F9D58" },
];

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Sync user state on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || "";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 backdrop-blur-xl border rounded-2xl px-6 py-4 transition-colors duration-500 ${
        theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.2)] text-white"
          : "bg-gradient-to-br from-white/50 to-gray-100/50 border-gray-300 shadow-[0_0_25px_rgba(0,0,0,0.1)] text-gray-800"
      }`}
    >
      {/* Top Row */}
  <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="flex items-center gap-4"
        >
          <img
            src="/main.png"
            alt="Gemini"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg hover:scale-105 transition cursor-pointer"
          />
        </motion.div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Nav */}
        <motion.div
          className="hidden sm:flex items-center gap-8 text-sm font-medium"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {navLinks.map(({ name, href, icon: Icon, color }) => (
            <motion.div
              key={name}
              variants={linkVariants}
              whileHover={{
                scale: 1.1,
                textShadow: `0 0 8px ${color}`,
                color,
              }}
            >
              <Link 
                to={href} 
                className={`flex items-center gap-1 transition ${
                  theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "text-white"
                    : "text-gray-800"
                }`}
                style={location.pathname === href ? { color } : {}}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            </motion.div>
          ))}

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-[#F4B400] text-black font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md"
              >
                {userInitial}
              </motion.div>
              <motion.button
                onClick={handleLogout}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#DB4437",
                  boxShadow: "0 0 10px #DB4437",
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "bg-white/10"
                    : "bg-gray-200/80"
                }`}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px #F4B400",
                backgroundColor: "#0F9D58",
                color: "#fff",
              }}
            >
              <Link
                to="/login"
                className="bg-[#F4B400] text-black px-5 py-2 rounded-lg font-semibold transition block"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 flex flex-col gap-4 sm:hidden text-sm font-medium ${
              theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "text-white"
                : "text-gray-800"
            }`}
          >
            {navLinks.map(({ name, href, icon: Icon, color }) => (
              <motion.div
                key={name}
                whileHover={{
                  scale: 1.05,
                  textShadow: `0 0 10px ${color}`,
                  color,
                }}
              >
                <Link 
                  to={href} 
                  className={`flex items-center gap-2 transition ${
                    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                  style={location.pathname === href ? { color } : {}}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth Section */}
            {user ? (
              <div className="flex items-center gap-4 mt-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#F4B400] text-black font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md"
                >
                  {userInitial}
                </motion.div>
                <motion.button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#DB4437",
                    boxShadow: "0 0 10px #DB4437",
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "bg-white/10"
                      : "bg-gray-200/80"
                  }`}
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px #F4B400",
                  backgroundColor: "#0F9D58",
                  color: "#fff",
                }}
              >
                <Link
                  to="/login"
                  className="bg-[#F4B400] text-black px-4 py-2 rounded-lg font-semibold transition block"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}