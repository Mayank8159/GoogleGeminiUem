import { useState, useEffect } from "react";
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
      className={`min-h-screen transition-colors duration-500 pt-28 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-slate-900"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-indigo-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Event Management
            </h1>
          </div>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            Create and manage events for your community
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Event Form */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl backdrop-blur-xl transition-all duration-300 h-fit sticky top-8 ${
                isDark
                  ? "bg-slate-800/50 border border-slate-700/50 shadow-2xl"
                  : "bg-white/50 border border-white/80 shadow-xl"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Plus className="w-5 h-5 text-indigo-500" />
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
                        ? "bg-slate-700/50 border-slate-600 focus:border-indigo-500 text-white"
                        : "bg-white/50 border-slate-200 focus:border-indigo-500"
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
                        ? "bg-slate-700/50 border-slate-600 focus:border-indigo-500 text-white"
                        : "bg-white/50 border-slate-200 focus:border-indigo-500"
                    }`}
                  />

                  {/* Date & Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <input
                      type="datetime-local"
                      name="eventDate"
                      value={form.eventDate}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none text-sm ${
                        isDark
                          ? "bg-slate-700/50 border-slate-600 focus:border-indigo-500 text-white"
                          : "bg-white/50 border-slate-200 focus:border-indigo-500"
                      }`}
                    />
                  </div>

                  {/* Image Upload */}
                  <label
                    htmlFor="imageUpload"
                    className={`block w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                      isDark
                        ? "border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/10"
                        : "border-indigo-300 bg-indigo-50 hover:bg-indigo-100"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {imageFile ? (
                        <>
                          <ImageIcon className="w-6 h-6 text-green-500" />
                          <p className="text-sm font-medium text-green-600">Image selected ✓</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-indigo-500" />
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
                    <div className="w-full rounded-lg overflow-hidden border-2 border-indigo-500/30">
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
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isSubmitting || !imageFile
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg"
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
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-bold">
                  Upcoming Events
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                    {upcomingEvents.length}
                  </span>
                </h3>
              </div>

              {loadingEvents ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div
                  className={`rounded-xl p-8 text-center border-2 border-dashed ${
                    isDark ? "border-slate-700/50 bg-slate-800/30" : "border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className={isDark ? "text-slate-400" : "text-slate-600"}>
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
                          ? "bg-slate-800/40 border-blue-500/20 hover:border-blue-500/40"
                          : "bg-white/40 border-blue-200 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate mb-1">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className={isDark ? "text-slate-400" : "text-slate-600"}>
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

            {/* Completed Events */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="text-xl font-bold">
                  Completed Events
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${isDark ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"}`}>
                    {completedEvents.length}
                  </span>
                </h3>
              </div>

              {completedEvents.length === 0 ? (
                <div
                  className={`rounded-xl p-8 text-center border-2 border-dashed ${
                    isDark ? "border-slate-700/50 bg-slate-800/30" : "border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className={isDark ? "text-slate-400" : "text-slate-600"}>
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
                          ? "bg-slate-800/40 border-green-500/20 hover:border-green-500/40"
                          : "bg-white/40 border-green-200 hover:border-green-400"
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