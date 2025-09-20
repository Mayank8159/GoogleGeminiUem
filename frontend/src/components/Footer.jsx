import { Linkedin, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 px-6 py-10 bg-gradient-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/80 backdrop-blur-xl border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-10 sm:gap-0">
        
        {/* Left: Logos + Title */}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="flex gap-6 relative">
            {/* Gemini Logo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#4285F4]/30 blur-xl scale-110" />
              <img src="/Welcome.jpg" alt="Gemini" className="relative h-16 w-18 rounded-lg z-10" />
            </div>

            {/* IEM Logo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#F4B400]/30 blur-xl scale-110" />
              <img src="/IEDC_LOGO.jpg" alt="IEM" className="relative h-16 w-18 rounded-lg z-10 shadow-lg" />
            </div>

            {/* UEM Logo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#0F9D58]/30 blur-xl scale-110" />
              <img src="/uemlogo.png" alt="UEM" className="relative h-16 w-18 rounded-lg z-10 shadow-md" />
            </div>
          </div>

          <span className="font-outfit text-base sm:text-lg font-semibold tracking-wide text-center sm:text-left">
            Google Gemini Student Community
          </span>
        </div>

        {/* Right: Links + Socials */}
        <div className="flex flex-col items-center sm:items-end gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm font-medium">
            <a href="/" className="hover:text-[#4285F4] hover:drop-shadow-[0_0_6px_#4285F4] transition">Home</a>
            <a href="/events" className="hover:text-[#F4B400] hover:drop-shadow-[0_0_6px_#F4B400] transition">Events</a>
            <a href="/team" className="hover:text-[#0F9D58] hover:drop-shadow-[0_0_6px_#0F9D58] transition">Team</a>
            <a href="/discussion" className="hover:text-[#DB4437] hover:drop-shadow-[0_0_6px_#DB4437] transition">Discussion</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/google-gemini-student-community-uemk-119733385/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4285F4] hover:drop-shadow-[0_0_6px_#4285F4] transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/ggsc_officialuemk?igsh=eGpvMXdqejk2NXk4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DB4437] hover:drop-shadow-[0_0_6px_#DB4437] transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.whatsapp.com/channel/0029Vb6OWFpB4hdTD7YMU029"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] hover:drop-shadow-[0_0_6px_#25D366] transition"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Google Gemini Student Community @ UEM Kolkata. All rights reserved.
      </div>
    </footer>
  );
}