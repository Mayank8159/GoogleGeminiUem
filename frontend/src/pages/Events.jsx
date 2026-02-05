import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MFALogo } from "../components/MFALogo";
// ✅ adjust path if needed

gsap.registerPlugin(ScrollTrigger);

// ✅ Event start (local time)
const EVENT_START = new Date("Feb 6, 2026 20:00:00");

const getTimeLeft = (target) => {
  const diff = target.getTime() - new Date().getTime();
  const clamped = Math.max(0, diff);

  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  return { diff, days, hours, minutes, seconds };
};

const pad2 = (n) => String(n).padStart(2, "0");

const isPast = (dateStr, timeStr) => {
  const eventDate = new Date(`${dateStr}, 2026 ${timeStr}`);
  return new Date() > eventDate;
};

const GoldShimmer = () => (
  <motion.div
    initial={{ x: "-110%" }}
    animate={{ x: "210%" }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
    className="absolute inset-0 z-10 w-full h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
  />
);

// ✅ Silver shimmer for sponsor card
const SilverShimmer = () => (
  <motion.div
    initial={{ x: "-110%" }}
    animate={{ x: "210%" }}
    transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 2 }}
    className="absolute inset-0 z-10 w-full h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
  />
);

function Countdown({ isDark, goldGradient, timeLeft }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mt-10 flex justify-center"
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl border backdrop-blur-xl",
          "px-5 sm:px-7 py-4 sm:py-5",
          isDark ? "bg-black/30 border-amber-500/15" : "bg-white/75 border-amber-900/10",
          "shadow-[0_20px_70px_rgba(0,0,0,0.22)]",
        ].join(" ")}
      >
        <GoldShimmer />

        <div className="relative z-20 text-center">
          <p
            className={`font-[family-name:--font-treasure] text-[10px] sm:text-xs font-bold uppercase tracking-[0.55em] ${
              isDark ? "text-amber-200/70" : "text-amber-900/40"
            }`}
          >
            Countdown to Inauguration
          </p>

          {timeLeft.diff <= 0 ? (
            <div
              className={`mt-2 font-[family-name:--font-eldorado] text-2xl sm:text-4xl font-black ${
                isDark ? "text-white/90" : "text-black/90"
              }`}
            >
              Event started
            </div>
          ) : (
            <div className="mt-3 flex items-end justify-center gap-4 sm:gap-6">
              {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HRS", value: pad2(timeLeft.hours) },
                { label: "MIN", value: pad2(timeLeft.minutes) },
                { label: "SEC", value: pad2(timeLeft.seconds) },
              ].map((x) => (
                <div key={x.label} className="text-center">
                  <div
                    className="font-[family-name:--font-eldorado] text-3xl sm:text-5xl font-black leading-none"
                    style={{
                      background: goldGradient,
                      backgroundSize: "300% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 18px rgba(191,149,63,0.25))",
                    }}
                  >
                    {x.value}
                  </div>
                  <div
                    className={`mt-1 font-[family-name:--font-treasure] text-[9px] sm:text-[11px] font-bold tracking-[0.35em] ${
                      isDark ? "text-amber-200/70" : "text-amber-900/40"
                    }`}
                  >
                    {x.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCard({ title, isDark, children }) {
  const cardRef = useRef(null);
  const liquidRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !liquidRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(liquidRef.current, {
        backgroundPosition: "300% 0%",
        duration: 6,
        ease: "linear",
        repeat: -1,
      });

      gsap.fromTo(
        liquidRef.current,
        { height: "18%" },
        {
          height: "96%",
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={[
        "relative overflow-hidden rounded-3xl border backdrop-blur-xl",
        "px-5 sm:px-8 py-8 sm:py-10",
        isDark ? "bg-black/25 border-amber-500/15" : "bg-white/70 border-amber-900/10",
        "shadow-[0_25px_80px_rgba(0,0,0,0.25)]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -inset-24 opacity-45 blur-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(191,149,63,0.16),transparent_55%)]" />

      <div className="relative z-10 flex items-center gap-4 mb-10">
        <span className={`w-1.5 h-8 ${isDark ? "bg-amber-500" : "bg-amber-800"}`} />
        <h2 className="font-[family-name:--font-eldorado] text-3xl sm:text-5xl font-black tracking-tight">
          {title}
        </h2>
      </div>

      <div className="relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 flex justify-center">
          <div
            className={[
              "relative w-3.5 sm:w-4 rounded-full",
              "border",
              isDark ? "border-white/20" : "border-amber-900/15",
              "bg-white/5",
              "shadow-[inset_0_0_18px_rgba(255,255,255,0.10)]",
              "backdrop-blur-2xl",
            ].join(" ")}
          >
            <div
              ref={liquidRef}
              className={[
                "absolute bottom-0 left-0 right-0 rounded-full",
                "opacity-95",
                "shadow-[0_0_26px_rgba(251,191,36,0.35)]",
              ].join(" ")}
              style={{
                background:
                  "linear-gradient(90deg, rgba(191,149,63,0.95) 0%, rgba(252,246,186,0.95) 25%, rgba(179,135,40,0.95) 55%, rgba(251,245,183,0.95) 78%, rgba(170,119,28,0.95) 100%)",
                backgroundSize: "300% 100%",
              }}
            />

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/5 to-transparent opacity-45" />
          </div>
        </div>

        <div className="pl-10 sm:pl-14">{children}</div>
      </div>
    </div>
  );
}

const TimelineItem = ({ date, time, activity, isDark }) => {
  const hasEnded = isPast(date, time);
  const rowRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current || !dotRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dotRef.current,
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1.15,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 85%",
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={[
        "relative flex gap-4 sm:gap-6 mb-6 transition-all duration-700",
        "font-[family-name:--font-treasure]",
        hasEnded ? "opacity-25 grayscale" : "opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "flex-shrink-0 w-20 sm:w-24 text-[10px] sm:text-sm font-bold pt-1",
          isDark ? "text-amber-300" : "text-amber-700",
        ].join(" ")}
      >
        {time}
      </div>

      <div className="relative flex-1">
        <div
          ref={dotRef}
          className={[
            "absolute -left-[44px] sm:-left-[56px] top-[6px]",
            "w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full",
            hasEnded
              ? "bg-zinc-500"
              : isDark
              ? "bg-yellow-400 shadow-[0_0_18px_#fbbf24]"
              : "bg-amber-600 shadow-[0_0_16px_rgba(217,119,6,0.5)]",
          ].join(" ")}
        />

        <p className={`text-base sm:text-xl font-semibold leading-snug ${isDark ? "text-white/90" : "text-black/80"}`}>
          {activity}
        </p>

        <div className={`mt-3 h-[1px] ${isDark ? "bg-white/10" : "bg-amber-900/10"}`} />
      </div>
    </motion.div>
  );
};

export default function Events() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [prefersDark, setPrefersDark] = useState(false);

  const isDark = useMemo(() => {
    if (!mounted) return false;
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return prefersDark;
  }, [theme, prefersDark, mounted]);

  const goldGradient =
    "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 70%, #FBF5B7 85%, #AA771C 100%)";

  // ✅ Silver theme for sponsor card
  const silverGradient =
    "linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 35%, #D1D5DB 55%, #F3F4F6 75%, #9CA3AF 100%)";

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT_START));

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setPrefersDark(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => setTimeLeft(getTimeLeft(EVENT_START));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen px-4 pb-20 pt-40 sm:pt-48 bg-transparent overflow-hidden relative">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16 sm:mb-24">
          <motion.h1
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="font-[family-name:--font-eldorado] text-5xl sm:text-8xl lg:text-9xl font-black mb-4 tracking-tight leading-none"
            style={{
              background: goldGradient,
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(191,149,63,0.4))",
            }}
          >
            CHAMBER <br className="sm:hidden" /> OF SECRETS
          </motion.h1>
          <p className={`font-[family-name:--font-eldorado] text-sm sm:text-2xl font-bold tracking-[0.5em] uppercase ${isDark ? "text-amber-300" : "text-amber-800"}`}>
            Theme: Temple Run
          </p>

          <Countdown isDark={isDark} goldGradient={goldGradient} timeLeft={timeLeft} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-10 sm:gap-14">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative group mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <img src="/chamber/poster.png" alt="Poster" className="relative rounded-[2rem] shadow-2xl w-full border border-white/10" />
            </motion.div>

            {/* SPONSOR CARD — SILVER THEME */}
            <div className="relative flex flex-col items-center">
              <p className="font-[family-name:--font-treasure] text-[10px] font-bold uppercase tracking-[0.55em] mb-4 text-gray-400">
                Strategic Partner
              </p>

              <motion.div whileHover={{ scale: 1.02, y: -6 }} className="relative w-full max-w-[340px] sm:max-w-[460px]">
                {/* Silver aura */}
                <div className="absolute -inset-10 opacity-70 blur-[70px] bg-[radial-gradient(circle_at_50%_40%,rgba(229,231,235,0.55),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(156,163,175,0.45),transparent_55%)]" />

                {/* Silver frame */}
                <div
                  className="relative rounded-[1.65rem] p-[1.5px] shadow-[0_30px_90px_rgba(156,163,175,0.35)]"
                  style={{ background: silverGradient }}
                >
                  <div
                    className={[
                      "relative overflow-hidden rounded-[1.55rem] p-5 sm:p-7",
                      "backdrop-blur-2xl border border-white/10",
                      isDark ? "bg-black/35" : "bg-white/85",
                    ].join(" ")}
                  >
                    <SilverShimmer />

                    {/* inner highlight */}
                    <div className="pointer-events-none absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_30%_25%,rgba(249,250,251,0.38),transparent_55%)]" />

                    <div className="relative z-20 flex flex-col items-center gap-4">
                      <div className="sm:hidden">
                        <MFALogo height={94} className="mx-auto" />
                      </div>
                      <div className="hidden sm:block">
                        <MFALogo height={108} className="mx-auto" />
                      </div>

                      <div className="text-center">
                        <h3 className={`font-[family-name:--font-eldorado] text-lg sm:text-xl font-black uppercase tracking-tight ${isDark ? "text-gray-600" : "text-gray-800"}`}>
                          Mercy For Animals
                        </h3>
                        <div className="h-[1px] w-14 mx-auto mt-2 bg-gray-400/40" />
                        <p className={`mt-2 text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase ${isDark ? "text-gray-600" : "text-gray-800"}`}>
                          Silver Alliance
                        </p>
                      </div>
                    </div>

                    {/* bottom silver glow */}
                    <div className="pointer-events-none absolute -bottom-10 left-10 right-10 h-24 opacity-45 blur-3xl bg-[radial-gradient(circle,rgba(229,231,235,0.55),transparent_60%)]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8 sm:space-y-10 px-1 sm:px-2">
            <TimelineCard title="FEB 06" isDark={isDark}>
              <TimelineItem date="Feb 6" time="08:00 PM" activity="Inauguration" isDark={isDark} />
              <TimelineItem date="Feb 6" time="08:20 PM" activity="Online Round Starts" isDark={isDark} />
              <TimelineItem date="Feb 6" time="09:20 PM" activity="Game Ends" isDark={isDark} />
              <TimelineItem date="Feb 6" time="09:30 PM" activity="Conclusion" isDark={isDark} />
            </TimelineCard>

            <TimelineCard title="FEB 07" isDark={isDark}>
              <TimelineItem date="Feb 7" time="09:00 AM" activity="Reporting" isDark={isDark} />
              <TimelineItem date="Feb 7" time="10:00 AM" activity="Inauguration" isDark={isDark} />
              <TimelineItem date="Feb 7" time="10:30 AM" activity="Game Starts" isDark={isDark} />
              <TimelineItem date="Feb 7" time="01:30 PM" activity="Break" isDark={isDark} />
              <TimelineItem date="Feb 7" time="02:30 PM" activity="Event Ends" isDark={isDark} />
            </TimelineCard>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
