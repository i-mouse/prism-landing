import { content } from "@/content";
import { UploadCloud } from "lucide-react";
import { ScatteredRects } from "@/components/scattered-rects";

export function LiveAuditUpload() {
  return (
    <section id="live-audit" className="py-24 px-6 bg-background relative overflow-hidden">
      <ScatteredRects offset={0} />
      {/* Side-by-side layout instead of vertically stacked */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-left">
          <span className="text-orange-600 dark:text-orange-500 text-[13px] md:text-[14px] font-bold tracking-widest uppercase mb-4 block font-mono">{content.upload.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">{content.upload.heading}</h2>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">{content.upload.subhead}</p>
        </div>
        
        {/* Right Side: Dropzone */}
        <div className="flex-1 w-full max-w-sm">
          <a href={content.upload.linkHref} target="_blank" rel="noopener noreferrer" className="block w-full">
            <div className="border border-border rounded-2xl bg-card py-10 px-8 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-700 hover:bg-accent hover:shadow-xl hover:shadow-brand/10 transition-all group">
              <UploadCloud size={40} className="text-muted-foreground group-hover:text-brand transition-colors mb-5 transform group-hover:scale-110 duration-300" />
              <div className="text-[16px] font-bold text-foreground mb-2">{content.upload.dropzoneMain}</div>
              <div className="text-[13px] text-muted-foreground mb-6">{content.upload.dropzoneSub}</div>
              <div className="text-[11px] font-mono text-muted-foreground bg-background px-4 py-1.5 rounded mb-4">{content.upload.dropzoneNote}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold group-hover:text-foreground transition-colors">{content.upload.linkText}</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
