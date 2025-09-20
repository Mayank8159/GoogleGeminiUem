import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }} // Move exit transition here
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="relative"
          >
            {/* Glow background */}
            <div className="absolute inset-0 rounded-full bg-[#4285F4]/30 blur-2xl scale-125" />
            {/* Gemini Logo */}
            <img
              src="/main.png"
              alt="Gemini Logo"
              className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl z-10 shadow-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}