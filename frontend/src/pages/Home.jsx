import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sections from "../components/ActionSection";
import { ArrowRight, Sparkles, Info } from "lucide-react";

export default function Home() {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Professional animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main
      className={`px-4 sm:px-6 pt-36 pb-20 sm:pb-32 overflow-hidden relative transition-colors duration-500 min-h-screen
        ${
          isDark
            ? "bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white"
            : "bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] text-black"
        }
      `}
    >
      {/* Professional Background - Subtle Animated Gradient */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(244, 180, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center flex flex-col items-center gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col items-center gap-6 w-full rounded-3xl border p-8 sm:p-10 backdrop-blur-xl ${
            isDark ? "bg-white/5 border-white/10" : "bg-white/70 border-gray-200"
          }`}
        >
          {/* Logo with Professional Animation */}
          <motion.div
            variants={itemVariants}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Subtle glow effect behind logo */}
            <motion.div
              aria-hidden="true"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4285F4] to-[#F4B400] blur-xl"
            />

            {/* Main Logo */}
            <motion.img
              src="/main.png"
              alt="Google Gemini Student Community Logo"
              className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl z-10 shadow-2xl ring-4 ring-white/20"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold font-space-grotesk tracking-wide leading-tight max-w-4xl ${
              isDark ? "" : "text-gray-900"
            }`}
            style={
              {
                background:
                  "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }
            }
          >
            Google Gemini Student Community
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`max-w-3xl text-lg sm:text-xl leading-relaxed font-inter ${
              isDark ? "text-white/80" : "text-gray-700"
            }`}
          >
            A student-led initiative at UEM Kolkata, empowering learners through
            innovation, collaboration, and cosmic curiosity.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
              isDark ? "bg-white/5 border-white/15 text-white/80" : "bg-white border-gray-200 text-gray-700"
            }`}
          >
            <Sparkles className="h-4 w-4 text-[#F4B400]" />
            Building AI-first student leadership at UEM Kolkata
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <Link to="/events">
              <motion.button
                className="btn-pattern btn-primary group px-8 py-3.5 text-lg rounded-xl shadow-lg transition-all duration-300 border border-white/20 text-white inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Events</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            </Link>
            <Link to="/discussion">
              <motion.button
                className={`btn-pattern btn-secondary group px-8 py-3.5 text-lg rounded-xl shadow-lg transition-all duration-300 border inline-flex items-center gap-2 ${
                  isDark
                    ? "bg-white/5 text-white border-white/25 hover:border-white/40"
                    : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"
                }`}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Visit Discussion</span>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  isDark ? "bg-white/15 group-hover:bg-white/25" : "bg-gray-100 group-hover:bg-gray-200"
                }`}>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* About Section */}
        <motion.section
          className="w-full max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className={`rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-10 transition-all duration-500 border-t border-l ${
              isDark
                ? "bg-white/5 border-white/20 backdrop-blur-md"
                : "bg-white/70 border-gray-200 backdrop-blur-xl"
            }`}
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: isDark
                ? "0 0 30px rgba(66, 133, 244, 0.3)"
                : "0 0 25px rgba(0, 0, 0, 0.08)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Icon */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              variants={itemVariants}
            >
              <div className="h-32 w-32 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#F4B400] to-[#0F9D58] shadow-2xl">
                <Info color="white" size={48} strokeWidth={2} />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center sm:text-left flex-1">
              <motion.h2
                className={`text-3xl font-bold mb-3 ${
                  isDark ? "text-[#F4B400]" : "text-[#4285F4]"
                }`}
                variants={itemVariants}
              >
                Our Mission: Cosmic Collaboration
              </motion.h2>
              <motion.p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDark ? "text-white/75" : "text-gray-700"
                }`}
                variants={itemVariants}
              >
                GGSC is a vibrant community of tech enthusiasts, designers, and
                dreamers. We explore the power of Google Gemini and AI to build
                meaningful experiences, foster leadership, and spark innovation
                across campus. <br />
                <br />
                Together, we empower students with practical skills, creativity,
                and collaboration while pushing the boundaries of what’s possible
                with AI-driven innovation.
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        {/* Action Sections */}
        <motion.section
          className="max-w-6xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] bg-clip-text text-transparent">
              Explore Key Sections
            </h3>
            <p className={`mt-2 text-base ${isDark ? "text-white/70" : "text-gray-600"}`}>
              Quick access to discussions, events, teams, and core community activities.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Sections />
          </motion.div>
        </motion.section>
      </motion.div>
    </main>
  );
}