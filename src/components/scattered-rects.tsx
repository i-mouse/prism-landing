"use client";

import { motion } from "framer-motion";

export function ScatteredRects({ offset = 0 }: { offset?: number }) {
  // Fewer boxes (only 4 per section), spaced far apart, with prime/irregular durations 
  // so they almost never sync up their animations.
  const rects = [
    // Left edge
    { top: "15%", left: "4%", w: "w-32", h: "h-8", color: "bg-blue-500/10 border-blue-500/20", delay: 0.5 + offset, dur: 9.3 },
    { bottom: "20%", left: "7%", w: "w-24", h: "h-6", color: "bg-orange-500/10 border-orange-500/20", delay: 3.7 + offset, dur: 11.2 },
    
    // Right edge
    { top: "25%", right: "5%", w: "w-40", h: "h-8", color: "bg-emerald-500/10 border-emerald-500/20", delay: 1.8 + offset, dur: 13.7 },
    { bottom: "30%", right: "3%", w: "w-28", h: "h-10", color: "bg-amber-500/10 border-amber-500/20", delay: 5.1 + offset, dur: 8.9 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
      {rects.map((rect, i) => (
        <motion.div 
          key={i}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: rect.dur, repeat: Infinity, delay: rect.delay, ease: "easeInOut" }}
          className={`absolute ${rect.w} ${rect.h} ${rect.color} border rounded-sm`}
          style={{ 
            top: rect.top, 
            bottom: rect.bottom, 
            left: rect.left, 
            right: rect.right 
          }}
        />
      ))}
    </div>
  );
}
