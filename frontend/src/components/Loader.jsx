import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const logoRef = useRef(null);
  const ringsRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Hardware-accelerated transforms and lighter animations
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.07,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        force3D: true
      });
    }

    ringsRef.current.forEach((ring, index) => {
      if (ring) {
        gsap.to(ring, {
          rotation: index % 2 === 0 ? 180 : -180,
          duration: 4 + index * 0.5,
          ease: "linear",
          repeat: -1,
          force3D: true
        });
      }
    });

    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -window.innerHeight * 0.7,
          opacity: 0.6,
          duration: 3 + Math.random(),
          delay: Math.random() * 2,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: Math.random(),
          force3D: true
        });
      }
    });
  }, []);

  useEffect(() => {
    // Simulate loading progress with more realistic increments
    const progressTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(prev + Math.random() * 12 + 2, 100);
      });
    }, 150);

    const timer = setTimeout(() => setIsVisible(false), 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F2027] backdrop-blur-xl overflow-hidden"
        >
          {/* Enhanced floating particles */}
          <div className="absolute inset-0 pointer-events-none will-change-transform">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                ref={el => particlesRef.current[i] = el}
                className="absolute w-1.5 h-1.5 rounded-full opacity-0"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${window.innerHeight * 0.8 + Math.random() * 60}px`,
                  backgroundColor: [
                    '#4285F4', '#F4B400', '#0F9D58', '#DB4437'
                  ][i % 4],
                  boxShadow: `0 0 6px ${[
                    '#4285F4', '#F4B400', '#0F9D58', '#DB4437'
                  ][i % 4]}40`,
                  willChange: 'transform'
                }}
              />
            ))}
          </div>

          {/* Background gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4285F4]/20 blur-xl will-change-transform"
          />
          <motion.div
            animate={{
              scale: [1.08, 1, 1.08],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-[#F4B400]/20 blur-xl will-change-transform"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            {/* Perfect centered logo container with proper dimensions */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Container ensures perfect centering */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                
                {/* Animated rotating rings - perfectly centered */}
                <div
                  ref={el => ringsRef.current[0] = el}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#4285F4] border-r-[#F4B400]"
                />
                <div
                  ref={el => ringsRef.current[1] = el}
                  className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#0F9D58] border-l-[#DB4437]"
                />
                <div
                  ref={el => ringsRef.current[2] = el}
                  className="absolute inset-4 rounded-full border border-transparent border-t-[#9AA0A6] border-b-[#4285F4]"
                />

                {/* Pulsing glow effects - perfectly centered */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.18, 0.32, 0.18],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4]/30 to-[#F4B400]/30 blur-lg will-change-transform"
                />

                {/* Main logo - perfectly centered */}
                <div 
                  ref={logoRef}
                  className="relative z-10 flex items-center justify-center w-20 h-20"
                >
                  <img
                    src="/main.png"
                    alt="Gemini Logo"
                    className="w-full h-full object-contain rounded-xl shadow-2xl ring-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced loading text with better animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center space-y-4 relative z-10"
            >
              <motion.h1
                className="text-3xl sm:text-4xl font-bold font-space-grotesk tracking-wide"
              >
                {/* Animated gradient clipped to text (no rectangular background) */}
                <motion.span
                  aria-hidden={false}
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #4285F4 0%, #F4B400 25%, #0F9D58 50%, #DB4437 75%, #4285F4 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundSize: '200% 100%',
                    textShadow: '0 0 18px rgba(66, 133, 244, 0.35)'
                  }}
                >
                  Google Gemini
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/90 font-inter font-medium text-sm sm:text-base tracking-wide"
                style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}
              >
                Student Community • UEM Kolkata
              </motion.p>
            </motion.div>

            {/* Enhanced progress bar with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 w-72 relative z-10"
            >
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 shadow-lg">
                <motion.div
                  className="h-full relative overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #4285F4, #F4B400, #0F9D58)',
                    width: `${loadingProgress}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ width: '50%' }}
                  />
                </motion.div>
              </div>
              
              {/* Progress percentage with enhanced styling */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center mt-4 text-white/80 text-xs font-mono tracking-wider relative z-10 font-semibold"
                style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}
              >
                Loading... {Math.round(loadingProgress)}%
              </motion.div>
            </motion.div>

            {/* Enhanced loading dots with better spacing and colors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-6 flex gap-2 justify-center relative z-10"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full shadow-lg"
                  style={{ 
                    backgroundColor: ['#4285F4', '#F4B400', '#0F9D58'][i],
                    boxShadow: `0 0 12px ${['#4285F4', '#F4B400', '#0F9D58'][i]}70`
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