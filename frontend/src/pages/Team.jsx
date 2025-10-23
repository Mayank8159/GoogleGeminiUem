import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import socket from "../socket";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [openCard, setOpenCard] = useState(null);
  const { theme } = useTheme();

  // Color themes
  const cardThemes = [
    { primary: "#4285F4", secondary: "#669DF6", accent: "#EA4335" },
    { primary: "#EA4335", secondary: "#FBBC05", accent: "#34A853" },
    { primary: "#FBBC05", secondary: "#34A853", accent: "#4285F4" },
    { primary: "#34A853", secondary: "#5BB974", accent: "#EA4335" },
  ];

  useEffect(() => {
    const dummyTeam = [
      {
        id: 1,
        name: "Ashna Islam",
        designation: "Chairperson",
        pic: "/ashna.jpeg",
        email: "ashnaislam03@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I’m Ashna Islam, a B.Tech student passionate about tech, writing, and innovation. My journey spans coding, IEEE content, projects, and business ventures. As chair, I aim to lead with vision, foster collaboration, and create impact. Every step reflects my drive to grow, build, and contribute meaningfully to change.",
        skills: ["Leadership", "Cybersecurity", "Public Speaking"],
      },
      {
        id: 2,
        name: "Arnab Sarkar",
        designation: "Vice Chairperson",
        pic: "/arnab.jpg",
        email: "arnabsar2005@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I’m Arnab, a 2nd-year CSE (Cybersecurity) student passionate about coding, problem-solving, and AI. As Vice Chair of the Google Gemini Student Community, I aspire to drive innovative projects, lead collaborative initiatives, and make a meaningful impact in the tech community.",
        skills: ["Leadership", "Public Speaking", "Cybersecurity"],
      },
      {
        id: 3,
        name: "Arko Sen",
        designation: "Secretary",
        pic: "/arko.jpg",
        email: "arkosen45@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I'm Arko presently working as a head of tech management in GGSC, and also associated with IEEE and THEATRIX of UEMK",
        skills: ["Leadership", "Public Speaking", "Cybersecurity"],
      },
      {
        id: 4,
        name: "Dipankar Bera",
        designation: "Secretary",
        pic: "/dipankar.jpg",
        email: "beradipankar314@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I am Dipankar, a 2nd-year B.Tech Computer Science student. I am passionate about coding, problem-solving, and exploring technologies. I have a keen interest in working on projects that are sustainable, eco-friendly, and budget-friendly while building a strong foundation for my career.",
        skills: ["Leadership", "Public Speaking", "Cybersecurity"],
      },
      {
        id: 5,
        name: "Mayank Sharma",
        designation: "WebMaster",
        pic: "/Mayank.jpg",
        email: "mayankfhacker@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "Visionary founder blending cosmic design, real-time tech, and emotional UX. Expert in React, Next.js, Tailwind v4, Framer Motion, Socket.io, modular architecture, and premium UI polish—crafting branded platforms that empower communities with immersive, glowing, feedback-rich experiences.",
        skills: [
          "Leadership",
          "Full Stack Development",
          "AI/ML",
          "UI/UX Design",
        ],
      },
      {
        id: 6,
        name: "Pallabi Roy",
        designation: "Content Writing & Social Media Manager",
        pic: "/Pallabi.jpg",
        email: "pallabiroy2006@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: " I’m Pallabi Roy, a B.Tech CSE (Cyber Security) student. I am passionate about content creation, community engagement, and digital media. Currently, I serve as the Content Writer and Social Media Manager, where I focus on impactful communication, creative strategies, and building meaningful online connections.",
        skills: ["Leadership", "Content Writing", "Cybersecurity"],
      },
      {
        id: 7,
        name: "Parnatosh Mukherjee",
        designation: "Student Operations",
        pic: "/Parnatosh.jpeg",
        email: "parnatosh2020@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I am a dedicated learner with a strong interest in advanced biology, microbiology, management, and technology. I enjoy exploring programming, data analysis, and problem-solving in areas like machine learning and quantum computing. Passionate about continuous learning, I combine academic knowledge with practical skills to grow in both technical and analytical fields.",
        skills: ["Leadership", "Soft Skills", "AI/ML"],
      },
      {
        id: 8,
        name: "Priyabrata Roy",
        designation: "Managerial Head",
        pic: "/Priyabrata.jpg",
        email: "pc733102@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I’m a 3rd-year B.Tech student in CSIT, passionate about technology management and leadership. My experiences in the managerial domain have shaped my skills in teamwork, coordination, and problem-solving. I aspire to bridge technology with management, taking on roles that challenge me to lead, innovate, and create meaningful impact.",
        skills: ["Leadership", "Management", "CSIT"],
      },
      {
        id: 9,
        name: "Sagnik Saha",
        designation: "Student Operations",
        pic: "/Sagnik.jpg",
        email: "saha.sagnik024@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I am Sagnik Saha,B.Tech student in AI & Robotics with strong interest in artificial intelligence, robotics, and embedded systems. Active IEEE MTTS UEMK member with hands-on experience in innovative technologies. Passionate about problem-solving, research, and developing impactful solutions by combining technical knowledge with creativity and teamwork to address real-world challenges.",
        skills: ["Leadership", "Management", "Robotics and AI"],
      },
      {
        id: 10,
        name: "Sattwik Singha Roy",
        designation: "Social Media Strategist",
        pic: "/Sattwik.jpg",
        email: "awssattwikrajput@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "Multidimensional and mission-driven, Sattwik Singha Roy is a highly ambitious engineering student, social media strategist, and passionate debater. A skilled communicator and sharp thinker, he thrives on learning, exploring, and evolving balancing devotion, humility, and drive with a relentless hunger for impact, growth, and being there when others need him the most.",
        skills: ["Leadership", "Social Media Management", "AI"],
      },
      {
        id: 11,
        name: "Sneha Banik",
        designation: "Event Manager",
        pic: "/Sneha.jpeg",
        email: "sneha.banik06@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I am a 2nd year BTech CSE(AI) student studying at UEM,Newtown.I am an active member of CSI,UEMCON and Iris,and I believe my experiences can provide valuable input to the team and I will be grateful if I am chosen to be in this esteemed team.",
        skills: ["Leadership", "Event Management", "Public Speaking"],
      },
      {
        id: 11,
        name: "Snigdha Singha",
        designation: "Social media, sponsorship and branding head",
        pic: "/Snigdha.jpg",
        email: "myselfsnigdha2023@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I’m Snigdha Singha, a B.Tech AIML student. I’m passionate about creativity, social media, and community building. Currently, I serve as the Social Media, Sponsorship, and Branding Lead at the Google Gemini Student Community, where I aim to contribute through innovative strategies and impactful collaborations.",
        skills: ["Leadership", "Social Media Management", "Branding"],
      },
      {
        id: 12,
        name: "Suvrojeet Paul",
        designation: "Photography Head",
        pic: "/Suvrojeet.jpg",
        email: "paulsuvrojeet@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I am a second-year B.Tech student at IEM Newtown who loves exploring life with passion. I enjoy photography, working out at the gym, studying, and playing cricket. With a friendly and confident nature, i value making new friends and building connections, always bringing positivity and enthusiasm around me.",
        skills: ["Leadership", "Photography", "IOT"],
      },
      {
        id: 13,
        name: "Swastik Manna",
        designation: "Graphics /videography-photography-editing Head",
        pic: "/Swastik.png",
        email: "swastikmanna2006@gmail.com",
        phone: "+91 xxxxx xxxxx",
        location: "Kolkata, India",
        bio: "I'm Swastik Manna, Btech 2nd year student. I have real-world experience working as a freelance editor. I own a Canon R50 camera and work as a graphics designer, videographer, and editor for Technologia Hackathon. Visual storytelling and content creation are my passion, and I love creating impactful, high-quality work through my skills.",
        skills: ["Leadership", "Photography", "Videography", "Editing"],
      },
    ];

    socket.emit("getTeamData");
    socket.on("teamData", (data) => setTeamMembers(data));
    setTeamMembers(dummyTeam);

    return () => {
      socket.off("teamData");
    };
  }, []);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <main
      className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#e3e6ea] to-[#cfd8dc] text-black"
      }`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1
          className={`text-3xl sm:text-4xl font-bold font-outfit mb-4 ${
            isDark
              ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] text-white"
              : "text-black"
          }`}
        >
          Our Team
        </h1>
        <p className={`text-lg ${isDark ? "text-white/70" : "text-black/70"}`}>
          Meet the brilliant minds behind the Google Gemini Student Community
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => {
          const cardTheme = cardThemes[index % cardThemes.length];
          const isOpen = openCard === member.id;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 ${
                isDark ? "hover:bg-white/10" : "hover:bg-black/5"
              }`}
            >
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center p-6">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden shadow-lg mb-4 border-2"
                  style={{ borderColor: cardTheme.primary }}
                >
                  <img
                    src={member.pic}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-xl font-semibold font-outfit"
                  style={{ color: cardTheme.primary }}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {member.designation}
                </p>
              </div>

              {/* Dropdown Arrow */}
              <div
                onClick={() => setOpenCard(isOpen ? null : member.id)}
                className="flex justify-center items-center cursor-pointer py-3 border-t border-white/20"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className={`w-6 h-6 ${
                      isDark ? "text-white/70" : "text-gray-700"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Expandable Section */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden px-6 pb-4"
              >
                <p
                  className={`text-sm mt-3 ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  {member.bio}
                </p>

                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#DB4437]" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#0F9D58]" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#F4B400]" />
                    <span>{member.location}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4
                    className={`text-sm font-semibold mb-2 ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDark
                            ? "bg-white/20 text-white"
                            : "bg-black/10 text-gray-800"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
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
