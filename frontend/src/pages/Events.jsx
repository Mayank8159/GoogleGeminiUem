import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";

// Icon component
const Icon = ({ name, color = "currentColor", size = 24, strokeWidth = 2 }) => {
  const icons = {
    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2V4" />
        <path d="M16 2V4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10H21" />
      </svg>
    ),
    check: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const socket = io("https://googlegeminiuem.onrender.com");

const EventCard = ({ event }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-2xl transition"
  >
    <h3 className="text-xl font-semibold text-white mb-2" style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>
      {event.title}
    </h3>
    <p className="text-sm text-white/70">{event.description}</p>
    <p className="text-xs mt-4 text-gray-400 italic">
      {new Date(event.eventDate).toLocaleString()}
    </p>
  </motion.div>
);

export default function Events() {
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const [up, comp] = await Promise.all([
        axios.get("/api/events/upcoming"),
        axios.get("/api/events/completed"),
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

  if (loading) return <p className="text-white text-center mt-32">Loading events...</p>;

  return (
    <main className="px-4 pt-36 pb-20 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white min-h-screen overflow-hidden relative">
      {/* Glowing background orbs */}
      <div className="absolute inset-0 z-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-blue-500 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-indigo-500 blur-3xl -bottom-20 -right-20"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-500/30 backdrop-blur-md shadow-md">
                <Icon name="calendar" color="white" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-indigo-300 tracking-wide"
                style={{ textShadow: "0 0 12px rgba(99,102,241,0.7)" }}
              >
                Upcoming Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.length > 0 ? (
              upcoming.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p className="text-white/60 text-center">No upcoming events yet.</p>
            )}
          </div>
        </motion.section>

        {/* Completed Events Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500/30 backdrop-blur-md shadow-md">
                <Icon name="check" color="white" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-green-300 tracking-wide"
                style={{ textShadow: "0 0 12px rgba(34,197,94,0.7)" }}
              >
                Completed Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.length > 0 ? (
              completed.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p className="text-white/60 text-center">No completed events yet.</p>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}