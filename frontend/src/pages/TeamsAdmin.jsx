import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Users, Sparkles } from "lucide-react";

export default function TeamsAdmin() {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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
      className={`px-4 pt-36 pb-20 min-h-screen overflow-hidden relative transition-colors duration-500 flex items-center justify-center ${
        isDark
          ? "bg-gradient-to-br from-[#0B1519] via-[#1A2F37] to-[#25424D] text-white"
          : "bg-gradient-to-br from-[#f0f3f6] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }`}
    >
      {/* Animated radial gradient background */}
      <motion.div
        className="absolute inset-0 opacity-50 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)",
            "radial-gradient(800px at 50% 30%, rgba(244, 180, 0, 0.12) 0%, transparent 50%)",
            "radial-gradient(800px at 80% 70%, rgba(15, 157, 88, 0.12) 0%, transparent 50%)",
            "radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0"
      />

      <motion.div
        className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0F9D58] to-[#4285F4] shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 30px rgba(15, 157, 88, 0.3)",
                "0 0 60px rgba(66, 133, 244, 0.3)",
                "0 0 30px rgba(15, 157, 88, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>

        {/* Main Text */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold">
            Team Management
          </h1>
          <p className={`text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#0F9D58] to-[#4285F4] bg-clip-text text-transparent`}>
            Coming Soon
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={`text-lg max-w-lg leading-relaxed ${
            isDark ? "text-white/80" : "text-black/80"
          }`}
        >
          We're working hard to bring you an amazing team management experience. Manage team members, assignments, and collaboration tools will be available soon!
        </motion.p>

        {/* Features Coming */}
        <motion.div
          variants={itemVariants}
          className={`rounded-3xl p-8 sm:p-10 backdrop-blur-md border-t border-l flex flex-col gap-4 ${
            isDark
              ? "bg-white/5 border-white/20"
              : "bg-white/70 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-[#F4B400]" />
            </motion.div>
            <span className="font-semibold">Advanced Team Analytics</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              <Sparkles className="w-6 h-6 text-[#F4B400]" />
            </motion.div>
            <span className="font-semibold">Member Management</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            >
              <Sparkles className="w-6 h-6 text-[#F4B400]" />
            </motion.div>
            <span className="font-semibold">Collaboration Tools</span>
          </div>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          variants={itemVariants}
          className={`w-full h-1 rounded-full bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58]`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Stay tuned */}
        <motion.p
          variants={itemVariants}
          className={`text-sm font-medium ${
            isDark ? "text-white/60" : "text-black/60"
          }`}
        >
          Stay tuned for exciting updates!
        </motion.p>
      </motion.div>
    </main>
  );
}