import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const links = [
  { id: 1, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=17', color: '#4285F4' },
  { id: 2, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=16', color: '#F4B400' },
  { id: 3, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=15', color: '#0F9D58' },
  { id: 4, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=14', color: '#DB4437' },
  { id: 5, url: 'https://aiskillshouse.com/student/qr-mediator.html?uid=7295&promptId=13', color: '#9AA0A6' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
};

export default function GeminiClicks() {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }

    // Cards floating animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: -5,
          duration: 2 + index * 0.1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });
      }
    });
  }, []);

  const handleClick = (url, color, cardIndex) => {
    // Create click ripple effect
    const card = cardsRef.current[cardIndex];
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
    
    window.open(url, '_blank');
  };

  return (
    <section className="mt-20 px-4 sm:px-8">
      {/* Enhanced Header */}
      <div ref={headerRef} className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold font-space-grotesk tracking-wide mb-4"
          style={{ 
            background: "linear-gradient(45deg, #4285F4, #F4B400, #0F9D58, #DB4437)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
            backgroundSize: "300% 300%"
          }}
        >
          Gemini Click Challenge
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/80 text-base sm:text-lg font-inter"
        >
          Help us reach 10,000 clicks — every tap fuels the mission ✨
        </motion.p>
      </div>

      {/* Enhanced Link Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {links.map((link, index) => (
          <motion.div
            key={link.id}
            ref={el => cardsRef.current[index] = el}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.95 }}
            className="glass-morphism rounded-2xl p-6 shadow-2xl border border-white/20 relative overflow-hidden group cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${link.color}08, ${link.color}03)`,
            }}
          >
            {/* Animated background shimmer */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              style={{ width: '50%' }}
            />

            {/* Card content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: link.color }}
                >
                  {link.id}
                </motion.div>
                <h3 className="text-lg font-semibold text-white font-space-grotesk">
                  Link #{link.id}
                </h3>
              </div>
              
              <motion.button
                onClick={() => handleClick(link.url, link.color, index)}
                className="w-full px-4 py-3 rounded-lg font-semibold text-white relative overflow-hidden group/btn"
                style={{
                  background: `linear-gradient(45deg, ${link.color}, ${link.color}cc)`,
                  boxShadow: `0 4px 15px ${link.color}40`
                }}
                whileHover={{
                  boxShadow: `0 8px 25px ${link.color}60`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:via-white/30"
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Click & Boost
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.button>
            </div>

            {/* Hover glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle at center, ${link.color}20, transparent 70%)`,
                pointerEvents: 'none'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Fun stats section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 glass-morphism rounded-full border border-white/20">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            🎯
          </motion.span>
          <span className="text-white/80 font-inter">
            Goal: <span className="font-bold text-[#F4B400]">10,000 clicks</span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}