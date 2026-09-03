"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { content } from "@/content";

function PrismLogo() {
  return (
    <div className="relative w-7 h-7">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">
        <defs>
          <linearGradient id="prism-grad-nav" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-pink-500)" />
            <stop offset="50%" stopColor="var(--color-orange-500)" />
            <stop offset="100%" stopColor="var(--color-amber-400)" />
          </linearGradient>
        </defs>
        <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="url(#prism-grad-nav)" strokeWidth="14" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        isScrolled ? "bg-background/90 border-b border-border backdrop-blur-md py-4" : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <PrismLogo />
          <span className="font-bold text-lg tracking-tight text-foreground">{content.nav.logo}</span>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[13px] font-mono font-medium text-muted-foreground">
            {content.nav.links.map(link => (
              <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <a href="#live-audit" className="text-[13px] font-mono font-medium text-orange-500 hover:text-orange-400 transition-colors">
              {content.nav.cta}
            </a>
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile menu */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
