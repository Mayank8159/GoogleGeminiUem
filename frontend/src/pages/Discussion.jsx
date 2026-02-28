import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useMessages } from '../MessagesContext';

export default function Discussion() {
  const { theme } = useTheme();
  const [newMessage, setNewMessage] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesRef = useRef([]);
  const inputRef = useRef(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const { messages } = useMessages();

  useEffect(() => {
    const handleViewportChange = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      const sh = window.innerHeight;
      setIsKeyboardOpen(sh - vh > 150);
    };

    window.visualViewport?.addEventListener('resize', handleViewportChange);
    window.visualViewport?.addEventListener('scroll', handleViewportChange);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
      window.visualViewport?.removeEventListener('scroll', handleViewportChange);
    };
  }, []);

  const handleSend = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (!newMessage.trim()) return;

    socket.emit('newMessage', {
      author: user.name,
      content: newMessage,
    });
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
  
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main className={`flex flex-col h-screen pt-36 pb-4 font-inter transition-colors duration-500 ${
      isDark
        ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white"
        : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] text-gray-900"
    }`}>
      
      {/* Professional Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`px-4 sm:px-8 py-6 mb-4 backdrop-blur-xl border-b ${
          isDark ? "border-white/10" : "border-gray-300"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4285F4] to-[#F4B400] flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(66, 133, 244, 0.3)",
                  "0 0 30px rgba(244, 180, 0, 0.3)",
                  "0 0 20px rgba(66, 133, 244, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] bg-clip-text text-transparent">
                Discussion Board
              </h1>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Collaborate and share ideas with the community
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-16 ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm mt-2">Be the first to start the conversation!</p>
            </motion.div>
          ) : (
            messages.map((msg, idx) => {
              const accent = googleColors[idx % googleColors.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  {/* Avatar */}
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg`}
                      style={{
                        background: `linear-gradient(135deg, ${accent}, ${googleColors[(idx + 1) % googleColors.length]})`
                      }}
                    >
                      {msg.author?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  </motion.div>

                  {/* Message Bubble */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-semibold text-sm"
                        style={{ color: accent }}
                      >
                        {msg.author}
                      </span>
                      <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`rounded-2xl px-4 py-3 shadow-md border ${
                        isDark
                          ? "bg-white/5 border-white/10"
                          : "bg-white/80 border-gray-200"
                      }`}
                      style={{
                        borderLeft: `3px solid ${accent}`
                      }}
                    >
                      <p className={`text-sm sm:text-base leading-relaxed break-words ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {msg.content}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Professional Message Composer */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[700px] max-w-4xl backdrop-blur-xl border rounded-2xl px-4 py-4 flex gap-3 z-50 shadow-2xl transition-all duration-300 ${
          isKeyboardOpen ? 'bottom-[200px]' : 'bottom-6'
        } ${
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-white/90 border-gray-300"
        }`}
      >
        <div className={`flex-1 flex items-center gap-3 px-4 py-2 rounded-xl border ${
          isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
        }`}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
              isDark ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!newMessage.trim()}
          className={`px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow-lg ${
            newMessage.trim()
              ? "bg-gradient-to-r from-[#4285F4] to-[#F4B400] text-white hover:shadow-xl"
              : isDark
              ? "bg-white/10 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </motion.button>
      </div>

      {/* Professional Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] px-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-3xl shadow-2xl border p-8 w-full max-w-md ${
                isDark
                  ? "bg-gradient-to-br from-[#0a0f14] to-[#151b23] border-white/10"
                  : "bg-gradient-to-br from-white to-[#f8f9fa] border-gray-200"
              }`}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4285F4] to-[#F4B400] flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h2 className={`text-2xl font-bold text-center mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Login Required
              </h2>
              <p className={`text-center mb-6 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
                Please log in to participate in the discussion and share your thoughts with the community.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={() => setShowLoginModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4285F4] to-[#F4B400] hover:shadow-xl rounded-xl font-semibold text-white transition"
                >
                  Go to Login
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}