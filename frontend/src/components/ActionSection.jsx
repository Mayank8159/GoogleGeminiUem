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
              role: "Chairman",
              img: "/ashna.jpeg",
            },
            {
              name: "Arnab Sarkar",
              role: "Vice Chairman",
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
          className={`backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 hover:shadow-2xl transition
          ${
            theme === "dark" ||
            (theme === "system" &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
              ? "bg-white/5 border border-white/10"
              : "bg-white/80 border border-gray-300"
          }
        `}
        >
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex-shrink-0"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0F9D58] via-[#4285F4] to-[#F4B400] shadow-lg">
              <MessageCircle size={40} color="white" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center sm:text-left">
            <motion.h2
              className={`text-2xl font-bold mb-3 ${
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "text-[#0F9D58]"
                  : "text-[#0F9D58]"
              }`}
              style={{
                textShadow:
                  theme === "dark" ||
                  (theme === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
                    ? "0 0 10px rgba(15, 157, 88, 0.7)"
                    : "none",
              }}
            >
              Join the Conversation
            </motion.h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
                  ? "text-white/70"
                  : "text-black/80"
              }`}
            >
              Dive into discussions, share ideas, and help shape the future of{" "}
              <span className="font-semibold text-[#d1fe68]">
                AI and Design
              </span>
              . Explore our{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-[#F4B400] underline hover:text-[#DB4437] transition inline-block font-medium"
              >
                <Link to="/discussion">Discussion Board</Link>
              </motion.span>
              .
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
