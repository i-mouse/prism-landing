"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { VerdictPill } from "./verdict-pill";
import { content } from "@/content";

const examples = content.liveAuditDemo.examples;

export function LiveAuditDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const activeExample = examples[activeIndex];

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {/* Left Column - Paper Claim */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand"></div>
          <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">{content.liveAuditDemo.header}</span>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <p className="text-zinc-500 font-mono text-sm mb-6">// Claim {activeExample.claimNum}</p>
          <div className="font-mono text-lg md:text-xl leading-relaxed text-zinc-100 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TypewriterText text={activeExample.claimText} delay={0.02} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-zinc-500 font-mono text-xs bg-zinc-950/50">
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

      {/* Right Column - Three-stage Timeline */}
      <div className="relative pl-6 flex flex-col justify-between">
        <div className="absolute left-0 top-6 bottom-6 w-px bg-zinc-800"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Stage 1 */}
            <div className="relative">
              <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-zinc-950 border-2 border-amber-500 flex items-center justify-center text-xs font-mono text-amber-500 z-10">1</div>
              <div className="mb-2">
                <h4 className="text-amber-500 font-mono font-bold text-sm">Extractor</h4>
                <p className="text-zinc-500 font-mono text-xs">Extracting claim...</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300">
                <span className="text-amber-500">Claim:</span> {activeExample.claimText}
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center text-xs font-mono text-emerald-500 z-10">2</div>
              <div className="mb-2">
                <h4 className="text-emerald-500 font-mono font-bold text-sm">Auditor</h4>
                <p className="text-zinc-500 font-mono text-xs">Reasoning...</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300 leading-relaxed min-h-[140px]">
                <TypewriterText 
                  text={activeExample.auditorText} 
                  delay={0.015} 
                  highlight={activeExample.auditorHighlight}
                  startDelay={1}
                />
              </div>
            </div>

            {/* Stage 3 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="relative flex flex-col gap-3">
              <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-zinc-950 border-2 border-rose-500 flex items-center justify-center text-xs font-mono text-rose-500 z-10">3</div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-rose-500 font-mono font-bold text-sm">Verdict</h4>
                  <p className="text-zinc-500 font-mono text-xs">Final label and evidence</p>
                </div>
                <div>
                  <VerdictPill label={activeExample.verdict} color={activeExample.verdictColor as any} />
                </div>
              </div>
              <div className="border border-zinc-800 rounded-lg p-4 font-mono text-sm flex justify-between items-center text-zinc-400 bg-zinc-900/50">
                <span>{activeExample.ref}</span>
                <ExternalLink size={14} />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TypewriterText({ text, delay, highlight, startDelay = 0 }: { text: string, delay: number, highlight?: string, startDelay?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, delay * 1000);
      return () => clearInterval(interval);
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
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
