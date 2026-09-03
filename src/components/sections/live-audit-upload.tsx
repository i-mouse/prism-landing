import { content } from "@/content";
import { UploadCloud } from "lucide-react";
import { ScatteredRects } from "@/components/scattered-rects";

export function LiveAuditUpload() {
  return (
    <section id="live-audit" className="py-24 px-6 bg-[#09090b] relative overflow-hidden">
      <ScatteredRects offset={0} />
      {/* Side-by-side layout instead of vertically stacked */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-left">
          <span className="text-orange-500 text-[11px] font-bold tracking-widest uppercase mb-4 block font-mono">{content.upload.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">{content.upload.heading}</h2>
          <p className="text-lg text-zinc-400 max-w-md leading-relaxed">{content.upload.subhead}</p>
        </div>
        
        {/* Right Side: Dropzone */}
        <div className="flex-1 w-full max-w-sm">
          <a href={content.upload.linkHref} target="_blank" rel="noopener noreferrer" className="block w-full">
            <div className="border border-zinc-800/80 rounded-2xl bg-[#0d0d0f] py-10 px-8 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-700 hover:bg-[#121214] hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all group">
              <UploadCloud size={40} className="text-zinc-500 group-hover:text-orange-500 transition-colors mb-5 transform group-hover:scale-110 duration-300" />
              <div className="text-[16px] font-bold text-white mb-2">{content.upload.dropzoneMain}</div>
              <div className="text-[13px] text-zinc-500 mb-6">{content.upload.dropzoneSub}</div>
              <div className="text-[11px] font-mono text-zinc-400 bg-[#09090b] px-4 py-1.5 rounded mb-4">{content.upload.dropzoneNote}</div>
              <div className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold group-hover:text-zinc-400 transition-colors">→ opens the live demo in a new tab</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
