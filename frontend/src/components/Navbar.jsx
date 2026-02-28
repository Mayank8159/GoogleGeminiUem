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
  LayoutDashboard,
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

  // Sync user state from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    // Remove all tokens and user info
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    // Redirect based on role
    if (user?.role === "admin") navigate("/admin/login");
    else navigate("/login");

    // Reset state
    setUser(null);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const userInitial = user?.role === "admin" ? "A" : user?.name?.charAt(0)?.toUpperCase() || "";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-colors duration-500"
    >
      {/* Outer container for animated border */}
      <div className="relative rounded-2xl p-[2px] overflow-hidden">
        {/* Top animated gradient sweep */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(66, 133, 244, 1), rgba(244, 180, 0, 1), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.9), rgba(244, 180, 0, 1), transparent)',
            filter: 'blur(0)',
          }}
          animate={{x: ['-100%', '100%']}}
          transition={{duration: 2.5, repeat: Infinity, ease: 'linear'}}
        />
        
        {/* Bottom animated gradient sweep */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(15, 157, 88, 1), rgba(244, 180, 0, 0.9), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(15, 157, 88, 0.9), rgba(244, 180, 0, 0.9), transparent)',
          }}
          animate={{x: ['100%', '-100%']}}
          transition={{duration: 2.5, repeat: Infinity, ease: 'linear'}}
        />
        
        {/* Vibrant surrounding glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isDark
              ? ['0 0 25px rgba(66, 133, 244, 0.5), inset 0 0 25px rgba(244, 180, 0, 0.2)', '0 0 35px rgba(244, 180, 0, 0.6), inset 0 0 35px rgba(15, 157, 88, 0.2)', '0 0 25px rgba(66, 133, 244, 0.5), inset 0 0 25px rgba(244, 180, 0, 0.2)']
              : ['0 0 20px rgba(66, 133, 244, 0.6), inset 0 0 20px rgba(244, 180, 0, 0.3)', '0 0 30px rgba(244, 180, 0, 0.7), inset 0 0 30px rgba(15, 157, 88, 0.3)', '0 0 20px rgba(66, 133, 244, 0.6), inset 0 0 20px rgba(244, 180, 0, 0.3)']
          }}
          transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
        />
        
        {/* Main navbar content */}
        <div className={`relative backdrop-blur-xl rounded-2xl px-6 py-4 border ${isDark
            ? "bg-gradient-to-br from-[#0a0f14]/95 to-[#151b23]/95 border-white/10 shadow-2xl text-white"
            : "bg-gradient-to-br from-white/95 to-[#f8f9fa]/95 border-gray-200/50 shadow-xl text-gray-800"
        }`}>
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
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg hover:scale-105 transition cursor-pointer shadow-md"
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
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium relative">
          {navLinks.map(({ name, href, icon: Icon, color }) => (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-1 transition ${isDark ? "text-white" : "text-gray-800"}`}
              style={location.pathname === href ? { color } : {}}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}

          {/* Admin Links - Only show for logged in admins */}
          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-1 transition ${isDark ? "text-white" : "text-gray-800"}`}
                style={location.pathname === "/admin/dashboard" ? { color: "#4285F4" } : {}}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/admin/events"
                className={`flex items-center gap-1 transition ${isDark ? "text-white" : "text-gray-800"}`}
                style={location.pathname === "/admin/events" ? { color: "#F4B400" } : {}}
              >
                <CalendarDays className="h-4 w-4" />
                Manage Events
              </Link>
            </>
          )}

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
                className="btn-pattern btn-danger flex items-center gap-2 px-4 py-2 rounded-lg transition text-white"
              >
                <LogOut size={16} />
                Logout
              </motion.button>
            </div>
          ) : (
            // Show Get Started only if no user logged in
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
                  className="btn-pattern btn-primary text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  Get Started
                  <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
                        isDark ? "bg-[#0a0f14]/95 border-white/10 text-white" : "bg-white/95 border-gray-200 text-gray-800"
                      }`}
                    >
                      <Link to="/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-[#F4B400]/20 transition rounded-t-lg">
                        Login as User
                      </Link>
                      <Link to="/admin/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-[#0F9D58]/20 transition rounded-b-lg">
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 flex flex-col gap-4 sm:hidden text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}
          >
            {navLinks.map(({ name, href, icon: Icon, color }) => (
              <Link
                key={name}
                to={href}
                className={`flex items-center gap-2 transition ${isDark ? "text-white" : "text-gray-800"}`}
                style={location.pathname === href ? { color } : {}}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            ))}

            {/* Admin Links - Only show for logged in admins */}
            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-2 transition ${isDark ? "text-white" : "text-gray-800"}`}
                  style={location.pathname === "/admin/dashboard" ? { color: "#4285F4" } : {}}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/events"
                  className={`flex items-center gap-2 transition ${isDark ? "text-white" : "text-gray-800"}`}
                  style={location.pathname === "/admin/events" ? { color: "#F4B400" } : {}}
                  onClick={() => setIsOpen(false)}
                >
                  <CalendarDays className="h-4 w-4" />
                  Manage Events
                </Link>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-4 mt-2">
                <div className="bg-[#F4B400] text-black font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md">
                  {userInitial}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-pattern btn-danger flex items-center gap-2 px-4 py-2 rounded-lg transition text-white"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
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
                    className="btn-pattern btn-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    Get Started
                    <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
                        className={`mt-2 rounded-lg shadow-lg border backdrop-blur-md z-50 ${
                          isDark ? "bg-[#0a0f14]/95 border-white/10 text-white" : "bg-white/95 border-gray-200 text-gray-800"
                        }`}
                      >
                        <Link
                          to="/login"
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
                          className="block px-4 py-2 hover:bg-[#F4B400]/20 transition rounded-t-lg"
                        >
                          Login as User
                        </Link>
                        <Link
                          to="/admin/login"
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
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
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
