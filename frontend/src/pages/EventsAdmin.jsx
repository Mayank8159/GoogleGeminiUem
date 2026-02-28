import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function EventAdmin() {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const [upRes, compRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/events/upcoming`),
        axios.get(`${BACKEND_URL}/api/events/completed`),
      ]);
      setUpcomingEvents(Array.isArray(upRes.data) ? upRes.data : []);
      setCompletedEvents(Array.isArray(compRes.data) ? compRes.data : []);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("⚠️ Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BACKEND_URL}/api/events/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("✅ Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete event");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 1024;
          canvas.height = 1024;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 1024, 1024);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg", 0.9);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    toast.info("📦 Image selected and ready for upload");
  };

  const submitEvent = async () => {
    if (!form.title || !form.description || !form.eventDate || !imageFile) {
      toast.error("⚠️ Please fill all fields and select an image");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const resizedBlob = await resizeImage(imageFile);
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("eventDate", form.eventDate);
      formData.append("image", resizedBlob, "event.jpg");

      await axios.post(`${BACKEND_URL}/api/events/admin/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Event published successfully!");
      setForm({ title: "", description: "", eventDate: "" });
      setImageFile(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to publish event");
    }
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`px-4 pt-32 pb-16 min-h-screen overflow-x-hidden relative transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-pink-500 blur-3xl -top-20 -left-20" />
        <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-purple-500 blur-3xl -bottom-20 -right-20" />
      </div>

      <div className="max-w-lg w-full mx-auto relative z-10">
        <div
          className={`backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-xl ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white/80 border border-gray-300"
          }`}
        >
          <h2
            className={`text-xl sm:text-3xl font-bold text-center mb-6 ${
              isDark ? "text-indigo-300" : "text-indigo-700"
            }`}
            style={{
              textShadow: isDark ? "0 0 12px rgba(99,102,241,0.7)" : "none",
            }}
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
              required
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
            <input
              type="datetime-local"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/10 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* 🌟 Modern Image Upload Section */}
            <label
              htmlFor="imageUpload"
              className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition ${
                isDark
                  ? "border-indigo-500 bg-white/10 hover:bg-white/20"
                  : "border-indigo-300 bg-white/50 hover:bg-white/70"
              }`}
            >
              <CloudArrowUpIcon
                className={`h-10 w-10 mb-2 ${
                  isDark ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
              <span className="text-sm sm:text-base font-medium text-center">
                Click to upload or drag & drop your event image
              </span>
              <span className="text-xs mt-1 text-gray-400">
                Image will be resized to 1024×1024 pixels
              </span>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Event Preview"
                  className="w-full rounded-lg border border-indigo-300 shadow-md"
                />
              </div>
            )}

            <button
              onClick={submitEvent}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition text-sm sm:text-base"
            >
              Publish Event
            </button>
          </div>
        </div>
      </div>

      {/* Events Management Section */}
      <div className="max-w-4xl w-full mx-auto mt-12 relative z-10">
        <div
          className={`backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-xl ${
            isDark ? "bg-white/5 border border-white/10" : "bg-white/80 border border-gray-300"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold mb-6 ${
              isDark ? "text-indigo-300" : "text-indigo-700"
            }`}
          >
            📋 Manage Events
          </h2>

          {loadingEvents ? (
            <p className={isDark ? "text-white/60" : "text-black/60"}>Loading events...</p>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Events */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-green-300" : "text-green-700"}`}>
                  📅 Upcoming Events ({upcomingEvents.length})
                </h3>
                {upcomingEvents.length === 0 ? (
                  <p className={isDark ? "text-white/40" : "text-black/40"}>No upcoming events</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event._id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          isDark ? "bg-white/5 border border-white/10" : "bg-white/50 border border-gray-200"
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                            {event.title}
                          </h4>
                          <p className={`text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                          title="Delete event"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Completed Events */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-blue-300" : "text-blue-700"}`}>
                  ✅ Completed Events ({completedEvents.length})
                </h3>
                {completedEvents.length === 0 ? (
                  <p className={isDark ? "text-white/40" : "text-black/40"}>No completed events</p>
                ) : (
                  <div className="space-y-3">
                    {completedEvents.map((event) => (
                      <div
                        key={event._id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          isDark ? "bg-white/5 border border-white/10" : "bg-white/50 border border-gray-200"
                        }`}
                      >
                        <div className="flex-1">
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                            {event.title}
                          </h4>
                          <p className={`text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                          title="Delete event"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </main>
  );
}