"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { content } from "@/content";

function PrismLogo() {
  return (
    <div className="relative w-7 h-7">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">
        <defs>
          <linearGradient id="prism-grad-nav" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="url(#prism-grad-nav)" strokeWidth="14" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.9)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(39, 39, 42, 0)", "rgba(39, 39, 42, 1)"]);
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);

  return (
    <motion.nav 
      style={{ backgroundColor: navBackground, borderColor: navBorder, paddingTop: navPadding, paddingBottom: navPadding }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PrismLogo />
          <span className="font-bold text-lg tracking-tight text-white">{content.nav.logo}</span>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[13px] font-mono font-medium text-zinc-400">
            {content.nav.links.map(link => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
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
