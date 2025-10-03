import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import socket from '../socket';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

  return (
    <main className={`flex flex-col h-screen pt-24 font-inter transition-colors duration-500
      ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
        : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
    `}>
      
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="sticky top-0 z-30 px-4 sm:px-8 py-4 rounded-b-2xl mb-4 mt-6"
        // style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.img
            src="/main.png"
            alt="Gemini Logo"
            className="h-8 w-8 rounded-lg shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            style={{ boxShadow: '0 0 12px #4285F4, 0 0 8px #F4B400' }}
          />
          <h1 className="text-xl sm:text-2xl font-bold font-outfit text-glow tracking-wide" style={{ color: '#4285F4' }}>
            Gemini Discussion Board
          </h1>
        </div>
  <p className={`text-xs sm:text-sm text-center mt-1 pl-13 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/70"}`}>
          Real-time thoughts from cosmic minds ✨
        </p>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-8 space-y-5 pb-32">
        {messages.map((msg, idx) => {
          const accent = googleColors[idx % googleColors.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="flex items-center gap-3"
            >
              {/* Avatar circle with Google color border */}
              <div className="flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border-2"
                  style={{ borderColor: accent }}
                >
                  <span className="font-bold text-base" style={{ color: accent }}>
                    {msg.author?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              </div>
              {/* Message bubble */}
              <div
                className="flex-1 rounded-2xl px-5 py-3 shadow-lg border border-white/10 glass-morphism"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  boxShadow: `0 2px 16px ${accent}30`,
                  borderLeft: `4px solid ${accent}`,
                  willChange: 'transform',
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm" style={{ color: accent }}>
                    {msg.author}
                  </span>
                  <span className="text-xs text-white/50">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className={`text-base font-inter break-words ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/90" : "text-black/90"}`}>
                  {msg.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Composer */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 w-[97%] sm:w-[600px] glass-morphism border border-white/10 rounded-2xl px-4 py-3 flex gap-3 z-50 shadow-xl transition-all duration-300 ${
          isKeyboardOpen ? 'bottom-[200px]' : 'bottom-6'
        }`}
        style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(18px)' }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={`flex-1 bg-transparent outline-none font-inter text-base ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white placeholder-white/50" : "text-black placeholder-black/50"}`}
        />
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.08, backgroundColor: '#4285F4', color: '#fff' }}
          whileTap={{ scale: 0.97 }}
          className={`px-4 py-2 rounded-full font-semibold transition flex items-center gap-1 bg-gradient-to-r from-[#0F9D58] to-[#F4B400] shadow-lg
            ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white" : "text-black"}`}
        >
          Send <ArrowUpRight size={18} />
        </motion.button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#4285F4] via-[#F4B400] to-[#0F9D58] text-white rounded-2xl shadow-2xl border border-white/10 p-6 w-[90%] sm:w-[400px]"
          >
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className={`text-sm mb-4 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/80" : "text-black/80"}`}>
              You need to be logged in to send messages on the Gemini Discussion Board.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-[#F4B400] hover:bg-[#0F9D58] rounded-lg text-sm font-medium"
              >
                Login
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}