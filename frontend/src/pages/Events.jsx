import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import { Calendar, CheckCircle, Clock, MapPin, Users, Sparkles } from "lucide-react";

// Enhanced Icon component with animations
const AnimatedIcon = ({ icon: Icon, color = "currentColor", size = 24, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className={`inline-flex items-center justify-center ${className}`}
  >
    <Icon size={size} color={color} />
  </motion.div>
);

// Connect to backend socket server
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const socket = io(BACKEND_URL);

const EventCard = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -12, 
      scale: 1.03,
      boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
  const accentColor = googleColors[index % googleColors.length];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className={`backdrop-blur-xl rounded-2xl p-7 shadow-lg h-full relative overflow-hidden border-2 transition-all duration-300
          ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "bg-white/10 border-white/25 hover:bg-white/15"
            : "bg-white/85 border-gray-300/60 hover:bg-white/95"}
        `}
        animate={{ 
          borderColor: isExpanded ? accentColor : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "rgba(255,255,255,0.25)" : "rgba(128,128,128,0.3)",
          boxShadow: isExpanded 
            ? `0 15px 40px ${accentColor}30, inset 0 1px 0 rgba(255,255,255,0.1)` 
            : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "0 4px 15px rgba(0,0,0,0.2)"
              : "0 2px 8px rgba(0,0,0,0.08)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor}30, transparent 70%)`
          }}
        />

        {/* Sparkle effect on hover */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-2 right-2"
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <motion.h3 
            className={`text-2xl font-bold mb-4 leading-tight ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white" : "text-black"}`}
            animate={{ color: isExpanded ? accentColor : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "white" : "black" }}
            transition={{ duration: 0.3 }}
          >
            {event.title}
          </motion.h3>

          {/* Event Image - Show when expanded or if imageUrl exists */}
          <AnimatePresence>
            {isExpanded && event.imageUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 rounded-lg overflow-hidden"
              >
                <img 
                  src={`${BACKEND_URL}/${event.imageUrl}`}
                  alt={event.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    console.error(`Failed to load image: ${event.imageUrl}`);
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.p 
            className={`text-sm mb-5 leading-relaxed font-medium ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/85" : "text-black/80"}`}
            animate={{ opacity: isExpanded ? 1 : 0.85 }}
          >
            {event.description}
          </motion.p>

          <div className="space-y-3 mt-5 pt-5 border-t" style={{ borderTopColor: `${accentColor}30` }}>
            <motion.div 
              className={`flex items-center gap-3 text-xs font-medium ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}
              whileHover={{ x: 5 }}
            >
              <Clock className="h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
              <span>{new Date(event.eventDate).toLocaleString()}</span>
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-4"
                >
                  <motion.div 
                    className={`flex items-center gap-3 text-xs font-medium ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <span>UEM Kolkata Campus</span>
                  </motion.div>
                  <motion.div 
                    className={`flex items-center gap-3 text-xs font-medium ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}
                    whileHover={{ x: 5 }}
                  >
                    <Users className="h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <span>Open to all students</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            className={`mt-6 pt-4 border-t font-medium text-xs tracking-wide uppercase ${isExpanded ? "text-white/50" : "text-white/60"}`}
            style={{ borderTopColor: `${accentColor}20` }}
            animate={{ opacity: isExpanded ? 0.6 : 0.7, color: isExpanded ? `${accentColor}80` : "rgba(255,255,255,0.6)" }}
          >
            {isExpanded ? "Click to collapse ↑" : "Click for details ↓"}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Events() {
  const { theme } = useTheme();
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const [up, comp] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/events/upcoming`),
        axios.get(`${BACKEND_URL}/api/events/completed`),
      ]);
      setUpcoming(Array.isArray(up.data) ? up.data : []);
      setCompleted(Array.isArray(comp.data) ? comp.data : []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setUpcoming([]);
      setCompleted([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    socket.on("eventBroadcast", () => fetchEvents());
    return () => socket.disconnect();
  }, []);

  if (loading) {
    return (
      <main className={`px-4 pt-36 pb-20 min-h-screen flex items-center justify-center transition-colors duration-500 relative overflow-hidden
        ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white"
          : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] text-black"}
      `}>
        {/* Animated radial gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)",
              "radial-gradient(800px at 80% 50%, rgba(244, 180, 0, 0.15) 0%, transparent 50%)",
              "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-full mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(15, 157, 88, 0.2))"
            }}
          >
            <Calendar className="h-8 w-8 text-blue-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>Loading Events</h3>
            <motion.p 
              className={`text-lg font-medium ${isDarkMode ? "text-white/70" : "text-black/70"}`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Fetching amazing opportunities for you...
            </motion.p>
          </motion.div>
        </motion.div>
        </div>
      </main>
    );
  }

  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main className={`px-4 pt-36 pb-20 min-h-screen overflow-hidden relative transition-colors duration-500
      ${isDarkMode
        ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white"
        : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] text-black"}
    `}>
      {/* Animated radial gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)",
            "radial-gradient(800px at 50% 30%, rgba(244, 180, 0, 0.12) 0%, transparent 50%)",
            "radial-gradient(800px at 80% 70%, rgba(15, 157, 88, 0.12) 0%, transparent 50%)",
            "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className={`rounded-3xl p-12 shadow-2xl relative overflow-hidden backdrop-blur-lg
            ${isDarkMode
              ? "bg-white/8 border border-white/20 shadow-blue-500/10"
              : "bg-white/95 border border-gray-200/50"}
          `}
        >
          {/* Gradient top accent */}
          <motion.div
            className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center mb-14"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h2
                className={`text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent`}
              >
                Upcoming Events
              </motion.h2>
              <motion.p 
                className={`text-lg font-medium ${isDarkMode ? "text-white/70" : "text-black/70"}`}
              >
                Join us for exciting opportunities and learning experiences
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {upcoming.length > 0 ? (
                upcoming.map((event, index) => <EventCard key={event._id} event={event} index={index} />)
              ) : (
                <motion.div 
                  className="col-span-full text-center py-16 px-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6"
                  >
                    <Calendar className={`h-20 w-20 mx-auto ${isDarkMode ? "text-blue-400/60" : "text-blue-500/60"}`} />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>No upcoming events yet</h3>
                  <p className={`text-lg font-medium ${isDarkMode ? "text-white/60" : "text-black/60"} max-w-sm mx-auto`}>
                    Exciting opportunities are coming soon. Check back regularly for the latest updates!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Completed Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className={`rounded-3xl p-12 shadow-2xl relative overflow-hidden backdrop-blur-lg
            ${isDarkMode
              ? "bg-white/8 border border-white/20 shadow-green-500/10"
              : "bg-white/95 border border-gray-200/50"}
          `}
        >
          {/* Gradient top accent */}
          <motion.div
            className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-green-500 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center mb-14"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.h2
                className={`text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent`}
              >
                Completed Events
              </motion.h2>
              <motion.p 
                className={`text-lg font-medium ${isDarkMode ? "text-white/70" : "text-black/70"}`}
              >
                Celebrating our community's amazing achievements
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {completed.length > 0 ? (
                completed.map((event, index) => <EventCard key={event._id} event={event} index={index} />)
              ) : (
                <motion.div 
                  className="col-span-full text-center py-16 px-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6"
                  >
                    <CheckCircle className={`h-20 w-20 mx-auto ${isDarkMode ? "text-green-400/60" : "text-green-500/60"}`} />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>No completed events yet</h3>
                  <p className={`text-lg font-medium ${isDarkMode ? "text-white/60" : "text-black/60"} max-w-sm mx-auto`}>
                    Be part of our journey! Attend upcoming events and see them featured here.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}