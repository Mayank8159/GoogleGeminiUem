import { Linkedin, Instagram, MessageCircle, Home, CalendarDays, Users, MessageSquare, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <footer className={`mt-0 px-4 py-8 pb-16 md:pb-8 backdrop-blur-xl shadow-lg relative transition-colors duration-500 overflow-hidden border-t rounded-t-3xl ${
      isDark
        ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] border-white/10 text-white"
        : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] border-gray-200 text-gray-900"
    }`}>
      {/* Animated Light Effect at Top - Sweeping Light */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] pointer-events-none z-20"
        style={{
          width: '50%',
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(66, 133, 244, 0.6) 20%, rgba(244, 180, 0, 0.8) 50%, rgba(15, 157, 88, 0.6) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(66, 133, 244, 0.7) 20%, rgba(244, 180, 0, 0.9) 50%, rgba(15, 157, 88, 0.7) 80%, transparent 100%)',
          filter: 'blur(1px)',
          boxShadow: isDark
            ? '0 0 15px rgba(244, 180, 0, 0.5), 0 0 30px rgba(66, 133, 244, 0.3)'
            : '0 0 12px rgba(244, 180, 0, 0.6), 0 0 25px rgba(66, 133, 244, 0.4)',
        }}
        animate={{
          x: ['0%', '150%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left: Logos + Title */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex gap-3">
            {/* Gemini Logo */}
            <motion.div
              className="relative"
              animate={{ boxShadow: ["0 0 0 rgba(66, 133, 244, 0)", "0 0 15px rgba(66, 133, 244, 0.6)", "0 0 0 rgba(66, 133, 244, 0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#4285F4]/40 blur-lg scale-110" />
              <img src="/Welcome.jpg" alt="Gemini" className="relative h-12 w-12 rounded-md z-10" />
            </motion.div>

            {/* IEM Logo */}
            <motion.div
              className="relative"
              animate={{ boxShadow: ["0 0 0 rgba(244, 180, 0, 0)", "0 0 15px rgba(244, 180, 0, 0.6)", "0 0 0 rgba(244, 180, 0, 0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="absolute inset-0 rounded-full bg-[#F4B400]/40 blur-lg scale-110" />
              <img src="/IEDC_LOGO.jpg" alt="IEM" className="relative h-12 w-12 rounded-md z-10" />
            </motion.div>

            {/* UEM Logo */}
            <motion.div
              className="relative"
              animate={{ boxShadow: ["0 0 0 rgba(15, 157, 88, 0)", "0 0 15px rgba(15, 157, 88, 0.6)", "0 0 0 rgba(15, 157, 88, 0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="absolute inset-0 rounded-full bg-[#0F9D58]/40 blur-lg scale-110" />
              <img src="/uemlogo.png" alt="UEM" className="relative h-12 w-12 rounded-md z-10" />
            </motion.div>
          </div>

          <span className="font-outfit text-sm font-semibold tracking-wide text-center md:text-left">
            Google Gemini Student Community
          </span>
        </div>

        {/* Center: Embedded Map */}
        <div className="flex flex-col items-center gap-2">
          <div className={`flex items-center gap-1 text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}>
            <MapPin className="h-3 w-3" />
            <span>UEM Kolkata</span>
          </div>
          <motion.div
            animate={{ boxShadow: ["0 0 0 rgba(255, 255, 255, 0)", "0 0 10px rgba(255, 255, 255, 0.3)", "0 0 0 rgba(255, 255, 255, 0)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.512695861583!2d88.48732647539771!3d22.55992017950068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b267a3cdc13%3A0xb3b21d652126f40!2sUniversity%20of%20Engineering%20%26%20Management%2C%20Kolkata%20(UEM)!5e0!3m2!1sen!2sin!4v1758741367571!5m2!1sen!2sin"
              width="180"
              height="100"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md shadow-md"
            ></iframe>
          </motion.div>
        </div>

        {/* Right: Links + Socials */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            <Link to="/" className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs hover:bg-[#4285F4]/20 hover:text-[#4285F4] hover:drop-shadow-[0_0_4px_#4285F4] transition ${isDark ? "bg-white/10" : "bg-gray-800/10"}`}>
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link to="/discussion" className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs hover:bg-[#DB4437]/20 hover:text-[#DB4437] hover:drop-shadow-[0_0_4px_#DB4437] transition ${isDark ? "bg-white/10" : "bg-gray-800/10"}`}>
              <MessageSquare className="h-4 w-4" /> Discussion
            </Link>
            <Link to="/events" className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs hover:bg-[#F4B400]/20 hover:text-[#F4B400] hover:drop-shadow-[0_0_4px_#F4B400] transition ${isDark ? "bg-white/10" : "bg-gray-800/10"}`}>
              <CalendarDays className="h-4 w-4" /> Events
            </Link>
            <Link to="/team" className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs hover:bg-[#0F9D58]/20 hover:text-[#0F9D58] hover:drop-shadow-[0_0_4px_#0F9D58] transition ${isDark ? "bg-white/10" : "bg-gray-800/10"}`}>
              <Users className="h-4 w-4" /> Team
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <motion.a
              href="https://www.linkedin.com/in/google-gemini-student-community-uemk-119733385/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4285F4] hover:drop-shadow-[0_0_4px_#4285F4] transition"
              whileHover={{ scale: 1.1 }}
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/ggsc_officialuemk?igsh=eGpvMXdqejk2NXk4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DB4437] hover:drop-shadow-[0_0_4px_#DB4437] transition"
              whileHover={{ scale: 1.1 }}
            >
              <Instagram className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="https://www.whatsapp.com/channel/0029Vb6OWFpB4hdTD7YMU029"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] hover:drop-shadow-[0_0_4px_#25D366] transition"
              whileHover={{ scale: 1.1 }}
            >
              <MessageCircle className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Theme Toggle - Bottom Right */}
      <div className="absolute bottom-6 right-4 md:bottom-6 md:right-6">
        <ThemeToggle />
      </div>

      <div className={`mt-6 text-center text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>
        © {new Date().getFullYear()} Google Gemini Student Community @ UEM Kolkata. All rights reserved.
      </div>
    </footer>
  );
}