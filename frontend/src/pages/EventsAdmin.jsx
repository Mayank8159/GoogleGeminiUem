import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  Upload, 
  Trash2, 
  Calendar, 
  Clock, 
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon
} from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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
      setDeletingId(eventId);
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
    } finally {
      setDeletingId(null);
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
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 pt-36 relative overflow-hidden ${
        isDark
          ? "bg-gradient-to-br from-[#0B1519] via-[#1A2F37] to-[#25424D] text-white"
          : "bg-gradient-to-br from-[#f0f3f6] via-[#e3e6ea] to-[#cfd8dc] text-slate-900"
      }`}
    >
      {/* Animated radial gradient background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)",
              "radial-gradient(800px at 50% 30%, rgba(244, 180, 0, 0.12) 0%, transparent 50%)",
              "radial-gradient(800px at 80% 70%, rgba(15, 157, 88, 0.12) 0%, transparent 50%)",
              "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="bg-gradient-to-br from-[#4285F4] to-[#F4B400] p-3 rounded-full"
            >
              <Calendar className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] bg-clip-text text-transparent">
              Event Management
            </h1>
          </div>
          <p className={isDark ? "text-white/70" : "text-black/70"}>
            Create and manage events for your community
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Event Form */}
          <div className="lg:col-span-1">
          <div
            className={`rounded-3xl backdrop-blur-xl transition-all duration-300 h-fit sticky top-8 border-t border-l relative overflow-hidden ${
              isDark
                ? "bg-white/8 border-[#4285F4]/30 shadow-2xl"
                : "bg-white/90 border-[#4285F4]/40 shadow-xl"
            }`}
          >
            {/* Gradient accent on hover */}
            <motion.div
              className="absolute -top-1 -left-1 w-32 h-32 bg-gradient-to-r from-[#4285F4]/20 to-[#F4B400]/20 rounded-full blur-3xl pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-6 relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <motion.div
                  className="bg-gradient-to-br from-[#0F9D58] to-[#4285F4] p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <Plus className="w-5 h-5 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold">New Event</h2>
              </div>

                <div className="space-y-4">
                  {/* Title */}
                  <input
                    type="text"
                    name="title"
                    placeholder="Event title"
                    value={form.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none text-sm ${
                      isDark
                        ? "bg-white/5 border-[#4285F4]/30 focus:border-[#4285F4] text-white"
                        : "bg-white/50 border-[#4285F4]/40 focus:border-[#4285F4]"
                    }`}
                  />

                  {/* Description */}
                  <textarea
                    name="description"
                    placeholder="Event description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none text-sm resize-none ${
                      isDark
                        ? "bg-white/5 border-[#4285F4]/30 focus:border-[#4285F4] text-white"
                        : "bg-white/50 border-[#4285F4]/40 focus:border-[#4285F4]"
                    }`}
                  />

                  {/* Date & Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#4285F4]" />
                    <input
                      type="datetime-local"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none text-sm ${
                        isDark
                          ? "bg-white/5 border-[#4285F4]/30 focus:border-[#4285F4] text-white"
                          : "bg-white/50 border-[#4285F4]/40 focus:border-[#4285F4]"
                      }`}
                    />
                  </div>

                  {/* Image Upload */}
                  <label
                    htmlFor="imageUpload"
                    className={`block w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                      isDark
                        ? "border-[#4285F4]/50 bg-[#4285F4]/5 hover:bg-[#4285F4]/10"
                        : "border-[#4285F4]/40 bg-[#4285F4]/5 hover:bg-[#4285F4]/10"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {imageFile ? (
                        <>
                          <ImageIcon className="w-6 h-6 text-[#0F9D58]" />
                          <p className="text-sm font-medium text-[#0F9D58]">Image selected ✓</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-[#4285F4]" />
                          <p className="text-xs font-medium text-center">Click or drag to upload</p>
                        </>
                      )}
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Image Preview */}
                  {imageFile && (
                    <div className="w-full rounded-lg overflow-hidden border-2 border-[#4285F4]/30">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={submitEvent}
                    disabled={isSubmitting || !imageFile}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 border-2 ${
                      isSubmitting || !imageFile
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#4285F4] to-[#F4B400] hover:shadow-xl hover:shadow-[#4285F4]/50 border-[#4285F4]"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Publish Event
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="bg-gradient-to-br from-[#4285F4] to-[#F4B400] p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <Calendar className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold">
                  Upcoming Events
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? "bg-[#4285F4]/20 text-[#4285F4]" : "bg-[#4285F4]/10 text-[#4285F4]"}`}>
                    {upcomingEvents.length}
                  </span>
                </h3>
              </div>

              {loadingEvents ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#4285F4]" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div
                  className={`rounded-xl p-8 text-center border-2 border-dashed ${
                    isDark ? "border-white/20 bg-white/5" : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[#4285F4]" />
                  <p className={isDark ? "text-white/70" : "text-black/70"}>
                    No upcoming events yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event._id}
                      className={`rounded-xl p-4 border-2 transition-all duration-200 ${
                        isDark
                          ? "bg-white/5 border-[#4285F4]/30 hover:border-[#4285F4]/60"
                          : "bg-white/40 border-[#4285F4]/30 hover:border-[#4285F4]/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate mb-1">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-[#4285F4] flex-shrink-0" />
                            <span className={isDark ? "text-white/70" : "text-black/70"}>
                              {new Date(event.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          disabled={deletingId === event._id}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            deletingId === event._id
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-[#DB4437]/20"
                          } text-[#DB4437] hover:text-[#DB4437]/80`}
                        >
                          {deletingId === event._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Events */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  className="bg-gradient-to-br from-[#0F9D58] to-[#4285F4] p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold">
                  Completed Events
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? "bg-[#0F9D58]/20 text-[#0F9D58]" : "bg-[#0F9D58]/10 text-[#0F9D58]"}`}>
                    {completedEvents.length}
                  </span>
                </h3>
              </div>

              {completedEvents.length === 0 ? (
                <div
                  className={`rounded-xl p-8 text-center border-2 border-dashed ${
                    isDark ? "border-white/20 bg-white/5" : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[#0F9D58]" />
                  <p className={isDark ? "text-white/70" : "text-black/70"}>
                    No completed events
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {completedEvents.map((event) => (
                    <div
                      key={event._id}
                      className={`rounded-xl p-4 border-2 opacity-75 transition-all duration-200 ${
                        isDark
                          ? "bg-white/5 border-[#0F9D58]/30 hover:border-[#0F9D58]/60"
                          : "bg-white/40 border-[#0F9D58]/30 hover:border-[#0F9D58]/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate mb-1">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                              {new Date(event.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          disabled={deletingId === event._id}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            deletingId === event._id
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-red-500/20"
                          } text-red-500 hover:text-red-600`}
                        >
                          {deletingId === event._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </main>
  );
}