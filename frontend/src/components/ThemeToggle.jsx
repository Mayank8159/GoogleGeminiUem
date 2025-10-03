import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: "dark", icon: Moon, label: "Dark Mode" },
    { key: "system", icon: Monitor, label: "System Mode" },
    { key: "light", icon: Sun, label: "Light Mode" }
  ];

  return (
    <div className="relative">
      {/* Background container */}
      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 shadow-lg">
        {themes.map(({ key, icon: Icon, label }, index) => (
          <button
            key={key}
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              theme === key
                ? "bg-white text-black shadow-md scale-110"
                : "text-white/70 hover:text-white hover:bg-white/10"
            } ${index === 0 ? "ml-0" : "ml-1"}`}
            onClick={() => setTheme(key)}
            aria-label={label}
            title={label}
          >
            <Icon size={16} strokeWidth={2} />
            {theme === key && (
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Active indicator glow */}
      {theme && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${themes.findIndex(t => t.key === theme) * 33 + 16.5}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
            filter: "blur(8px)"
          }}
        />
      )}
    </div>
  );
}
