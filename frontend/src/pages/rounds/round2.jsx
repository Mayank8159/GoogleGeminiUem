import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '../../MessagesContext';

const Round2 = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Game State
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isFlashing, setIsFlashing] = useState(false);
  const [activeRune, setActiveRune] = useState(null);
  const [level, setLevel] = useState(1);

  const { showMessage } = useMessages();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const slideIntervalRef = useRef(null);

  const RUNES = ["ᚱ", "ᚦ", "ᚻ", "ᛗ", "ᛊ", "ᛉ"];

  // --- FULLSCREEN DISQUALIFICATION LOGIC ---
  useEffect(() => {
    const handleSecurityChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      
      if (isActive && !isFull) {
        setIsActive(false);
        showMessage?.("DISQUALIFIED: Fullscreen exit detected. Trial failed.", "error");
        setTimeout(() => navigate('/'), 3000); 
      }
    };

    document.addEventListener('fullscreenchange', handleSecurityChange);
    return () => document.removeEventListener('fullscreenchange', handleSecurityChange);
  }, [isActive, navigate, showMessage]);

  // --- Game Logic ---
  const startNewLevel = (currentLevel) => {
    const newSequence = [];
    for (let i = 0; i < currentLevel + 2; i++) {
      newSequence.push(Math.floor(Math.random() * RUNES.length));
    }
    setSequence(newSequence);
    setUserSequence([]);
    flashSequence(newSequence);
  };

  const flashSequence = async (seq) => {
    setIsFlashing(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setActiveRune(seq[i]);
      await new Promise(r => setTimeout(r, 600));
      setActiveRune(null);
    }
    setIsFlashing(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setLevel(1);
    setSequence([]);
    setUserSequence([]);
    setActiveRune(null);
    showMessage?.("Relic Mechanism Reset", "info");
  };

  const handleRuneClick = (index) => {
    if (isFlashing || !isActive) return;
    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);
    if (sequence[newUserSeq.length - 1] !== index) {
      showMessage?.("Wrong Rune!", "error");
      setUserSequence([]);
      flashSequence(sequence);
      return;
    }
    if (newUserSeq.length === sequence.length) {
      if (level >= 5) {
        setIsActive(false);
        showMessage?.("Relic Restored!", "success");
      } else {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setTimeout(() => startNewLevel(nextLevel), 800);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSeconds(prev => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  const slides = [
    { title: "RUNE LOCK", text: "Memorize the glowing sequence." },
    { title: "WARNING", text: "Exiting fullscreen will disqualify you immediately." },
    { title: "LEVEL UP", text: "Complete 5 stages to unlock the door." }
  ];

  return (
    <div 
      className="h-screen w-screen flex flex-col relative overflow-hidden font-sans text-white bg-black"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/chamber/2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 1. Header Area */}
      <div className="pt-6 px-8 flex justify-between items-center z-10">
        <button onClick={() => navigate('/')} className="text-[#facc15] font-black text-[10px] tracking-widest">← EXIT</button>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-[#facc15] drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] italic">Chamber of Secrets</h1>
            <p className="text-[#facc15] font-mono text-[10px] tracking-[0.4em]">LEVEL {level}/5</p>
        </div>
        <button 
            onClick={toggleFullscreen} 
            className={`px-4 py-1.5 rounded-full text-[9px] font-black border-2 transition-all ${isFullscreen ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500 animate-pulse'}`}
        >
          {isFullscreen ? 'SECURE' : 'UNSECURED'}
        </button>
      </div>

      {/* 2. Main Game Container */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-6 px-4 z-10">
        
        {/* SILVER BRIEFING BOX */}
        <div className="w-full max-w-xs h-[240px] flex flex-col justify-between p-6 rounded-2xl border border-white/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#e5e7eb] via-[#f9fafb] to-[#9ca3af]">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
           <div key={`p-${slideIndex}`} className="absolute top-0 left-0 h-1 bg-blue-500 animate-progressFill" />
           <div key={slideIndex} className="animate-slideIn">
             <h2 className="text-gray-900 text-xl font-black italic">{slides[slideIndex].title}</h2>
             <p className="text-gray-700 text-sm font-bold italic mt-2">"{slides[slideIndex].text}"</p>
           </div>
           <div className="flex gap-1.5">
             {[0,1,2].map(i => (
               <div key={i} className={`h-1.5 rounded-full transition-all ${i === slideIndex ? 'bg-blue-600 w-6' : 'bg-gray-400 w-1.5'}`} />
             ))}
           </div>
        </div>

        {/* GOLD CONSOLE BOX */}
        <div className="w-full max-w-sm p-6 rounded-[2rem] border-4 border-[#854d0e] shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden bg-gradient-to-br from-[#b45309] via-[#facc15] to-[#78350f]">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
           <div className="relative z-10">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 mb-4 text-center">
                 <div className="text-[#facc15] font-mono text-5xl font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button 
                  onClick={() => { setIsActive(true); if(sequence.length === 0) startNewLevel(level); }}
                  disabled={isActive}
                  className={`py-2 rounded-lg font-black text-[10px] tracking-widest border-b-4 transition-all ${isActive ? 'bg-green-900 text-green-700 border-green-950 opacity-60' : 'bg-green-600 text-white border-green-800 hover:bg-green-500 active:translate-y-1 active:border-b-0'}`}
                >
                  PLAY
                </button>
                <button 
                  onClick={() => setIsActive(false)}
                  disabled={!isActive}
                  className={`py-2 rounded-lg font-black text-[10px] tracking-widest border-b-4 transition-all ${!isActive ? 'bg-yellow-900 text-yellow-700 border-yellow-950 opacity-60' : 'bg-yellow-500 text-black border-yellow-700 hover:bg-yellow-400 active:translate-y-1 active:border-b-0'}`}
                >
                  PAUSE
                </button>
                <button 
                  onClick={handleReset}
                  className="py-2 rounded-lg font-black text-[10px] tracking-widest bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600 active:translate-y-1 active:border-b-0 transition-all"
                >
                  RESET
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 p-2 bg-black/20 rounded-xl">
                {RUNES.map((rune, i) => (
                  <button
                    key={i}
                    onClick={() => handleRuneClick(i)}
                    disabled={isFlashing || !isActive}
                    className={`aspect-square flex items-center justify-center text-3xl rounded-xl border-2 transition-all ${activeRune === i ? 'bg-white text-black border-white shadow-[0_0_20px_white]' : 'bg-black/60 border-white/10 text-[#facc15] hover:bg-black/40'}`}
                  >
                    {rune}
                  </button>
                ))}
              </div>

              <div className={`mt-4 text-center font-black text-[10px] uppercase tracking-tighter ${isFlashing ? 'text-blue-200 animate-pulse' : 'text-[#451a03]'}`}>
                  {isFlashing ? '✦ System Memorizing ✦' : isActive ? '✦ Explorer Turn ✦' : '✦ System Standby ✦'}
              </div>
           </div>
        </div>
      </div>

      {/* 3. The Warning Footer */}
      <div className="w-full bg-[#1a0505] border-t-2 border-[#facc15] py-2 z-20">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-[#facc15] font-black text-[10px] tracking-[0.2em] mx-10">
                ⚠️ FULLSCREEN REQUIRED — EXITING DISQUALIFIES YOU IMMEDIATELY ⚠️
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.3%); } }
        @keyframes shimmer { 0% { transform: translateX(-100%) rotate(45deg); } 100% { transform: translateX(250%) rotate(45deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
        .animate-marquee { animation: marquee 20s linear infinite; display: inline-block; }
        .animate-shimmer { animation: shimmer 4s infinite linear; width: 40%; height: 300%; top: -100%; position: absolute; }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
        .animate-progressFill { animation: progressFill 4s linear forwards; }
      `}</style>
    </div>
  );
};

export default Round2;