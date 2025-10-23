import { useState, useEffect } from "react";
import {
  Home,
  MessageSquare,
  CalendarDays,
  Users,
  Menu,
  X,
  LogOut,
  ChevronDown,
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  // ✅ Always check for user in localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, [location]); // runs on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (user?.role === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }

    setUser(null);
  };

  const userInitial =
    user?.role === "admin"
      ? "A"
      : user?.name?.charAt(0)?.toUpperCase() || "";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 backdrop-blur-xl border rounded-2xl px-6 py-4 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#1A1A1A]/50 to-[#2A2A2A]/50 border-white/10 shadow-[0_0_25px_rgba(255,255,255,0.2)] text-white"
          : "bg-gradient-to-br from-white/50 to-gray-100/50 border-gray-300 shadow-[0_0_25px_rgba(0,0,0,0.1)] text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
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

        {/* Mobile toggle */}
        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium relative">
          {navLinks.map(({ name, href, icon: Icon, color }) => (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-1 transition ${
                isDark ? "text-white" : "text-gray-800"
              }`}
              style={location.pathname === href ? { color } : {}}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}

          {/* ✅ Auth Section */}
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
                  isDark ? "bg-white/10" : "bg-gray-200/80"
                }`}
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          ) : (
            // ❌ Hide Get Started if admin logged in
            !user && (
              <div className="relative">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px #F4B400",
                    backgroundColor: "#0F9D58",
                    color: "#fff",
                  }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-[#F4B400] text-black px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  Get Started
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg border backdrop-blur-md z-50 ${
                        isDark
                          ? "bg-[#1F1F1F]/90 border-white/10 text-white"
                          : "bg-white border-gray-200 text-gray-800"
                      }`}
                    >
                      <Link
                        to="/login"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-[#F4B400]/20 transition rounded-t-lg"
                      >
                        Login as User
                      </Link>
                      <Link
                        to="/admin/login"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-[#0F9D58]/20 transition rounded-b-lg"
                      >
                        Login as Admin
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
        </div>
      </div>
    </motion.nav>
  );
}
