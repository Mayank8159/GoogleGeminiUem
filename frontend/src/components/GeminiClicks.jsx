import { motion } from 'framer-motion';

const links = [
  { id: 1, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=17' },
  { id: 2, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=16' },
  { id: 3, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=15' },
  { id: 4, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=14' },
  { id: 5, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=13' },
];

export default function GeminiClicks() {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section className="mt-20 px-4 sm:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold font-outfit tracking-wide"
          style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }}
        >
          Gemini Click Challenge
        </motion.h2>

        <p className="text-white/70 mt-3 text-base sm:text-lg">
          Help us reach 10,000 clicks — every tap fuels the mission ✨
        </p>
      </div>

      {/* Link Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <motion.div
            key={link.id}
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md transition-all"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Link #{link.id}</h3>
            <button
              onClick={() => handleClick(link.url)}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#0F9D58] hover:from-[#F4B400] hover:to-[#DB4437] text-white rounded-lg font-semibold transition-all duration-300"
            >
              Click & Boost
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}