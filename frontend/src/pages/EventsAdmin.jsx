import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function EventAdmin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    imageUrl: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEvent = async () => {
    try {
      await axios.post("/api/events/admin/events", form);
      setSuccess(true);
      setError("");
      setForm({ title: "", description: "", eventDate: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to publish event");
      setSuccess(false);
    }
  };

  return (
    <main className="px-4 pt-36 pb-20 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] min-h-screen text-white relative">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-pink-500 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -360], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-purple-500 blur-3xl -bottom-20 -right-20"
        />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-300 mb-6" style={{ textShadow: "0 0 12px rgba(99,102,241,0.7)" }}>
            Create New Event
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={submitEvent}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition"
            >
              Publish Event
            </button>

            {success && (
              <p className="text-green-400 mt-2 text-sm text-center">✅ Event published successfully!</p>
            )}
            {error && (
              <p className="text-red-400 mt-2 text-sm text-center">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}