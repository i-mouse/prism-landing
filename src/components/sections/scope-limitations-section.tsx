import { content } from "@/content";
import { XCircle, AlertTriangle } from "lucide-react";
import { ScatteredRects } from "@/components/scattered-rects";

export function ScopeLimitationsSection() {
  return (
    <section id="limitations" className="py-24 px-6 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
      {/* Scattered Rectangles Background */}
      <ScatteredRects offset={2.3} />
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand text-[13px] font-bold tracking-widest uppercase font-mono block mb-4">SCOPE & LIMITATIONS</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">{content.limitations.heading || "What this number doesn't prove."}</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Prism is designed with strict boundaries to ensure the integrity of the audit.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Left Column - Scope Card */}
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 lg:p-12 flex flex-col gap-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500">
                <XCircle size={16} />
              </span>
              What Prism won't do.
            </h3>
            
            <ul className="flex flex-col gap-6 flex-1">
              {content.wontDo.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                  <span className="text-[16px] text-zinc-300 leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl p-5 mt-4">
              <p className="text-[14px] text-zinc-400 font-mono leading-relaxed">
                <span className="text-brand">{"//"} Note:</span> {content.wontDo.paragraph}
              </p>
            </div>
          </div>

          {/* Right Column - Limitations Card */}
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 lg:p-12 flex flex-col gap-8 shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
                <AlertTriangle size={16} />
              </span>
              Limitations of the eval.
            </h3>
            
            <div className="flex flex-col gap-6">
              {content.limitations.blocks.map((block, i) => {
                // Highlight specific phrases for visual interest
                let formattedBlock = block;
                if (i === 0) {
                  const parts = block.split('A held-out post-cutoff paper with sealed rows is the fix.');
                  return (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/item:bg-amber-500 transition-colors flex-shrink-0 mt-2"></div>
                      <p className="text-zinc-300 leading-relaxed text-[15px]">
                        {parts[0]}<span className="bg-amber-500/10 text-amber-500 px-1 rounded mx-1">A held-out post-cutoff paper with sealed rows is the fix.</span>{parts[1] || ''}
                      </p>
                    </div>
                  );
                }
                if (i === 1) {
                  const parts = block.split('The lower number is the more honest one.');
                  return (
                    <div key={i} className="flex gap-4 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/item:bg-amber-500 transition-colors flex-shrink-0 mt-2"></div>
                      <p className="text-zinc-300 leading-relaxed text-[15px]">
                        {parts[0]}<span className="text-white font-medium bg-zinc-800 px-1 rounded mx-1">The lower number is the more honest one.</span>{parts[1] || ''}
                      </p>
                    </div>
                  );
                }
                return (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/item:bg-amber-500 transition-colors flex-shrink-0 mt-2"></div>
                    <p className="text-zinc-300 leading-relaxed text-[15px]">
                      {block}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
