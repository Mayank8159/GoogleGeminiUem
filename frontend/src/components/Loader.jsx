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
    // Enhanced GSAP timeline for logo and rings
    const tl = gsap.timeline({ repeat: -1 });
    
    if (logoRef.current) {
      // Logo breathing animation
      tl.to(logoRef.current, {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Rotating rings with different speeds and directions
    ringsRef.current.forEach((ring, index) => {
      if (ring) {
        gsap.to(ring, {
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 3 + index * 0.5,
          ease: "none",
          repeat: -1
        });
      }
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -window.innerHeight - 50,
          opacity: 0.8,
          duration: 4 + Math.random() * 2,
          delay: Math.random() * 3,
          ease: "power2.out",
          repeat: -1,
          repeatDelay: Math.random() * 2
        });
      }
    });

    return () => {
      tl.kill();
    };
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
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                ref={el => particlesRef.current[i] = el}
                className={`absolute w-1 h-1 rounded-full opacity-0`}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${window.innerHeight + Math.random() * 100}px`,
                  backgroundColor: [
                    '#4285F4', '#F4B400', '#0F9D58', '#DB4437', '#9AA0A6'
                  ][i % 5],
                  boxShadow: `0 0 10px ${[
                    '#4285F4', '#F4B400', '#0F9D58', '#DB4437', '#9AA0A6'
                  ][i % 5]}60`
                }}
              />
            ))}
          </div>

          {/* Background gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4285F4]/20 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F4B400]/20 blur-3xl"
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
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4]/30 to-[#F4B400]/30 blur-2xl"
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