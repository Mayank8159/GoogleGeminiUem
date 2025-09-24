import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
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
  const { theme } = useTheme();
  const logoRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Always scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // GSAP logo floating with hardware acceleration
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -8,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true,
        willChange: "transform"
      });
    }

    // Animate particles with hardware acceleration
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -60,
          x: Math.sin(index) * 32,
          opacity: 0.7,
          duration: 2.2 + Math.random() * 1.2,
          delay: Math.random() * 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          force3D: true,
          willChange: "transform"
        });
      }
    });
  }, []);
  return (
    <main
      className={`px-6 py-20 sm:py-32 overflow-hidden relative transition-colors duration-500
        ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"}
      `}
    >
      {/* Enhanced background with floating particles */}
      <div className="absolute inset-0 z-0 opacity-15 will-change-transform">
        {/* Floating particles - reduced blur, optimized shadow */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              ref={el => particlesRef.current[i] = el}
              className="absolute w-3 h-3 rounded-full will-change-transform"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#4286f4a3', '#f4b3008b', '#0f9d5890', '#db45378b'
                ][i % 4],
                opacity: 0.38,
                boxShadow: `0 0 16px ${[
                  '#4286f4a3', '#f4b3008b', '#0f9d5890', '#db45378b'
                ][i % 4]}60`,
                filter: 'blur(320px)',
                willChange: 'transform'
              }}
            />
          ))}
        </div>
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            rotate: [0, 360],
            opacity: [0.10, 0.22, 0.10],
          }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-[60px] -top-20 -left-20 will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -360],
            opacity: [0.10, 0.18, 0.10],
          }}
          transition={{ duration: 32, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-[50px] -bottom-20 -right-20 will-change-transform"
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
            whileHover={{ scale: 1.07 }}
          >
            {/* 4 floating particles orbiting the logo in a circle, Google colors, animated intensity */}
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, Math.cos((i/4)*2*Math.PI)*38, 0],
                  y: [0, Math.sin((i/4)*2*Math.PI)*38, 0],
                  scale: [1, 1.18, 1]
                }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i*0.3, ease: "easeInOut" }}
                className="absolute will-change-transform"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '12px',
                  height: '12px',
                  marginLeft: '-6px',
                  marginTop: '-6px',
                  borderRadius: '50%',
                  background: ["#4285F4", "#F4B400", "#0F9D58", "#DB4437"][i],
                  boxShadow: `0 0 12px ${["#4285F4", "#F4B400", "#0F9D58", "#DB4437"][i]}60`,
                  filter: 'blur(4px)',
                  willChange: 'transform'
                }}
              />
            ))}
            {/* Dynamic gradient border behind logo */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.18, 0.32, 0.18],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #4285F4, #F4B400, #0F9D58, #DB4437, #4285F4)",
                filter: "blur(18px)",
                opacity: 0.22
              }}
            />
            {/* Main logo */}
            <motion.img
              src="/main.png"
              alt="Gemini Logo"
              className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-xl z-10 shadow-2xl ring-2 ring-white/20 will-change-transform"
              style={{ willChange: 'transform' }}
              whileHover={{ 
                scale: 1.08,
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.38, ease: "easeInOut" }
              }}
              whileTap={{ scale: 0.97 }}
            />
          </motion.div>
          <motion.h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk tracking-wide leading-tight ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "" : "text-black"}`}
            style={theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? {
                  background: "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                  backgroundSize: "300% 300%"
                }
              : {
                  color: "#222",
                  textShadow: "0 0 10px #fff"
                }
            }
            animate={theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
              : {}
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Google Gemini Student Community
          </motion.h1>
          <motion.p
            className={`max-w-2xl text-base sm:text-lg leading-relaxed font-inter ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/80" : "text-black/80"}`}
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
            className={`glass-morphism rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-10 hover:shadow-[0_0_50px_rgba(66,133,244,0.3)] transition-all duration-500 border
              ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "border-white/20"
                : "border-gray-300 bg-white/60 backdrop-blur-xl"}
            `}
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
                className={`text-2xl font-bold mb-3 ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-[#F4B400]" : "text-[#4285F4]"}`}
                style={{ textShadow: theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "0 0 10px rgba(244, 180, 0, 0.7)" : "0 0 10px rgba(66,133,244,0.2)" }}
              >
                About Us
              </motion.h2>
              <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "text-white/70" : "text-black/80"}`}>
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
