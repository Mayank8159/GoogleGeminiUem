import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '../../MessagesContext';

const Round1 = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { showMessage } = useMessages();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const slideIntervalRef = useRef(null);

  // --- Fullscreen Logic ---
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        showMessage?.(`Error: ${e.message}`, "error");
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Sync state if user exits via 'Esc' key
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // --- Round Timer Logic ---
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  // --- Auto-Presentation (4s) ---
  const startSlideTimer = () => {
    stopSlideTimer();
    slideIntervalRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopSlideTimer = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
  };

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  const slides = [
    { id: 1, title: "THE AWAKENING", text: "Locate the first Mossy Totem QR hidden in the brush." },
    { id: 2, title: "ANCIENT CIPHER", text: "Decode the rhythmic pattern to unlock the next path." },
    { id: 3, title: "THE CHASE", text: "Keep moving! The shadows grow longer every second." },
    { id: 4, title: "TEMPLE EXIT", text: "Scan the final Golden Idol to stop the clock." }
  ];

  const formatTime = (totalSeconds) => {
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="h-screen w-screen flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url('/chamber/1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top Navigation Bar (Floating) */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-50">
        <button 
          onClick={() => navigate('/')}
          className="text-green-400 hover:text-yellow-400 font-black uppercase text-xs tracking-widest transition-all drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]"
        >
          ← Abandon Mission
        </button>

        {/* Fullscreen Button */}
        <button 
          onClick={toggleFullscreen}
          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-full text-green-400 text-xs font-black uppercase tracking-tighter transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)]"
        >
          {isFullscreen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 9L4 4m0 0l5 0M4 4l0 5m11 0l5-5m0 0l-5 0m5 0l0 5m-5 11l5 5m0 0l-5 0m5 0l0-5m-11 0l-5 5m0 0l5 0m-5 0l0-5" />
              </svg>
              Exit View
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Enter Fullscreen
            </>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-10 z-10">
        <h1 className="text-6xl md:text-8xl font-black text-[#facc15] drop-shadow-[0_0_20px_rgba(250,204,21,0.5)] tracking-tighter uppercase italic">
          QR MAZE: THE RUN
        </h1>
        <div className="h-2 w-64 bg-[#facc15] mx-auto mt-2 rounded-full shadow-[0_0_30px_#facc15]"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl z-10">
        
        {/* LEFT SIDE: Briefing Card */}
        <div className="w-full max-w-md h-[400px] flex flex-col justify-between bg-black/80 border-2 border-green-500 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.4)]">
           <div key={`prog-${slideIndex}`} className="absolute top-0 left-0 h-1.5 bg-green-400 shadow-[0_0_15px_#4ade80] animate-progressFill" />
           <div key={slideIndex} className="animate-slideIn">
             <span className="text-green-400 font-black text-xs tracking-[0.4em] uppercase drop-shadow-[0_0_3px_#4ade80]">Briefing {slideIndex + 1}</span>
             <h2 className="text-white text-4xl font-black uppercase italic mt-3 mb-4">{slides[slideIndex].title}</h2>
             <p className="text-gray-300 text-xl font-semibold leading-relaxed">{slides[slideIndex].text}</p>
           </div>
           
           {/* Indicators */}
           <div className="flex justify-center gap-3">
              {slides.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(74,222,128,0.4)] ${i === slideIndex ? 'bg-green-400 w-10' : 'bg-white/10 w-2'}`} />
              ))}
           </div>
        </div>

        {/* RIGHT SIDE: Game Console */}
        <div className="w-full max-w-md bg-black border-4 border-green-600 rounded-[2.5rem] p-10 shadow-[0_0_40px_rgba(22,163,74,0.5)] relative">
          <div className="bg-green-950/40 rounded-3xl p-8 mb-10 border-2 border-green-500/50 flex flex-col items-center">
            <span className="text-green-400 font-black text-sm uppercase mb-3 tracking-[0.3em] drop-shadow-[0_0_5px_#22c55e]">Live Clock</span>
            <div className="text-8xl font-mono font-black text-green-400 tabular-nums tracking-tighter drop-shadow-[0_0_20px_#22c55e]">
              {formatTime(seconds)}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {!isActive ? (
              <button
                onClick={() => { setIsActive(true); showMessage?.("Run Started!", "success"); }}
                className="w-full py-6 bg-green-600 hover:bg-green-500 text-white text-3xl font-black rounded-2xl border-b-[10px] border-green-800 active:border-b-0 active:translate-y-2 transition-all uppercase italic"
              >
                Start Run
              </button>
            ) : (
              <button
                onClick={() => { setIsActive(false); showMessage?.("Paused", "info"); }}
                className="w-full py-6 bg-red-600 hover:bg-red-500 text-white text-3xl font-black rounded-2xl border-b-[10px] border-red-900 active:border-b-0 active:translate-y-2 transition-all uppercase italic"
              >
                Stop Timer
              </button>
            )}
            <button
              onClick={() => { setSeconds(0); setIsActive(false); }}
              className="text-gray-400 font-black uppercase text-sm tracking-widest hover:text-green-400 transition-colors mt-2"
            >
              Reset Terminal
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
        .animate-progressFill { animation: progressFill 4s linear forwards; }
      `}</style>
    </div>
  );
};

export default Round1;