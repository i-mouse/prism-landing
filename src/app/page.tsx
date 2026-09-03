"use client";

import { content } from "@/content";
import { LiveAuditDemo } from "@/components/live-audit-demo";
import { VerdictPill } from "@/components/verdict-pill";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Network, UploadCloud, CheckCircle2, XCircle } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.9)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(39, 39, 42, 0)", "rgba(39, 39, 42, 1)"]);
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "1rem"]);

  const howItWorksRef = useRef(null);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        style={{ backgroundColor: navBackground, borderColor: navBorder, paddingTop: navPadding, paddingBottom: navPadding }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md px-6 transition-all"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-brand rotate-45 transform origin-center"></div>
            <span className="font-bold text-xl tracking-tight">{content.nav.logo}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
              {content.nav.links.map(link => (
                <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="#audit" className="bg-brand text-zinc-950 font-semibold px-5 py-2 rounded-full hover:bg-orange-400 transition-colors">
              {content.nav.cta}
            </Link>
          </div>
          {/* Mobile menu button could go here */}
          <div className="md:hidden">
            <Link href="#audit" className="bg-brand text-zinc-950 font-semibold px-4 py-1.5 text-sm rounded-full">
              Audit
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold leading-tight max-w-4xl text-balance">
            {content.hero.headlineStart}
            <span className="text-brand">{content.hero.headlineHighlight}</span>
            <span className="animate-pulse inline-block w-4 h-12 md:h-16 lg:h-20 bg-brand ml-1 align-middle translate-y-[-4px]"></span>
          </h1>
          <p className="mt-8 text-xl text-zinc-400 max-w-2xl font-sans">
            {content.hero.subhead}
          </p>
          <div className="mt-6 mb-8">
            <Link href="/blog/prism-v1" className="text-brand border-b border-brand pb-0.5 hover:text-orange-400 hover:border-orange-400 transition-colors font-mono text-sm">
              Read the technical writeup →
            </Link>
          </div>
          <LiveAuditDemo />
        </div>
      </section>

      {/* Wedge Section */}
      <section className="bg-zinc-100 text-zinc-900 dark:bg-zinc-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-300">
          {content.wedge.map((item, i) => (
            <div key={i} className="py-6 md:py-0 md:px-12 flex flex-col items-center md:items-start text-center md:text-left first:pl-0 last:pr-0">
              <h3 className={`text-2xl font-bold font-mono mb-2 ${item.type === 'brand' ? 'text-brand' : ''}`}>{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-600 font-mono text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Number Section */}
      <section className="py-32 px-6 relative border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-background to-background pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="font-mono text-8xl md:text-[200px] font-bold leading-none tracking-tighter mb-8 flex justify-center items-center">
            <span className="text-brand">{content.stats.mainNumberParts[0]}</span>
            <span className="text-amber-500 mx-4 md:mx-8">{content.stats.mainNumberParts[1]}</span>
            <span className="text-rose-500">{content.stats.mainNumberParts[2]}</span>
          </div>
          <p className="text-2xl text-zinc-400 font-sans mb-16">{content.stats.subtext}</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 font-mono text-sm text-zinc-300">
            {content.stats.metrics.map((metric, i) => (
              <div key={i} className="flex items-center">
                <span className="whitespace-pre">{metric}</span>
                {i < content.stats.metrics.length - 1 && <div className="hidden md:block w-px h-6 bg-zinc-800 ml-12"></div>}
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <a href={content.stats.linkHref} className="font-mono text-brand border-b border-brand pb-1 hover:text-orange-400 hover:border-orange-400 transition-colors">
              {content.stats.linkText}
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-50 text-zinc-900" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-sm font-bold tracking-widest text-zinc-500 uppercase">{content.howItWorks.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mt-4 mb-4">{content.howItWorks.heading}</h2>
            <p className="text-xl text-zinc-600">{content.howItWorks.subhead}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left side: Steps */}
            <div className="relative">
              <div className="absolute left-3.5 top-2 bottom-12 w-px bg-zinc-300"></div>
              <div className="flex flex-col gap-16 relative z-10">
                {content.howItWorks.steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex gap-8 items-start bg-white/50 p-6 rounded-2xl backdrop-blur-sm shadow-sm"
                  >
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold ${step.color === 'rose' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-zinc-200 text-zinc-600 border border-zinc-300'}`}>
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-mono mb-2">{step.title}</h3>
                      <p className="text-zinc-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 ml-14">
                <a href="#" className="font-mono text-brand border-b border-brand pb-1 hover:text-orange-400 hover:border-orange-400 transition-colors">
                  {content.howItWorks.link}
                </a>
              </div>
            </div>

            {/* Right side: Mock Paper + Verdicts */}
            <div className="flex gap-8">
              {/* Paper Mockup */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 bg-white border border-zinc-300 rounded-xl p-8 shadow-xl flex flex-col"
              >
                <div className="flex-1">
                  <h4 className="font-bold font-mono text-lg mb-6">{content.howItWorks.paperHeader}</h4>
                  <p className="leading-relaxed mb-6">
                    {content.howItWorks.paperTextStart}
                    <span className="bg-amber-100 px-1 py-0.5 rounded">{content.howItWorks.paperHighlight}</span>
                    {content.howItWorks.paperTextEnd}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="h-2 bg-zinc-200 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 rounded w-11/12"></div>
                    <div className="h-2 bg-zinc-200 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 rounded w-4/5"></div>
                    <div className="h-2 bg-zinc-200 rounded w-full"></div>
                    <div className="h-2 bg-zinc-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="pt-8 text-xs text-zinc-400 font-mono">p. 7 of 14</div>
              </motion.div>

              {/* Rail */}
              <div className="w-64 flex flex-col gap-6 relative pt-12">
                <div className="absolute left-[9px] top-0 bottom-0 w-px bg-zinc-200"></div>
                {content.howItWorks.verdictCards.map((card, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                    className="relative pl-8"
                  >
                    <div className={`absolute left-0 top-3 w-5 h-5 rounded-full border-4 border-white ${card.color === 'supported' ? 'bg-supported' : card.color === 'partial' ? 'bg-partial' : 'bg-refused'}`}></div>
                    <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mb-3">
                        <VerdictPill label={card.verdict} color={card.color as any} />
                      </div>
                      <div className="font-mono text-xs text-zinc-500 mb-2">{card.ref}</div>
                      <p className="text-sm text-zinc-700">{card.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Audit Upload */}
      <section id="live-audit" className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-sm font-bold tracking-widest uppercase">{content.upload.eyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-mono mt-4 mb-4">{content.upload.heading}</h2>
          <p className="text-zinc-400 mb-12">{content.upload.subhead}</p>
          
          <Link href={content.upload.linkHref}>
            <div className="border border-zinc-700 border-dashed rounded-xl bg-zinc-900 p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors group">
              <UploadCloud size={48} className="text-zinc-500 group-hover:text-brand transition-colors mb-4" />
              <div className="text-xl font-bold mb-2">{content.upload.dropzoneMain}</div>
              <div className="text-zinc-400 mb-6">{content.upload.dropzoneSub}</div>
              <div className="text-xs font-mono text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full">{content.upload.dropzoneNote}</div>
            </div>
          </Link>
        </div>
      </section>

      {/* What Prism Won't Do */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-50 text-zinc-900">
        <div className="max-w-6xl mx-auto">
          <span className="text-brand text-sm font-bold tracking-widest uppercase">{content.wontDo.eyebrow}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-6">
            <h2 className="text-4xl md:text-5xl font-bold font-mono leading-tight">{content.wontDo.heading}</h2>
            <div className="flex flex-col md:flex-row gap-12 items-start pt-2">
              <ul className="flex flex-col gap-4 flex-1">
                {content.wontDo.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <XCircle size={20} className="text-rose-500 flex-shrink-0" />
                    <span className="font-mono text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex-1 border-l-2 border-zinc-300 pl-8 py-2">
                <p className="text-lg italic text-zinc-600">{content.wontDo.paragraph}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section id="limitations" className="py-24 px-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand text-sm font-bold tracking-widest uppercase">{content.limitations.eyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-mono mt-4 mb-16">{content.limitations.heading}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.limitations.blocks.map((block, i) => (
              <div key={i} className="text-zinc-400 leading-relaxed font-mono text-sm">
                {block}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Footer */}
      <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.engineering.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="w-12 h-12 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-brand mb-6">
                {item.icon === 'code' && <Code size={24} />}
                {item.icon === 'network' && <Network size={24} />}
                {item.icon === 'github' && <GithubIcon size={24} />}
              </div>
              <span className="text-brand text-xs font-bold font-mono tracking-widest uppercase mb-4">{item.eyebrow}</span>
              <p className="text-zinc-300 font-mono text-sm mb-6 flex-1">{item.heading}</p>
              <a href={item.linkHref} className="font-mono text-brand border-b border-brand pb-1 self-start hover:text-orange-400 hover:border-orange-400 transition-colors text-sm">
                {item.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Site Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-brand rotate-45 transform origin-center"></div>
              <span className="font-bold text-xl tracking-tight">{content.nav.logo}</span>
            </div>
            <div className="font-mono text-sm text-zinc-500">
              {content.footer.taglines.map((tagline, i) => (
                <div key={i}>{tagline}</div>
              ))}
            </div>
            <div className="text-xs text-zinc-600 mt-auto pt-8 font-mono">{content.footer.copyright}</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 flex-1 md:px-12">
            {content.footer.columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-4">
                <span className="text-white font-mono text-sm">{col.title}</span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-zinc-500 hover:text-zinc-300 font-mono text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col items-end gap-6 justify-between">
            <div className="flex items-center gap-6 text-zinc-500">
              <a href="#" className="hover:text-zinc-300 transition-colors"><GithubIcon size={20} /></a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </main>
  );
}
