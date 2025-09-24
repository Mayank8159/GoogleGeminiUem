import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const socket = io('https://googlegeminiuem.onrender.com'); // Update to your deployed backend URL if needed

export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesRef = useRef([]);
  const inputRef = useRef(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    socket.on('initMessages', (msgs) => setMessages(msgs));
    socket.on('messageBroadcast', (msg) => {
      setMessages(prev => [...prev.slice(-99), msg]);
    });

    return () => {
      socket.off('initMessages');
      socket.off('messageBroadcast');
    };
  }, []);

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
    <main className="flex flex-col h-screen pt-32 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 sm:px-6 mb-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold font-outfit drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
          Gemini Discussion Board
        </h1>
        <p className="text-white/70 text-sm mt-1">
          Real-time thoughts from cosmic minds ✨
        </p>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 space-y-4 pb-28">
        {messages.map((msg, idx) => {
          const accent = googleColors[idx % googleColors.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="rounded-xl p-4 shadow-md border border-white/10 backdrop-blur-md bg-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                boxShadow: `0 0 12px ${accent}40`,
                borderLeft: `4px solid ${accent}`,
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
              <p className="text-white/80 text-sm">{msg.content}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Composer */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex gap-4 z-50 shadow-lg transition-all duration-300 ${
          isKeyboardOpen ? 'bottom-[200px]' : 'bottom-4'
        }`}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#0F9D58] hover:bg-[#F4B400] rounded-lg font-medium transition flex items-center gap-1"
        >
          Send <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#1a237e] via-[#3949ab] to-[#5c6bc0] text-white rounded-xl shadow-xl border border-white/10 p-6 w-[90%] sm:w-[400px]"
          >
            <h2 className="text-lg font-semibold mb-2">Login Required</h2>
            <p className="text-sm text-white/70 mb-4">
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