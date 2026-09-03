"use client";

import { content } from "@/content";
import { motion } from "framer-motion";
import { VerdictPill } from "@/components/verdict-pill";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-50 text-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[13px] font-bold tracking-widest text-zinc-500 uppercase">{content.howItWorks.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight mt-4 mb-6">{content.howItWorks.heading}</h2>
          <p className="text-[17px] md:text-[18px] text-zinc-600">{content.howItWorks.subhead}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side: Steps */}
          <div className="relative">
            <div className="absolute left-3.5 top-2 bottom-12 w-px bg-zinc-300"></div>
            <div className="flex flex-col gap-10 relative z-10">
              {content.howItWorks.steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="flex gap-6 items-start bg-white/60 p-5 rounded-2xl backdrop-blur-sm shadow-sm border border-zinc-200/50"
                >
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-[12px] font-bold ${step.color === 'rose' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-zinc-200 text-zinc-600 border border-zinc-300'}`}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 tracking-tight text-zinc-900">{step.title}</h3>
                    <p className="text-zinc-600 text-[15px] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 ml-14">
              <a href="#live-audit" className="font-sans font-medium text-[15px] text-brand border-b border-brand/50 pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-colors">
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
              className="flex-1 max-w-sm bg-white border border-zinc-300 rounded-xl p-8 shadow-xl flex flex-col"
            >
              <div className="flex-1">
                <h4 className="font-bold font-mono text-[15px] mb-6 text-zinc-900">{content.howItWorks.paperHeader}</h4>
                <p className="leading-relaxed mb-8 font-mono text-[14px] text-zinc-800">
                  {content.howItWorks.paperTextStart}
                  <span className="bg-amber-100 px-1.5 py-0.5 rounded text-zinc-900 font-semibold">{content.howItWorks.paperHighlight}</span>
                  {content.howItWorks.paperTextEnd}
                </p>
                <div className="flex flex-col gap-4">
                  <div className="h-2 bg-zinc-200 rounded w-full"></div>
                  <div className="h-2 bg-zinc-200 rounded w-11/12"></div>
                  <div className="h-2 bg-zinc-200 rounded w-4/5"></div>
                </div>
              </div>
              <div className="pt-10 text-[12px] text-zinc-500 font-mono">{content.howItWorks.paperFooterText}</div>
            </motion.div>

            {/* Rail */}
            <div className="w-64 flex flex-col gap-5 relative pt-12">
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
                  <div className={`absolute left-0 top-3 w-5 h-5 rounded-full border-4 border-white ${card.color === 'supported' ? 'bg-supported' : card.color === 'partial' ? 'bg-partial' : 'bg-refused'}`}>
                    <span className="sr-only">Verdict: {card.verdict}</span>
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <VerdictPill label={card.verdict} color={card.color} />
                    </div>
                    <div className="font-mono text-[12px] text-zinc-500 mb-2.5 font-medium">{card.ref}</div>
                    <p className="text-[14px] font-mono text-zinc-800 leading-snug">{card.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
