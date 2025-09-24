import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import GeminiClicks from "../components/GeminiClicks";
import Sections from "../components/ActionSection";

// A simple component to render inline SVG icons.
const Icon = ({ name, color = "currentColor", size = 24, strokeWidth = 2 }) => {
  const icons = {
    users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    calendar: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2V4" />
        <path d="M16 2V4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10H21" />
      </svg>
    ),
    messageCircle: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.9 20A9.3 9.3 0 0 1 4 16.1L2 22l6-2z" />
        <path d="M12 11c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
        <path d="M22 21a9.3 9.3 0 0 0-4-4.9l-6 2" />
        <path d="M17 11c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5z" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// Parent variant for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Child variant for individual fade-in
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // GSAP animations for logo floating
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -8,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -100,
          x: Math.sin(index) * 50,
          opacity: 0.8,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    });
  }, []);
  return (
    <main className="px-6 py-20 sm:py-32 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white overflow-hidden relative">
      {/* Enhanced background with floating particles */}
      <div className="absolute inset-0 z-0 opacity-15">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              ref={el => particlesRef.current[i] = el}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#4285F4', '#F4B400', '#0F9D58', '#DB4437'
                ][i % 4],
                boxShadow: `0 0 10px ${[
                  '#4285F4', '#F4B400', '#0F9D58', '#DB4437'
                ][i % 4]}60`
              }}
            />
          ))}
        </div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -360],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl -bottom-20 -right-20"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            ref={logoRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
            className="relative mt-6"
            whileHover={{ scale: 1.05 }}
          >
            {/* Enhanced glow effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4]/40 to-[#F4B400]/40 blur-2xl scale-150"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0F9D58]/30 to-[#DB4437]/30 blur-xl scale-125"
            />
            
            <div className="absolute inset-0 rounded-full bg-[#4285F4]/30 blur-2xl scale-125" />
            <motion.img
              src="/main.png"
              alt="Gemini Logo"
              className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl z-10 shadow-2xl ring-2 ring-white/20"
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk tracking-wide leading-tight"
            style={{ 
              background: "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
              backgroundSize: "300% 300%"
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Google Gemini Student Community
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A student-led initiative at UEM Kolkata, empowering learners through
            innovation, collaboration, and cosmic curiosity.
          </motion.p>
        </motion.div>

        {/* About Section */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <motion.div
            className="glass-morphism rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-10 hover:shadow-[0_0_50px_rgba(66,133,244,0.3)] transition-all duration-500 border border-white/20"
            whileHover={{ 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            {/* Icon / Illustration */}
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
              className="flex-shrink-0"
            >
              <motion.div
                className="h-32 w-32 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#F4B400] to-[#0F9D58] shadow-2xl relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 0 40px rgba(66, 133, 244, 0.6)",
                }}
              >
                {/* Animated background shimmer */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <Icon name="info" color="white" size={48} strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <motion.h2
                className="text-2xl font-bold mb-3 text-[#F4B400]"
                style={{ textShadow: "0 0 10px rgba(244, 180, 0, 0.7)" }}
              >
                About Us
              </motion.h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                GGSC is a vibrant community of tech enthusiasts, designers, and
                dreamers. We explore the power of Google Gemini and AI to build
                meaningful experiences, foster leadership, and spark innovation
                across campus. <br />
                <br />
                🌌 Together, we aim to empower students with skills, creativity,
                and collaboration — pushing the boundaries of what’s possible
                with AI.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Gemini Click Challenge */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl w-full text-center"
        >
          <GeminiClicks />
        </motion.section>

        <Sections/>
      </div>
    </main>
  );
}
