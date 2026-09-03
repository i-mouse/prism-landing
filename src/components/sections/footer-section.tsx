"use client";

import { content } from "@/content";
import { Code, Network } from "lucide-react";
import { ScatteredRects } from "@/components/scattered-rects";

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
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="url(#prism-grad-footer)" strokeWidth="14" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function FooterSection() {
  return (
    <div className="bg-[#09090b]">
      
      {/* Engineering Section */}
      <section className="py-20 px-6 border-t border-zinc-900/50 relative overflow-hidden">
        <ScatteredRects offset={4.7} />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-900 relative z-10">
          {content.engineering.map((item, i) => (
            <div key={i} className="flex-1 flex gap-5 px-0 py-10 md:py-0 md:px-10 first:pl-0 last:pr-0">
              <div className="w-14 h-14 shrink-0 rounded-lg border border-cyan-500/30 bg-[#0d0d0f] flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                {item.icon === 'code' && <Code size={24} />}
                {item.icon === 'network' && <Network size={24} />}
                {item.icon === 'github' && <GithubIcon size={24} />}
              </div>
              <div className="flex flex-col">
                <span className="text-cyan-400 text-[12px] font-mono tracking-widest uppercase mb-3">{item.eyebrow}</span>
                <p className="text-zinc-400 text-[13px] leading-relaxed mb-6 font-mono">{item.heading}</p>
                <a href={item.linkHref} className="font-mono text-[13px] text-red-500 border-b border-red-500/30 pb-0.5 self-start hover:text-red-400 hover:border-red-400 transition-colors">
                  {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Site Footer - NO SCATTERED RECTS HERE */}
      <footer className="py-16 px-6 border-t border-zinc-900/50 min-h-[300px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-xs">
            <div className="flex items-center gap-4">
              <PrismLogo />
              <span className="font-bold text-2xl tracking-tight text-white">Prism</span>
            </div>
            <div className="font-mono text-[12px] text-zinc-400 leading-relaxed mt-2">
              {content.footer.taglines.map((tagline, i) => (
                <div key={i}>{tagline}</div>
              ))}
            </div>
            <div className="text-[11px] text-zinc-600 mt-auto pt-8 font-mono">{content.footer.copyright}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-16 flex-1 md:max-w-md md:ml-auto">
            {content.footer.columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-5">
                <span className="text-white font-bold text-[13px]">{col.title}</span>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-zinc-500 hover:text-white text-[13px] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
