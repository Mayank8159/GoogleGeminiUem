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
      y: -10, 
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
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
        className={`backdrop-blur-md rounded-xl p-6 shadow-lg h-full relative overflow-hidden
          ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "bg-white/10 border border-white/20"
            : "bg-white/80 border border-gray-300"}
        `}
        animate={{ 
          borderColor: isExpanded ? accentColor : theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          boxShadow: isExpanded 
            ? `0 0 30px ${accentColor}40` 
            : "0 0 0 rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, transparent)`
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
            className={`text-xl font-semibold mb-3 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white" : "text-black"}`}
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
            className={`text-sm mb-4 leading-relaxed ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/80" : "text-black/80"}`}
            animate={{ opacity: isExpanded ? 1 : 0.8 }}
          >
            {event.description}
          </motion.p>

          <div className="space-y-2">
            <motion.div 
              className={`flex items-center gap-2 text-xs ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/60" : "text-black/60"}`}
              whileHover={{ x: 5 }}
            >
              <Clock className="h-4 w-4" />
              <span>{new Date(event.eventDate).toLocaleString()}</span>
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 pt-2 border-t border-white/10"
                >
                  <motion.div 
                    className={`flex items-center gap-2 text-xs ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/60" : "text-black/60"}`}
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="h-4 w-4" />
                    <span>UEM Kolkata Campus</span>
                  </motion.div>
                  <motion.div 
                    className={`flex items-center gap-2 text-xs ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/60" : "text-black/60"}`}
                    whileHover={{ x: 5 }}
                  >
                    <Users className="h-4 w-4" />
                    <span>Open to all students</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div 
            className={`mt-4 text-xs ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/50" : "text-black/50"}`}
            animate={{ opacity: isExpanded ? 0.5 : 1 }}
          >
            {isExpanded ? "Click to collapse" : "Click for details"}
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
      <main className={`px-4 pt-28 pb-20 min-h-screen flex items-center justify-center transition-colors duration-500
        ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
      `}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Calendar className="h-12 w-12 text-blue-400" />
          </motion.div>
          <motion.p 
            className="text-xl font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading amazing events...
          </motion.p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={`px-4 pt-28 pb-20 min-h-screen overflow-hidden relative transition-colors duration-500
      ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
        : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
    `}>
      {/* Enhanced Glowing background orbs */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            rotate: [0, 180, 360], 
            opacity: [0.1, 0.4, 0.1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, -180, -360], 
            opacity: [0.1, 0.3, 0.1],
            x: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 blur-3xl -bottom-20 -right-20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1], 
            rotate: [0, 90, 180, 270, 360], 
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-green-400 to-blue-500 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className={`backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden
            ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "bg-white/5 border border-white/10"
              : "bg-white/80 border border-gray-300"}
          `}
        >
          {/* Section background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center mb-12"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <motion.div
                  className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 30px rgba(59, 130, 246, 0.5)",
                      "0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <AnimatedIcon icon={Calendar} color="white" size={32} />
                </motion.div>
                <div>
                  <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent tracking-wide leading-tight"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Upcoming Events
                  </motion.h2>
                  <motion.p 
                    className={`mt-2 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Discover what's coming next in our community
                  </motion.p>
                </div>
              </div>
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
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Calendar className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  </motion.div>
                  <p className={`text-lg ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/60" : "text-black/60"}`}>No upcoming events yet. Stay tuned!</p>
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
          className={`backdrop-blur-md rounded-2xl p-8 shadow-2xl relative overflow-hidden
            ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "bg-white/5 border border-white/10"
              : "bg-white/80 border border-gray-300"}
          `}
        >
          {/* Section background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />

          <div className="relative z-10">
            <motion.div 
              className="flex flex-col items-center justify-center mb-12"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <motion.div
                  className="h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-600 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(34, 197, 94, 0)",
                      "0 0 30px rgba(34, 197, 94, 0.5)",
                      "0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <AnimatedIcon icon={CheckCircle} color="white" size={32} />
                </motion.div>
                <div>
                  <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent tracking-wide leading-tight"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  >
                    Completed Events
                  </motion.h2>
                  <motion.p 
                    className={`mt-2 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Celebrating our past achievements
                  </motion.p>
                </div>
              </div>
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
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="h-16 w-16 text-white/30 mx-auto mb-4" />
                  </motion.div>
                  <p className={`text-lg ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/60" : "text-black/60"}`}>No completed events yet. Exciting things coming soon!</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}