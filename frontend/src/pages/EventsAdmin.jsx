import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventAdmin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    imageUrl: "",
  });

  const BACKEND_URL = "https://googlegeminiuem.onrender.com";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitEvent = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${BACKEND_URL}/api/events/admin/events`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Event published successfully!");
      setForm({ title: "", description: "", eventDate: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to publish event");
    }
  };

  return (
    <main className="px-4 pt-24 sm:pt-32 pb-16 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] min-h-screen text-white overflow-x-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-pink-500 blur-3xl -top-20 -left-20" />
        <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-500 blur-3xl -bottom-20 -right-20" />
      </div>

      <div className="max-w-lg w-full mx-auto relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-white/10 shadow-xl">
          <h2
            className="text-xl sm:text-3xl font-bold text-center text-indigo-300 mb-6"
            style={{ textShadow: "0 0 12px rgba(99,102,241,0.7)" }}
          >
            Create New Event
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={submitEvent}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition text-sm sm:text-base"
            >
              Publish Event
            </button>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </main>
  );
}