import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Mail, Phone, MapPin } from 'lucide-react';
import socket from '../socket';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Color themes for cards
  const cardThemes = [
    { primary: '#4285F4', secondary: '#669DF6', accent: '#EA4335' },
    { primary: '#EA4335', secondary: '#FBBC05', accent: '#34A853' },
    { primary: '#FBBC05', secondary: '#34A853', accent: '#4285F4' },
    { primary: '#34A853', secondary: '#5BB974', accent: '#EA4335' }
  ];

  useEffect(() => {
    // Dummy data for now - in future, fetch from backend via socket
    const dummyTeam = [
      {
        id: 1,
        name: 'Rajeet Ash',
        designation: 'Developer',
        pic: '/team1.jpg', // Placeholder, replace with actual images
        rating: 4.9,
        email: 'rajee@ggsc.com',
        phone: '+91 xxxxx xxxxx',
        location: 'Kolkata, India',
        bio: 'Passionate about AI and web development. Leads the technical team with innovative solutions.',
        skills: ['React', 'Node.js', 'AI/ML', 'Robotics']
      },
      {
        id: 2,
        name: 'Mayank',
        designation: 'UI/UX Designer',
        pic: '/team2.jpg',
        rating: 4.5,
        email: 'mayank@ggsc.com',
        phone: '+91 xxxxx xxxxx',
        location: 'Kolkata, India',
        bio: 'Creative designer focused on user experience and Google Material Design principles.',
        skills: ['Web Development', 'Material UI', 'Leadership']
      }
    ];

    // Simulate socket fetch
    socket.emit('getTeamData');
    socket.on('teamData', (data) => {
      setTeamMembers(data);
    });

    // For now, set dummy data
    setTeamMembers(dummyTeam);

    return () => {
      socket.off('teamData');
    };
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-[#F4B400] fill-current' : 'text-white/30'}`}
      />
    ));
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold font-outfit drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] mb-4">
          Our Team
        </h1>
        <p className="text-white/70 text-lg">
          Meet the brilliant minds behind the Google Gemini Student Community
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => {
          const theme = cardThemes[index % cardThemes.length];
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group h-80 [perspective:1000px] animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <motion.div
                className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-xl"
                animate={{
                  boxShadow: [
                    `0 0 0 rgba(${theme.primary.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0)`,
                    `0 0 25px rgba(${theme.primary.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0.6)`,
                    `0 0 0 rgba(${theme.primary.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, 0)`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                
                {/* Front of Card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 flex flex-col items-center justify-center group-hover:shimmer-effect overflow-hidden">
                  <motion.div
                    className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg"
                    style={{ border: `2px solid ${theme.primary}` }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 } }}
                  >
                    <img
                      src={member.pic}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/96x96/${theme.primary.replace('#', '')}/FFFFFF?text=${member.name.charAt(0)}`;
                      }}
                    />
                  </motion.div>
                  <motion.h3
                    className="text-xl font-semibold font-outfit mb-1"
                    animate={{ color: [theme.primary, theme.secondary, theme.primary] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                  >
                    {member.name}
                  </motion.h3>
                  <p className="text-[#F4B400] text-sm mb-3">{member.designation}</p>
                  <div className="flex items-center gap-1">
                    {renderStars(member.rating)}
                    <span className="text-xs text-white/70 ml-2">({member.rating})</span>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl backdrop-blur-md border border-white/20 shadow-lg p-6 flex flex-col justify-between overflow-hidden group-hover:shimmer-effect"
                     style={{ background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)` }}>
                  <div>
                    <motion.h3
                      className="text-xl font-semibold font-outfit mb-2 text-center"
                      animate={{ color: [theme.primary, theme.accent, theme.primary] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    >
                      {member.name}
                    </motion.h3>
                    <p className="text-sm text-white/80 mb-4 text-center">{member.bio}</p>
                    <div className="space-y-2 text-sm">
                      <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                        <Mail className="h-4 w-4 text-[#DB4437]" />
                        <span>{member.email}</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                        <Phone className="h-4 w-4 text-[#0F9D58]" />
                        <span>{member.phone}</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
                        <MapPin className="h-4 w-4 text-[#F4B400]" />
                        <span>{member.location}</span>
                      </motion.div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs"
                          whileHover={{ scale: 1.1, backgroundColor: `${theme.primary}40` }}
                          animate={{ rotate: [0, 2, -2, 0] }}
                          transition={{ rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 } }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
};

export default Team;