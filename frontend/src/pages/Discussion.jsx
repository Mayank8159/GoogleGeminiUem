import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MessageCard({ msg, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4"
      role="article"
      aria-label={`Message from ${msg.author || 'Unknown'}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-[#4285F4]/30 flex items-center justify-center font-bold text-white text-sm">
          {msg.author?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="text-sm font-semibold">{msg.author || 'Unknown'}</span>
        <span className="text-xs text-white/50 ml-auto">
          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
        </span>
      </div>
      <p className="text-white/80 text-sm">{msg.content}</p>
    </motion.div>
  );
}

export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    axios.get('/api/discussion?days=7')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.messages || [];
        setMessages(data);
      })
      .catch(err => {
        console.error('Failed to fetch messages:', err);
        setMessages([]);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (!user) return navigate('/login');
    if (!newMessage.trim()) return;

    axios.post('/api/discussion', {
      content: newMessage,
      author: user.name,
      timestamp: new Date().toISOString()
    })
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setNewMessage('');
      })
      .catch(err => console.error('Failed to send message:', err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleFocus = () => {
    if (!user) navigate('/login');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="pt-20 h-screen flex flex-col bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white overflow-hidden">
      
      {/* Header */}
      <header className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] opacity-100" />
        <div className="relative px-4 sm:px-6 py-10 text-center border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <MessageCircle size={28} strokeWidth={2.5} className="text-[#4285F4] drop-shadow-[0_0_6px_rgba(66,133,244,0.6)]" />
            <h1 className="text-2xl sm:text-3xl font-bold font-outfit" style={{ textShadow: '0 0 15px rgba(255,255,255,0.8)' }}>
              Gemini Discussion Board
            </h1>
          </motion.div>
          <p className="text-white/70 text-sm">
            Share your thoughts, ask questions, and connect with fellow cosmic minds.
          </p>
        </div>
      </header>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 pb-32">
        {messages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg, idx) => (
              <MessageCard key={idx} msg={msg} idx={idx} />
            ))}
          </div>
        ) : (
          <p className="text-white/50 text-center">No messages yet. Be the first to spark a conversation!</p>
        )}
      </div>

      {/* Floating Composer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex gap-4 z-50 shadow-lg">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={user ? "Type your message..." : "Login to start chatting"}
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#0F9D58] hover:bg-[#F4B400] rounded-lg font-medium transition"
          aria-label="Send message"
        >
          Send
        </button>
      </div>

      {/* Identity Card */}
      {user && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-[100px] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[250px] bg-gradient-to-br from-[#ffffff0d] via-[#ffffff1a] to-[#ffffff0d] text-white rounded-xl shadow-xl border border-white/10 backdrop-blur-lg px-4 py-3 z-50"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#4285F4]/30 flex items-center justify-center font-bold text-white text-base sm:text-lg shadow-md">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-sm sm:text-base">{user.name}</h2>
              <p className="text-white/70 text-xs sm:text-sm">{user.role || 'Member'}</p>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/50">
            Welcome back, cosmic explorer 🌌
          </div>
        </motion.div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-[#4285F4] hover:bg-[#F4B400] text-white p-3 rounded-full shadow-lg transition z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
        </button>
      )}
    </main>
  );
}