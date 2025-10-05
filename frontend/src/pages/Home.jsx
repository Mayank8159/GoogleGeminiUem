import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GeminiClicks from "../components/GeminiClicks";
import Sections from "../components/ActionSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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

// Child variant for individual fade-in
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  const { theme } = useTheme();
  const particlesRef = useRef([]);
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

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
          willChange: "transform",
        });
      }
    });

    const titleElement = document.getElementById("main-title");
    if (titleElement) {
      gsap.fromTo(
        titleElement,
        { scale: 1 },
        {
          scale: 0.98,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: titleElement,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <main
      className={`px-4 sm:px-6 py-20 sm:py-32 overflow-hidden relative transition-colors duration-500 min-h-screen
        ${
          isDark
            ? "bg-gradient-to-br from-[#0B1519] via-[#1A2F37] to-[#25424D] text-white"
            : "bg-gradient-to-br from-[#f0f3f6] via-[#e3e6ea] to-[#cfd8dc] text-black"
        }
      `}
    >
      {/* --- ENHANCED BACKGROUND WITH MORE FLOATING ELEMENTS --- */}
      <div className="absolute inset-0 z-0 opacity-20 will-change-transform">
        {/* Existing smaller particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              ref={(el) => (particlesRef.current[i] = el)}
              className="absolute w-4 h-4 rounded-full will-change-transform"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor:
                  ["#4286f4", "#f4b300", "#0f9d58", "#db4537"][i % 4] +
                  (isDark ? "a3" : "33"),
                opacity: 0.4,
                boxShadow: `0 0 16px ${
                  ["#4286f4", "#f4b300", "#0f9d58", "#db4537"][i % 4] +
                  (isDark ? "80" : "20")
                }`,
                filter: "blur(3px)",
                willChange: "transform",
              }}
            />
          ))}
        </div>

        {/* Existing animated blobs */}
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1, 1.18, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.22, 0.1],
          }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-[80px] -top-20 -left-20 will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -360],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 32, repeat: Infinity, repeatType: "reverse" }}
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-[70px] -bottom-20 -right-20 will-change-transform"
        />

        {/* NEW FLOATING ELEMENTS */}
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"],
            scale: [0.9, 1.05, 0.9],
            rotate: [0, 15, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-xl bg-purple-500 blur-[90px] will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"],
            scale: [1.05, 0.9, 1.05],
            rotate: [0, -20, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full bg-yellow-400 blur-[100px] will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["-8%", "8%", "-8%"],
            y: ["8%", "-8%", "8%"],
            scale: [0.8, 1.1, 0.8],
            rotate: [0, 10, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-0 h-56 w-56 rounded-full bg-green-500 blur-[80px] will-change-transform"
        />
        <motion.div
          aria-hidden="true"
          animate={{
            x: ["8%", "-8%", "8%"],
            y: ["-8%", "8%", "-8%"],
            scale: [1.1, 0.8, 1.1],
            rotate: [0, -12, 0],
            opacity: [0.07, 0.14, 0.07],
          }}
          transition={{ duration: 27, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-0 left-1/2 h-60 w-60 rounded-xl bg-pink-500 blur-[95px] will-change-transform"
        />

      </div>

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* LOGO ANIMATION FIX: Merging GSAP float into Framer Motion */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                y: [0, -8, 0], // New Framer Motion float animation
                transition: {
                    type: "spring",
                    stiffness: 120,
                    delay: 0.4,
                    // Float transition parameters
                    y: {
                        duration: 1.2,
                        ease: "easeInOut", // Replaces power1.inOut
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                }
            }}
            className="relative mt-6"
            whileHover={{ scale: 1.07 }}
          >
            {/* 4 floating particles orbiting the logo (kept) */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, Math.cos((i / 4) * 2 * Math.PI) * 38, 0],
                  y: [0, Math.sin((i / 4) * 2 * Math.PI) * 38, 0],
                  scale: [1, 1.18, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                className="absolute will-change-transform"
                style={{
                  left: "50%", top: "50%", width: "12px", height: "12px",
                  marginLeft: "-6px", marginTop: "-6px", borderRadius: "50%",
                  background: ["#4285F4", "#F4B400", "#0F9D58", "#DB4437"][i],
                  boxShadow: `0 0 12px ${["#4285F4", "#F4B400", "#0F9D58", "#DB4437"][i]}60`,
                  filter: "blur(4px)", willChange: "transform",
                }}
              />
            ))}
            {/* Dynamic gradient border behind logo (kept) */}
            <motion.div
              aria-hidden="true"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.18, 0.32, 0.18],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #4285F4, #F4B400, #0F9D58, #DB4437, #4285F4)",
                filter: "blur(18px)",
                opacity: 0.22,
              }}
            />
            {/* Main logo image */}
            <motion.img
              src="/main.png"
              alt="Google Gemini Student Community Logo"
              className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl z-10 shadow-2xl ring-4 ring-white/30 will-change-transform"
              style={{ willChange: "transform" }}
              whileHover={{
                scale: 1.08,
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.38, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.97 }}
            />
          </motion.div>
          {/* Title and Paragraph (kept) */}
          <motion.h1
            id="main-title"
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold font-space-grotesk tracking-wide leading-tight ${
              isDark ? "" : "text-black"
            }`}
            style={
              isDark
                ? {
                    background:
                      "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
                    backgroundClip: "text", WebkitBackgroundClip: "text",
                    color: "transparent",
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                    backgroundSize: "300% 300%",
                  }
                : { color: "#222", textShadow: "0 0 10px #fff" }
            }
            animate={
              isDark
                ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                : {}
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Google Gemini Student Community
          </motion.h1>

          <motion.p
            className={`max-w-3xl text-lg sm:text-xl leading-relaxed font-inter ${
              isDark ? "text-white/80" : "text-black/80"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A student-led initiative at UEM Kolkata, empowering learners through
            innovation, collaboration, and cosmic curiosity.
          </motion.p>

          {/* CTA Buttons (kept) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link to="/events" aria-label="View upcoming events">
              <motion.button
                className={`px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform border-2
                    ${
                      isDark
                        ? "bg-transparent text-white border-white/50 hover:border-white"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }
                  `}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Upcoming Events
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* About Section (kept) */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-w-5xl mx-auto"
        >
          <motion.div
            className={`rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-10 transition-all duration-500 border-t border-l
              ${
                isDark
                  ? "bg-white/5 border-white/20 backdrop-blur-md hover:shadow-[0_0_60px_rgba(66,133,244,0.4)]"
                  : "bg-white/70 border-gray-200 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(0,0,0,0.1)]"
              }
            `}
            whileHover={{
              y: -5,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            {/* Icon / Illustration (kept) */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
              className="flex-shrink-0"
            >
              <motion.div
                className="h-32 w-32 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#F4B400] to-[#0F9D58] shadow-2xl relative overflow-hidden"
                whileHover={{
                  boxShadow: "0 0 40px rgba(66, 133, 244, 0.6)",
                }}
              >
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <Icon name="info" color="white" size={48} strokeWidth={2} />
              </motion.div>
            </motion.div>

            {/* Text (kept) */}
            <div className="text-center sm:text-left">
              <motion.h2
                className={`text-3xl font-bold mb-3 ${
                  isDark ? "text-[#F4B400]" : "text-[#4285F4]"
                }`}
                style={{
                  textShadow: isDark
                    ? "0 0 10px rgba(244, 180, 0, 0.7)"
                    : "0 0 10px rgba(66,133,244,0.2)",
                }}
              >
                Our Mission: Cosmic Collaboration
              </motion.h2>
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDark ? "text-white/70" : "text-black/80"
                }`}
              >
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

        {/* Gemini Click Challenge (kept, no floating animation here) */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl w-full text-center"
        >
          <GeminiClicks />
        </motion.section>

        {/* Action Sections (kept) */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl w-full"
        >
          <Sections />
        </motion.section>
      </div>
    </main>
  );
}