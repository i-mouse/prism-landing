import { content } from "@/content";
import { Code, Network } from "lucide-react";
import { ScatteredRects } from "@/components/scattered-rects";
import { ThemeToggle } from "@/components/theme-toggle";

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  );
}

function PrismLogo() {
  return (
    <div className="relative w-8 h-8">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)]">
        <defs>
          <linearGradient id="prism-grad-footer" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-pink-500)" />
            <stop offset="50%" stopColor="var(--color-orange-500)" />
            <stop offset="100%" stopColor="var(--color-amber-400)" />
          </linearGradient>
        </defs>
        <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="url(#prism-grad-footer)" strokeWidth="14" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function FooterSection() {
  return (
    <div className="bg-background">
      
      {/* Engineering Section */}
      <section className="py-20 px-6 border-t border-border relative overflow-hidden">
        <ScatteredRects offset={4.7} />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border relative z-10">
          {content.engineering.map((item, i) => (
            <div key={i} className="flex-1 flex gap-5 px-0 py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
              <div className="w-14 h-14 shrink-0 rounded-lg border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-card flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                {item.icon === 'code' && <Code size={24} />}
                {item.icon === 'network' && <Network size={24} />}
                {item.icon === 'github' && <GithubIcon size={24} />}
              </div>
              <div className="flex flex-col">
                <span className="text-cyan-700 dark:text-cyan-400 text-[13px] md:text-[14px] font-mono tracking-widest uppercase mb-3">{item.eyebrow}</span>
                <p className="text-muted-foreground text-[13px] leading-relaxed mb-6 font-mono">{item.heading}</p>
                <a href={item.linkHref} className="font-mono text-[13px] text-red-600 dark:text-red-500 border-b border-red-600/30 dark:border-red-500/30 pb-0.5 self-start hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Site Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <PrismLogo />
              <span className="font-bold text-xl tracking-tight text-foreground">Prism</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-border"></div>
            <div className="text-[12px] text-muted-foreground font-mono">{content.footer.copyright}</div>
          </div>
          
          {/* Compact Navigation & Theme Toggle */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {content.footer.columns[0].links.map((link, j) => (
                <a key={j} href={link.href} className="text-muted-foreground hover:text-foreground text-[13px] transition-colors font-medium">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
