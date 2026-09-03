import { content } from "@/content";
import { ScatteredRects } from "@/components/scattered-rects";

export function StatsSection() {
  return (
    <section className="py-20 px-6 relative border-b border-border bg-background overflow-hidden">
      <ScatteredRects offset={3.1} />
      {/* Subtle Developer Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="font-mono text-[80px] md:text-[120px] font-bold leading-none tracking-tighter mb-4 text-center inline-block">
          <span className="text-amber-500">{content.stats.mainNumberParts[0]}</span>
          <span className="text-orange-500 mx-3">{content.stats.mainNumberParts[1]}</span>
          <span className="text-rose-500">{content.stats.mainNumberParts[2]}</span>
        </div>
        <p className="text-[14px] md:text-[15px] text-muted-foreground font-mono mb-12 max-w-lg mx-auto">
          {content.stats.subtext}
        </p>
        
        <div className="w-full max-w-3xl mx-auto border-t border-border pt-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.stats.metrics.map((metric, i) => {
              const parts = metric.split(/\s{2,}/);
              return (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <span className="text-2xl md:text-3xl text-amber-500 font-mono font-bold tracking-tight">{parts[0]}</span>
                  <span className="text-muted-foreground text-[12px] font-mono leading-relaxed max-w-[180px]">{parts[1]}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4">
          <a href={content.stats.linkHref} className="font-mono text-[13px] text-brand border-b border-brand/50 pb-0.5 hover:text-orange-400 hover:border-orange-400 transition-colors">
            {content.stats.linkText}
          </a>
        </div>
      </div>
    </section>
  );
}
