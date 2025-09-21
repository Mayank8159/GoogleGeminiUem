import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function EventCard({ event, idx, completed }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className={`p-4 rounded-xl border ${
        completed ? 'border-white/10 bg-white/5' : 'border-[#4285F4]/30 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]'
      } shadow-md backdrop-blur-md`}
    >
      <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
      <p className="text-white/70 text-sm mb-2">{event.description}</p>
      <span className="text-xs text-white/50">
        {new Date(event.date).toLocaleDateString()} • {completed ? 'Completed' : 'Upcoming'}
      </span>
    </motion.div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/events') // Your backend should return an array of events with { title, description, date }
      .then(res => setEvents(res.data))
      .catch(err => {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      });
  }, []);

  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now);
  const completed = events.filter(e => new Date(e.date) < now);

  return (
    <main className="pt-20 px-4 sm:px-6 pb-32 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold font-outfit drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          Gemini Events Portal
        </h1>
        <p className="text-white/70 text-sm mt-2">
          Explore upcoming adventures and celebrate past milestones 🌠
        </p>
      </motion.div>

      {/* Upcoming Events */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4 text-[#F4B400]">🔮 Upcoming Events</h2>
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((event, idx) => (
              <EventCard key={idx} event={event} idx={idx} completed={false} />
            ))}
          </div>
        ) : (
          <p className="text-white/50">No upcoming events. Stay tuned!</p>
        )}
      </section>

      {/* Completed Events */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-[#0F9D58]">🕯️ Completed Events</h2>
        {completed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completed.map((event, idx) => (
              <EventCard key={idx} event={event} idx={idx} completed={true} />
            ))}
          </div>
        ) : (
          <p className="text-white/50">No completed events yet. Let the journey begin!</p>
        )}
      </section>
    </main>
  );
}