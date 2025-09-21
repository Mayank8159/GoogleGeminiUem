import { motion } from "framer-motion";
import { Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Sections() {
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
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 sm:p-12 backdrop-blur-md flex flex-col sm:flex-row items-center gap-8 hover:shadow-2xl transition">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex-shrink-0"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-gradient-to-br from-[#DB4437] via-[#F4B400] to-[#4285F4] shadow-lg">
              <Users size={40} color="white" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="text-center sm:text-left">
            <motion.h2
              className="text-2xl font-bold mb-3 text-[#DB4437]"
              style={{ textShadow: "0 0 10px rgba(219, 68, 55, 0.7)" }}
            >
              Meet the Team
            </motion.h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Led by passionate students from{" "}
              <span className="font-semibold text-[#F4B400]">UEM Kolkata</span>,
              our team blends{" "}
              <span className="text-[#56eda9]">technical mastery</span> with{" "}
              <span className="text-[#1befdd]">emotional design</span> to create
              immersive, community-driven digital experiences.
            </p>
          </div>
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
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 sm:p-12 backdrop-blur-md flex flex-col sm:flex-row items-center gap-8 hover:shadow-2xl transition">
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
              className="text-2xl font-bold mb-3 text-[#0F9D58]"
              style={{ textShadow: "0 0 10px rgba(15, 157, 88, 0.7)" }}
            >
              Join the Conversation
            </motion.h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Dive into discussions, share ideas, and help shape the future of{" "}
              <span className="font-semibold text-[#d1fe68]">AI and Design</span>.{" "}
              Explore our{" "}
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