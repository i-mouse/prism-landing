"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { VerdictPill } from "./verdict-pill";
import { content } from "@/content";

const examples = content.liveAuditDemo.examples;

export function LiveAuditDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 14000);
    return () => clearInterval(timer);
  }, []);

  // Calculate hierarchical timings based on text lengths so the animation flows sequentially
  const activeExample = content.liveAuditDemo.examples[activeIndex];
  
  const claimDelay = 0.03;
  const auditorDelay = 0.02;
  const claimDuration = activeExample.claimText.length * claimDelay;
  const auditorStart = claimDuration * 0.6; // Reason starts midway through main Claim animation
  const auditorDuration = activeExample.auditorText.length * auditorDelay;
  const verdictStart = auditorStart + auditorDuration + 0.5; // Verdict appears shortly after auditor finishes

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {/* Left Column - Paper Claim */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand"></div>
          <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">{content.liveAuditDemo.header}</span>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <div className="font-mono text-lg md:text-xl leading-relaxed text-foreground flex-1 min-h-[210px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-muted-foreground font-mono text-sm mb-6">// Claim {activeExample.claimNum}</p>
                <TypewriterText text={activeExample.claimText} delay={claimDelay} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="p-4 border-t border-border flex items-center justify-between text-muted-foreground font-mono text-xs bg-muted/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Watching live
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveIndex((prev) => (prev - 1 + examples.length) % examples.length)} className="hover:text-zinc-300 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {examples.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === activeIndex ? "bg-brand" : "bg-zinc-700"}`}></div>
              ))}
            </div>
            <button onClick={() => setActiveIndex((prev) => (prev + 1) % examples.length)} className="hover:text-zinc-300 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Audit Trail */}
      <div className="flex-1 flex flex-col pt-12 relative h-full">
        <div className="absolute left-[-16px] md:left-0 top-16 bottom-16 w-px bg-border/60"></div>
        
        <div className="flex-1 overflow-y-auto pr-2 pb-8 custom-scrollbar relative pl-8 md:pl-12 min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-10"
            >
              {/* Stage 1 */}
              <div className="relative">
                <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-background border-2 border-amber-500 flex items-center justify-center text-xs font-mono text-amber-500 z-10">1</div>
                <div className="mb-2">
                  <h4 className="text-amber-500 font-mono font-bold text-sm">{content.liveAuditDemo.steps.extractor.title}</h4>
                  <p className="text-muted-foreground font-mono text-xs">{content.liveAuditDemo.steps.extractor.desc}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-muted-foreground">
                  <span className="text-amber-500">{content.liveAuditDemo.steps.extractor.label}</span> {activeExample.claimText}
                </div>
              </div>

              {/* Stage 2 */}
              <div className="relative">
                <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center text-xs font-mono text-emerald-500 z-10">2</div>
                <div className="mb-2">
                  <h4 className="text-emerald-500 font-mono font-bold text-sm">{content.liveAuditDemo.steps.auditor.title}</h4>
                  <p className="text-muted-foreground font-mono text-xs">{content.liveAuditDemo.steps.auditor.desc}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm text-muted-foreground leading-relaxed h-[245px] overflow-y-auto custom-scrollbar">
                  <TypewriterText 
                    text={activeExample.auditorText} 
                    delay={auditorDelay} 
                    highlight={activeExample.auditorHighlight}
                    startDelay={auditorStart}
                  />
                </div>
              </div>

              {/* Stage 3 */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: verdictStart, duration: 0.5, ease: "easeOut" }} className="relative flex flex-col gap-3">
              <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-background border-2 border-rose-500 flex items-center justify-center text-xs font-mono text-rose-500 z-10">3</div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-rose-500 font-mono font-bold text-sm">{content.liveAuditDemo.steps.verdict.title}</h4>
                  <p className="text-muted-foreground font-mono text-xs">{content.liveAuditDemo.steps.verdict.desc}</p>
                </div>
                <div>
                  <VerdictPill label={activeExample.verdict} color={activeExample.verdictColor} />
                </div>
              </div>
              <div className="border border-border rounded-lg p-4 font-mono text-sm flex justify-between items-center text-muted-foreground bg-muted/50">
                <span>{activeExample.ref}</span>
                <ExternalLink size={14} />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TypewriterText({ text, delay = 0.05, startDelay = 0, highlight = "" }: { text: string, delay?: number, startDelay?: number, highlight?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    setDisplayedText("");
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, delay * 1000);
    }, startDelay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, startDelay]);

  if (!highlight) {
    return <span>{displayedText}<span className="animate-pulse inline-block w-2 h-4 bg-zinc-400 ml-1 align-middle" /></span>;
  }

  // If text contains highlight and we've typed it out, wrap it
  if (displayedText.includes(highlight)) {
    const parts = displayedText.split(highlight);
    return (
      <span>
        {parts[0]}
        <span className="bg-amber-500/20 text-amber-500">{highlight}</span>
        {parts[1]}
        <span className="animate-pulse inline-block w-2 h-4 bg-zinc-400 ml-1 align-middle" />
      </span>
    );
  }

  return <span>{displayedText}<span className="animate-pulse inline-block w-2 h-4 bg-zinc-400 ml-1 align-middle" /></span>;
}
