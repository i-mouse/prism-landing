"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-12 h-6" />; // placeholder

  return (
    <div className="flex items-center gap-2">
      <Sun size={16} className={theme === 'light' ? 'text-zinc-900' : 'text-zinc-500'} />
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-10 h-5 bg-zinc-800 rounded-full relative flex items-center px-1"
        aria-label="Toggle theme"
      >
        <div 
          className={`w-3 h-3 rounded-full bg-zinc-400 transition-transform duration-200 ${
            theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <Moon size={16} className={theme === 'dark' ? 'text-zinc-100' : 'text-zinc-500'} />
    </div>
  );
}
