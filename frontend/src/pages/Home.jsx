import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A simple component to render inline SVG icons.
// This is an alternative to a library like lucide-react,
// which requires a build setup not available in this environment.
const Icon = ({ name, color = 'currentColor', size = 24, strokeWidth = 2 }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Child variant for individual fade-in
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="px-6 py-20 sm:py-32 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white overflow-hidden relative">
      {/* Background glowing effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute h-80 w-80 rounded-full bg-blue-500 blur-3xl -top-20 -left-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute h-96 w-96 rounded-full bg-indigo-500 blur-3xl -bottom-20 -right-20"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-16 relative z-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.4 }}
            className="relative mt-6"
          >
            <div className="absolute inset-0 rounded-full bg-[#4285F4]/30 blur-2xl scale-125" />
            <motion.img
              src="/main.png"
              alt="Gemini Logo"
              className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl z-10 shadow-xl"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold font-outfit tracking-wide" style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }}>
            Google Gemini Student Community
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-white/70">
            A student-led initiative at UEM Kolkata, empowering learners through innovation, collaboration, and cosmic curiosity.
          </p>
        </motion.div>

        {/* About Section */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl text-center"
        >
          <motion.h2 className="text-xl font-semibold mb-2 text-[#F4B400] flex items-center justify-center gap-2" style={{ textShadow: '0 0 10px rgba(244, 180, 0, 0.8)' }}>
            <Icon name="info" color="#F4B400" />About Us
          </motion.h2>
          <p className="text-sm sm:text-base text-white/70">
            GGSC is a vibrant community of tech enthusiasts, designers, and dreamers. We explore the power of Google Gemini and AI to build meaningful experiences, foster leadership, and spark innovation across campus.
          </p>
        </motion.section>

        {/* Events Preview */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full"
        >
          <motion.h2 className="text-xl font-semibold mb-6 text-[#0F9D58] flex items-center justify-center gap-2" style={{ textShadow: '0 0 10px rgba(15, 157, 88, 0.8)' }}>
            <Icon name="calendar" color="#0F9D58" />Upcoming Events
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Gemini Hackathon',
                desc: 'Build AI-powered apps with Gemini APIs.',
                color: '#4285F4'
              },
              {
                title: 'Design Jam',
                desc: 'Craft stunning UIs with Framer Motion & Tailwind.',
                color: '#F4B400'
              },
              {
                title: 'AI & Ethics Panel',
                desc: 'Discuss the future of responsible AI.',
                color: '#DB4437'
              }
            ].map(({ title, desc, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-left"
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color }}>{title}</h3>
                <p className="text-sm text-white/70">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Spotlight */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl text-center"
        >
          <motion.h2 className="text-xl font-semibold mb-2 text-[#DB4437] flex items-center justify-center gap-2" style={{ textShadow: '0 0 10px rgba(219, 68, 55, 0.8)' }}>
            <Icon name="users" color="#DB4437" />Meet the Team
          </motion.h2>
          <p className="text-sm sm:text-base text-white/70">
            Led by passionate students from UEM Kolkata, our team blends technical mastery with emotional design to create immersive, community-driven digital experiences.
          </p>
        </motion.section>

        {/* Community Call-to-Action */}
        <motion.section
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl text-center"
        >
          <motion.h2 className="text-xl font-semibold mb-2 text-[#0F9D58] flex items-center justify-center gap-2" style={{ textShadow: '0 0 10px rgba(15, 157, 88, 0.8)' }}>
            <Icon name="messageCircle" color="#0F9D58" />Join the Conversation
          </motion.h2>
          <p className="text-sm sm:text-base text-white/70 mb-4">
            Dive into discussions, share ideas, and help shape the future of AI and design. Explore our{' '}
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-[#4285F4] underline hover:text-[#F4B400] transition inline-block"
            >
              <Link to="/discussion">Discussion Board</Link>
            </motion.span>
            .
          </p>
        </motion.section>
      </div>
    </main>
  );
}
