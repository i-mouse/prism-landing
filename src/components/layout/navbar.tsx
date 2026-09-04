"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { content as siteContent } from "@/content";
import { Menu, X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.scrollY === 0) return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? "auto" : "smooth"
    });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
          isScrolled ? "bg-background/90 border-b border-border backdrop-blur-md py-4" : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
          <button onClick={handleScrollToTop} className="flex items-center gap-3 cursor-pointer group">
            <PrismLogo />
            <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">{siteContent.nav.logo}</span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-[13px] font-mono font-medium text-muted-foreground">
              {siteContent.nav.links.map(link => (
                <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <a href="#live-audit" className="text-[13px] font-mono font-medium text-orange-500 hover:text-orange-400 transition-colors">
                {siteContent.nav.cta}
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <button onClick={(e) => { handleScrollToTop(e); closeMobileMenu(); }} className="flex items-center gap-3 cursor-pointer">
                <PrismLogo />
                <span className="font-bold text-lg tracking-tight text-foreground">{siteContent.nav.logo}</span>
              </button>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-foreground"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col px-8 py-8 gap-8 overflow-y-auto">
              <div className="flex flex-col gap-6 text-xl font-mono font-medium">
                {siteContent.nav.links.map(link => (
                  <Link key={link.label} href={link.href} onClick={closeMobileMenu} className="text-foreground hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-border flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <a 
                  href="#live-audit" 
                  onClick={closeMobileMenu}
                  className="w-full py-4 text-center text-sm font-mono font-bold bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  {siteContent.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
