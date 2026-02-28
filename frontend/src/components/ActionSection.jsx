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
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Team Spotlight */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {/* Section Header */}
        <div
          className={`backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12 text-center transition
      ${
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "bg-white/5 border border-white/10"
          : "bg-white/80 border border-gray-300"
      }`}
        >
          <motion.h2
            className={`text-3xl font-extrabold mb-4 ${
              theme === "dark" ||
              (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "text-[#DB4437]"
                : "text-[#DB4437]"
            }`}
            style={{
              textShadow:
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "0 0 15px rgba(219, 68, 55, 0.6)"
                  : "none",
            }}
          >
            Meet the Team
          </motion.h2>
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${
              theme === "dark" ||
              (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? "text-white/70"
                : "text-black/80"
            }`}
          >
            Led by passionate innovators from{" "}
            <span className="font-semibold text-[#F4B400]">UEM Kolkata</span>,
            our team blends{" "}
            <span className="text-[#56eda9]">technical mastery</span> with{" "}
            <span className="text-[#1befdd]">emotional design</span> to build
            community-driven experiences.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 250 }}
              className={`rounded-2xl p-6 flex flex-col items-center text-center shadow-lg backdrop-blur-md transition-all duration-300 ${
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "bg-white/5 border border-white/10"
                  : "bg-white/80 border border-gray-300"
              }`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
              />
              <h3
                className={`text-lg font-semibold ${
                  theme === "dark" ||
                  (theme === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-sm mt-2 ${
                  theme === "dark" ||
                  (theme === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "text-white/70"
                    : "text-gray-600"
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
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        <div
          className={`backdrop-blur-md rounded-3xl shadow-2xl p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-10 hover:shadow-3xl transition-all duration-300 border-t border-l ${
            theme === "dark" ||
            (theme === "system" &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "bg-gradient-to-br from-white/8 to-white/3 border-white/20"
              : "bg-gradient-to-br from-white/90 to-white/70 border-gray-200/60"
          }`}
        >
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.12, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="flex-shrink-0"
          >
            <div className="h-32 w-32 flex items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] to-[#F4B400] shadow-2xl">
              <MessageCircle size={48} color="white" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center sm:text-left flex-1">
            <motion.h2
              className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "text-[#4285F4]"
                  : "text-[#4285F4]"
              }`}
              style={{
                textShadow:
                  theme === "dark" ||
                  (theme === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "0 0 12px rgba(66, 133, 244, 0.5)"
                    : "none",
              }}
            >
              Join the Conversation
            </motion.h2>
            <p
              className={`text-base sm:text-lg leading-relaxed mb-6 ${
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "text-white/80"
                  : "text-black/85"
              }`}
            >
              Engage with our vibrant community, exchange innovative ideas, and
              help shape the future of{" "}
              <span className="font-semibold text-[#F4B400]">
                AI and Design
              </span>
              . Connect with fellow students, ask questions, and grow together.
            </p>
            <Link to="/discussion">
              <motion.button
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 border-2 bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border-gray-400 hover:shadow-lg hover:shadow-gray-500/50"
              >
                Visit Discussion Board →
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
