import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => setIsVisible(false), 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F2027] backdrop-blur-xl"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-10, window.innerHeight + 10],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
                className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="relative flex flex-col items-center"
          >
            {/* Enhanced Logo Container */}
            <div className="relative mb-8 pb-8 sm:pb-12 w-32 h-32 mx-auto">
              {/* Pulsing glow layers - positioned behind everything */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#4285F4]/20 blur-2xl -z-10"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-[#F4B400]/20 blur-xl -z-10"
              />
              
              {/* Multiple rotating rings - contained within bounds */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#4285F4] border-r-[#F4B400]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-transparent border-b-[#0F9D58] border-l-[#DB4437]"
              />
              
              {/* Main Logo - centered and stable */}
              <motion.div
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center z-10"
              >
                <img
                  src="/main.png"
                  alt="Gemini Logo"
                  className="h-16 w-16 rounded-xl shadow-2xl ring-2 ring-white/30"
                />
              </motion.div>
            </div>

            {/* Enhanced Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-3 relative z-20"
            >
              <motion.h1
                animate={{
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-2xl sm:text-3xl font-bold font-outfit tracking-wide bg-gradient-to-r from-[#4285F4] via-[#F4B400] via-[#0F9D58] to-[#DB4437] bg-clip-text text-transparent relative"
                style={{ 
                  backgroundSize: '200% 100%',
                  textShadow: '0 0 20px rgba(66, 133, 244, 0.3)'
                }}
              >
                <span className="relative z-10">Google Gemini</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/80 font-medium text-sm relative z-10"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                Google Gemini Student Community UEMK
              </motion.p>
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 w-56 relative z-10"
            >
              <div className="h-1 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] rounded-full relative overflow-hidden"
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Loading percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center mt-3 text-white/70 text-xs font-mono tracking-wider relative z-10"
                style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                {Math.round(loadingProgress)}%
              </motion.div>
            </motion.div>

            {/* Loading dots animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-4 flex gap-1.5 justify-center relative z-10"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full shadow-lg"
                  style={{ 
                    backgroundColor: ['#4285F4', '#F4B400', '#0F9D58'][i],
                    boxShadow: `0 0 8px ${['#4285F4', '#F4B400', '#0F9D58'][i]}40`
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}