import { content } from "@/content";
import { LiveAuditDemo } from "@/components/live-audit-demo";
import { ScatteredRects } from "@/components/scattered-rects";

export function HeroSection() {
  return (
    <section className="pt-28 md:pt-36 pb-12 px-6 relative overflow-hidden">
      <ScatteredRects offset={1.5} />
      {/* Background glows behind headline */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--color-orange-500)_0%,_transparent_60%)] opacity-0 dark:opacity-[0.12] blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-mono font-bold leading-tight max-w-4xl text-balance relative z-10 tracking-tight text-white">
          {content.hero.headlineStart}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500">{content.hero.headlineHighlight}</span>
          <span className="animate-pulse inline-block w-4 h-12 md:h-14 lg:h-16 bg-brand ml-1 align-middle translate-y-[-4px]"></span>
        </h1>
        <p className="mt-6 text-[16px] md:text-[17px] text-zinc-400 max-w-xl relative z-10 leading-relaxed">
          {content.hero.subhead}
        </p>
        
        <div className="mt-8 flex flex-col items-center relative z-10">
          <a href="#live-audit" className="bg-brand text-white px-6 py-3 rounded-md font-bold text-[15px] hover:bg-orange-500 transition-colors shadow-lg shadow-brand/20">
            {content.hero.ctaPrimary}
          </a>
          <span className="mt-3 text-[12px] text-zinc-500 font-mono tracking-wide">
            {content.hero.ctaPrimarySub}
          </span>
        </div>
        
        <div className="mt-12 w-full max-w-5xl mx-auto relative z-10">
          <LiveAuditDemo />
        </div>
      </div>
    </section>
  );
}
