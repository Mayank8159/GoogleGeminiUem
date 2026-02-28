import { motion } from "framer-motion";
import { Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Sections() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Team Spotlight */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* Section Header */}
        <div
          className={`backdrop-blur-xl rounded-3xl shadow-2xl p-12 sm:p-16 text-center transition-all duration-300 border-2 relative overflow-hidden ${
            isDarkMode
              ? "bg-white/8 border-white/25 shadow-red-500/10"
              : "bg-white/95 border-gray-300/50 shadow-gray-200/30"
          }`}
        >
          {/* Gradient top accent */}
          <motion.div
            className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.h2
            className={`text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-red-400 via-purple-400 to-red-400 bg-clip-text text-transparent`}
          >
            Meet the Team
          </motion.h2>
          <p
            className={`max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-medium ${
              isDarkMode
                ? "text-white/80"
                : "text-black/85"
            }`}
          >
            Led by passionate innovators from{" "}
            <span className="font-bold text-[#F4B400]">UEM Kolkata</span>,
            our team combines vision, dedication, and expertise to drive the future of AI
            and community engagement.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {[
            {
              name: "Ashna Islam",
              role: "Chairperson",
              img: "/ashna.jpeg",
            },
            {
              name: "Arnab Sarkar",
              role: "Vice Chairperson",
              img: "/arnab.jpg",
            },
            {
              name: "Dipankar Bera",
              role: "Secretary",
              img: "/dipankar.jpg",
            },
            {
              name: "Arko Sen",
              role: "Secretary",
              img: "/arko.jpg",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className={`rounded-2xl p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-xl transition-all duration-300 border-2 group ${
                isDarkMode
                  ? "bg-white/10 border-white/25 hover:bg-white/15 hover:shadow-red-500/20"
                  : "bg-white/90 border-gray-300/60 hover:bg-white/97 hover:shadow-gray-200/40"
              }`}
            >
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="h-40 w-40 rounded-2xl overflow-hidden shadow-lg ring-4 ring-[#DB4437]/40 group-hover:ring-[#DB4437]/60 transition-all duration-300"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <h3
                className={`text-xl font-bold tracking-tight ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-sm font-semibold mt-2 tracking-wide ${
                  isDarkMode
                    ? "text-[#F4B400]"
                    : "text-[#DB4437]"
                }`}
              >
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Community CTA */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div
          className={`backdrop-blur-xl rounded-3xl shadow-2xl p-12 sm:p-16 flex flex-col items-center hover:shadow-3xl transition-all duration-300 border-2 relative overflow-hidden ${
            isDarkMode
              ? "bg-white/8 border-white/25 hover:shadow-blue-500/20"
              : "bg-white/95 border-gray-300/50 hover:shadow-gray-200/40"
          }`}
        >
          {/* Gradient top accent */}
          <motion.div
            className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Icon and Text Container */}
          <div className="flex flex-col sm:flex-row items-center gap-12 w-full mb-8">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.12, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="flex-shrink-0"
            >
              <div className="h-36 w-36 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#4285F4] via-[#0F9D58] to-[#F4B400] shadow-2xl group hover:shadow-blue-500/40 transition-all duration-300">
                <MessageCircle size={56} color="white" strokeWidth={1.2} />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center sm:text-left flex-1 relative z-10">
              <motion.h2
                className={`text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent`}
              >
                Join the Conversation
              </motion.h2>
              <p
                className={`text-base sm:text-lg leading-relaxed font-medium ${
                  isDarkMode
                    ? "text-white/80"
                    : "text-black/85"
                }`}
              >
                Engage with our vibrant community, exchange innovative ideas, and
                help shape the future of{" "}
                <span className="font-bold text-[#F4B400]">
                  AI and Design
                </span>
                . Connect with fellow students, ask questions, and grow together.
              </p>
            </div>
          </div>

          {/* Button at Bottom Center */}
          <Link to="/discussion" className="w-full flex justify-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3 text-base rounded-xl transition-all duration-300 border font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Visit Discussion Board
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                →
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
